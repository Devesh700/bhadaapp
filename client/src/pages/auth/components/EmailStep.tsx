// src/components/auth/steps/EmailStep.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailSchema>;

interface EmailStepProps {
  onSubmit: (email: string) => Promise<void>;
  isLoading: boolean;
}

const EmailStep: React.FC<EmailStepProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" }
  });

  const handleSubmit = (data: EmailFormValues) => {
    onSubmit(data.email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="h-12 text-base"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Checking...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </div>
          )}
        </Button>
        
        <p className="text-sm text-gray-500 text-center">
          We'll send you a verification code or let you use your password
        </p>
      </form>
    </Form>
  );
};

export default EmailStep;
