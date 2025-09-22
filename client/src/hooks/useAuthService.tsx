import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { useToast } from "@/hooks/use-toast";
import { 
  sendOTP, 
  verifyOTPAndAuth, 
  resendOTP,
  checkEmailAuth,
  loginUser,
  setPassword
} from "@/store/thunks/auth.thunk";
import { selectIsLoading } from "@/store/selectors/auth.selector";

export const useAuthService = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const { toast } = useToast();

  const checkEmail = async (email: string) => {
    try {
      const result = await dispatch(checkEmailAuth({ email })).unwrap();
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check email. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const sendOTPCode = async (email: string, type?:string) => {
    try {
      const result = await dispatch(sendOTP({ email, type })).unwrap();
      toast({
        title: "OTP Sent! 📧",
        description: "Check your email for the verification code",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const verifyOTP = async (email: string, otp: string, type?:string) => {
    try {
      const result = await dispatch(verifyOTPAndAuth({ email, otp, type })).unwrap();
      return result;
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please check your code and try again",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resendOTPCode = async (email: string) => {
    try {
      const result = await dispatch(resendOTP({ email })).unwrap();
      toast({
        title: "OTP Resent 📧",
        description: "A new code has been sent to your email",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP",
        variant: "destructive",
      });
      throw error;
    }
  };

  const loginWithPassword = async (email: string, password: string) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      toast({
        title: "Welcome back! 👋",
        description: "Successfully signed in to your account",
      });
      return result;
    } catch (error: any) {
      if (error.message.includes('email verification')) {
        toast({
          title: "Use Email Verification",
          description: "This account uses email verification to sign in",
        });
      } else {
        toast({
          title: "Login Failed",
          description: error.message || "Invalid credentials",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const createPassword = async (password: string) => {
    try {
      const result = await dispatch(setPassword({ password })).unwrap();
      toast({
        title: "Password Created! 🔐",
        description: "Your account is now secured with a password",
      });
      return result;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to set password",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    checkEmail,
    sendOTPCode,
    verifyOTP,
    resendOTPCode,
    loginWithPassword,
    createPassword,
    isLoading,
  };
};
