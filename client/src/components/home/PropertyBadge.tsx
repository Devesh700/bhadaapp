
import { Star, TrendingUp } from "lucide-react";

interface PropertyBadgeProps {
  type: 'propertyType' | 'featured' | 'trending';
  propertyType?: string;
  featured?: boolean;
  trending?: boolean;
}

const PropertyBadge = ({ type, propertyType, featured, trending }: PropertyBadgeProps) => {
  if (type === 'propertyType' && propertyType) {
    return (
      <div className={`${propertyType === 'Rental Property' ? 'bg-blue-600' : 'bg-blue-700'} text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-lg`}>
        {propertyType}
      </div>
    );
  }

  if (type === 'featured' && featured) {
    return (
      <div className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
        <Star className="w-2 h-2" />
        Featured
      </div>
    );
  }

  if (type === 'trending' && trending) {
    return (
      <div className="bg-blue-800 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
        <TrendingUp className="w-2 h-2" />
        Trending
      </div>
    );
  }

  return null;
};

export default PropertyBadge;
