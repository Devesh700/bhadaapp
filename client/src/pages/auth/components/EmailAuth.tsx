// src/components/auth/EmailAuth.tsx
import React from "react";
import { useAuthService } from "@/hooks/useAuthService";
import { useAuthFlow } from "@/hooks/useAuthFlow";

// Lazy load step components
const EmailStep = React.lazy(() => import("./emailStep"));
const OTPStep = React.lazy(() => import("./otpStep"));
const PasswordLoginStep = React.lazy(() => import("./passwordLoginStep"));
const PasswordSetupStep = React.lazy(() => import("./passwordSetupStep"));

interface EmailAuthProps {
  onSuccess?: () => void;
}

const EmailAuth: React.FC<EmailAuthProps> = ({ onSuccess }) => {
  const authService = useAuthService();
  const authFlow = useAuthFlow();

  const handleEmailSubmit = async (email: string) => {
    try {
      const authCheck = await authService.checkEmail(email);
      authFlow.setEmailAndOptions(email, authCheck);
      debugger;
      if (authCheck.data.exists && authCheck.data.hasPassword) {
        authFlow.goToStep("password-login");
      } else {
        await authService.sendOTPCode(email);
        authFlow.goToStep("otp");
        authFlow.startCountdown(60);
      }
    } catch (error) {
      // Error handled by service
    }
  };

  const handlePasswordLoginSubmit = async (password: string) => {
    try {
        debugger;
      await authService.loginWithPassword(authFlow.email, password);
      onSuccess?.();
    } catch (error: any) {
      if (error.message.includes('email verification')) {
        await authService.sendOTPCode(authFlow.email);
        authFlow.goToStep("otp");
        authFlow.startCountdown(60);
      }
    }
  };

  const handleOTPSubmit = async (otp: string) => {
    try {
      const result = await authService.verifyOTP(authFlow.email, otp);
      authFlow.setVerifiedUserData(result);

      if (!result.user?.hasPassword) {
        authFlow.goToStep("password-setup");
        authFlow.showWelcomeMessage(result);
      } else {
        onSuccess?.();
      }
    } catch (error) {
      // Error handled by service
    }
  };

  const handlePasswordSetupSubmit = async (password: string) => {
    try {
      await authService.createPassword(password);
      onSuccess?.();
    } catch (error) {
      // Error handled by service
    }
  };

  const handlePasswordSetupSkip = () => {
    authFlow.showSkipMessage();
    onSuccess?.();
  };

  const handleResendOTP = async () => {
    try {
      await authService.resendOTPCode(authFlow.email);
      authFlow.startCountdown(60);
    } catch (error) {
      // Error handled by service
    }
  };

  const handleUseEmailVerification = async () => {
    try {
      await authService.sendOTPCode(authFlow.email);
      authFlow.goToStep("otp");
      authFlow.startCountdown(60);
    } catch (error) {
      // Error handled by service
    }
  };

  const renderStep = () => {
    switch (authFlow.step) {
      case "email":
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <EmailStep 
              onSubmit={handleEmailSubmit}
              isLoading={authService.isLoading}
            />
          </React.Suspense>
        );

      case "password-login":
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <PasswordLoginStep 
              email={authFlow.email}
              onSubmit={handlePasswordLoginSubmit}
              onBack={authFlow.goBack}
              onUseEmailVerification={handleUseEmailVerification}
              isLoading={authService.isLoading}
            />
          </React.Suspense>
        );

      case "otp":
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <OTPStep 
              email={authFlow.email}
              onSubmit={handleOTPSubmit}
              onBack={authFlow.goBack}
              onResendOTP={handleResendOTP}
              countdown={authFlow.countdown}
              isLoading={authService.isLoading}
            />
          </React.Suspense>
        );

      case "password-setup":
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <PasswordSetupStep 
              onSubmit={handlePasswordSetupSubmit}
              onSkip={handlePasswordSetupSkip}
              isLoading={authService.isLoading}
            />
          </React.Suspense>
        );

      default:
        return null;
    }
  };

  return <div className="auth-container">{renderStep()}</div>;
};

export default EmailAuth;
