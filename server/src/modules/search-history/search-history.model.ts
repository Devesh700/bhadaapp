import { model,  Types, Document, Schema } from "mongoose";

export interface ISearchHistory extends Document {
  userId: Types.ObjectId;
  searchQuery: {
    location?: string;
    propertyType?: string;
    priceRange?: { min?: number; max?: number };
    filters?: Record<string, any>;
  };
  resultsCount: number;
  coinsDeducted: number;
  createdAt: Date;
}

const SearchHistorySchema = new Schema<ISearchHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    searchQuery: {
      location: String,
      propertyType: String,
      priceRange: { min: Number, max: Number },
      filters: Schema.Types.Mixed,
    },
    resultsCount: { type: Number, default: 0 },
    coinsDeducted: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const SearchHistoryModel = model<ISearchHistory>('SearchHistory', SearchHistorySchema);
