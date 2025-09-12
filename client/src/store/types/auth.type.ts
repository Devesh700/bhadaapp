export interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'vendor' | 'admin';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profilePicture?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  wallet: {
    coins: number;
    totalEarned: number;
    totalSpent: number;
  };
  loginStats: {
    dailyLoginCount: number;
    lastLoginDate?: Date;
    totalLogins: number;
  };
  referralCode: string;
  referredBy?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  dailyLoginReward: any | null;
  otpSend: boolean;
  otpVerified: boolean;
}
