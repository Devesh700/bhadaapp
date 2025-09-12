
interface PropertyAmenitiesProps {
  amenities: string[];
}

const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
  return (
    <div className="mb-3 sm:mb-4">
      <h4 className="text-xs font-semibold text-gray-700 mb-1 sm:mb-2">Amenities:</h4>
      <div className="flex flex-wrap gap-1">
        {amenities.slice(0, 3).map((amenity, i) => (
          <span key={i} className="text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium border border-blue-200">
            {amenity}
          </span>
        ))}
        {amenities.length > 3 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium">
            +{amenities.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};

export default PropertyAmenities;
