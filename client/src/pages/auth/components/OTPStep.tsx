// src/components/auth/steps/OTPStep.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Timer } from "lucide-react";
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

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type OTPFormValues = z.infer<typeof otpSchema>;

interface OTPStepProps {
  email: string;
  onSubmit: (otp: string) => Promise<void>;
  onBack: () => void;
  onResendOTP: () => Promise<void>;
  countdown: number;
  isLoading: boolean;
}

const OTPStep: React.FC<OTPStepProps> = ({ 
  email, 
  onSubmit, 
  onBack, 
  onResendOTP, 
  countdown, 
  isLoading 
}) => {
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" }
  });

  const handleSubmit = (data: OTPFormValues) => {
    onSubmit(data.otp);
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
          Code sent to <span className="font-medium">{email}</span>
        </div>
      </div>

      <Form {...form} key="otp-form">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Verification Code
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter 6-digit code"
                    className="h-12 text-base text-center tracking-widest"
                    maxLength={6}
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
                Verifying...
              </div>
            ) : (
              "Verify & Continue"
            )}
          </Button>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                <Timer className="w-4 h-4" />
                Resend code in {countdown}s
              </p>
            ) : (
              <Button
                variant="link"
                onClick={onResendOTP}
                disabled={isLoading}
                className="text-sm"
              >
                Resend verification code
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPStep;
