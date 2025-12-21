import { Request, Response } from "express";
import { PropertyService } from "./property.service";
import { Types } from "mongoose";

export class PropertyController {
  static async createProperty(req: Request, res: Response) {
    try {
        if(!req.user) {
            return res.status(401).json({message: "Unauthorized"})
        }
      const property = await PropertyService.createProperty({
        ...req.body,
        owner: req.user?._id, // assuming req.user is injected by auth middleware
      });
      res.status(201).json(property);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getPropertyById(req: Request, res: Response) {
    try {
      const property = await PropertyService.getPropertyById(req.params.id);
      if (!property) return res.status(404).json({ message: "Not found" });
      res.json({success:true, data:property});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
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
        if(!req.user) {
            return res.status(401).json({message:"Unauthorized"})
        }
      const results = await PropertyService.searchProperties(
        req.user._id as Types.ObjectId,
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
      const results = await PropertyService.searchProperties(
        req.user._id as Types.ObjectId,
        req.body
      );
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
