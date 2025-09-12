
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const vendorLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type VendorLoginFormValues = z.infer<typeof vendorLoginSchema>;

const VendorAuth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<VendorLoginFormValues>({
    resolver: zodResolver(vendorLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: VendorLoginFormValues) => {
    console.log('Vendor login attempt with:', data);
    
    // Correct vendor credentials
    const validEmail = "vendor@bhada.in";
    const validPassword = "vendor123";
    
    if (data.email === validEmail && data.password === validPassword) {
      console.log('Vendor credentials match, logging in...');
      
      // Store vendor auth in localStorage as owner
      const vendorData = {
        isLoggedIn: true,
        email: data.email,
        fullName: "Vendor User",
        role: "owner",
        coins: 100
      };
      
      localStorage.setItem("owner_auth", JSON.stringify(vendorData));
      console.log('Vendor data stored as owner:', vendorData);

      toast({
        title: "Login Successful",
        description: "Welcome to Owner Panel",
      });

      // Navigate to owner dashboard
      navigate("/owner/dashboard");
    } else {
      console.log('Invalid vendor credentials provided');
      console.log('Expected:', { email: validEmail, password: validPassword });
      console.log('Received:', data);
      
      toast({
        title: "Login Failed",
        description: `Invalid email or password. Please use: ${validEmail} / ${validPassword}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Vendor Login
            </CardTitle>
            <CardDescription>
              Access your owner dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
              <p className="text-sm text-blue-600">Email: vendor@bhada.in</p>
              <p className="text-sm text-blue-600">Password: vendor123</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="vendor@bhada.in" {...field} />
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
                        <Input type="password" placeholder="vendor123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Login as Owner</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default VendorAuth;
