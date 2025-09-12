
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from './propertySchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LocationStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const LocationStep = ({ form }: LocationStepProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="address"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="city"
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
          name="state"
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
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-semibold text-base">Zip Code *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Zip Code"
                  {...field}
                  className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default LocationStep;
