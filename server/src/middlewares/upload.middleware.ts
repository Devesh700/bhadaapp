import multer from "multer";
import { env } from "../config/env";
import path from "path";

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];
const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const buildImageUpload = (maxFiles = 1) =>
  multer({
    storage: multer.memoryStorage(),

    limits: {
      fileSize: env.MAX_IMAGE_SIZE_MB * 1024 * 1024,
      files: maxFiles,
    },

    fileFilter: (_req, file, cb) => {
      const extension = path.extname(file.originalname || "").toLowerCase();
      if (
        !allowedMimeTypes.includes(file.mimetype) ||
        !allowedExtensions.has(extension)
      ) {
        return cb(new Error("Only JPG, PNG and WEBP images are allowed"));
      }

      cb(null, true);
    },
  });

export const createImageUploadMiddleware = (maxFiles = 1) =>
  buildImageUpload(maxFiles);

export const uploadImageMemory = buildImageUpload(1);
