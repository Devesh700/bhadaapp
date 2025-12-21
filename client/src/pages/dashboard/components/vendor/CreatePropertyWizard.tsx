import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { PropertyFormData, propertyFormSchema } from "./step-forms/propertySchema"; // Ensure this is the new Zod schema (title, location.*, specifications.*, images, etc.)
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from "lucide-react";
import BasicInformationStep from "./step-forms/BasicInformationStep";
import AdditionalFieldsStep from "./step-forms/AdditionalFieldsStep";
import LocationStep from "./step-forms/LocationStep";
import MediaUploadStep from "./step-forms/MediaUploadStep";
import AmenitiesStep from "./step-forms/AmenitiesStep";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { createProperty } from "@/store/thunks/property.thunk";
import { useAppDispatch } from "@/store/hooks/redux";

// Step configuration remains the same; step internals will be updated later to match the new schema fields
const steps = [
  { id: 1, title: "Basic Information", component: BasicInformationStep },
  { id: 2, title: "Additional Fields", component: AdditionalFieldsStep },
  { id: 3, title: "Location", component: LocationStep },
  { id: 4, title: "Media Upload", component: MediaUploadStep },
  { id: 5, title: "Amenities", component: AmenitiesStep },
];

export interface CreatePropertyWizardProps {
  editMode?: boolean;
  propertyData?: PropertyFormData;
  onEditComplete?: () => void;
}

// Default values aligned to the new Zod schema
const defaultZodValues: PropertyFormData = {
  // Basic Info
  title: "",
  description: "",
  propertyType: "rent",
  category: "apartment",
  price: 0,

  // Location
  location: {
    address: "",
    city: "",
    state: "",
    pincode: "",
    coordinates: { lat: 0, lng: 0 },
  },

  // Specifications
  specifications: {
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    furnishing: undefined,
    parking: false,
    amenities: [],
  },

  // Media
  images: [],
  videos: [],

  // Backend-managed / optional fields
  owner: undefined,
  status: "pending",

  isPrimeListing: false,
  isVerified: false,
  isFeatured: false,
  primeListingExpiry: undefined,

  viewCount: 0,
  contactViewCount: 0,
  whatsappContactCount: 0,
  rejectionReason: undefined,

  createdAt: undefined,
  updatedAt: undefined,
};

export default function CreatePropertyWizard({
  editMode = false,
  propertyData,
  onEditComplete,
}: CreatePropertyWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // RHF + Zod
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: propertyData ?? defaultZodValues,
    mode: "onSubmit",
  });

  // Sync when editing
  useEffect(() => {
    if (propertyData) {
      form.reset(propertyData);
    }
  }, [propertyData, form]);

  const progress = (currentStep / steps.length) * 100;

  // Map step -> fields that should be validated for that step (Zod schema paths)
  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["title", "description", "propertyType", "category", "price"];
      case 2:
        return [
          "specifications.area",
          "specifications.bedrooms",
          "specifications.bathrooms",
          "specifications.furnishing",
          "specifications.parking",
        ];
      case 3:
        return [
          "location.address",
          "location.city",
          "location.state",
          "location.pincode",
          "location.coordinates.lat",
          "location.coordinates.lng",
        ];
      case 4:
        return ["images", "videos"];
      case 5:
        return ["specifications.amenities"];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const stepFields = getStepFields(currentStep);
    const isValid = await form.trigger(stepFields as any); // RHF supports triggering specific fields by name
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      const errors = form.formState.errors;
      const errorMessages = Object.entries(errors)
        .map(([key, err]: any) => `${key}: ${err?.message ?? "Invalid"}`)
        .join(", ");
      toast({
        title: "Validation Error",
        description: errorMessages || "Please fill in all required fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinalSubmission = async () => {
    setIsSubmitting(true);

    // Let Zod validate entire form one last time
    const valid = await form.trigger();
    if (!valid) {
      const errors = form.formState.errors;
      const errorMessages = Object.entries(errors)
        .map(([key, err]: any) => `${key}: ${err?.message ?? "Invalid"}`)
        .join(", ");
      toast({
        title: "Validation Error",
        description: `Please fix the following errors: ${errorMessages}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const data = form.getValues();

    // Local storage draft save (kept from original flow)
    const properties = JSON.parse(localStorage.getItem("vendor_properties") || "[]");
    const newProperty = {
      ...data,
      id: Date.now().toString(),
      specifications: {
        ...data.specifications,
        amenities: data.specifications?.amenities || [],
      },
    };

    if (editMode && propertyData) {
      const updatedProperties = properties.map((p: any) =>
        p.id === (propertyData as any)?.propertyId ? { ...data, id: (propertyData as any)?.propertyId } : p
      );
      localStorage.setItem("vendor_properties", JSON.stringify(updatedProperties));
    } else {
      properties.push(newProperty);
      localStorage.setItem("vendor_properties", JSON.stringify(properties));
    }

    try {
      // API call
      await dispatch(createProperty(data as any)).unwrap();

      setShowSuccessDialog(true);
      setIsSubmitting(false);

      toast({
        title: editMode ? "🎉 Property Updated Successfully!" : "🎉 Property Listed Successfully!",
        description: editMode
          ? "Your property has been updated and is under review."
          : "You've earned 10 coins for listing your property!",
        duration: 5000,
      });
    } catch (err: any) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: err?.message || "Failed to submit property",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (_data: PropertyFormData) => {
    // Submission is driven by handleFinalSubmission on the last step (kept for compatibility)
    // Intentionally no-op
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {editMode ? "Edit Your Property" : "List Your Property"}
            </h1>
            <p className="text-gray-700 text-lg font-medium">
              {editMode ? "Update your property details" : "Complete all steps to list your property on Bhada.in"}
            </p>
          </div>

          {/* Progress */}
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
                {currentStep === steps.length ? (
                  <AmenitiesStep
                    form={form}
                    onFinalSubmit={handleFinalSubmission}
                    isSubmitting={isSubmitting}
                  />
                ) : (
                  <CurrentStepComponent form={form} />
                )}
              </div>

              {/* Navigation */}
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

      {/* Review Dialog (preserved, not auto-opened) */}
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
      <SuccessDialog
        open={showSuccessDialog}
        editMode={editMode}
        onContinue={() => {
          setShowSuccessDialog(false);
          if (editMode && onEditComplete) onEditComplete();
          else navigate("/vendor/dashboard");
        }}
      />
    </div>
  );
}

function SuccessDialog({
  open,
  editMode,
  onContinue,
}: {
  open: boolean;
  editMode: boolean;
  onContinue: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="bg-white border-gray-200 text-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <CheckCircle className="w-5 h-5 text-green-500" />
            {editMode ? "Property Updated Successfully!" : "Property Listed Successfully!"}
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
              ? "Your property has been successfully updated and is under review."
              : "Your property has been successfully listed and 10 coins have been added to your wallet."}
          </p>
          <Button onClick={onContinue} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
