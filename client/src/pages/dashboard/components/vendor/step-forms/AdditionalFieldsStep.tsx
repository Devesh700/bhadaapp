import { Minus, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface AdditionalFieldsStepProps {
  form: UseFormReturn<PropertyFormData>;
}

interface MobileNumberInputProps {
  value?: number;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const MobileNumberInput = ({
  value,
  onChange,
  placeholder = "0",
  className = "",
}: MobileNumberInputProps) => {
  const currentValue = Number.isFinite(value as number) ? Number(value) : "";

  const handleValueChange = (rawValue: string) => {
    onChange(rawValue === "" ? undefined : Math.max(0, Number(rawValue)));
  };

  const adjustValue = (delta: number) => {
    const numericValue = Number.isFinite(value as number) ? Number(value) : 0;
    onChange(Math.max(0, numericValue + delta));
  };

  return (
    <div className="flex items-center overflow-hidden rounded-lg border border-border-secondary bg-background-primary focus-within:ring-2 focus-within:ring-border-info focus-within:border-transparent w-full">
      <button
        type="button"
        aria-label="Decrease value"
        onClick={() => adjustValue(-1)}
        className="flex h-10 w-10 shrink-0 items-center justify-center border-r border-border-tertiary bg-background-secondary text-text-secondary transition-colors hover:bg-background-info hover:text-text-info active:scale-95 md:hidden"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <Input
        type="number"
        placeholder={placeholder}
        value={currentValue}
        onChange={(e) => handleValueChange(e.target.value)}
        className={`h-10 flex-1 border-0 bg-transparent text-center md:text-left text-[15px] font-medium focus:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${className}`}
      />

      <button
        type="button"
        aria-label="Increase value"
        onClick={() => adjustValue(1)}
        className="flex h-10 w-10 shrink-0 items-center justify-center border-l border-border-tertiary bg-background-secondary text-text-secondary transition-colors hover:bg-background-info hover:text-text-info active:scale-95 md:hidden"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

const AdditionalFieldsStep = ({ form }: AdditionalFieldsStepProps) => {
  const inputClass =
    "bg-cyan-50/50 border-cyan-200 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-cyan-500 rounded-xl";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Additional Details
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Enter specifications and flags for better visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="specifications.area"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-slate-800">
                Area (sqft) *
              </FormLabel>
              <FormControl>
                <MobileNumberInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="0"
                  className={inputClass}
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
              <FormLabel className="text-base font-semibold text-slate-800">
                Bedrooms *
              </FormLabel>
              <FormControl>
                <MobileNumberInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="0"
                  className={inputClass}
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
              <FormLabel className="text-base font-semibold text-slate-800">
                Bathrooms *
              </FormLabel>
              <FormControl>
                <MobileNumberInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="0"
                  className={inputClass}
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
              <FormLabel className="text-base font-semibold text-slate-800">
                Furnishing
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Unfurnished, Semi-furnished, Furnished"
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
          name="specifications.parking"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 rounded-xl border border-cyan-100 bg-cyan-50/50 p-3">
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(Boolean(checked))
                  }
                  className="border-cyan-300 data-[state=checked]:border-cyan-500 data-[state=checked]:bg-cyan-500"
                />
              </FormControl>
              <FormLabel className="text-base font-semibold text-slate-800">
                Parking Available
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-base font-semibold text-slate-800">
                Owner (optional)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Owner contact/name"
                  {...field}
                  value={field.value ?? ""}
                  className={inputClass}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPrimeListing"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-xl border border-cyan-100 bg-cyan-50/50 p-3">
              <div className="flex items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(Boolean(checked))
                    }
                    className="border-cyan-300 data-[state=checked]:border-cyan-500 data-[state=checked]:bg-cyan-500"
                  />
                </FormControl>

                <FormLabel className="cursor-pointer text-base font-semibold leading-none text-slate-800">
                  Prime Listing
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isVerified"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-xl border border-cyan-100 bg-cyan-50/50 p-3">
              <div className="flex items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(Boolean(checked))
                    }
                    className="border-cyan-300 data-[state=checked]:border-cyan-500 data-[state=checked]:bg-cyan-500"
                  />
                </FormControl>

                <FormLabel className="cursor-pointer text-base font-semibold leading-none text-slate-800">
                  Verified
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center rounded-xl border border-cyan-100 bg-cyan-50/50 p-3">
              <div className="flex items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(Boolean(checked))
                    }
                    className="border-cyan-300 data-[state=checked]:border-cyan-500 data-[state=checked]:bg-cyan-500"
                  />
                </FormControl>
                <FormLabel className="cursor-pointer text-base font-semibold leading-none text-slate-800">
                  Featured
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AdditionalFieldsStep;
