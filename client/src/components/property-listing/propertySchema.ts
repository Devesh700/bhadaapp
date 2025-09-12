
import { z } from 'zod';

export const propertyFormSchema = z.object({
  // Basic Information
  propertyTitle: z.string().min(1, 'Property title is required'),
  propertyType: z.enum(['Apartment', 'Commercial', 'Houses & Villas', 'Land', 'PG Stays']),
  propertyDescription: z.string().min(10, 'Description must be at least 10 characters'),
  contactOwner: z.string().min(1, 'Contact owner is required'),

  // Additional Fields
  propertyId: z.string().optional(),
  parentProperty: z.string().optional(),
  status: z.enum(['Available', 'Rented', 'Sold', 'Under Maintenance']),
  label: z.string().optional(),
  rooms: z.number().min(0),
  beds: z.number().min(0),
  baths: z.number().min(0),
  garages: z.number().min(0),
  yearBuilt: z.number().min(1800).max(new Date().getFullYear()),
  homeArea: z.number().min(0),
  lotArea: z.number().min(0),

  // Location
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),

  // Media
  mediaFiles: z.array(z.any()).optional(),
  videoFile: z.any().optional(),

  // Amenities
  amenities: z.array(z.string()).default([]),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;
