import { SearchHistoryModel } from "../search-history/search-history.model";
import { PropertyModel, IProperty } from "./property.model";
import { Types } from "mongoose";

export class PropertyService {
  // Create a new property
  static async createProperty(data: Partial<IProperty>): Promise<IProperty> {
    const property = new PropertyModel(data);
    return await property.save();
  }

  // Get property by ID
  static async getPropertyById(id: string): Promise<IProperty | null> {
    return await PropertyModel.findById(id).populate("owner", "name email");
  }

  // Update property
  static async updateProperty(
    id: string,
    data: Partial<IProperty>
  ): Promise<IProperty | null> {
    return await PropertyModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete property
  static async deleteProperty(id: string): Promise<IProperty | null> {
    return await PropertyModel.findByIdAndDelete(id);
  }

  // Search properties and log history
  static async searchProperties(
    userId: Types.ObjectId,
    searchQuery: {
      location?: string;
      propertyType?: string;
      priceRange?: { min?: number; max?: number };
      filters?: Record<string, any>;
    }
  ): Promise<IProperty[]> {
    const query: any = {};

    if (searchQuery.location) {
      query["location.city"] = { $regex: searchQuery.location, $options: "i" };
    }
    if (searchQuery.propertyType) {
      query.propertyType = searchQuery.propertyType;
    }
    if (searchQuery.priceRange) {
      query.price = {};
      if (searchQuery.priceRange.min !== undefined)
        query.price.$gte = searchQuery.priceRange.min;
      if (searchQuery.priceRange.max !== undefined)
        query.price.$lte = searchQuery.priceRange.max;
    }

    // Apply filters if provided
    if (searchQuery.filters) {
      Object.assign(query, searchQuery.filters);
    }

    const results = await PropertyModel.find(query);

    // Save search history
    await SearchHistoryModel.create({
      userId,
      searchQuery,
      resultsCount: results.length,
      coinsDeducted: 1, // Example: deduct 1 coin per search
    });

    return results;
  }

  static async myProperties(
    ownerId: Types.ObjectId,
    searchQuery: {
      location?: string;
      propertyType?: string;
      priceRange?: { min?: number; max?: number };
      filters?: Record<string, any>;
    }
  ): Promise<IProperty[]> {
    const query: any = {owner:ownerId};

    if (searchQuery.location) {
      query["location.city"] = { $regex: searchQuery.location, $options: "i" };
    }
    if (searchQuery.propertyType) {
      query.propertyType = searchQuery.propertyType;
    }
    if (searchQuery.priceRange) {
      query.price = {};
      if (searchQuery.priceRange.min !== undefined)
        query.price.$gte = searchQuery.priceRange.min;
      if (searchQuery.priceRange.max !== undefined)
        query.price.$lte = searchQuery.priceRange.max;
    }

    // Apply filters if provided
    if (searchQuery.filters) {
      Object.assign(query, searchQuery.filters);
    }

    const results = await PropertyModel.find(query);

    // Save search history
    // await SearchHistoryModel.create({
    //   userId,
    //   searchQuery,
    //   resultsCount: results.length,
    //   coinsDeducted: 1, // Example: deduct 1 coin per search
    // });

    return results;
  }

  // Increment view counters
  static async incrementCounters(
    id: string,
    type: "view" | "contact" | "whatsapp"
  ): Promise<IProperty | null> {
    const update: Record<string, any> = {};
    if (type === "view") update.$inc = { viewCount: 1 };
    if (type === "contact") update.$inc = { contactViewCount: 1 };
    if (type === "whatsapp") update.$inc = { whatsappContactCount: 1 };

    return await PropertyModel.findByIdAndUpdate(id, update, { new: true });
  }
}
