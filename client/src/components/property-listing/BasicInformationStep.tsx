
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from './propertySchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicInformationStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const BasicInformationStep = ({ form }: BasicInformationStepProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="propertyTitle"
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
                <SelectItem value="Apartment" className="text-gray-900 hover:bg-gray-100 font-medium">Apartment</SelectItem>
                <SelectItem value="Commercial" className="text-gray-900 hover:bg-gray-100 font-medium">Commercial</SelectItem>
                <SelectItem value="Houses & Villas" className="text-gray-900 hover:bg-gray-100 font-medium">Houses & Villas</SelectItem>
                <SelectItem value="Land" className="text-gray-900 hover:bg-gray-100 font-medium">Land</SelectItem>
                <SelectItem value="PG Stays" className="text-gray-900 hover:bg-gray-100 font-medium">PG Stays</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="propertyDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Property Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your property in detail..."
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
        name="contactOwner"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Contact Owner *</FormLabel>
            <FormControl>
              <Input
                placeholder="Owner contact information"
                {...field}
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
