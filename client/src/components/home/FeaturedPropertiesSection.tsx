
import { useEffect, useMemo } from "react";
import { Star, Zap } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Property } from "@/store/types/property.type";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { searchProperties } from "@/store/thunks/property.thunk";

const formatPrice = (property: Property) => {
  const value = Number(property.price || 0).toLocaleString("en-IN");
  return property.propertyType === "rent" ? `₹${value}/month` : `₹${value}`;
};

const FeaturedPropertiesSection = () => {
  // const [properties, setProperties] = useState<Property[]>([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {properties} = useAppSelector((state)=>state.property)

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        // setLoading(true);
        // const featuredResponse = await propertyService.searchProperties({
        //   filters: {  isFeatured: true },
        // });
        const featuredResponse = await dispatch(searchProperties(
          {filters: { isFeatured: true }}
        ))

       } catch (error) {
        // setProperties([]);
        console.error("Error Fetching Properties",error)
      } finally {
        // setLoading(false);
      }
    };
    if(!properties?.data?.length)
    loadFeatured();
  }, []);

  const featuredProperties = useMemo(() => {
    const sorted = [...properties?.data || []].sort((a, b) => {
      const featuredScoreA = a.isFeatured ? 1 : 0;
      const featuredScoreB = b.isFeatured ? 1 : 0;
      if (featuredScoreA !== featuredScoreB) return featuredScoreB - featuredScoreA;
      return (b.viewCount || 0) - (a.viewCount || 0);
    });

    return sorted.slice(0, 10).map((item, index) => ({
      id: index + 1,
      name: item.title,
      location: item.location?.city || "Unknown",
      pincode: item.location?.pincode || "NA",
      price: formatPrice(item),
      type: item.propertyType === "rent" ? "Rental Property" : "Buy Property",
      bedrooms: item.specifications?.bedrooms ?? null,
      bathrooms: item.specifications?.bathrooms ?? 0,
      rating: 4.5,
      views: item.viewCount || 0,
      amenities: item.specifications?.amenities || [],
      image: item.images?.[0] || "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=600&q=80",
      featured: item.isFeatured,
      trending: (item.viewCount || 0) > 100,
    }));
  }, [properties]);
  
  const loading = useMemo(()=>(properties?.status === 0 || properties?.status === 1),[properties])

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden" aria-label="Featured Properties - Premium Real Estate Listings in India">
      {/* Mobile-optimized Background Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Mobile-optimized Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 md:mb-6 border border-border shadow-lg">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse text-primary" />
            <span>Premium Selection</span>
            <Zap className="w-2 h-2 sm:w-3 sm:h-3 animate-bounce" />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            <span className="text-primary">Featured</span> Properties
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium properties with verified details, competitive pricing, and exceptional amenities across India.
          </p>
        </div>

        {/* Mobile-responsive properties display */}
        {loading ? (
          <div className="text-center py-10 text-gray-600">Loading featured properties...</div>
        ) : featuredProperties.length === 0 ? (
          <div className="text-center py-10 text-gray-600">No featured properties available right now.</div>
        ) : (
          <div className="overflow-hidden relative rounded-lg sm:rounded-xl md:rounded-2xl">
            <div className="flex animate-scroll space-x-3 sm:space-x-4 md:space-x-6" style={{ 
              animation: 'scroll 40s linear infinite',
              width: `calc(280px * ${featuredProperties.length * 2})`
            }}>
              {[...featuredProperties, ...featuredProperties].map((property, index) => (
                <PropertyCard key={`${property.id}-${index}`} property={property} index={index} />
              ))}
            </div>
          </div>
        )}
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
