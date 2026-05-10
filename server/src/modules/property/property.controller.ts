import { Request, Response } from "express";
import { PropertyService } from "./property.service";
import { Types } from "mongoose";
import { PropertyModel } from "./property.model";
import { LocalStorageService } from "../../services/local-storage-service";

const parsePropertyPayload = (req: Request) => {
  if (typeof req.body?.payload === "string") {
    return JSON.parse(req.body.payload);
  }

  return req.body || {};
};

const normalizeRelativeImagePath = (value: string) => {
  if (!value) return "";

  if (value.startsWith("/uploads/")) {
    return value;
  }

  try {
    const parsed = new URL(value);
    if (parsed.pathname.startsWith("/uploads/")) {
      return parsed.pathname;
    }
  } catch {
    // Ignore URL parse errors and reject below
  }

  throw new Error("Invalid image path. Only uploaded files are allowed.");
};

const normalizeImagePaths = (images: unknown) => {
  if (!Array.isArray(images)) return [];
  const normalized = images
    .filter((value): value is string => typeof value === "string")
    .map((value) => normalizeRelativeImagePath(value.trim()))
    .filter(Boolean);

  return Array.from(new Set(normalized));
};

export class PropertyController {
  static async createProperty(req: Request, res: Response) {
    const uploadedImagePaths: string[] = [];
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const files = (req.files as Express.Multer.File[] | undefined) || [];
      const body = parsePropertyPayload(req);
      const retainedImagePaths = normalizeImagePaths(body.images);
      const newImagePaths = files.length
        ? await LocalStorageService.uploadImages({
            files,
            folder: "products",
          })
        : [];

      uploadedImagePaths.push(...newImagePaths);
      const finalImages = Array.from(
        new Set([...retainedImagePaths, ...newImagePaths])
      );

      if (!finalImages.length) {
        throw new Error("At least one property image is required");
      }

      const property = await PropertyService.createProperty({
        ...body,
        images: finalImages,
        owner: req.user?._id,
        isVerified: req.user.isBusinessVerified || false, // Auto-verify if vendor is verified
      });

      res.status(201).json(property);
    } catch (error: any) {
      if (uploadedImagePaths.length) {
        await LocalStorageService.deleteMany(uploadedImagePaths);
      }
      res.status(400).json({ message: error.message });
    }
  }

  static async getPropertyById(req: Request, res: Response) {
    try {
      const property = await PropertyService.getPropertyById(
        req.params.id,
        req.user?._id ? String(req.user._id) : undefined,
        req.user?.role as string | undefined
      );
      if (!property) return res.status(404).json({ message: "Not found" });
      res.json({success:true, data:property});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async unlockContact(req: Request, res: Response) {
    try {
        if(!req.user) return res.status(401).json({message:"Unauthorized"})
      const result = await PropertyService.unlockContact(req.params.id, String(req.user._id));
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateProperty(req: Request, res: Response) {
    const uploadedImagePaths: string[] = [];
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const existingProperty = await PropertyModel.findById(req.params.id).lean();
      if (!existingProperty) {
        return res.status(404).json({ message: "Not found" });
      }

      const isAdmin = req.user.role === "admin";
      const isOwner = existingProperty.owner?.toString() === req.user._id.toString();
      if (!isAdmin && !isOwner) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const files = (req.files as Express.Multer.File[] | undefined) || [];
      const body = parsePropertyPayload(req);
      const hasImagesField = Array.isArray(body.images);
      const retainedImagePaths = hasImagesField
        ? normalizeImagePaths(body.images)
        : Array.isArray(existingProperty.images)
        ? existingProperty.images
        : [];

      const newImagePaths = files.length
        ? await LocalStorageService.uploadImages({
            files,
            folder: "products",
          })
        : [];

      uploadedImagePaths.push(...newImagePaths);

      const shouldReplaceImages = hasImagesField || newImagePaths.length > 0;
      const finalImages = shouldReplaceImages
        ? Array.from(new Set([...retainedImagePaths, ...newImagePaths]))
        : Array.isArray(existingProperty.images)
        ? existingProperty.images
        : [];

      if (!finalImages.length) {
        throw new Error("At least one property image is required");
      }

      const updatedProperty = await PropertyService.updateProperty(req.params.id, {
        ...body,
        images: finalImages,
      });
      if (!updatedProperty) return res.status(404).json({ message: "Not found" });

      const previousImages = Array.isArray(existingProperty.images)
        ? existingProperty.images
        : [];
      const removedImages = previousImages.filter(
        (imagePath: string) => !finalImages.includes(imagePath)
      );

      if (removedImages.length) {
        await LocalStorageService.deleteMany(removedImages);
      }

      res.json(updatedProperty);
    } catch (error: any) {
      if (uploadedImagePaths.length) {
        await LocalStorageService.deleteMany(uploadedImagePaths);
      }
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteProperty(req: Request, res: Response) {
    try {
      const property = await PropertyService.deleteProperty(req.params.id);
      if (!property) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async searchProperties(req: Request, res: Response) {
    try {
      const results = await PropertyService.searchProperties(
        req.user?._id as Types.ObjectId | undefined,
        req.body
      );
      res.json({success:true,data:results});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }


  static async getMyProperties(req: Request, res: Response) {
    try {
        if(!req.user ) {
            return res.status(401).json({message:"Unauthorized"})
        }
      const results = await PropertyModel.find({ owner: req.user._id }).sort({ createdAt: -1 }).lean();
      res.json({success:true,data:results});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async incrementCounter(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const property = await PropertyService.incrementCounters(
        req.params.id,
        type as "view" | "contact" | "whatsapp"
      );
      if (!property) return res.status(404).json({ message: "Not found" });
      res.json(property);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
