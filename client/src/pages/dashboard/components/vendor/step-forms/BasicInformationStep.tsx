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
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Property Title *</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter property title"
                {...field}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
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
              <FormLabel className="text-gray-900 font-semibold text-base">Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-100 border-gray-400 text-gray-900 focus:bg-white focus:border-blue-500 font-medium">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="rent" className="text-gray-900 hover:bg-gray-100 font-medium">Rent</SelectItem>
                  <SelectItem value="commercial" className="text-gray-900 hover:bg-gray-100 font-medium">Commercial</SelectItem>
                  <SelectItem value="sale" className="text-gray-900 hover:bg-gray-100 font-medium">Sale</SelectItem>
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
              <FormLabel className="text-gray-900 font-semibold text-base">Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-100 border-gray-400 text-gray-900 focus:bg-white focus:border-blue-500 font-medium">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="apartment" className="text-gray-900 hover:bg-gray-100 font-medium">Apartment</SelectItem>
                  <SelectItem value="house" className="text-gray-900 hover:bg-gray-100 font-medium">House</SelectItem>
                  <SelectItem value="plot" className="text-gray-900 hover:bg-gray-100 font-medium">Plot</SelectItem>
                  <SelectItem value="office" className="text-gray-900 hover:bg-gray-100 font-medium">Office</SelectItem>
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
            <FormLabel className="text-gray-900 font-semibold text-base">Property Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the property in detail..."
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 min-h-[120px] font-medium"
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
            <FormLabel className="text-gray-900 font-semibold text-base">Price *</FormLabel>
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
    </div>
  );
};

export default BasicInformationStep;
