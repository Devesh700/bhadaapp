
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
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

// Define validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Auth = () => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [userType, setUserType] = useState<"user" | "owner" | "admin">("user");
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
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginFormValues) => {
    console.log("Login with:", { ...data, userType });
    
    // Simulate successful login
    localStorage.setItem("bhada_auth", JSON.stringify({
      isLoggedIn: true,
      userType,
      email: data.email,
      // In a real app, you'd store user data from backend response
      coins: userType === "user" ? 20 : 30,
      fullName: "Demo User"
    }));

    toast({
      title: "Login Successful",
      description: "Welcome back to Bhada.in",
    });

    navigate("/dashboard");
  };

  const handleRegister = (data: RegisterFormValues) => {
    console.log("Register with:", { ...data, userType });
    
    // Simulate successful registration
    localStorage.setItem("bhada_auth", JSON.stringify({
      isLoggedIn: true,
      userType,
      email: data.email,
      fullName: data.fullName,
      coins: userType === "user" ? 20 : 30
    }));

    // Show welcome bonus toast
    toast({
      title: "Registration Successful! 🎉",
      description: userType === "user" 
        ? "Congratulations! You received 20 coins as a welcome bonus."
        : "Congratulations on your registration as an owner with 30 coins!",
      variant: "default",
    });

    navigate("/dashboard");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {authMode === "login" ? "Login to" : "Join"} <span className="text-bhada-blue">Bhada</span><span className="text-bhada-orange">.in</span>
            </CardTitle>
            <CardDescription>
              {authMode === "login" ? "Welcome back!" : "Create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue={userType} 
              onValueChange={(value) => setUserType(value as "user" | "owner" | "admin")}
              className="w-full mb-6"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="owner">Owner</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
            </Tabs>

            {authMode === "login" ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </Form>
            ) : (
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Register</Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p>
              {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
              <Button 
                variant="link" 
                className="p-0" 
                onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
              >
                {authMode === "login" ? "Register" : "Login"}
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
