import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt'

// ================= USER =================
export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  authMethod?: 'email' | 'password' | 'google';
  hasPassword: boolean;
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
  referredBy?: Types.ObjectId;
  isActive: boolean;
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
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    authMethod: { type: String, enum: ['email', 'password', 'google'], default: 'email' },
    hasPassword: { type: Boolean, default: false },
    profilePicture: String,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    wallet: {
      coins: { type: Number, default: 0 },
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
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && !this.password.startsWith('$2b$')) {
    try {
      const encryptedPassword = await bcrypt.hash(this.password, 10);
      this.password = encryptedPassword;
    } catch (error) {
      return next(error as Error);
    }
  }
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
export const UserModel = model<IUser>('User', UserSchema);
