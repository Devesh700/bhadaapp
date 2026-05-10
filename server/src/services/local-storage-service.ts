import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { env } from "../config/env";
import { ensureDir, deleteFileIfExists, safeFileName } from "../utils/file.util";

type UploadImageOptions = {
  file: Express.Multer.File;
  folder: "products" | "users" | "general";
  oldFilePath?: string;
};

export class LocalStorageService {
  private static makeRelativePath(folder: UploadImageOptions["folder"], fileName: string) {
    return `/uploads/images/${folder}/${fileName}`;
  }

  private static toAbsolutePathFromRelative(relativePath: string) {
    const cleanPath = relativePath.replace("/uploads/", "");
    return path.join(env.UPLOAD_ROOT, cleanPath);
  }

  static async uploadImage({
    file,
    folder,
    oldFilePath,
  }: UploadImageOptions) {
    const uploadDir = path.join(env.UPLOAD_ROOT, "images", folder);
    await ensureDir(uploadDir);

    const normalizedBuffer = await sharp(file.buffer)
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
      })
      .toBuffer();

    const checksum = crypto
      .createHash("sha256")
      .update(normalizedBuffer)
      .digest("hex")
      .slice(0, 16);
    const originalName = safeFileName(file.originalname.split(".")[0] || "image");
    const fileName = `${checksum}-${uuid()}-${originalName}.webp`;
    const dedupePrefix = `${checksum}-`;

    const existing = (await fs.readdir(uploadDir)).find((name) =>
      name.startsWith(dedupePrefix)
    );

    if (existing) {
      const relativePath = this.makeRelativePath(folder, existing);

      if (oldFilePath && oldFilePath !== relativePath) {
        await this.deleteByRelativePath(oldFilePath);
      }

      return {
        fileName: existing,
        relativePath,
      };
    }

    const absolutePath = path.join(uploadDir, fileName);

    await fs.writeFile(absolutePath, normalizedBuffer);

    if (oldFilePath) {
      await this.deleteByRelativePath(oldFilePath);
    }

    const relativePath = this.makeRelativePath(folder, fileName);

    return {
      fileName,
      relativePath,
    };
  }

  static async uploadImages({
    files,
    folder,
  }: {
    files: Express.Multer.File[];
    folder: UploadImageOptions["folder"];
  }) {
    const uploadedPaths: string[] = [];

    for (const file of files) {
      const uploaded = await this.uploadImage({ file, folder });
      uploadedPaths.push(uploaded.relativePath);
    }

    return Array.from(new Set(uploadedPaths));
  }

  static async deleteByRelativePath(relativePath: string) {
    if (!relativePath.startsWith("/uploads/")) return;

    const absolutePath = path.resolve(this.toAbsolutePathFromRelative(relativePath));
    const uploadsRoot = path.resolve(env.UPLOAD_ROOT);
    if (!absolutePath.startsWith(uploadsRoot)) return;

    await deleteFileIfExists(absolutePath);
  }

  static async deleteMany(relativePaths: string[]) {
    const uniquePaths = Array.from(new Set(relativePaths));
    await Promise.all(uniquePaths.map((relativePath) => this.deleteByRelativePath(relativePath)));
  }
}
