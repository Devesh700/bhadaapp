import { Building2, Home, Landmark, Warehouse } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MobileNumberInput } from "./AdditionalFieldsStep";

interface BasicInformationStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const propertyTypeOptions = [
  {
    value: "rent",
    label: "Rent",
    description: "List it for monthly rental income",
  },
  {
    value: "sale",
    label: "Sale",
    description: "List it for a direct property sale",
  },
] as const;

const categoryOptions = [
  {
    value: "apartment",
    label: "Flat",
    description: "Apartment or flat in a building",
    icon: Building2,
  },
  {
    value: "house",
    label: "Villa",
    description: "Independent house or villa",
    icon: Home,
  },
  {
    value: "plot",
    label: "Plot",
    description: "Open land or residential plot",
    icon: Landmark,
  },
  {
    value: "office",
    label: "Office",
    description: "Commercial office or workspace",
    icon: Warehouse,
  },
] as const;

const unitTypeOptions = [
  { value: "1bhk", label: "1 BHK", bedrooms: 1, bathrooms: 1 },
  { value: "2bhk", label: "2 BHK", bedrooms: 2, bathrooms: 2 },
  { value: "3bhk", label: "3 BHK", bedrooms: 3, bathrooms: 3 },
  { value: "4bhk", label: "4+ BHK", bedrooms: 4, bathrooms: 4 },
] as const;

const bhkCategories = new Set(["apartment", "house"]);

const BasicInformationStep = ({ form }: BasicInformationStepProps) => {
  const inputClass =
    "bg-cyan-50/50 border-cyan-200 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-cyan-500 rounded-xl";
  const selectedCategory = form.watch("category");
  const selectedUnitType = form.watch("unitType");
  const showUnitType = bhkCategories.has(selectedCategory);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">
          Basic Information
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Follow the guided flow to choose the right listing setup before you
          add the rest of the details.
        </p>
      </div>

      <FormField
        control={form.control}
        name="propertyType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-slate-800">
              1. Property Type *
            </FormLabel>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {propertyTypeOptions.map((option) => {
                const isActive = field.value === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => field.onChange(option.value)}
                    className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                      isActive
                        ? "border-cyan-500 bg-cyan-50 shadow-md"
                        : "border-cyan-100 bg-white hover:border-cyan-300 hover:bg-cyan-50/50"
                    }`}
                  >
                    <div className="text-base font-semibold text-slate-900">
                      {option.label}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      {option.description}
                    </div>
                  </button>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-slate-800">
              2. Category *
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {categoryOptions.map((option) => {
                  const isActive = field.value === option.value;
                  const Icon = option.icon;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        field.onChange(option.value);

                        if (!bhkCategories.has(option.value)) {
                          form.setValue("unitType", undefined, {
                            shouldValidate: true,
                          });
                          form.setValue("specifications.bedrooms", undefined, {
                            shouldValidate: true,
                          });
                          form.setValue("specifications.bathrooms", undefined, {
                            shouldValidate: true,
                          });
                        }
                      }}
                      className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                        isActive
                          ? "border-cyan-500 bg-cyan-50 shadow-md"
                          : "border-cyan-100 bg-white hover:border-cyan-300 hover:bg-cyan-50/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-xl p-3 ${
                            isActive
                              ? "bg-cyan-500 text-white"
                              : "bg-cyan-100 text-cyan-700"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-base font-semibold text-slate-900">
                            {option.label}
                          </div>
                          <div className="mt-1 text-sm text-slate-600">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showUnitType && (
        <FormField
          control={form.control}
          name="unitType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-slate-800">
                3. Unit Type *
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {unitTypeOptions.map((option) => {
                    const isActive = field.value === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          field.onChange(option.value);
                          form.setValue(
                            "specifications.bedrooms",
                            option.bedrooms,
                            { shouldValidate: true },
                          );
                          form.setValue(
                            "specifications.bathrooms",
                            option.bathrooms,
                            { shouldValidate: true },
                          );
                        }}
                        className={`rounded-2xl border p-4 text-center transition-all duration-200 ${
                          isActive
                            ? "border-cyan-500 bg-cyan-50 shadow-md"
                            : "border-cyan-100 bg-white hover:border-cyan-300 hover:bg-cyan-50/50"
                        }`}
                      >
                        <div className="text-base font-semibold text-slate-900">
                          {option.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-slate-800">
              {showUnitType ? "4. Price *" : "3. Price *"}
            </FormLabel>
            <FormControl>
              <MobileNumberInput
                value={Number.isFinite(field.value as number) ? field.value : undefined}
                onChange={field.onChange}
                placeholder="Enter expected price"
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-slate-800">
              Property Title *
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add a short title that clearly describes the property"
                className={`${inputClass} min-h-[56px]`}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold text-slate-800">
              Property Description *
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the property in detail..."
                className={`${inputClass} min-h-[120px]`}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!showUnitType && selectedCategory && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Unit type is hidden because it does not apply to{" "}
          {selectedCategory === "plot" ? "plots" : "office spaces"}.
        </div>
      )}

      {showUnitType && selectedUnitType && (
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-800">
          {selectedUnitType.toUpperCase()} selected. Bedrooms are now locked to
          match the chosen unit type.
        </div>
      )}
    </div>
  );
};

export default BasicInformationStep;
