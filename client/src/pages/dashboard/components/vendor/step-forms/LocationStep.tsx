// LocationStep.tsx
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LocationStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const LocationStep = ({ form }: LocationStepProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="location.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Full Address *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter complete property address"
                {...field}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FormField
          control={form.control}
          name="location.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-semibold text-base">City *</FormLabel>
              <FormControl>
                <Input
                  placeholder="City"
                  {...field}
                  className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
                />
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
              <FormLabel className="text-gray-900 font-semibold text-base">State *</FormLabel>
              <FormControl>
                <Input
                  placeholder="State"
                  {...field}
                  className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
                />
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
              <FormLabel className="text-gray-900 font-semibold text-base">Pincode *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pincode"
                  {...field}
                  className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-1">
          <FormField
            control={form.control}
            name="location.coordinates.lat"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-semibold text-base">Latitude *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Lat"
                    value={Number.isFinite(field.value as any) ? field.value : ""}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                    className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.coordinates.lng"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900 font-semibold text-base">Longitude *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Lng"
                    value={Number.isFinite(field.value as any) ? field.value : ""}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                    className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
