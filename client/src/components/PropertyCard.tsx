
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MapPin, Bed, Home, Building, Currency } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  propertyType: 'residential' | 'commercial' | 'short-term' | 'land';
  listingType: 'rent' | 'sale';
  isVerified?: boolean;
  isFurnished?: 'fully' | 'semi' | 'unfurnished';
  tenantPreference?: 'family' | 'bachelor' | 'couple' | 'any';
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  imageUrl,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  listingType,
  isVerified = false,
  isFurnished,
  tenantPreference
}: PropertyCardProps) => {
  
  const PropertyTypeIcon = propertyType === 'residential' 
    ? Home 
    : propertyType === 'commercial' || propertyType === 'short-term'
    ? Building
    : Currency;
  
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 h-full border-0 bg-white shadow-lg hover:scale-105">
      <div className="relative">
        <img 
          src={imageUrl || "https://placehold.co/600x400/e2e8f0/475569?text=Property+Image"}
          alt={title}
          className="h-52 w-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-t-lg"
          loading="lazy"
        />
        <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 hover:scale-110 transition-all duration-300 shadow-lg">
          <Heart size={18} />
        </button>
        {isVerified && (
          <Badge className="absolute bottom-4 left-4 bg-green-600 hover:bg-green-700 font-medium px-3 py-1 shadow-lg">
            Verified
          </Badge>
        )}
        <Badge 
          className={`absolute top-4 left-4 font-medium px-4 py-2 shadow-lg ${
            listingType === 'rent' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
          }`}
        >
          {listingType === 'rent' ? 'For Rent' : 'For Sale'}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <Link to={`/properties/${listingType}/${id}`}>
          <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors line-clamp-2 text-gray-800">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-2 flex-shrink-0 text-blue-600" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm mb-4">
          {bedrooms !== undefined && (
            <div className="flex items-center">
              <Bed size={16} className="mr-1 text-blue-600" />
              <span className="font-medium">{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
            </div>
          )}

          {area !== undefined && (
            <div className="flex items-center">
              <PropertyTypeIcon size={16} className="mr-1 text-blue-600" />
              <span className="font-medium">{area} sq.ft</span>
            </div>
          )}
        </div>
        
        {(isFurnished || tenantPreference) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {isFurnished && (
              <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100">
                {isFurnished === 'fully' 
                  ? 'Fully Furnished' 
                  : isFurnished === 'semi' 
                  ? 'Semi-Furnished' 
                  : 'Unfurnished'}
              </Badge>
            )}
            
            {tenantPreference && (
              <Badge variant="outline" className="text-xs capitalize border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100">
                {tenantPreference === 'any' ? 'All Welcome' : `${tenantPreference} Preferred`}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ₹{price.toLocaleString()}
            {listingType === 'rent' && <span className="text-sm font-normal text-gray-500">/month</span>}
          </div>
          <Link 
            to={`/properties/${listingType}/${id}`}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
