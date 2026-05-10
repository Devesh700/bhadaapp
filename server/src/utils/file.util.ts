import fs from "fs/promises";
import path from "path";

export const ensureDir = async (dir: string) => {
  await fs.mkdir(dir, { recursive: true });
};

export const deleteFileIfExists = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
  } catch {
    // ignore
  }
};

export const safeFileName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
};