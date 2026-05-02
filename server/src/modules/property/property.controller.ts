import { Request, Response } from "express";
import { PropertyService } from "./property.service";
import { Types } from "mongoose";
import { PropertyModel } from "./property.model";

export class PropertyController {
  static async createProperty(req: Request, res: Response) {
    try {
        if(!req.user) {
            return res.status(401).json({message: "Unauthorized"})
        }
      const property = await PropertyService.createProperty({
        ...req.body,
        owner: req.user?._id,
        isVerified: req.user.isBusinessVerified || false, // Auto-verify if vendor is verified
      });
      res.status(201).json(property);
    } catch (error: any) {
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
    try {
      const property = await PropertyService.updateProperty(
        req.params.id,
        req.body
      );
      if (!property) return res.status(404).json({ message: "Not found" });
      res.json(property);
    } catch (error: any) {
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
