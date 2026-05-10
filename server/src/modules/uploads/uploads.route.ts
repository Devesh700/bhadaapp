import { Router } from "express";
import {
  uploadSingleImage,
  deleteImage,
} from "./uploads.controller";
import { uploadImageMemory } from "../../middlewares/upload.middleware";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post(
  "/image",
  authMiddleware,
  uploadImageMemory.single("image"),
  uploadSingleImage
);

router.delete(
  "/image",
  authMiddleware,
  deleteImage
);

export default router;
