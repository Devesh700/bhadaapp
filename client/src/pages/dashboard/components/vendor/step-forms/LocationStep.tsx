// LocationStep.tsx
import { useState, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AsyncSelect from "react-select/async";
import { debounce } from "@/lib/utils";

interface LocationStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const LocationStep = ({ form }: LocationStepProps) => {
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();

  const inputClass =
    "bg-cyan-50/50 border-cyan-200 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-cyan-500 rounded-xl";

  const handleGetLocation = () => {
    if (!("geolocation" in navigator)) {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Update coordinates in form (hidden from UI but sent to backend)
        form.setValue("location.coordinates", { lat: latitude, lng: longitude }, { shouldValidate: true });

        try {
          // Reverse geocoding using Nominatim (OpenStreetMap)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            
            // Auto-fill form fields
            if (addr.city || addr.town || addr.village) {
              form.setValue("location.city", addr.city || addr.town || addr.village, { shouldValidate: true });
            }
            if (addr.state) {
              form.setValue("location.state", addr.state, { shouldValidate: true });
            }
            if (addr.postcode) {
              form.setValue("location.pincode", addr.postcode, { shouldValidate: true });
            }
            
            // Optional: Auto-fill full address if empty
            const fullAddress = data.display_name || "";
            if (!form.getValues("location.address")) {
                form.setValue("location.address", fullAddress, { shouldValidate: true });
            }

            toast({
              title: "Location Detected",
              description: `Successfully detected location: ${addr.city || addr.town || "Your area"}`,
            });
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          toast({
            title: "Partial Success",
            description: "Coordinates captured, but could not auto-fill address details.",
          });
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        toast({
          title: "Location Error",
          description: "Could not fetch your current location. Please enter manually.",
          variant: "destructive",
        });
      }
    );
  };

  const fetchAddressOptions = async (inputValue: string) => {
    if (!inputValue || inputValue.length < 3) return [];

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          inputValue
        )}&addressdetails=1&limit=5`
      );
      const data = await response.json();

      return data.map((item: any) => ({
        label: item.display_name,
        value: item,
      }));
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  };

  // Create a debounced version of fetchAddressOptions
  const debouncedFetch = useCallback(
    debounce((inputValue: string, callback: (options: any[]) => void) => {
      fetchAddressOptions(inputValue).then((options) => callback(options));
    }, 600),
    []
  );

  const loadOptions = (inputValue: string, callback: (options: any[]) => void) => {
    if (!inputValue || inputValue.length < 3) {
      callback([]);
      return;
    }
    debouncedFetch(inputValue, callback);
  };

  const handleAddressSelect = (option: any) => {
    if (!option) return;

    const data = option.value;
    const addr = data.address;

    // Update coordinates
    form.setValue(
      "location.coordinates",
      { lat: parseFloat(data.lat), lng: parseFloat(data.lon) },
      { shouldValidate: true }
    );

    // Auto-fill form fields
    if (addr.city || addr.town || addr.village || addr.suburb) {
      form.setValue("location.city", addr.city || addr.town || addr.village || addr.suburb, {
        shouldValidate: true,
      });
    }
    if (addr.state) {
      form.setValue("location.state", addr.state, { shouldValidate: true });
    }
    if (addr.postcode) {
      form.setValue("location.pincode", addr.postcode, { shouldValidate: true });
    }
    
    form.setValue("location.address", data.display_name, { shouldValidate: true });

    toast({
      title: "Address Selected",
      description: "Fields have been auto-filled based on your selection.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Location Details</h3>
            <p className="text-sm text-slate-600 mt-1">Search for an address or use your current location.</p>
          </div>
          <Button
            type="button"
            onClick={handleGetLocation}
            disabled={isLocating}
            variant="outline"
            className="border-cyan-200 text-cyan-700 hover:bg-cyan-50 rounded-xl px-6 flex items-center gap-2 shrink-0"
          >
            {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
            {isLocating ? "Locating..." : "Use Current Location"}
          </Button>
        </div>

        <div className="relative">
          <FormLabel className="text-slate-800 font-semibold text-base mb-2 block">Quick Search Address</FormLabel>
          <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            onChange={handleAddressSelect}
            placeholder="Search like 'Noida Sector 62'..."
            noOptionsMessage={({ inputValue }) =>
              !inputValue ? "Start typing to search..." : "No addresses found"
            }
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "0.75rem",
                borderColor: "rgb(165 243 252)", // cyan-200
                backgroundColor: "rgb(236 254 255 / 0.5)", // cyan-50/50
                padding: "2px",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "rgb(6 182 212)", // cyan-500
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "rgb(236 254 255)" : "white",
                color: "rgb(15 23 42)",
                cursor: "pointer",
              }),
            }}
            components={{
              DropdownIndicator: () => <Search className="w-4 h-4 mr-3 text-slate-400" />,
              IndicatorSeparator: () => null,
            }}
          />
        </div>
      </div>

      <FormField
        control={form.control}
        name="location.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-800 font-semibold text-base">Full Address *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter complete property address"
                {...field}
                className={`${inputClass} min-h-[110px]`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="location.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800 font-semibold text-base">City *</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} className={inputClass} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800 font-semibold text-base">State *</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} className={inputClass} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location.pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800 font-semibold text-base">Pincode *</FormLabel>
              <FormControl>
                <Input placeholder="Pincode" {...field} className={inputClass} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Coordinates are stored in the form state (hidden from UI) */}
    </div>
  );
};

export default LocationStep;


