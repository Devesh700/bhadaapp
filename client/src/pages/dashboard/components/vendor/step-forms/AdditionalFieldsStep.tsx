// AdditionalFieldsStep.tsx
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface AdditionalFieldsStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const AdditionalFieldsStep = ({ form }: AdditionalFieldsStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="specifications.area"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Area (sqft) *</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0"
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
        name="specifications.bedrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Bedrooms *</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0"
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
        name="specifications.bathrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Bathrooms *</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0"
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
        name="specifications.furnishing"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Furnishing</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Unfurnished, Semi-furnished, Furnished"
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
        name="specifications.parking"
        render={({ field }) => (
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
            </FormControl>
            <FormLabel className="text-gray-900 font-semibold text-base">Parking Available</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Optional: owner (optional string) */}
      <FormField
        control={form.control}
        name="owner"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel className="text-gray-900 font-semibold text-base">Owner (optional)</FormLabel>
            <FormControl>
              <Input
                placeholder="Owner contact/name"
                {...field}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Optional flags */}
      <FormField
        control={form.control}
        name="isPrimeListing"
        render={({ field }) => (
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
            </FormControl>
            <FormLabel className="text-gray-900 font-semibold text-base">Prime Listing</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isVerified"
        render={({ field }) => (
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
            </FormControl>
            <FormLabel className="text-gray-900 font-semibold text-base">Verified</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isFeatured"
        render={({ field }) => (
          <FormItem className="flex items-center gap-3">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                className="border-gray-400 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
            </FormControl>
            <FormLabel className="text-gray-900 font-semibold text-base">Featured</FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AdditionalFieldsStep;
