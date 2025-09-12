
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormData } from './propertySchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdditionalFieldsStepProps {
  form: UseFormReturn<PropertyFormData>;
}

const AdditionalFieldsStep = ({ form }: AdditionalFieldsStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="propertyId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Property ID</FormLabel>
            <FormControl>
              <Input
                placeholder="Auto-generated if empty"
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
        name="parentProperty"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Parent Property</FormLabel>
            <FormControl>
              <Input
                placeholder="Parent property reference"
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
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Status *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-gray-100 border-gray-400 text-gray-900 focus:bg-white focus:border-blue-500 font-medium">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="Available" className="text-gray-900 hover:bg-gray-100 font-medium">Available</SelectItem>
                <SelectItem value="Rented" className="text-gray-900 hover:bg-gray-100 font-medium">Rented</SelectItem>
                <SelectItem value="Sold" className="text-gray-900 hover:bg-gray-100 font-medium">Sold</SelectItem>
                <SelectItem value="Under Maintenance" className="text-gray-900 hover:bg-gray-100 font-medium">Under Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="label"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Label</FormLabel>
            <FormControl>
              <Input
                placeholder="Property label"
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
        name="rooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Rooms</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Number of rooms"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="beds"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Beds</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Number of beds"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="baths"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Baths</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Number of baths"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="garages"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Garages</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Number of garages"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="yearBuilt"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Year Built</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Year built"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || new Date().getFullYear())}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="homeArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Home Area (sqft)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Home area in square feet"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                className="bg-gray-100 border-gray-400 text-gray-900 placeholder:text-gray-600 focus:bg-white focus:border-blue-500 font-medium"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lotArea"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-semibold text-base">Lot Area (sqft)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Lot area in square feet"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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

export default AdditionalFieldsStep;
