import path from "path";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),

  BASE_URL: process.env.BASE_URL || "http://localhost:5000",

  UPLOAD_ROOT:
    process.env.UPLOAD_ROOT || path.join(process.cwd(), "uploads"),

  MAX_IMAGE_SIZE_MB: Number(process.env.MAX_IMAGE_SIZE_MB || 5),
};