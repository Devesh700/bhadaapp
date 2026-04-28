// BasicInformationStep.tsx
import { UseFormReturn } from "react-hook-form";
import { PropertyFormData } from "./propertySchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInformationStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const BasicInformationStep = ({ form }: BasicInformationStepProps) => {
  const inputClass =
    "bg-cyan-50/50 border-cyan-200 text-slate-900 placeholder:text-slate-500 focus:bg-white focus:border-cyan-500 rounded-xl";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
        <p className="text-sm text-slate-600 mt-1">Add core details that describe your property listing.</p>
      </div>

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-800 font-semibold text-base">Property Title *</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter property title"
                {...field}
                className={inputClass}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800 font-semibold text-base">Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-cyan-100">
                  <SelectItem value="rent" className="text-slate-900 hover:bg-cyan-50 font-medium">Rent</SelectItem>
                  <SelectItem value="commercial" className="text-slate-900 hover:bg-cyan-50 font-medium">Commercial</SelectItem>
                  <SelectItem value="sale" className="text-slate-900 hover:bg-cyan-50 font-medium">Sale</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800 font-semibold text-base">Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-cyan-100">
                  <SelectItem value="apartment" className="text-slate-900 hover:bg-cyan-50 font-medium">Apartment</SelectItem>
                  <SelectItem value="house" className="text-slate-900 hover:bg-cyan-50 font-medium">House</SelectItem>
                  <SelectItem value="plot" className="text-slate-900 hover:bg-cyan-50 font-medium">Plot</SelectItem>
                  <SelectItem value="office" className="text-slate-900 hover:bg-cyan-50 font-medium">Office</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-800 font-semibold text-base">Property Description *</FormLabel>
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

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-800 font-semibold text-base">Price *</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="0"
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
  );
};

export default BasicInformationStep;
