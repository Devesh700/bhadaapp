import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Star, Zap } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { searchProperties } from "@/store/thunks/property.thunk";
import { mapToCard } from "@/lib/utils";

const FeaturedPropertiesSection = () => {
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.property);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        await dispatch(searchProperties({ filters: { isFeatured: true } }));
      } catch (error) {
        console.error("Error Fetching Properties", error);
      }
    };

    if (!properties?.data?.length) {
      loadFeatured();
    }
  }, [dispatch, properties?.data?.length]);

  const featuredProperties = useMemo(() => {
    const sorted = [...(properties?.data || [])].sort((a, b) => {
      const featuredScoreA = a.isFeatured ? 1 : 0;
      const featuredScoreB = b.isFeatured ? 1 : 0;
      if (featuredScoreA !== featuredScoreB) {
        return featuredScoreB - featuredScoreA;
      }
      return (b.viewCount || 0) - (a.viewCount || 0);
    });

    return sorted.slice(0, 6).map(mapToCard);
  }, [properties]);

  const loading = useMemo(
    () => properties?.status === 0 || properties?.status === 1,
    [properties],
  );

  return (
    <section
      className="relative overflow-hidden bg-background py-8 sm:py-12 md:py-16"
      aria-label="Featured Properties - Premium Real Estate Listings in India"
    >
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl animate-pulse sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[500px] lg:w-[500px]"></div>
      <div
        className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/2 translate-y-1/2 rounded-full bg-accent/10 blur-3xl animate-pulse sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-[400px] lg:w-[400px]"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-lg sm:mb-4 sm:px-4 sm:py-2 sm:text-sm md:mb-6 md:px-6 md:py-2">
            <Star className="h-3 w-3 animate-pulse sm:h-4 sm:w-4" />
            <span>Premium Selection</span>
            <Zap className="h-2 w-2 animate-bounce sm:h-3 sm:w-3" />
          </div>

          <h2 className="mb-3 text-xl font-bold text-foreground sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Featured
            </span>{" "}
            Properties
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Discover our handpicked selection of premium properties with
            verified details, competitive pricing, and exceptional amenities
            across India.
          </p>
        </div>

        {loading ? (
          <div className="py-10 text-center text-gray-600">
            Loading featured properties...
          </div>
        ) : featuredProperties.length === 0 ? (
          <div className="py-10 text-center text-gray-600">
            No featured properties available right now.
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-lg p-4 sm:rounded-xl md:rounded-2xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {featuredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className={index > 2 ? "hidden sm:block" : ""}
                >
                  <PropertyCard
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    imageUrl={property.imageUrl}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={property.area}
                    propertyType={property.propertyType as any}
                    listingType={property.listingType}
                    isFurnished={property.isFurnished as any}
                    tenantPreference={property.tenantPreference}
                    className="max-w-100"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center sm:hidden">
              <Link
                to="/properties/rent"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
              >
                View More Properties
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;
