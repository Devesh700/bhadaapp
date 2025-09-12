
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Mail, Lock, Phone, MapPin, Upload, Building2, Gift } from "lucide-react";

const ownerRegistrationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  address: z.string().min(10, { message: "Please enter complete address details" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type OwnerRegistrationFormValues = z.infer<typeof ownerRegistrationSchema>;

interface OwnerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnerRegistrationModal = ({ isOpen, onClose }: OwnerRegistrationModalProps) => {
  const [addressProofFile, setAddressProofFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<OwnerRegistrationFormValues>({
    resolver: zodResolver(ownerRegistrationSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      password: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
      if (allowedTypes.includes(file.type)) {
        setAddressProofFile(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload PNG, JPEG, or PDF files only",
          variant: "destructive",
        });
      }
    }
  };

  const handleRegistration = (data: OwnerRegistrationFormValues) => {
    if (!addressProofFile) {
      toast({
        title: "Address Proof Required",
        description: "Please upload your address proof document",
        variant: "destructive",
      });
      return;
    }

    console.log("Owner registration with:", data);
    
    // Store owner auth data
    const ownerData = {
      isLoggedIn: true,
      email: data.email,
      fullName: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
      role: "owner",
      coins: 100,
      addressProof: addressProofFile.name
    };

    localStorage.setItem("owner_auth", JSON.stringify(ownerData));

    toast({
      title: "🎉 Registration Successful!",
      description: "Welcome to Bhada.in! You received 100 coins as a welcome bonus.",
    });

    onClose();
    navigate("/owner/dashboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-[95%] rounded-xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            Owner Registration
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Join as a property owner and start listing your properties
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegistration)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Full Name *</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number *</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+91 9876543210" {...field} className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email *</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Address Details *</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Complete address with pincode" {...field} className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium mb-2">
                <Upload className="w-4 h-4" />
                <span>Address Proof (Aadhar/PAN) *</span>
              </label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileChange}
                className="w-full h-12 px-3 border border-gray-200 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-white"
              />
              {addressProofFile && (
                <p className="text-sm text-blue-600 mt-1">
                  File selected: {addressProofFile.name}
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Password *</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold">
              <Gift className="w-4 h-4 mr-2" />
              Register & Get 100 Coins
            </Button>
          </form>
        </Form>
        
        <div className="text-center">
          <p className="text-sm text-blue-600 font-medium">
            🎉 Get 100 welcome coins on registration!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OwnerRegistrationModal;
