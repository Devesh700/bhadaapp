
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { searchProperties } from "@/store/thunks/property.thunk";

const cityVisualMap: Record<string, { image: string; description: string }> = {
  bangalore: {
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80",
    description: "IT capital with modern apartments and tech hubs",
  },
  mumbai: {
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=400&q=80",
    description: "Financial capital with premium real estate",
  },
  delhi: {
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?auto=format&fit=crop&w=400&q=80",
    description: "National capital with diverse property options",
  },
};

const CitiesSection = () => {
  const navigate = useNavigate();
  // const [properties, setProperties] = useState<Property[]>([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const {properties} = useAppSelector((state)=>state.property);

  useEffect(() => {
    const loadCityData = async () => {
      try {
         
        // setLoading(true);
        // const response = await propertyService.searchProperties({
        //   filters: {  },
        // });
        const response = await dispatch(searchProperties(
          {filters: { }}
        ))
        
        // setProperties(response?.payload.data || []);
      } catch (error) {
        // setProperties([]);
      } finally {
        // setLoading(false);
      }
    };
    if(!properties?.data?.length)
    loadCityData();
  }, []);

  const cities = useMemo(() => {
    const bucket: Record<string, number> = {};
    properties?.data?.forEach((property) => {
      const city = property?.location?.city?.trim();
      if (!city) return;
      bucket[city] = (bucket[city] || 0) + 1;
    });

    const maxCount = Math.max(1, ...Object.values(bucket));
    return Object.entries(bucket)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => {
        const key = name.toLowerCase();
        const visual = cityVisualMap[key] || {
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
          description: "Explore verified homes and commercial listings.",
        };

        return {
          name,
          properties: count,
          growth: `+${Math.max(8, Math.round((count / maxCount) * 25))}%`,
          image: visual.image,
          description: visual.description,
        };
      });
  }, [properties]);

  const loading = useMemo(()=>(properties?.status === 0 || properties?.status === 1),[properties])
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden" aria-label="Explore Properties by Cities - Find Homes Across India">
      {/* Mobile-optimized Background Effects */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] bg-primary/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-[300px] lg:h-[300px] bg-accent/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          {/* Mobile-optimized Section Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary text-primary px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 md:mb-6 border border-border shadow-lg animate-bounce">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
            <span>Explore Cities</span>
            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Explore Properties by <span className="text-primary">Cities</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Find the perfect property in your preferred city. Discover verified listings with competitive pricing and premium amenities across India's major cities.
          </p>
        </div>

        {/* Mobile-first responsive grid */}
        {loading ? (
          <div className="text-center py-10 text-muted-foreground">Loading cities...</div>
        ) : cities.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">No city data available right now.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {cities.map((city, index) => (
            <Card 
              key={index}
              className="group cursor-pointer bg-card/95 backdrop-blur-md border border-border hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-3 md:hover:-translate-y-4 hover:scale-105 hover:rotate-1 relative overflow-hidden"
              onClick={() => navigate(`/properties/rent?city=${encodeURIComponent(city.name)}`)}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${city.properties} properties in ${city.name}. ${city.description}`}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={city.image} 
                  alt={`${city.name} city skyline - Properties for rent and sale`}
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-full object-cover group-hover:scale-125 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Enhanced Overlay Effects */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500"></div>
                
                {/* City Name with Better Typography */}
                <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-white">
                  <h3 className="font-bold text-xs sm:text-sm md:text-base group-hover:text-sm sm:group-hover:text-base md:group-hover:text-lg transition-all duration-300">{city.name}</h3>
                </div>
                
                {/* Growth Badge */}
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-primary text-primary-foreground px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <TrendingUp className="w-2 h-2" />
                  {city.growth}
                </div>

                {/* Floating Sparkles */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white animate-pulse" />
                </div>
              </div>

              <CardContent className="p-2 sm:p-3 md:p-4 relative z-10">
                <div className="text-center space-y-2 sm:space-y-3">
                  {/* Enhanced Property Count */}
                  <div className="space-y-1">
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                      {city.properties.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">Properties</div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <Button 
                    variant="ghost" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg group-hover:scale-105 transition-all duration-300 border-0 font-semibold py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm relative overflow-hidden"
                    aria-label={`Explore all properties in ${city.name}`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-1">
                      Explore
                      <ChevronRight className="w-2 h-2 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        {/* Mobile-optimized Bottom CTA */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div
            className="inline-flex items-center gap-2 sm:gap-3 bg-primary text-primary-foreground px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            onClick={() => navigate("/properties/rent")}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
            <div className="text-left">
              <div className="font-bold text-sm sm:text-base">Explore All Cities</div>
              <div className="text-primary-foreground/80 text-xs">500+ cities across India</div>
            </div>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;
