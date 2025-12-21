// src/components/auth/GoogleAuth.tsx
import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { googleAuth } from "@/store/thunks/auth.thunk";
import { selectIsLoading } from "@/store/selectors/auth.selector";

interface GoogleAuthProps {
  onSuccess?: () => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const { toast } = useToast();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
       
      if (!credentialResponse.credential) {
        throw new Error('No credential received from Google');
      }

      const result = await dispatch(googleAuth({
        credential: credentialResponse.credential
      })).unwrap();

      // Show appropriate success message
      if (result.isNewUser) {
        toast({
          title: "Welcome to Bhada.in! 🎉",
          description: `Account created successfully! You've earned ${result?.data?.wallet?.coins} welcome coins!`,
        });
      } else {
        const { dailyLoginCount, role } = result.data.loginStats;
        const maxLogins = role === "admin" ? 4 : 3;
        
        if (dailyLoginCount < maxLogins) {
          toast({
            title: "Daily Login Bonus! 🪙",
            description: "5 Coins awarded for today's login!",
          });
        } else {
          toast({
            title: "Welcome back! 👋",
            description: "Successfully signed in with Google",
          });
        }
      }

      onSuccess?.();
    } catch (error: any) {
      console.error('Google authentication error:', error);
      toast({
        title: "Authentication Failed",
        description: error.message || "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleError = () => {
    toast({
      title: "Authentication Cancelled",
      description: "Google sign-in was cancelled or failed",
      variant: "destructive",
    });
  };

  return (
    <div className="w-full">
      {/* Custom styled Google Login Button */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        auto_select={false}
        theme="outline"
        size="large"
        width="100%"
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
        locale="en"
      />
      
      {/* Loading state overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-600">Signing in...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
