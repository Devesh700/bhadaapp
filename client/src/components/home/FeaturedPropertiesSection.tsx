
import { Star, Zap } from "lucide-react";
import PropertyCard from "./PropertyCard";

// Enhanced featured properties data with SEO content
const featuredProperties = [
  {
    id: 1,
    name: "Luxury Villa Paradise",
    location: "Koramangala, Bangalore",
    pincode: "560034",
    price: "₹2.5 Cr",
    type: "Buy Property",
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.8,
    views: 1250,
    amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Garden"],
    image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    featured: true,
    trending: true
  },
  {
    id: 2,
    name: "Modern Apartment",
    location: "HSR Layout, Bangalore",
    pincode: "560102",
    price: "₹45,000/month",
    type: "Rental Property",
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.6,
    views: 890,
    amenities: ["WiFi", "Balcony", "Parking", "Power Backup"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    featured: false,
    trending: false
  },
  {
    id: 3,
    name: "Commercial Space",
    location: "MG Road, Bangalore",
    pincode: "560001",
    price: "₹1.8 Cr",
    type: "Buy Property",
    bedrooms: null,
    bathrooms: 2,
    rating: 4.7,
    views: 645,
    amenities: ["Central AC", "Elevator", "Parking", "Security"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    featured: true,
    trending: false
  },
  {
    id: 4,
    name: "Penthouse Suite",
    location: "Indiranagar, Bangalore",
    pincode: "560038",
    price: "₹85,000/month",
    type: "Rental Property",
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.9,
    views: 1100,
    amenities: ["Terrace", "Gym", "Pool", "Concierge"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    featured: true,
    trending: true
  },
  {
    id: 5,
    name: "Studio Apartment",
    location: "Electronic City, Bangalore",
    pincode: "560100",
    price: "₹18,000/month",
    type: "Rental Property",
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.4,
    views: 567,
    amenities: ["WiFi", "Furnished", "Power Backup"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    featured: false,
    trending: false
  }
];

const FeaturedPropertiesSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-50/40 via-white to-blue-100/30 relative overflow-hidden" aria-label="Featured Properties - Premium Real Estate Listings in India">
      {/* Mobile-optimized Background Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-blue-200/20 via-blue-300/20 to-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] bg-gradient-to-tl from-blue-200/20 to-blue-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Mobile-optimized Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 md:mb-6 border border-blue-200 shadow-lg">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse text-blue-500" />
            <span>Premium Selection</span>
            <Zap className="w-2 h-2 sm:w-3 sm:h-3 animate-bounce" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">Featured</span> Properties
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium properties with verified details, competitive pricing, and exceptional amenities across India.
          </p>
        </div>

        {/* Mobile-responsive properties display */}
        <div className="overflow-hidden relative rounded-lg sm:rounded-xl md:rounded-2xl">
          <div className="flex animate-scroll space-x-3 sm:space-x-4 md:space-x-6" style={{ 
            animation: 'scroll 40s linear infinite',
            width: 'calc(280px * 10)'
          }}>
            {[...featuredProperties, ...featuredProperties].map((property, index) => (
              <PropertyCard key={`${property.id}-${index}`} property={property} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default FeaturedPropertiesSection;
