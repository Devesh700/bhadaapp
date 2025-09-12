
import { Eye, Star } from "lucide-react";

interface PropertyStatsProps {
  views: number;
  rating: number;
}

const PropertyStats = ({ views, rating }: PropertyStatsProps) => {
  return (
    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 flex items-center gap-1 sm:gap-2 text-white text-xs">
      <div className="flex items-center gap-1 bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
        <Eye className="w-2 h-2" />
        <span>{views}</span>
      </div>
      <div className="flex items-center gap-1 bg-black/50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
        <Star className="w-2 h-2 text-blue-300" />
        <span>{rating}</span>
      </div>
    </div>
  );
};

export default PropertyStats;
