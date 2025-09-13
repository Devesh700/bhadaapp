// src/components/auth/steps/PasswordLoginStep.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
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

const passwordLoginSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type PasswordLoginFormValues = z.infer<typeof passwordLoginSchema>;

interface PasswordLoginStepProps {
  email: string;
  onSubmit: (password: string) => Promise<void>;
  onBack: () => void;
  onUseEmailVerification: () => Promise<void>;
  handleForgotPassword?: () =>void;
  isLoading: boolean;
}

const PasswordLoginStep: React.FC<PasswordLoginStepProps> = ({ 
  email, 
  onSubmit, 
  onBack, 
  onUseEmailVerification,
  handleForgotPassword,
  isLoading 
}) => {
  const form = useForm<PasswordLoginFormValues>({
    resolver: zodResolver(passwordLoginSchema),
    defaultValues: { password: "" }
  });

  const handleSubmit = (data: PasswordLoginFormValues) => {
    onSubmit(data.password);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 h-auto"
          disabled={isLoading}
        >
          ← Back
        </Button>
        <div className="text-sm text-gray-600">
          Sign in to <span className="font-medium">{email}</span>
        </div>
      </div>

      <Form {...form} key="password-login-form">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 text-base"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span className=' underline text-blue-600' onClick={handleForgotPassword}>forgot-password?</span>

          <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center">
            <Button
              variant="link"
              onClick={onUseEmailVerification}
              className="text-sm"
              disabled={isLoading}
            >
              Use email verification instead
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordLoginStep;
