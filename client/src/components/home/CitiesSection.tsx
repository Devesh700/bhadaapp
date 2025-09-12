
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, MapPin, Sparkles, TrendingUp } from "lucide-react";

// Enhanced cities data for SEO
const cities = [
  { 
    name: "Bangalore", 
    properties: 1250, 
    growth: "+15%",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    gradient: "from-blue-500 to-blue-600",
    description: "IT capital with modern apartments and tech hubs"
  },
  { 
    name: "Mumbai", 
    properties: 2100, 
    growth: "+22%",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    gradient: "from-blue-600 to-blue-700",
    description: "Financial capital with premium real estate"
  },
  { 
    name: "Delhi", 
    properties: 1800, 
    growth: "+18%",
    image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    gradient: "from-blue-700 to-blue-800",
    description: "National capital with diverse property options"
  },
  { 
    name: "Chennai", 
    properties: 950, 
    growth: "+12%",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    gradient: "from-blue-800 to-blue-900",
    description: "Cultural hub with affordable housing"
  },
  { 
    name: "Hyderabad", 
    properties: 780, 
    growth: "+25%",
    image: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    gradient: "from-blue-500 to-blue-700",
    description: "Emerging tech city with great investment potential"
  },
  { 
    name: "Pune", 
    properties: 650, 
    growth: "+20%",
    image: "https://images.unsplash.com/photo-1595046006991-24d34f4b7eb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    gradient: "from-blue-600 to-blue-800",
    description: "Educational hub with modern infrastructure"
  }
];

const CitiesSection = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/30 relative overflow-hidden" aria-label="Explore Properties by Cities - Find Homes Across India">
      {/* Mobile-optimized Background Effects */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-blue-200/20 to-blue-400/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-[300px] lg:h-[300px] bg-gradient-to-tl from-blue-200/20 to-blue-300/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          {/* Mobile-optimized Section Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 md:mb-6 border border-blue-200 shadow-lg animate-bounce">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
            <span>Explore Cities</span>
            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Explore Properties by <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">Cities</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find the perfect property in your preferred city. Discover verified listings with competitive pricing and premium amenities across India's major cities.
          </p>
        </div>

        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {cities.map((city, index) => (
            <Card 
              key={index}
              className="group cursor-pointer bg-white/95 backdrop-blur-md border border-blue-100/60 hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 sm:hover:-translate-y-3 md:hover:-translate-y-4 hover:scale-105 hover:rotate-1 relative overflow-hidden"
              onClick={() => console.log(`Navigate to ${city.name} properties`)}
              style={{ animationDelay: `${index * 0.1}s` }}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${city.properties} properties in ${city.name}. ${city.description}`}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${city.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={city.image} 
                  alt={`${city.name} city skyline - Properties for rent and sale`}
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-full object-cover group-hover:scale-125 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Enhanced Overlay Effects */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500`}></div>
                
                {/* City Name with Better Typography */}
                <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-white">
                  <h3 className="font-bold text-xs sm:text-sm md:text-base group-hover:text-sm sm:group-hover:text-base md:group-hover:text-lg transition-all duration-300">{city.name}</h3>
                </div>
                
                {/* Growth Badge */}
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-blue-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
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
                    <div className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r ${city.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                      {city.properties.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">Properties</div>
                  </div>

                  {/* Enhanced CTA Button */}
                  <Button 
                    variant="ghost" 
                    className={`w-full bg-gradient-to-r ${city.gradient} text-white hover:shadow-lg group-hover:scale-105 transition-all duration-300 border-0 font-semibold py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm relative overflow-hidden`}
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

        {/* Mobile-optimized Bottom CTA */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
            <div className="text-left">
              <div className="font-bold text-sm sm:text-base">Explore All Cities</div>
              <div className="text-blue-100 text-xs">500+ cities across India</div>
            </div>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;
