import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Search,
  Filter,
  SortAsc,
  User,
  Car,
  Wifi,
  Shield,
  Dumbbell,
  Waves,
  Calendar,
  Key,
  SlidersHorizontal,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import OwnerRegistrationModal from "@/components/auth/OwnerRegistrationModal";
import OwnerLoginModal from "@/components/auth/OwnerLoginModal";
import PropertyCard from "@/components/PropertyCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { searchProperties } from "@/store/thunks/property.thunk";
import { useParams } from "react-router-dom";

const RENT_TYPES = ["rent", "sale", "commercial"] as const;
const CATEGORY_TYPES = ["apartment", "house", "plot", "office", "villa", "studio"] as const;

type SortKey = "price-asc" | "price-desc" | "newest";

const Properties = () => {
  const dispatch = useAppDispatch();
  const {data:items, status, error} = useAppSelector(state=>state.property.properties)
  const loading = useMemo(()=>(status === 1 ),[status])
  const params = useParams();
  // Modal state
  const [showOwnerRegistration, setShowOwnerRegistration] = useState(false);
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);

  // Filters state (UI)
  const [priceRange, setPriceRange] = useState<[number, number]>([10000, 100000]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(""); // can be rent/sale/commercial OR category
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("price-asc");
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Initial results load
  useEffect(() => {
    const initialQuery = {
      location: undefined,
      propertyType: undefined,
      priceRange: { min: priceRange[0], max: priceRange[1] },
      filters: {},
    };
    dispatch(searchProperties(initialQuery as any) as any);
  }, [dispatch]); // run once [web:74][web:77]

  // Map store results to card items
  useEffect(() => {
    setFilteredProperties(items.map(mapToCard));
  }, [items]);

  useEffect(() => {
    if(params?.type && (RENT_TYPES.includes(params.type as any) || CATEGORY_TYPES.includes(params.type as any))) {
      setSelectedPropertyType(params.type);
      const isPropertyType = RENT_TYPES.includes(params.type as any);
      const isCategoryType = CATEGORY_TYPES.includes(params.type as any);
      const query = {
        location: selectedLocation || undefined,
        propertyType: isPropertyType ? params.type : undefined,
        priceRange: { min: priceRange[0], max: priceRange[1] },
        filters: {
          ...(isCategoryType ? { category: params.type } : {}),
          ...(selectedPincode ? { pincode: selectedPincode } : {}),
          ...(selectedAmenities.length ? { amenities: selectedAmenities } : {}),
          ...(keyword ? { keyword } : {}),
        },
      }
      dispatch(searchProperties(query));
    }
  },[params])

  const amenitiesList = [
    { id: "parking", label: "Parking", icon: Car },
    { id: "wifi", label: "Wi-Fi", icon: Wifi },
    { id: "security", label: "Security", icon: Shield },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "pool", label: "Swimming Pool", icon: Waves },
  ];

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    setSelectedAmenities((prev) => (checked ? [...prev, amenityId] : prev.filter((id) => id !== amenityId)));
  };

  // Compose and run server search
  const runSearch = () => {
    const isPropertyType = RENT_TYPES.includes(selectedPropertyType as any);
    const isCategoryType = CATEGORY_TYPES.includes(selectedPropertyType as any);

    const query = {
      location: selectedLocation || undefined,
      propertyType: isPropertyType ? selectedPropertyType : undefined,
      priceRange: { min: priceRange[0], max: priceRange[1] },
      filters: {
        ...(isCategoryType ? { category: selectedPropertyType } : {}),
        ...(selectedPincode ? { pincode: selectedPincode } : {}),
        ...(selectedAmenities.length ? { amenities: selectedAmenities } : {}),
        ...(keyword ? { keyword } : {}),
      },
    };

    dispatch(searchProperties(query as any) as any);
    setShowFiltersMobile(false);
  };

  // Apply client-side sort only (server returns filtered set)
  const sortedProperties = useMemo(() => {
    const copy = [...filteredProperties];
    if (sortKey === "price-asc") copy.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sortKey === "price-desc") copy.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (sortKey === "newest") copy.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    return copy;
  }, [filteredProperties, sortKey]);

  // Helper to map API model -> card props
  function mapToCard(p: any) {
    const locationText = [p?.location?.address, p?.location?.city, p?.location?.state].filter(Boolean).join(", ");
    const firstImage = Array.isArray(p?.images) && p.images.length ? p.images[0] : undefined;

    const listingType = p?.propertyType === "sale" || p?.propertyType === "rent" ? p.propertyType : "rent";
    const derivedType = p?.propertyType === "commercial" || p?.category === "office" ? "commercial" : "residential";

    const isFurnished =
      typeof p?.specifications?.furnishing === "string"
        ? p.specifications.furnishing.toLowerCase().includes("full")
          ? "fully"
          : p.specifications.furnishing.toLowerCase().includes("semi")
          ? "semi"
          : "unfurnished"
        : "unfurnished";

    return {
      id: String(p?.id ?? p?._id ?? ""),
      title: p?.title ?? "",
      location: locationText,
      price: Number(p?.price ?? 0),
      imageUrl: firstImage,
      bedrooms: Number(p?.specifications?.bedrooms ?? 0),
      bathrooms: Number(p?.specifications?.bathrooms ?? 0),
      area: Number(p?.specifications?.area ?? 0),
      propertyType: derivedType,
      listingType,
      isFurnished,
      tenantPreference: p?.tenantPreference,
      pincode: p?.location?.pincode,
      amenities: Array.isArray(p?.specifications?.amenities) ? p.specifications.amenities : [],
      createdAt: new Date(p?.createdAt ?? Date.now()).getTime(),
    };
  }

  const FiltersPanel = (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <h3 className="font-medium mb-2 text-sm" style={{ color: "rgb(var(--text-graphite))" }}>
          Property Type
        </h3>
        <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
          <SelectTrigger className="form-select" style={{ color: "rgb(var(--text-graphite))" }}>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {/* Categories */}
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="plot">Plot</SelectItem>
            <SelectItem value="office">Office</SelectItem>
            {/* Listing types */}
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="sale">Sale</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-medium mb-2 text-sm" style={{ color: "rgb(var(--text-graphite))" }}>
          Location
        </h3>
        <Input
          placeholder="Enter area or city"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="form-input"
          style={{ color: "rgb(var(--text-graphite))" }}
        />
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-2 text-sm" style={{ color: "rgb(var(--text-graphite))" }}>
          Monthly Rent (₹)
        </h3>
        <Slider
          value={priceRange}
          onValueChange={(v: any) => setPriceRange(v)}
          max={100000}
          min={5000}
          step={1000}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-xs" style={{ color: "rgb(var(--text-graphite))" }}>
          <span>₹{(priceRange[0] / 1000).toFixed(0)}K</span>
          <span>₹{(priceRange[1] / 1000).toFixed(0)}K</span>
        </div>
      </div>

      {/* Pincode */}
      <div>
        <h3 className="font-medium mb-2 text-sm" style={{ color: "rgb(var(--text-graphite))" }}>
          Pincode
        </h3>
        <Input
          placeholder="e.g., 560034"
          value={selectedPincode}
          onChange={(e) => setSelectedPincode(e.target.value)}
          className="form-input"
          style={{ color: "rgb(var(--text-graphite))" }}
        />
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-medium mb-2 text-sm" style={{ color: "rgb(var(--text-graphite))" }}>
          Amenities
        </h3>
        <div className="space-y-2">
          {amenitiesList.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox
                id={amenity.id}
                checked={selectedAmenities.includes(amenity.id)}
                onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
              />
              <label htmlFor={amenity.id} className="flex items-center space-x-2 text-sm cursor-pointer">
                <amenity.icon className="w-3 h-3" style={{ color: "rgb(var(--cyan-blue))" }} />
                <span style={{ color: "rgb(var(--text-graphite))" }}>{amenity.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={runSearch}
        className="w-full text-white font-medium"
        style={{ backgroundColor: "rgb(var(--cyan-blue))" }}
      >
        Apply Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section
          className="relative min-h-[60vh] md:min-h-[70vh] flex items-center"
          style={{ background: "linear-gradient(135deg, rgb(var(--granite-black)) 0%, rgb(var(--cyan-blue)) 100%)" }}
        >
          <div className="absolute inset-0 bg-black/20" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Key className="w-4 h-4" />
                <span>{params?.type === "rent" ? "Rental" : params?.type === "sale" ? "On Sale" : "Listed "} Properties</span>
              </div>

              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight">
                Find Your Ideal
                <span className="block text-white font-bold mt-1">{params?.type === "rent" ? "Rental" : params?.type === "sale" ? "On Sale" : "Listed "} Property</span>
              </h1>

              <p className="font-body text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                Discover verified rentals with transparent pricing and instant booking across India [web:89][web:99].
              </p>

              {/* Quick Search Bar */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-3xl mx-auto border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    type="text"
                    placeholder="Search location..."
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl"
                  />
                  <Select
                    value=""
                    onValueChange={(val) => {
                      if (val === "low") setPriceRange([10000, 25000]);
                      else if (val === "mid") setPriceRange([25000, 50000]);
                      else setPriceRange([50000, 100000]);
                    }}
                  >
                    <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl">
                      <SelectValue placeholder="Budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-gray-900">
                      <SelectItem value="low">₹10K - ₹25K</SelectItem>
                      <SelectItem value="mid">₹25K - ₹50K</SelectItem>
                      <SelectItem value="high">₹50K+</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={runSearch} className="bg-white text-cyan-blue hover:bg-white/90 rounded-xl font-medium">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>

                {/* Mobile Filters Button */}
                <div className="mt-3 flex justify-center md:hidden">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowFiltersMobile(true)}
                    className="border-white/60 text-white hover:bg-white/10"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* Auth CTAs */}
              {/* <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
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
              </div> */}
            </div>
          </div>
        </section>

        {/* Main */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar (desktop) */}
            <div className="hidden lg:block w-full lg:w-72">
              <Card className="sticky top-6 shadow-sm border border-border bg-card">
                <CardHeader
                  className="rounded-t-lg pb-4"
                  style={{ backgroundColor: "rgb(var(--cyan-blue))", color: "white" }}
                >
                  <CardTitle className="flex items-center gap-2 text-lg font-medium">
                    <Filter className="w-4 h-4" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">{FiltersPanel}</CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Select value={sortKey} onValueChange={(v: SortKey) => setSortKey(v)}>
                    <SelectTrigger className="w-full md:w-52">
                      <SelectValue placeholder="Sort results" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm font-medium" style={{ color: "rgb(var(--text-graphite))" }}>
                  {loading ? "Loading..." : error ? "Failed to load" : `${sortedProperties.length} rental properties available`} [web:97][web:92]
                </p>
              </div>

              {/* Results */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                      <div className="h-40 bg-gray-200 rounded-md mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                      <div className="h-8 bg-gray-200 rounded w-1/3" />
                    </div>
                  ))}
                </div>
              ) : sortedProperties.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting filters or expanding the price range to see more properties [web:92][web:95].
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedPropertyType("");
                        setSelectedLocation("");
                        setSelectedPincode("");
                        setSelectedAmenities([]);
                        setKeyword("");
                        setPriceRange([10000, 100000]);
                        runSearch();
                      }}
                    >
                      Clear Filters
                    </Button>
                    <Button onClick={() => setShowFiltersMobile(true)}>
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Open Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProperties.map((property) => (
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
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Dialog */}
      <Dialog open={showFiltersMobile} onOpenChange={setShowFiltersMobile}>
        <DialogContent className="max-w-md w-[90vw] bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </DialogTitle>
          </DialogHeader>
          <div className="pt-2 space-y-6">{FiltersPanel}</div>
        </DialogContent>
      </Dialog>

      {/* Modals */}
      <OwnerRegistrationModal isOpen={showOwnerRegistration} onClose={() => setShowOwnerRegistration(false)} />
      <OwnerLoginModal isOpen={showOwnerLogin} onClose={() => setShowOwnerLogin(false)} />
    </Layout>
  );
};

export default Properties;
