import { UseFormReturn, FieldPath } from 'react-hook-form';
import { PropertyFormData } from './step-forms/propertySchema';
import { PropertyTemplate } from './propertyTemplates';

/**
 * Smartly applies template values to the form.
 * Does NOT override fields that have been touched/modified by the user.
 */
export function applyPropertyTemplate(
  form: UseFormReturn<PropertyFormData>,
  template: PropertyTemplate,
  userCity?: string
) {
  const { setValue, formState: { dirtyFields } } = form;

  // Flattened field check helper
  const isDirty = (path: string): boolean => {
    const parts = path.split('.');
    let current: any = dirtyFields;
    for (const part of parts) {
      if (!current || current[part] === undefined) return false;
      current = current[part];
    }
    return current === true;
  };

  // Helper to set value if NOT dirty
  const setIfClean = (path: FieldPath<PropertyFormData>, value: any) => {
    if (!isDirty(path)) {
      setValue(path, value, {
        shouldValidate: true,
        shouldDirty: false, // Don't mark as dirty when autofilled
      });
    }
  };

  // 1. Core Information
  const dynamicTitle = userCity ? `${template.autoFill.title} in ${userCity}` : template.autoFill.title;
  setIfClean('title', dynamicTitle);
  setIfClean('description', template.autoFill.description);
  setIfClean('price', template.autoFill.price);

  // 2. Apply Defaults (Categories & Core Specs)
  setIfClean('category', template.defaults.category);
  setIfClean('specifications.bedrooms', template.defaults.specifications.bedrooms);
  setIfClean('specifications.bathrooms', template.defaults.specifications.bathrooms);

  // 3. Apply AutoFill (Extended Specs)
  setIfClean('specifications.area', template.autoFill.specifications.area);
  
  if (template.autoFill.specifications.furnishing) {
    setIfClean('specifications.furnishing', template.autoFill.specifications.furnishing);
  }
  
  setIfClean('specifications.parking', template.autoFill.specifications.parking);

  if (template.autoFill.specifications.amenities) {
    // Special handling for amenities array - only if it's empty and not touched
    const currentAmenities = form.getValues('specifications.amenities') || [];
    if (currentAmenities.length === 0 && !isDirty('specifications.amenities')) {
      setValue('specifications.amenities', template.autoFill.specifications.amenities, {
        shouldValidate: true,
      });
    }
  }
}
