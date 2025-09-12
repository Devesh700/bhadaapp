
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Building, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const PropertySearchBar = () => {
  const [propertyType, setPropertyType] = useState('rent');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState([5000, 50000]);
  const [bedrooms, setBedrooms] = useState('');
  const [furnished, setFurnished] = useState('');
  const [tenantType, setTenantType] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [propertyTypeOptions, setPropertyTypeOptions] = useState<string[]>([]);

  const maxBudget = propertyType === 'rent' ? 100000 : 10000000;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      propertyType,
      location,
      budget,
      bedrooms,
      furnished,
      tenantType,
      propertyTypeOptions
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-blue-100">
      <form onSubmit={handleSearch}>
        <div className="mb-8">
          <RadioGroup 
            defaultValue="rent" 
            className="flex justify-center space-x-8" 
            onValueChange={setPropertyType}
            value={propertyType}
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem 
                value="rent" 
                id="rent" 
                className="w-5 h-5 text-blue-600 border-2 border-blue-300"
              />
              <Label htmlFor="rent" className="text-lg font-semibold text-gray-700 cursor-pointer">
                Rent
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem 
                value="sale" 
                id="sale" 
                className="w-5 h-5 text-purple-600 border-2 border-purple-300"
              />
              <Label htmlFor="sale" className="text-lg font-semibold text-gray-700 cursor-pointer">
                Buy
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-2">
            <Label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-700">
              Location
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                id="location" 
                placeholder="City, Area or Locality" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 h-12 rounded-xl border-gray-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bedrooms" className="mb-2 block text-sm font-medium text-gray-700">
              Bedrooms
            </Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger id="bedrooms" className="h-12 rounded-xl border-gray-200 bg-white focus:bg-white focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white">
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-gray-700">
              Budget Range{propertyType === 'rent' ? ' (₹/month)' : ' (₹)'}
            </Label>
            <div className="pt-3">
              <Slider 
                defaultValue={[5000, propertyType === 'rent' ? 50000 : 1000000]} 
                max={maxBudget} 
                step={propertyType === 'rent' ? 1000 : 100000} 
                value={budget}
                onValueChange={(val) => setBudget(val)}
                className="w-full"
              />
              <div className="flex justify-between mt-3 text-sm font-medium text-gray-600">
                <span>₹{budget[0].toLocaleString()}</span>
                <span>₹{budget[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {showAdvanced && (
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="furnished" className="mb-2 block text-sm font-medium text-gray-700">
                  Furnished Status
                </Label>
                <Select value={furnished} onValueChange={setFurnished}>
                  <SelectTrigger id="furnished" className="w-full h-12 rounded-xl bg-white border-gray-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select furnishing" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-white">
                    <SelectItem value="fully">Fully Furnished</SelectItem>
                    <SelectItem value="semi">Semi Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tenantType" className="mb-2 block text-sm font-medium text-gray-700">
                  Tenant Preference
                </Label>
                <Select value={tenantType} onValueChange={setTenantType}>
                  <SelectTrigger id="tenantType" className="w-full h-12 rounded-xl bg-white border-gray-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select tenant type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-white">
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="bachelor">Bachelor</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {propertyType === 'rent' && (
              <div className="mb-6">
                <Label htmlFor="propertyTypes" className="mb-3 block text-sm font-medium text-gray-700">
                  Property Type
                </Label>
                <ToggleGroup 
                  type="multiple" 
                  className="justify-start flex-wrap gap-3"
                  value={propertyTypeOptions}
                  onValueChange={setPropertyTypeOptions}
                >
                  <ToggleGroupItem 
                    value="house" 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-blue-200 text-blue-700 bg-white data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800"
                  >
                    <Building className="h-4 w-4" />
                    <span>House</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="apartment" 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-blue-200 text-blue-700 bg-white data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800"
                  >
                    <Building className="h-4 w-4" />
                    <span>Apartment</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="shop" 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-blue-200 text-blue-700 bg-white data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800"
                  >
                    <Building className="h-4 w-4" />
                    <span>Shop</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="office" 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-blue-200 text-blue-700 bg-white data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800"
                  >
                    <Building className="h-4 w-4" />
                    <span>Office</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            )}

            {propertyType === 'sale' && (
              <div className="mb-6">
                <Label htmlFor="landTypes" className="mb-3 block text-sm font-medium text-gray-700">
                  Land Type
                </Label>
                <ToggleGroup 
                  type="multiple" 
                  className="justify-start flex-wrap gap-3"
                  value={propertyTypeOptions}
                  onValueChange={setPropertyTypeOptions}
                >
                  <ToggleGroupItem 
                    value="residential" 
                    className="flex items-center gap-1 px-4 py-2 rounded-xl border-purple-200 text-purple-700 bg-white data-[state=on]:bg-purple-100 data-[state=on]:text-purple-800"
                  >
                    <span>Residential</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="commercial" 
                    className="flex items-center gap-1 px-4 py-2 rounded-xl border-purple-200 text-purple-700 bg-white data-[state=on]:bg-purple-100 data-[state=on]:text-purple-800"
                  >
                    <span>Commercial</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="agricultural" 
                    className="flex items-center gap-1 px-4 py-2 rounded-xl border-purple-200 text-purple-700 bg-white data-[state=on]:bg-purple-100 data-[state=on]:text-purple-800"
                  >
                    <span>Agricultural</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="industrial" 
                    className="flex items-center gap-1 px-4 py-2 rounded-xl border-purple-200 text-purple-700 bg-white data-[state=on]:bg-purple-100 data-[state=on]:text-purple-800"
                  >
                    <span>Industrial</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            )}

            <div className="mb-6">
              <Label className="mb-3 block text-sm font-medium text-gray-700">Amenities</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3">
                  <Checkbox id="parking" className="rounded border-blue-300 text-blue-600" />
                  <label htmlFor="parking" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Parking
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="lift" className="rounded border-blue-300 text-blue-600" />
                  <label htmlFor="lift" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Lift
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="security" className="rounded border-blue-300 text-blue-600" />
                  <label htmlFor="security" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Security
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="gym" className="rounded border-blue-300 text-blue-600" />
                  <label htmlFor="gym" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Gym
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="pool" className="rounded border-blue-300 text-blue-600" />
                  <label htmlFor="pool" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Swimming Pool
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <Checkbox id="garden" className="rounded border-blue-300 text-blue-600" />
                  <label htmlFor="garden" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Garden
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button 
            type="button" 
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors duration-300"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
          </button>

          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
          >
            <Search className="mr-2 h-5 w-5" /> 
            Search Properties
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertySearchBar;
