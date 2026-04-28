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
  const inputClass =
    "bg-cyan-50/50 border-cyan-200 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-cyan-500 rounded-xl";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Location Details</h3>
        <p className="text-sm text-slate-600 mt-1">Provide an accurate address so users can find your property.</p>
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FormField
          control={form.control}
          name="location.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800 font-semibold text-base">City *</FormLabel>
              <FormControl>
                <Input
                  placeholder="City"
                  {...field}
                  className={inputClass}
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
              <FormLabel className="text-slate-800 font-semibold text-base">State *</FormLabel>
              <FormControl>
                <Input
                  placeholder="State"
                  {...field}
                  className={inputClass}
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
              <FormLabel className="text-slate-800 font-semibold text-base">Pincode *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Pincode"
                  {...field}
                  className={inputClass}
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
                <FormLabel className="text-slate-800 font-semibold text-base">Latitude *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Lat"
                    value={Number.isFinite(field.value as any) ? field.value : ""}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                    className={inputClass}
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
                <FormLabel className="text-slate-800 font-semibold text-base">Longitude *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Lng"
                    value={Number.isFinite(field.value as any) ? field.value : ""}
                    onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                    className={inputClass}
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
