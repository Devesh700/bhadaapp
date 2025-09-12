
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Home, MapPin, Search, Filter, SortAsc, User, Building2, Car, Wifi, Shield, Dumbbell, Waves, Calendar, Key, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import OwnerRegistrationModal from "@/components/auth/OwnerRegistrationModal";
import OwnerLoginModal from "@/components/auth/OwnerLoginModal";
import PropertyCard from "@/components/PropertyCard";

const RentalProperties = () => {
  const [showOwnerRegistration, setShowOwnerRegistration] = useState(false);
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [priceRange, setPriceRange] = useState([10000, 100000]);
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  const allProperties = [
    {
      id: "1",
      title: "Modern 2BHK Apartment",
      location: "Bandra West, Mumbai",
      price: 45000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      propertyType: "residential" as const,
      listingType: "rent" as const,
      isFurnished: "fully" as const,
      tenantPreference: "family" as const,
      features: ["Furnished", "Parking", "Security"],
      pincode: "400050",
      amenities: ["Parking", "Security", "Wifi"]
    },
    {
      id: "2", 
      title: "Luxury 3BHK Flat",
      location: "Koramangala, Bangalore",
      price: 38000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1500,
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      propertyType: "residential" as const,
      listingType: "rent" as const,
      isFurnished: "semi" as const,
      tenantPreference: "couple" as const,
      features: ["Semi-Furnished", "Gym", "Pool"],
      pincode: "560034",
      amenities: ["Gym", "Swimming Pool", "Security"]
    },
    {
      id: "3",
      title: "Cozy 1BHK Studio", 
      location: "Connaught Place, Delhi",
      price: 25000,
      bedrooms: 1,
      bathrooms: 1,
      area: 800,
      imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
      propertyType: "residential" as const,
      listingType: "rent" as const,
      isFurnished: "fully" as const,
      tenantPreference: "bachelor" as const,
      features: ["Fully Furnished", "Metro Nearby", "Balcony"],
      pincode: "110001",
      amenities: ["Wifi", "Security"]
    },
    {
      id: "4",
      title: "Commercial Office Space",
      location: "Sector 18, Gurgaon", 
      price: 80000,
      area: 2000,
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
      propertyType: "commercial" as const,
      listingType: "rent" as const,
      features: ["Furnished", "Parking", "Security"],
      pincode: "122015",
      amenities: ["Parking", "Security", "Wifi"]
    }
  ];

  useState(() => {
    setFilteredProperties(allProperties);
  });

  const amenitiesList = [
    { id: "parking", label: "Parking", icon: Car },
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "security", label: "Security", icon: Shield },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "pool", label: "Swimming Pool", icon: Waves },
    { id: "garden", label: "Garden", icon: Home }
  ];

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  const applyFilters = () => {
    let filtered = allProperties.filter(property => {
      // Price filter
      if (property.price < priceRange[0] || property.price > priceRange[1]) {
        return false;
      }

      // Property type filter
      if (selectedPropertyType && property.propertyType !== selectedPropertyType) {
        return false;
      }

      // Location filter
      if (selectedLocation && !property.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }

      // Pincode filter
      if (selectedPincode && property.pincode !== selectedPincode) {
        return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          property.amenities.some(propAmenity => 
            propAmenity.toLowerCase().includes(amenity.toLowerCase()) ||
            amenity.toLowerCase().includes(propAmenity.toLowerCase())
          )
        );
        if (!hasAllAmenities) return false;
      }

      // Keyword filter
      if (keyword) {
        const keywordLower = keyword.toLowerCase();
        const searchText = `${property.title} ${property.location} ${property.features?.join(' ') || ''}`.toLowerCase();
        if (!searchText.includes(keywordLower)) {
          return false;
        }
      }

      return true;
    });

    setFilteredProperties(filtered);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Rental-themed Hero Section */}
        <section className="relative min-h-[70vh] flex items-center" style={{ background: 'linear-gradient(135deg, hsl(var(--granite-black)) 0%, hsl(var(--cyan-blue)) 100%)' }}>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Rental Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Key className="w-4 h-4" />
                <span>Rental Properties</span>
              </div>

              {/* Clean Typography */}
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight">
                Find Your Ideal
                <span className="block text-white font-bold mt-1">Rental Home</span>
              </h1>
              
              <p className="font-body text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Discover verified rental properties with transparent pricing and instant booking across India.
              </p>

              {/* Simple CTA */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
                <Button 
                  onClick={() => setShowOwnerRegistration(true)} 
                  size="lg"
                  className="bg-white text-cyan-blue hover:bg-white/90 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                <Button 
                  onClick={() => setShowOwnerLogin(true)} 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-cyan-blue px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>

              {/* Minimal Search */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-3xl mx-auto border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input 
                    type="text" 
                    placeholder="Search location..." 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl"
                  />
                  <Select>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-gray-900">
                      <SelectItem value="low">₹10K - ₹25K</SelectItem>
                      <SelectItem value="mid">₹25K - ₹50K</SelectItem>
                      <SelectItem value="high">₹50K+</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-white text-cyan-blue hover:bg-white/90 rounded-xl font-medium">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Minimal Sidebar */}
            <div className="w-full lg:w-72">
              <Card className="sticky top-6 shadow-sm border border-border bg-card">
                <CardHeader className="rounded-t-lg pb-4" style={{ backgroundColor: 'hsl(var(--cyan-blue))', color: 'white' }}>
                  <CardTitle className="flex items-center gap-2 text-lg font-medium">
                    <Filter className="w-4 h-4" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {/* Property Type */}
                  <div>
                    <h3 className="font-medium mb-2 text-sm" style={{ color: 'hsl(var(--text-graphite))' }}>Property Type</h3>
                    <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
                      <SelectTrigger className="form-select" style={{ color: 'hsl(var(--text-graphite))' }}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-card">
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="font-medium mb-2 text-sm" style={{ color: 'hsl(var(--text-graphite))' }}>Location</h3>
                    <Input
                      placeholder="Enter area"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="form-input"
                      style={{ color: 'hsl(var(--text-graphite))' }}
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-2 text-sm" style={{ color: 'hsl(var(--text-graphite))' }}>Monthly Rent (₹)</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2 text-xs" style={{ color: 'hsl(var(--text-graphite))' }}>
                      <span>₹{(priceRange[0] / 1000).toFixed(0)}K</span>
                      <span>₹{(priceRange[1] / 1000).toFixed(0)}K</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="font-medium mb-2 text-sm" style={{ color: 'hsl(var(--text-graphite))' }}>Amenities</h3>
                    <div className="space-y-2">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                          />
                          <label htmlFor={amenity.id} className="flex items-center space-x-2 text-sm cursor-pointer">
                            <amenity.icon className="w-3 h-3" style={{ color: 'hsl(var(--cyan-blue))' }} />
                            <span style={{ color: 'hsl(var(--text-graphite))' }}>{amenity.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={applyFilters}
                    className="w-full text-white font-medium"
                    style={{ backgroundColor: 'hsl(var(--cyan-blue))' }}
                  >
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Clean Content Area */}
            <div className="flex-1">
              {/* Simple Header */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="flex items-center gap-2 text-sm border-cyan-blue text-cyan-blue hover:bg-cyan-blue hover:text-white">
                    <SortAsc className="w-4 h-4" />
                    Sort by Price
                  </Button>
                </div>
                <p className="text-sm font-medium" style={{ color: 'hsl(var(--text-graphite))' }}>
                  {filteredProperties.length} rental properties available
                </p>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    imageUrl={property.imageUrl}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    area={property.area}
                    propertyType={property.propertyType}
                    listingType={property.listingType}
                    isFurnished={property.isFurnished}
                    tenantPreference={property.tenantPreference}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OwnerRegistrationModal 
        isOpen={showOwnerRegistration} 
        onClose={() => setShowOwnerRegistration(false)} 
      />

      <OwnerLoginModal 
        isOpen={showOwnerLogin} 
        onClose={() => setShowOwnerLogin(false)} 
      />
    </Layout>
  );
};

export default RentalProperties;
