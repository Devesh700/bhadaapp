// src/hooks/useAuthFlow.ts
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type AuthStep = "email" | "otp" | "password-login" | "password-setup";

interface AuthOptions {
  hasPassword: boolean;
  authMethod: string;
  exists: boolean;
}

export const useAuthFlow = () => {
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [authOptions, setAuthOptions] = useState<AuthOptions | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [verifiedUserData, setVerifiedUserData] = useState<any>(null);
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const goToStep = (newStep: AuthStep) => {
    setStep(newStep);
  };

  const goBack = () => {
    setStep("email");
  };

  const setEmailAndOptions = (emailValue: string, options: AuthOptions) => {
    setEmail(emailValue);
    setAuthOptions(options);
  };

  const startCountdown = (seconds: number = 60) => {
    setCountdown(seconds);
  };

  const showWelcomeMessage = (result: any) => {
    if (result.isNewUser) {
      toast({
        title: "Welcome to Bhada.in! 🎉",
        description: `Account created! You've earned ${result.user.wallet.coins} welcome coins!`,
      });
    } else {
      toast({
        title: "Account Verified! ✅",
        description: "Let's secure your account with a password",
      });
    }
  };

  const showSkipMessage = () => {
    toast({
      title: "You can set a password later",
      description: "Password setup is available in your profile settings",
    });
  };

  return {
    step,
    email,
    authOptions,
    countdown,
    verifiedUserData,
    setVerifiedUserData,
    goToStep,
    goBack,
    setEmailAndOptions,
    startCountdown,
    showWelcomeMessage,
    showSkipMessage,
  };
};
