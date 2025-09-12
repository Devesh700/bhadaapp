
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { User, Mail, Lock, Phone, Gift } from "lucide-react";

// Define validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

const AuthModal = ({ isOpen, onClose, defaultTab = "register" }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Login form setup
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form setup
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginFormValues) => {
    console.log("Login attempt with:", data);
    
    // Demo credentials
    const demoEmail = "user23@gmail.com";
    const demoPassword = "user321";
    
    if (data.email === demoEmail && data.password === demoPassword) {
      // Successful login
      localStorage.setItem("bhada_auth", JSON.stringify({
        isLoggedIn: true,
        userType: "user",
        email: data.email,
        fullName: "Demo User",
        coins: 100
      }));

      toast({
        title: "Login Successful! 🎉",
        description: "Welcome back to Bhada.in",
      });

      onClose();
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Use demo credentials: user23@gmail.com / user321",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (data: RegisterFormValues) => {
    console.log("Register with:", data);
    
    // Check if user already exists (simple check for demo)
    const existingUser = localStorage.getItem("bhada_auth");
    if (existingUser) {
      const userData = JSON.parse(existingUser);
      if (userData.email === data.email) {
        toast({
          title: "Registration Failed",
          description: "User with this email already exists",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Successful registration
    localStorage.setItem("bhada_auth", JSON.stringify({
      isLoggedIn: true,
      userType: "user",
      email: data.email,
      fullName: data.name,
      phoneNumber: data.phoneNumber,
      coins: 100
    }));

    // Show congratulations toast with bonus points
    toast({
      title: "🎉 Registration Successful!",
      description: "Congratulations! You received 100 coins as a welcome bonus.",
    });

    onClose();
    navigate("/dashboard");
  };

  const handleGoogleSignUp = () => {
    // Demo Google sign-up
    const googleUser = {
      isLoggedIn: true,
      userType: "user",
      email: "google.user@gmail.com",
      fullName: "Google User",
      phoneNumber: "",
      coins: 100,
      signUpMethod: "google"
    };

    localStorage.setItem("bhada_auth", JSON.stringify(googleUser));

    toast({
      title: "🎉 Google Sign-Up Successful!",
      description: "Welcome to Bhada.in! You received 100 coins as a welcome bonus.",
    });

    onClose();
    navigate("/dashboard");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95%] rounded-xl bg-white border border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">Bhada</span><span className="text-blue-500">.in</span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Your trusted platform for finding the perfect home
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger 
              value="login" 
              className="flex items-center space-x-2 bg-white text-gray-600 hover:bg-gray-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="flex items-center space-x-2 bg-white text-gray-600 hover:bg-gray-50 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md transition-all"
            >
              <Gift className="w-4 h-4" />
              <span>Sign Up</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-0">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="user23@gmail.com" 
                          {...field} 
                          className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
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
                          placeholder="user321" 
                          {...field} 
                          className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold">
                  Login
                </Button>
              </form>
            </Form>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Demo credentials: user23@gmail.com / user321
              </p>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-0">
            {/* Google Sign-Up Button */}
            <Button 
              onClick={handleGoogleSignUp}
              variant="outline" 
              className="w-full h-12 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold mb-4 bg-white"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700">
                        <User className="w-4 h-4" />
                        <span>Full Name</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="name@example.com" 
                          {...field} 
                          className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2 text-gray-700">
                        <Phone className="w-4 h-4" />
                        <span>Phone Number</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+91 9876543210" 
                          {...field} 
                          className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
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
                          placeholder="••••••••" 
                          {...field} 
                          className="h-12 bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold">
                  <Gift className="w-4 h-4 mr-2" />
                  Sign Up & Get 100 Coins
                </Button>
              </form>
            </Form>
            
            <div className="text-center">
              <p className="text-sm text-green-600 font-medium">
                🎉 Get 100 welcome coins on registration!
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
