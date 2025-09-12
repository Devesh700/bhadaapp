
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import BasicInformationStep from '@/components/property-listing/BasicInformationStep';
import AdditionalFieldsStep from '@/components/property-listing/AdditionalFieldsStep';
import LocationStep from '@/components/property-listing/LocationStep';
import MediaUploadStep from '@/components/property-listing/MediaUploadStep';
import AmenitiesStep from '@/components/property-listing/AmenitiesStep';
import { propertyFormSchema, type PropertyFormData } from '@/components/property-listing/propertySchema';
import { ArrowLeft, ArrowRight, Home, CheckCircle } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Basic Information', icon: Home },
  { id: 2, title: 'Additional Fields', icon: Home },
  { id: 3, title: 'Location & Address', icon: Home },
  { id: 4, title: 'Media Upload', icon: Home },
  { id: 5, title: 'Amenities', icon: CheckCircle },
];

const ListProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
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
      mediaFiles: [],
      videoFile: null,
      amenities: [],
    },
  });

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    console.log('Property data:', data);
    
    // Show review popup
    toast({
      title: "Property Submitted for Review",
      description: "Your property listing has been submitted and is under review. You'll be notified once it's approved.",
    });

    // Simulate approval and show success popup after a delay
    setTimeout(() => {
      toast({
        title: "🎉 Congratulations!",
        description: "Your property has been successfully listed! You've earned 10 coins for listing your property.",
      });
    }, 2000);
  };

  const progress = (currentStep / STEPS.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformationStep form={form} />;
      case 2:
        return <AdditionalFieldsStep form={form} />;
      case 3:
        return <LocationStep form={form} />;
      case 4:
        return <MediaUploadStep form={form} />;
      case 5:
        return <AmenitiesStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              List Your Property
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Create a professional listing to connect with genuine buyers and tenants
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-8 bg-white border-blue-200 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center mb-4">
                {STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center ${
                      index < STEPS.length - 1 ? 'flex-1' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        currentStep >= step.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.id}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                          currentStep > step.id
                            ? 'bg-blue-600'
                            : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
          </Card>

          {/* Form Content */}
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="bg-white border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="text-2xl">
                  {STEPS[currentStep - 1].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === STEPS.length ? (
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  Submit Property
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ListProperty;
