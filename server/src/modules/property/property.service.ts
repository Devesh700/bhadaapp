import { SearchHistoryModel } from "../search-history/search-history.model";
import { TransactionModel } from "../transaction/transaction.model";
import { PropertyModel, IProperty } from "./property.model";
import { AnyArray, Types } from "mongoose";

export class PropertyService {
  // Create a new property
  static async createProperty(data: Partial<IProperty>): Promise<IProperty> {
    const property = new PropertyModel(data);
    return await property.save();
  }

  // Get property by ID
  static async getPropertyById(id: string, requesterId?: string): Promise<any> {
    const property = await PropertyModel.findById(id).populate("owner", "name email phone role businessDetails preferences");
    if (!property) return null;

    const propertyObj:any = property.toObject();
    const owner = propertyObj.owner as any;

    // Contact visibility rules:
    // 1. Viewer is owner
    // 2. Property owner is broker/agent
    // 3. Viewer has already unlocked contact
    const isOwner = requesterId && owner._id.toString() === requesterId;
    const isBroker = owner.businessDetails?.businessType === 'broker' || owner.businessDetails?.businessType === 'real-estate-agent';
    const isUnlocked = requesterId && property.contactsUnlockedBy?.some(uid => uid.toString() === requesterId);

    const hasAccessToContact = !!(isOwner || isBroker || isUnlocked);

    // If no access, mask or remove phone/email
    if (!hasAccessToContact) {
      delete propertyObj.owner.phone;
      delete propertyObj.owner.email;
    }

    return {
      ...propertyObj,
      hasAccessToContact,
      contactLocked: !hasAccessToContact
    };
  }

  static async unlockContact(propertyId: string, userId: string): Promise<{ success: boolean; message: string }> {
    const property = await PropertyModel.findById(propertyId).populate('owner');
    if (!property) throw new Error("Property not found");

    const owner = property.owner as any;
    const isBroker = owner.businessDetails?.businessType === 'broker' || owner.businessDetails?.businessType === 'real-estate-agent';

    if (isBroker) {
      return { success: true, message: "Contact is free for brokers" };
    }

    if (property.contactsUnlockedBy?.some(uid => uid.toString() === userId)) {
      return { success: true, message: "Contact already unlocked" };
    }

    const user = await SearchHistoryModel.db.model('User').findById(userId); // Accessing UserModel via db if not imported
    if (!user) throw new Error("User not found");

    const UNLOCK_COST = 5; // Example cost

    if (user.wallet.coins < UNLOCK_COST) {
      throw new Error("Insufficient coins");
    }

    const balanceBefore = user.wallet.coins;
    user.wallet.coins -= UNLOCK_COST;
    user.wallet.totalSpent += UNLOCK_COST;
    await user.save();

    property.contactsUnlockedBy.push(new Types.ObjectId(userId));
    await property.save();

    // Create transaction record
    await TransactionModel.create({
      userId: new Types.ObjectId(userId),
      transactionType: 'debit',
      amount: UNLOCK_COST,
      reason: 'contact_view',
      referenceId: property._id,
      description: `Unlocked contact for property: ${property.title}`,
      balanceBefore,
      balanceAfter: user.wallet.coins
    });

    return { success: true, message: "Contact unlocked successfully" };
  }

  // Update property
  static async updateProperty(
    id: string,
    data: any
  ): Promise<IProperty | null> {
    if (data.location?.coordinates) {
      data.location.geo = {
        type: 'Point',
        coordinates: [data.location.coordinates.lng, data.location.coordinates.lat]
      };
    }
    return await PropertyModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete property
  static async deleteProperty(id: string): Promise<IProperty | null> {
    return await PropertyModel.findByIdAndDelete(id);
  }

  // Search properties and log history
  static async searchProperties(
    userId: Types.ObjectId | undefined,
    searchQuery: {
      location?: string;
      propertyType?: string;
      priceRange?: { min?: number; max?: number };
      latitude?: number;
      longitude?: number;
      radius?: number; // in km
      filters?: Record<string, any>;
    }
  ): Promise<IProperty[]> {
    const query: any = {};

    if (searchQuery.latitude !== undefined && searchQuery.longitude !== undefined) {
      query["location.geo"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [searchQuery.longitude, searchQuery.latitude],
          },
          $maxDistance: (searchQuery.radius || 10) * 1000, // convert km to meters
        },
      };
    } else if (searchQuery.location) {
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

    // Save search history only for authenticated users
    if (userId) {
      await SearchHistoryModel.create({
        userId,
        searchQuery,
        resultsCount: results.length,
        coinsDeducted: 1,
      });
    }

    return results;
  }

  static async myProperties(
    ownerId: Types.ObjectId,
    searchQuery: {
      location?: string;
      propertyType?: string;
      priceRange?: { min?: number; max?: number };
      latitude?: number;
      longitude?: number;
      radius?: number;
      filters?: Record<string, any>;
    }
  ): Promise<IProperty[]> {
    const query: any = {owner:ownerId};

    if (searchQuery.latitude !== undefined && searchQuery.longitude !== undefined) {
      query["location.geo"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [searchQuery.longitude, searchQuery.latitude],
          },
          $maxDistance: (searchQuery.radius || 10) * 1000,
        },
      };
    } else if (searchQuery.location) {
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
