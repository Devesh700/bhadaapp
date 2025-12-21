
// import { Property } from '@/store/types/property.type';
// import { z, ZodSchema } from 'zod';

// export const propertyFormSchema = z.object({
//   // Basic Information
//   propertyTitle: z.string().min(1, 'Property title is required'),
//   // propertyType: z.enum(['Apartment', 'Commercial', 'Houses & Villas', 'Land', 'PG Stays']),
//   propertyType: z.enum(['rent', 'commercial', 'sale']),
//   propertyDescription: z.string().min(10, 'Description must be at least 10 characters'),
//   contactOwner: z.string().min(1, 'Contact owner is required'),

//   // Additional Fields
//   propertyId: z.string().optional(),
//   parentProperty: z.string().optional(),
//   // status: z.enum(['rent', 'sale', 'Sold', 'Under Maintenance']),
//   // status: z.enum(['pending', 'approved', 'rejected', 'sold']).default("pending"),
//   label: z.string().optional(),
//   rooms: z.number().min(0),
//   beds: z.number().min(0),
//   baths: z.number().min(0),
//   garages: z.number().min(0),
//   yearBuilt: z.number().min(1800).max(new Date().getFullYear()),
//   homeArea: z.number().min(0),
//   lotArea: z.number().min(0),

//   // Location
//   address: z.string().min(1, 'Address is required'),
//   city: z.string().min(1, 'City is required'),
//   state: z.string().min(1, 'State is required'),
//   zipCode: z.string().min(1, 'Zip code is required'),

//   // Media
//   // mediaFiles: z.array(z.any()).optional(),
//   videoFile: z.any().optional(),

//   // Amenities
//   amenities: z.array(z.string()).default([]),
// });

// export type PropertyFormData = z.infer<typeof propertyFormSchema>;




import { z } from 'zod';

// Enums used in the backend
const PropertyTypeEnum = z.enum(['rent', 'sale', 'commercial']);
const CategoryEnum = z.enum(['apartment', 'house', 'plot', 'office']);
const StatusEnum = z.enum(['pending', 'approved', 'rejected', 'sold', 'rented']);

// Coordinates schema
const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

// Main schema
export const propertyFormSchema = z.object({
  // Basic Info
  title: z.string().min(1, 'Property title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  propertyType: PropertyTypeEnum,
  category: CategoryEnum,
  price: z.number().min(0, 'Price must be a positive number'),

  // Location
  location: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().min(1, 'Pincode is required'),
    coordinates: CoordinatesSchema,
  }),

  // Specifications
  specifications: z.object({
    area: z.number().min(0, 'Area must be a positive number'),
    bedrooms: z.number().min(0),
    bathrooms: z.number().min(0),
    furnishing: z.string().optional(),
    parking: z.boolean().optional(),
    amenities: z.array(z.string()).optional().default([]),
  }),

  // Media
  images: z.array(z.string()).min(1, 'At least one image is required'),
  videos: z.array(z.string()).optional(),

  // Backend-managed / optional fields
  owner: z.string().optional(), // Usually handled by backend auth
  status: StatusEnum.default('pending'),

  isPrimeListing: z.boolean().default(false),
  isVerified: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  primeListingExpiry: z.date().optional(),

  viewCount: z.number().default(0),
  contactViewCount: z.number().default(0),
  whatsappContactCount: z.number().default(0),
  rejectionReason: z.string().optional(),

  // Timestamps (optional for creation, backend usually manages)
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;
