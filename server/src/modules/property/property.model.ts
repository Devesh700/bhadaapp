import { Document, model, Schema, Types } from "mongoose";

export interface IProperty extends Document {
  title: string;
  description: string;
  propertyType: 'rent' | 'sale' | 'commercial';
  category: 'apartment' | 'house' | 'plot' | 'office';
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: { lat: number; lng: number };
  };
  specifications: {
    area: number;
    bedrooms: number;
    bathrooms: number;
    furnishing?: string;
    parking?: boolean;
    amenities?: string[];
  };
  images: string[];
  videos?: string[];
  owner: Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected' | 'sold' | 'rented';
  isPrimeListing: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  primeListingExpiry?: Date;
  viewCount: number;
  contactViewCount: number;
  whatsappContactCount: number;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    title: { type: String, required: true },
    description: String,
    propertyType: { type: String, enum: ['rent', 'sale', 'commercial'], required: true },
    category: { type: String, enum: ['apartment', 'house', 'plot', 'office'], required: true },
    price: { type: Number, required: true },
    location: {
      address: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: { lat: Number, lng: Number },
    },
    specifications: {
      area: Number,
      bedrooms: Number,
      bathrooms: Number,
      furnishing: String,
      parking: Boolean,
      amenities: [String],
    },
    images: [String],
    videos: [String],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'sold', 'rented'], default: 'pending' },
    isPrimeListing: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    primeListingExpiry: Date,
    viewCount: { type: Number, default: 0 },
    contactViewCount: { type: Number, default: 0 },
    whatsappContactCount: { type: Number, default: 0 },
    rejectionReason: String,
  },
  { timestamps: true }
);

export const PropertyModel = model<IProperty>('Property', PropertySchema);
