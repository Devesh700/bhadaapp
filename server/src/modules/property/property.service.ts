import { SearchHistoryModel } from "../search-history/search-history.model";
import { TransactionModel } from "../transaction/transaction.model";
import { PropertyModel, IProperty } from "./property.model";
import { AnyArray, Types } from "mongoose";

export class PropertyService {
  private static readonly CONTACT_UNLOCK_COST = 10;

  private static normalizeId(value: unknown): string {
    if (!value) return "";
    return String(value);
  }

  private static isVendorOwner(owner: any): boolean {
    return owner?.role === "vendor";
  }

  private static canAccessContact(params: {
    requesterId?: string;
    requesterRole?: string;
    owner: any;
    contactsUnlockedBy?: Types.ObjectId[];
  }) {
    const { requesterId, requesterRole, owner, contactsUnlockedBy } = params;
    const normalizedRequesterId = PropertyService.normalizeId(requesterId);
    const isOwner = !!(normalizedRequesterId && owner?._id?.toString() === normalizedRequesterId);
    const isAdmin = requesterRole === "admin";
    const isVendorOwnedProperty = PropertyService.isVendorOwner(owner);
    const isUnlocked = !!(
      normalizedRequesterId &&
      contactsUnlockedBy?.some((uid) => uid.toString() === normalizedRequesterId)
    );

    const hasAccessToContact = isVendorOwnedProperty || isOwner || isAdmin || isUnlocked;
    return { hasAccessToContact, isVendorOwnedProperty };
  }

  // Create a new property
  static async createProperty(data: Partial<IProperty>): Promise<IProperty> {
    const property = new PropertyModel(data);
    return await property.save();
  }

  // Get property by ID
  static async getPropertyById(id: string, requesterId?: string, requesterRole?: string): Promise<any> {
    const property = await PropertyModel.findById(id).populate("owner", "name email phone role businessDetails preferences");
    if (!property) return null;

    const propertyObj:any = property.toObject();
    const owner = propertyObj.owner as any;

    const { hasAccessToContact, isVendorOwnedProperty } = PropertyService.canAccessContact({
      requesterId,
      requesterRole,
      owner,
      contactsUnlockedBy: property.contactsUnlockedBy,
    });

    if (!hasAccessToContact) {
      delete propertyObj.owner.phone;
      delete propertyObj.owner.email;
    }

    return {
      ...propertyObj,
      hasAccessToContact,
      contactLocked: !hasAccessToContact,
      contactUnlockCost: isVendorOwnedProperty ? 0 : PropertyService.CONTACT_UNLOCK_COST
    };
  }

  static async unlockContact(propertyId: string, userId: string): Promise<{ success: boolean; message: string }> {
    const property = await PropertyModel.findById(propertyId).populate('owner');
    if (!property) throw new Error("Property not found");
    const normalizedUserId = PropertyService.normalizeId(userId);

    const owner = property.owner as any;
    const isVendorOwnedProperty = PropertyService.isVendorOwner(owner);

    if (isVendorOwnedProperty) {
      return { success: true, message: "Contact is already unlocked for vendor-listed property" };
    }

    if (property.contactsUnlockedBy?.some(uid => uid.toString() === normalizedUserId)) {
      return { success: true, message: "Contact already unlocked" };
    }

    const user = await SearchHistoryModel.db.model('User').findById(normalizedUserId); // Accessing UserModel via db if not imported
    if (!user) throw new Error("User not found");

    if (user.wallet.coins < PropertyService.CONTACT_UNLOCK_COST) {
      throw new Error("Insufficient coins");
    }

    const balanceBefore = user.wallet.coins;
    user.wallet.coins -= PropertyService.CONTACT_UNLOCK_COST;
    user.wallet.totalSpent += PropertyService.CONTACT_UNLOCK_COST;
    await user.save();

    property.contactsUnlockedBy.push(new Types.ObjectId(normalizedUserId));
    await property.save();

    // Create transaction record
    await TransactionModel.create({
      userId: new Types.ObjectId(normalizedUserId),
      transactionType: 'debit',
      amount: PropertyService.CONTACT_UNLOCK_COST,
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
    const query: any = {owner:{$ne:userId}};

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
