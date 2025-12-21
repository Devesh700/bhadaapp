// import { Schema, model, Document, Types } from 'mongoose';
// import bcrypt from 'bcrypt'

// // ================= USER =================
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   authMethod?: 'email' | 'password' | 'google';
//   hasPassword: boolean;
//   role: 'user' | 'vendor' | 'admin';
//   isEmailVerified: boolean;
//   isPhoneVerified: boolean;
//   profilePicture?: string;
//   address?: {
//     street?: string;
//     city?: string;
//     state?: string;
//     pincode?: string;
//   };
//   wallet: {
//     coins: number;
//     totalEarned: number;
//     totalSpent: number;
//   };
//   loginStats: {
//     dailyLoginCount: number;
//     lastLoginDate?: Date;
//     totalLogins: number;
//   };
//   referralCode: string;
//   referredBy?: Types.ObjectId;
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const UserSchema = new Schema<IUser>(
//   {
//     name: { type: String },
//     email: { type: String, unique: true, required: true },
//     phone: { type: String },
//     password: { type: String },
//     role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
//     isEmailVerified: { type: Boolean, default: false },
//     isPhoneVerified: { type: Boolean, default: false },
//     authMethod: { type: String, enum: ['email', 'password', 'google'], default: 'email' },
//     hasPassword: { type: Boolean, default: false },
//     profilePicture: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },
//     wallet: {
//       coins: { type: Number, default: 0 },
//       totalEarned: { type: Number, default: 0 },
//       totalSpent: { type: Number, default: 0 },
//     },
//     loginStats: {
//       dailyLoginCount: { type: Number, default: 0 },
//       lastLoginDate: Date,
//       totalLogins: { type: Number, default: 0 },
//     },
//     referralCode: { type: String, unique: true },
//     referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// UserSchema.pre("save", async function (next) {
//   if (this.isModified("password") && !this.password.startsWith('$2b$')) {
//     try {
//       const encryptedPassword = await bcrypt.hash(this.password, 10);
//       this.password = encryptedPassword;
//     } catch (error) {
//       return next(error as Error);
//     }
//   }
//   next();
// });

// UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };
// export const UserModel = model<IUser>('User', UserSchema);




import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

// ================= USER =================
export interface IUser extends Document {
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
  referredBy?: Types.ObjectId;
  
  // Status & Verification
  isActive: boolean;
  isProfileComplete: boolean;
  isBusinessVerified?: boolean;
  roleUpgradeRequests?: {
    _id?: Types.ObjectId;
    requestedRole: 'vendor';
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: Date;
    reviewedAt?: Date;
    reviewedBy?: Types.ObjectId;
    notes?: string;
  }[];
  
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    password: { type: String },
    role: { type: String, enum: ['user', 'vendor', 'admin'], default: 'user' },
    authMethod: { type: String, enum: ['email', 'password', 'google'], default: 'email' },
    hasPassword: { type: Boolean, default: false },
    
    // Enhanced Profile
    profile: {
      firstName: String,
      lastName: String,
      dateOfBirth: Date,
      gender: { 
        type: String, 
        enum: ['male', 'female', 'other', 'prefer-not-to-say'] 
      },
      occupation: String,
      companyName: String,
      bio: String,
      preferredLanguage: { type: String, default: 'english' },
      emergencyContact: {
        name: String,
        phone: String,
        relationship: String,
      },
    },
    
    // Verification
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    profilePicture: String,
    
    // Address
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' },
      landmark: String,
      addressType: { 
        type: String, 
        enum: ['home', 'work', 'other'], 
        default: 'home' 
      },
    },
    
    // Business Details for Vendors
    businessDetails: {
      businessName: String,
      businessType: {
        type: String,
        enum: ['real-estate-agent', 'property-owner', 'builder', 'broker', 'other']
      },
      licenseNumber: String,
      gstNumber: String,
      panNumber: String,
      aadharNumber: String,
      businessAddress: {
        street: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
      },
      experienceYears: Number,
      specialization: [String],
      serviceAreas: [String],
      workingHours: {
        start: String,
        end: String,
        days: [String],
      },
      socialLinks: {
        website: String,
        linkedin: String,
        facebook: String,
        instagram: String,
      },
    },
    
    // Preferences
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        marketing: { type: Boolean, default: false },
      },
      privacy: {
        showPhone: { type: Boolean, default: false },
        showEmail: { type: Boolean, default: false },
        showAddress: { type: Boolean, default: false },
      },
      propertyAlerts: {
        minPrice: Number,
        maxPrice: Number,
        propertyTypes: [String],
        locations: [String],
        features: [String],
      },
    },
    
    // System Fields
    wallet: {
      coins: { type: Number, default: 30 },
      totalEarned: { type: Number, default: 0 },
      totalSpent: { type: Number, default: 0 },
    },
    loginStats: {
      dailyLoginCount: { type: Number, default: 0 },
      lastLoginDate: Date,
      totalLogins: { type: Number, default: 0 },
    },
    referralCode: { type: String, unique: true },
    referredBy: { type: Schema.Types.ObjectId, ref: 'User' },
    
    // Status
    isActive: { type: Boolean, default: true },
    isProfileComplete: { type: Boolean, default: false },
    isBusinessVerified: { type: Boolean, default: false },
    roleUpgradeRequests: [{
      requestedRole: { type: String, enum: ['vendor'] },
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      requestedAt: { type: Date, default: Date.now },
      reviewedAt: Date,
      reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      notes: String,
    }],
  },
  { timestamps: true }
);

// Pre-save hook for password hashing
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password && !this.password.startsWith('$2b$')) {
    try {
      const encryptedPassword = await bcrypt.hash(this.password, 10);
      this.password = encryptedPassword;
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUser>('User', UserSchema);
