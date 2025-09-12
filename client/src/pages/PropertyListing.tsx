import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PropertyFormData, propertyFormSchema } from '@/components/property-listing/propertySchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import BasicInformationStep from '@/components/property-listing/BasicInformationStep';
import AdditionalFieldsStep from '@/components/property-listing/AdditionalFieldsStep';
import LocationStep from '@/components/property-listing/LocationStep';
import MediaUploadStep from '@/components/property-listing/MediaUploadStep';
import AmenitiesStep from '@/components/property-listing/AmenitiesStep';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const steps = [
  { id: 1, title: 'Basic Information', component: BasicInformationStep },
  { id: 2, title: 'Additional Fields', component: AdditionalFieldsStep },
  { id: 3, title: 'Location', component: LocationStep },
  { id: 4, title: 'Media Upload', component: MediaUploadStep },
  { id: 5, title: 'Amenities', component: AmenitiesStep },
];

interface PropertyListingProps {
  editMode?: boolean;
  propertyData?: PropertyFormData;
  onEditComplete?: () => void;
}

const PropertyListing = ({ editMode = false, propertyData, onEditComplete }: PropertyListingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: propertyData || {
      propertyTitle: '',
      propertyType: 'Apartment',
      propertyDescription: '',
      contactOwner: '',
      propertyId: '',
      parentProperty: '',
      status: 'Available',
      label: '',
      rooms: 0,
      beds: 0,
      baths: 0,
      garages: 0,
      yearBuilt: new Date().getFullYear(),
      homeArea: 0,
      lotArea: 0,
      address: '',
      city: '',
      state: '',
      zipCode: '',
      amenities: [],
      mediaFiles: [],
    },
  });

  // Update form values when propertyData changes
  useEffect(() => {
    if (propertyData) {
      form.reset(propertyData);
    }
  }, [propertyData, form]);

  const progress = (currentStep / steps.length) * 100;

  const nextStep = async () => {
    console.log('Next step clicked, current step:', currentStep);
    const stepFields = getStepFields(currentStep);
    console.log('Validating fields for step:', stepFields);
    
    const isValid = await form.trigger(stepFields);
    console.log('Step validation result:', isValid);
    
    if (isValid) {
      if (currentStep < steps.length) {
        console.log('Moving to next step:', currentStep + 1);
        setCurrentStep(currentStep + 1);
      }
    } else {
      const errors = form.formState.errors;
      console.log('Validation errors:', errors);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepFields = (step: number): (keyof PropertyFormData)[] => {
    switch (step) {
      case 1:
        return ['propertyTitle', 'propertyType', 'propertyDescription', 'contactOwner'];
      case 2:
        return ['status', 'rooms', 'beds', 'baths', 'yearBuilt', 'homeArea'];
      case 3:
        return ['address', 'city', 'state', 'zipCode'];
      case 4:
        return []; // Media is optional
      case 5:
        return []; // Amenities are optional but this is the final step
      default:
        return [];
    }
  };

  const handleFinalSubmission = async () => {
    console.log('Final submission triggered from amenities step');
    setIsSubmitting(true);
    
    const data = form.getValues();
    console.log('Form submission started with data:', data);
    
    try {
      // Validate all required fields one final time
      const requiredFields = {
        propertyTitle: data.propertyTitle?.trim(),
        propertyDescription: data.propertyDescription?.trim(),
        contactOwner: data.contactOwner?.trim(),
        address: data.address?.trim(),
        city: data.city?.trim(),
        state: data.state?.trim(),
        zipCode: data.zipCode?.trim()
      };

      console.log('Checking required fields:', requiredFields);

      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        console.log('Missing required fields:', missingFields);
        toast({
          title: "Validation Error",
          description: `Please fill in all required fields: ${missingFields.join(', ')}`,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      console.log('All validation passed, showing review dialog');
      setShowReviewDialog(true);
      
      // Save property to localStorage
      const properties = JSON.parse(localStorage.getItem('vendor_properties') || '[]');
      
      if (editMode && propertyData) {
        console.log('Updating existing property');
        // Update existing property
        const updatedProperties = properties.map((p: any) => 
          p.id === propertyData.propertyId ? { ...data, id: propertyData.propertyId } : p
        );
        localStorage.setItem('vendor_properties', JSON.stringify(updatedProperties));
      } else {
        console.log('Adding new property');
        // Add new property
        const newProperty = { 
          ...data, 
          id: Date.now().toString(),
          amenities: data.amenities || []
        };
        properties.push(newProperty);
        localStorage.setItem('vendor_properties', JSON.stringify(properties));
        console.log('Property saved:', newProperty);
      }
      
      // Simulate review process
      setTimeout(() => {
        console.log('Review process completed');
        setShowReviewDialog(false);
        setShowSuccessDialog(true);
        setIsSubmitting(false);
        
        // Show appropriate toast message
        if (editMode) {
          toast({
            title: "🎉 Property Updated Successfully!",
            description: "Your property has been updated and is under review.",
            duration: 5000,
          });
        } else {
          toast({
            title: "🎉 Property Listed Successfully!",
            description: "You've earned 10 coins for listing your property!",
            duration: 5000,
          });
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error during form submission:', error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    // This should not be called directly anymore
    // Form submission is now handled by handleFinalSubmission
    console.log('onSubmit called - this should not happen in the new flow');
  };

  const handleContinue = () => {
    console.log('Continue button clicked');
    setShowSuccessDialog(false);
    if (editMode && onEditComplete) {
      onEditComplete();
    } else {
      navigate('/vendor/dashboard');
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {editMode ? 'Edit Your Property' : 'List Your Property'}
            </h1>
            <p className="text-gray-700 text-lg font-medium">
              {editMode ? 'Update your property details' : 'Complete all steps to list your property on Bhada.in'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </h2>
              <span className="text-gray-800 font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-white rounded-xl p-8 border border-gray-300 shadow-lg">
                {currentStep === 5 ? (
                  <AmenitiesStep form={form} onFinalSubmit={handleFinalSubmission} isSubmitting={isSubmitting} />
                ) : (
                  <CurrentStepComponent form={form} />
                )}
              </div>

              {/* Navigation Buttons - Only show if not on amenities step */}
              {currentStep < steps.length && (
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="bg-gray-200 border-gray-400 text-gray-800 hover:bg-gray-300 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Show navigation for amenities step separately */}
              {currentStep === steps.length && (
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="bg-gray-200 border-gray-400 text-gray-800 hover:bg-gray-300 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={() => {}}>
        <DialogContent className="bg-white border-gray-200 text-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900">
              <Clock className="w-5 h-5 text-blue-500" />
              Property Under Review
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-700">
              Your property listing is being reviewed by our team. You'll be notified once it's approved.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={() => {}}>
        <DialogContent className="bg-white border-gray-200 text-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-900">
              <CheckCircle className="w-5 h-5 text-green-500" />
              {editMode ? 'Property Updated Successfully!' : 'Property Listed Successfully!'}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            {!editMode && (
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">+10</span>
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Congratulations!</h3>
            <p className="text-gray-700 mb-4">
              {editMode 
                ? 'Your property has been successfully updated and is under review.'
                : 'Your property has been successfully listed and 10 coins have been added to your wallet.'
              }
            </p>
            <Button
              onClick={handleContinue}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyListing;
