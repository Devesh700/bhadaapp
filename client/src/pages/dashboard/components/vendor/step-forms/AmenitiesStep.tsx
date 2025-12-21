// AmenitiesStep.tsx
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface AmenitiesStepProps {
  form: UseFormReturn<PropertyFormData>;
  onFinalSubmit?: () => void;
  isSubmitting?: boolean;
}

const AMENITIES_LIST = [
  "Air Conditioning",
  "Barbeque",
  "Club houses",
  "Complimentary Wi-Fi",
  "Dishwasher",
  "Dryer",
  "Fitness center",
  "Games Room",
  "Gym",
  "Laundry",
  "Lawn",
  "Microwave",
  "Outdoor Shower",
  "Parking",
  "Parks",
  "Refrigerator",
  "Rooftop Garden",
  "Sauna",
  "Security systems and intercom",
  "Surveillance cameras",
  "Swimming Pool",
  "TV",
  "Cable",
  "Washer",
  "Window Coverings",
];

const AmenitiesStep = ({ form, onFinalSubmit, isSubmitting = false }: AmenitiesStepProps) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    const formAmenities = form.getValues("specifications.amenities") || [];
    setSelectedAmenities(formAmenities);
  }, [form]);

  const handleSelectAll = () => {
    const allSelected = selectedAmenities.length === AMENITIES_LIST.length;
    const newSelection = allSelected ? [] : [...AMENITIES_LIST];
    setSelectedAmenities(newSelection);
    form.setValue("specifications.amenities", newSelection, { shouldValidate: true, shouldDirty: true });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedAmenities, amenity]
      : selectedAmenities.filter((item) => item !== amenity);

    setSelectedAmenities(newSelection);
    form.setValue("specifications.amenities", newSelection, { shouldValidate: true, shouldDirty: true });
  };

  const handleSubmit = () => {
    if (onFinalSubmit) onFinalSubmit();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <FormLabel className="text-gray-900 font-semibold text-lg">Amenities (Final Step)</FormLabel>
        <Button
          type="button"
          variant="outline"
          onClick={handleSelectAll}
          disabled={isSubmitting}
          className="bg-gray-100 border-gray-400 text-gray-900 hover:bg-gray-200 font-medium"
        >
          {selectedAmenities.length === AMENITIES_LIST.length ? "Deselect All" : "Select All"}
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6">
        <p className="text-blue-800 text-sm font-medium">
          <strong>Final Step:</strong> Select the amenities available at the property, or skip if none apply, then click
          "Submit Property".
        </p>
      </div>

      <FormField
        control={form.control}
        name="specifications.amenities"
        render={() => (
          <FormItem>
            <FormControl>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AMENITIES_LIST.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <Checkbox
                      id={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      disabled={isSubmitting}
                      onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                      className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <label htmlFor={amenity} className="text-gray-900 text-sm font-medium cursor-pointer flex-1">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedAmenities.length > 0 && (
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
          <p className="text-gray-900 font-semibold mb-2">Selected Amenities ({selectedAmenities.length}):</p>
          <div className="flex flex-wrap gap-2">
            {selectedAmenities.map((amenity) => (
              <span
                key={amenity}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6 border-t border-gray-300">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Submit Property
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AmenitiesStep
