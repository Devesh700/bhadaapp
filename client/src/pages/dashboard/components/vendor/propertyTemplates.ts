export interface PropertyTemplate {
  id: string;
  label: string;
  defaults: {
    category: 'apartment' | 'house' | 'plot' | 'office';
    specifications: {
      bedrooms: number;
      bathrooms: number;
    };
  };
  autoFill: {
    title: string;
    description: string;
    price: number;
    specifications: {
      area: number;
      furnishing?: 'unfurnished' | 'semi-furnished' | 'fully-furnished';
      parking: boolean;
      amenities?: string[];
    };
  };
}

export const propertyTemplates: PropertyTemplate[] = [
  {
    id: '1rk',
    label: '1 RK (Studio)',
    defaults: {
      category: 'apartment',
      specifications: {
        bedrooms: 1,
        bathrooms: 1,
      },
    },
    autoFill: {
      title: '1 RK Studio Apartment',
      description: 'A cozy 1 RK studio apartment perfect for students or working professionals. Features a functional layout with essential amenities in a quiet neighborhood.',
      price: 10000,
      specifications: {
        area: 350,
        furnishing: 'unfurnished',
        parking: false,
        amenities: ['Water Supply', 'Security'],
      },
    },
  },
  {
    id: '1bhk',
    label: '1 BHK',
    defaults: {
      category: 'apartment',
      specifications: {
        bedrooms: 1,
        bathrooms: 1,
      },
    },
    autoFill: {
      title: 'Modern 1 BHK Apartment',
      description: 'Spacious 1 BHK apartment with well-ventilated rooms and modern finishes. Ideal for couples or small families looking for a comfortable living space.',
      price: 15000,
      specifications: {
        area: 550,
        furnishing: 'semi-furnished',
        parking: true,
        amenities: ['Water Supply', 'Security', 'Lift'],
      },
    },
  },
  {
    id: '2bhk',
    label: '2 BHK',
    defaults: {
      category: 'apartment',
      specifications: {
        bedrooms: 2,
        bathrooms: 2,
      },
    },
    autoFill: {
      title: 'Premium 2 BHK Family Home',
      description: 'Beautiful 2 BHK home featuring a master bedroom with attached bath, a guest room, and a spacious living area. Located in a prime residential neighborhood.',
      price: 25000,
      specifications: {
        area: 950,
        furnishing: 'semi-furnished',
        parking: true,
        amenities: ['Water Supply', 'Security', 'Lift', 'Parking', 'Power Backup'],
      },
    },
  },
  {
    id: '3bhk',
    label: '3 BHK',
    defaults: {
      category: 'apartment',
      specifications: {
        bedrooms: 3,
        bathrooms: 3,
      },
    },
    autoFill: {
      title: 'Luxury 3 BHK Residential Flat',
      description: 'Generously sized 3 BHK flat with multiple balconies, premium fittings, and access to top-tier society amenities. Perfect for large families seeking luxury and comfort.',
      price: 45000,
      specifications: {
        area: 1450,
        furnishing: 'semi-furnished',
        parking: true,
        amenities: ['Water Supply', 'Security', 'Lift', 'Parking', 'Power Backup', 'Gym', 'Swimming Pool'],
      },
    },
  },
];
