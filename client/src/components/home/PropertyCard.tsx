
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Heart } from "lucide-react";
import PropertyBadge from "./PropertyBadge";
import PropertyStats from "./PropertyStats";
import PropertyAmenities from "./PropertyAmenities";

interface Property {
  id: number;
  name: string;
  location: string;
  pincode: string;
  price: string;
  type: string;
  bedrooms: number | null;
  bathrooms: number;
  rating: number;
  views: number;
  amenities: string[];
  image: string;
  featured: boolean;
  trending: boolean;
}

interface PropertyCardProps {
  property: Property;
  index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  return (
    <Card 
      key={`${property.id}-${index}`} 
      className="w-[270px] sm:w-[300px] md:w-[320px] lg:w-[340px] flex-shrink-0 bg-white/95 backdrop-blur-md border border-blue-100/60 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 group relative overflow-hidden"
      role="article"
      aria-label={`${property.name} in ${property.location} - ${property.price}`}
    >
      {/* Property Image */}
      <div className="relative">
        <img 
          src={property.image} 
          alt={`${property.name} - ${property.type} in ${property.location}`}
          className="h-32 sm:h-36 md:h-40 w-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badge System */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 space-y-1">
          <PropertyBadge type="propertyType" propertyType={property.type} />
          <PropertyBadge type="featured" featured={property.featured} />
        </div>

        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 space-y-1">
          <PropertyBadge type="trending" trending={property.trending} />
          <div className="bg-black/70 text-white p-1 sm:p-1.5 rounded-full hover:bg-black/90 transition-colors cursor-pointer">
            <Heart className="w-3 h-3 hover:text-blue-400 transition-colors" />
          </div>
        </div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/70 transition-all duration-500"></div>
        
        {/* Property Stats Overlay */}
        <PropertyStats views={property.views} rating={property.rating} />
      </div>

      <CardContent className="p-3 sm:p-4 md:p-5">
        {/* Property Title */}
        <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {property.name}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2 sm:mb-3">
          <MapPin className="w-3 h-3 mr-1 text-blue-500 flex-shrink-0" />
          <span className="text-xs font-medium truncate">{property.location} - {property.pincode}</span>
        </div>
        
        {/* Room Details */}
        {property.bedrooms && (
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
              <Bed className="w-3 h-3 text-blue-500" />
              <span className="font-medium">{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
              <Bath className="w-3 h-3 text-blue-500" />
              <span className="font-medium">{property.bathrooms} Bath</span>
            </div>
          </div>
        )}

        {/* Amenities */}
        <PropertyAmenities amenities={property.amenities} />

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            {property.price}
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs sm:text-sm"
            aria-label={`View details of ${property.name}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
