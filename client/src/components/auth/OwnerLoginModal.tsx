
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
import { Mail, Lock, Building2 } from "lucide-react";

const ownerLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type OwnerLoginFormValues = z.infer<typeof ownerLoginSchema>;

interface OwnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnerLoginModal = ({ isOpen, onClose }: OwnerLoginModalProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<OwnerLoginFormValues>({
    resolver: zodResolver(ownerLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: OwnerLoginFormValues) => {
    console.log("Owner login attempt with:", data);
    
    // Demo credentials
    const demoEmail = "owner123@gmail.com";
    const demoPassword = "owner123";
    
    if (data.email === demoEmail && data.password === demoPassword) {
      // Successful login
      localStorage.setItem("owner_auth", JSON.stringify({
        isLoggedIn: true,
        email: data.email,
        fullName: "Demo Owner",
        role: "owner",
        coins: 150
      }));

      toast({
        title: "Login Successful! 🎉",
        description: "Welcome to Owner Panel",
      });

      onClose();
      navigate("/owner/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Use demo credentials: owner123@gmail.com / owner123",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95%] rounded-xl bg-white border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800">
            <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            Owner Login
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Access your owner dashboard
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
          <p className="text-sm text-blue-600">Email: owner123@gmail.com</p>
          <p className="text-sm text-blue-600">Password: owner123</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2 text-gray-700">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="owner123@gmail.com" 
                      {...field} 
                      className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2 text-gray-700">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="owner123" 
                      {...field} 
                      className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold">
              Login as Owner
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OwnerLoginModal;
