import { Request, Response } from "express";
import { LocalStorageService } from "../../services/local-storage-service";

export const uploadSingleImage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const folder =
      req.body.folder === "products" || req.body.folder === "users"
        ? req.body.folder
        : "general";

    const uploaded = await LocalStorageService.uploadImage({
      file: req.file,
      folder,
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: uploaded,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to upload image",
    });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { path } = req.body;

    if (!path) {
      return res.status(400).json({
        success: false,
        message: "Image path is required",
      });
    }

    await LocalStorageService.deleteByRelativePath(path);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to delete image",
    });
  }
};
