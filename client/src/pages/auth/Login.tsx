// src/components/auth/Login.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Redux imports
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { loginUser } from "@/store/thunks/auth.thunk";
import { clearError } from "@/store/slices/auth.slice";
import { 
  selectIsLoading, 
  selectAuthError, 
  selectIsAuthenticated 
} from "@/store/selectors/auth.selector";

// Validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginProps {
  onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  // Redux hooks
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle success
  useEffect(() => {
    if (isAuthenticated && onSuccess) {
      onSuccess();
    }
  }, [isAuthenticated, onSuccess]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast({
        title: "Login Failed",
        description: error,
        variant: "destructive",
      });
      
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, toast, dispatch]);

  // Form setup
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      const user= await dispatch(loginUser({
        email: data.email,
        password: data.password,
      })).unwrap();

      
       
      if((user.data.role === "admin" && user.data.loginStats.dailyLoginCount < 4) || (user.data.role !== "admin" && user.data.loginStats.dailyLoginCount < 3)){
        toast({
            title: "Daily Login Bonus",
            description: "5 Coins Awarded as Daily Login Bonus!"
        })
      } else {
        toast({
        title: "Login Successful",
        description: "Welcome back to Bhada.in",
      });
      }

      navigate("/dashboard");
    } catch (error) {
      // Error handled by useEffect above
      console.error("Login failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="name@example.com" 
                  disabled={isLoading}
                  {...field} 
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  disabled={isLoading}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Login"}
        </Button>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            <span className="ml-2 text-sm text-gray-600">Signing you in...</span>
          </div>
        )}
      </form>
    </Form>
  );
};

export default Login;
