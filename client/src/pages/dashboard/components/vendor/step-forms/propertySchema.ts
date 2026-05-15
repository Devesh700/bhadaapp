
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
const PropertyTypeEnum = z.enum(['rent', 'sale', 'commercial'], {
  required_error: 'Property type is required',
});
const CategoryEnum = z.enum(['apartment', 'house', 'plot', 'office'], {
  required_error: 'Category is required',
});
const UnitTypeEnum = z.enum(['1bhk', '2bhk', '3bhk', '4bhk'], {
  required_error: 'Unit type is required',
});
const StatusEnum = z.enum(['pending', 'approved', 'rejected', 'sold', 'rented']);
const BHK_CATEGORIES = ['apartment', 'house'] as const;

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
  unitType: UnitTypeEnum.optional(),
  price: z
    .number({ required_error: 'Price is required' })
    .min(1, 'Price must be greater than 0'),

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
    area: z.number().min(1, 'Area must be at least 1 sqft'),
    bedrooms: z.number().min(1, 'Bedrooms must be at least 1').optional(),
    bathrooms: z.number().min(1, 'Bathrooms must be at least 1').optional(),
    furnishing: z.string().optional(),
    parking: z.boolean().optional(),
    amenities: z.array(z.string()).optional().default([]),
  }),

  // Media
  images: z.array(z.string()).default([]),
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
}).superRefine((data, ctx) => {
  const requiresBhk = BHK_CATEGORIES.includes(data.category as (typeof BHK_CATEGORIES)[number]);

  if (requiresBhk) {
    if (!data.unitType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['unitType'],
        message: 'Unit type is required for flats and villas',
      });
    }

    if (!data.specifications.bedrooms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['specifications', 'bedrooms'],
        message: 'Bedrooms are required for the selected unit type',
      });
    }

    if (!data.specifications.bathrooms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['specifications', 'bathrooms'],
        message: 'Bathrooms are required for flats and villas',
      });
    }
  }

  if (!requiresBhk && data.unitType) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['unitType'],
      message: 'Unit type is not applicable for plots or office spaces',
    });
  }
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;
