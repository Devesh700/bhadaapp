import { StringifyOptions } from "querystring";
import { IRequestStatus, IStatus } from ".";

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  authMethod?: 'email' | 'password' | 'google';
  hasPassword: boolean;
  role: 'user' | 'vendor' | 'admin';
  
  // Enhanced Profile Fields
  profile: {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
    occupation?: string;
    companyName?: string;
    bio?: string;
    preferredLanguage?: string;
    emergencyContact?: {
      name?: string;
      phone?: string;
      relationship?: string;
    };
  };
  
  // Verification & Contact
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  profilePicture?: string;
  
  // Address Information
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    landmark?: string;
    addressType?: 'home' | 'work' | 'other';
  };
  
  // Vendor/Owner Specific Fields
  businessDetails?: {
    businessName?: string;
    businessType?: 'real-estate-agent' | 'property-owner' | 'builder' | 'broker' | 'other';
    licenseNumber?: string;
    gstNumber?: string;
    panNumber?: string;
    aadharNumber?: string;
    businessAddress?: {
      street?: string;
      city?: string;
      state?: string;
      pincode?: string;
      country?: string;
    };
    experienceYears?: number;
    specialization?: string[];
    serviceAreas?: string[];
    workingHours?: {
      start?: string;
      end?: string;
      days?: string[];
    };
    socialLinks?: {
      website?: string;
      linkedin?: string;
      facebook?: string;
      instagram?: string;
    };
  };
  
  // Preferences & Settings
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      marketing: boolean;
    };
    privacy: {
      showPhone: boolean;
      showEmail: boolean;
      showAddress: boolean;
    };
    propertyAlerts?: {
      minPrice?: number;
      maxPrice?: number;
      propertyTypes?: string[];
      locations?: string[];
      features?: string[];
    };
  };
  
  // System Fields
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
  
  // Status & Verification
  isActive: boolean;
  isProfileComplete: boolean;
  isBusinessVerified?: boolean;
  roleUpgradeRequests?: {
    requestedRole: 'vendor';
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: Date;
    reviewedAt?: Date;
    reviewedBy?: string;
    notes?: string;
  }[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpgradeRequest {
  user: {
        name: string;
        email: string;
    };
    userId: string;
    _id?: string;
    requestedRole: "vendor";
    status: "pending" | "approved" | "rejected";
    requestedAt: Date;
    reviewedAt?: Date;
    reviewedBy?: string;
    notes?: string;
}

export interface UserState {
    user:IRequestStatus<IUser>;
    roleUpgradeRequests: IRequestStatus<IUpgradeRequest[]>
}

export interface ReviewUpgradeRequest {requestId: string, action :"approve" | "reject", notes?:string, userId:string}