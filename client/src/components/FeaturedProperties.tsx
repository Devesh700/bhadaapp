
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertyCard from './PropertyCard';

// Mock data for the featured properties
const mockRentProperties = [
  {
    id: "r1",
    title: "Modern 2BHK Apartment with Balcony",
    location: "Koramangala, Bangalore",
    price: 25000,
    imageUrl: "https://placehold.co/600x400/e2e8f0/475569?text=Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    propertyType: "residential" as const,
    listingType: "rent" as const,
    isVerified: true,
    isFurnished: "fully" as const,
    tenantPreference: "family" as const
  },
  {
    id: "r2",
    title: "Spacious 3BHK Villa with Garden",
    location: "HSR Layout, Bangalore",
    price: 45000,
    imageUrl: "https://placehold.co/600x400/e2e8f0/475569?text=Villa",
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    propertyType: "residential" as const,
    listingType: "rent" as const,
    isVerified: true,
    isFurnished: "semi" as const,
    tenantPreference: "family" as const
  },
  {
    id: "r3",
    title: "Commercial Shop in Prime Location",
    location: "MG Road, Bangalore",
    price: 80000,
    imageUrl: "https://placehold.co/600x400/e2e8f0/475569?text=Commercial",
    area: 1500,
    propertyType: "commercial" as const,
    listingType: "rent" as const,
    isVerified: false
  },
  {
    id: "r4",
    title: "Bachelor-friendly 1BHK Flat",
    location: "Electronic City, Bangalore",
    price: 15000,
    imageUrl: "https://placehold.co/600x400/e2e8f0/475569?text=Flat",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    propertyType: "residential" as const,
    listingType: "rent" as const,
    isVerified: true,
    isFurnished: "semi" as const,
    tenantPreference: "bachelor" as const
  }
];

const mockSaleProperties = [
  {
    id: "s1",
    title: "Premium Residential Plot",
    location: "Whitefield, Bangalore",
    price: 8500000,
    imageUrl: "https://placehold.co/600x400/e2e8f0/475569?text=Land",
    area: 2400,
    propertyType: "land" as const,
    listingType: "sale" as const,
    isVerified: true
  },
  {
    id: "s2",
    title: "Agricultural Land with Water Source",
    location: "Mysore Road, Bangalore",
    price: 5500000,
    imageUrl: "https://placehold.co/600x400/e2e8f0/475569?text=Agricultural",
    area: 43560, // 1 acre in sq. ft.
    propertyType: "land" as const,
    listingType: "sale" as const,
    isVerified: false
  },
  {
    id: "s3",
    title: "Commercial Plot in IT Hub",
    location: "Marathahalli, Bangalore",
    price: 12000000,
    imageUrl: "https://placehold.co/600x400/e2e8f0/475569?text=Commercial+Plot",
    area: 3600,
    propertyType: "land" as const,
    listingType: "sale" as const,
    isVerified: true
  }
];

const FeaturedProperties = () => {
  const [activeTab, setActiveTab] = useState('rent');

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-bhada-blue mb-2">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of top properties, whether you're looking to rent a home or invest in land.
          </p>
        </div>

        <Tabs defaultValue="rent" onValueChange={setActiveTab} value={activeTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="rent">For Rent</TabsTrigger>
              <TabsTrigger value="sale">For Sale</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="rent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockRentProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sale">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSaleProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedProperties;
