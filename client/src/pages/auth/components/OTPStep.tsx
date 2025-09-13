// src/components/auth/steps/OTPStep.tsx
import React, { useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield, Timer } from "lucide-react";
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
import { useAuthFlow } from '@/hooks/useAuthFlow';

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
  handleBackToLogin: () => void;
  forgotPassword?:boolean;
}

const OTPStep: React.FC<OTPStepProps> = ({ 
  email, 
  onSubmit, 
  onBack, 
  onResendOTP, 
  countdown, 
  forgotPassword,
  handleBackToLogin,
  isLoading 
}) => {
  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" }
  });

  const authFlow = useAuthFlow();
  const handleSubmit = (data: OTPFormValues) => {
    onSubmit(data.otp);
  };

useEffect(()=> {
  console.log("authFlow.forgotPassword changed", forgotPassword)
},[forgotPassword])
  const label = useMemo(()=> forgotPassword ? "Verification code to reset your password has been sent to" : "Code sent to",[authFlow]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 h-auto"
          disabled={isLoading}
        >
          ← Back
        </Button>
        <div className="text-sm text-gray-600">
          {label} <span className="font-medium">{email}</span>
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

          {forgotPassword && (
            <span className='underline cursor-pointer text-blue-500 flex items-center gap-1' 
            onClick={handleBackToLogin}>
             <ArrowLeft/> Back to Login
            </span>
          )}

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
