import { IUser } from "./user.type";

export interface Location {
  address: string;
  city: string;
  state: string;
  pincode: string;
  coordinates: { lat: number; lng: number };
}

export interface Specifications {
  area: number;
  bedrooms: number;
  bathrooms: number;
  furnishing?: string;
  parking?: boolean;
  amenities?: string[];
}

// export interface Property {
//   _id: string;
//   title: string;
//   description: string;
//   propertyType: "rent" | "sale" | "commercial";
//   category: "apartment" | "house" | "plot" | "office";
//   price: number;
//   location: Location;
//   specifications: Specifications;
//   images: string[];
//   videos?: string[];
//   owner: string;
//   status: "pending" | "approved" | "rejected" | "sold" | "rented";
//   isPrimeListing: boolean;
//   isVerified: boolean;
//   isFeatured: boolean;
//   primeListingExpiry?: Date;
//   viewCount: number;
//   contactViewCount: number;
//   whatsappContactCount: number;
//   rejectionReason?: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface SearchQuery {
  location?: string;
  propertyType?: string;
  priceRange?: { min?: number; max?: number };
  filters?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}


export interface Property {
 _id?:string;
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
  owner: Partial<IUser>;
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