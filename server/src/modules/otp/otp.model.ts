import { model, Schema } from "mongoose";

export interface IOtp extends Document {
  email?: string;
  phone?: string;
  otp: string;
  purpose: 'registration' | 'forgot_password' | 'phone_verification';
  isUsed: boolean;
  expiresAt: Date;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    email: String,
    phone: String,
    otp: { type: String, required: true },
    purpose: { type: String, enum: ['registration', 'forgot_password', 'phone_verification'], required: true },
    isUsed: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const OtpModel = model<IOtp>('Otp', OtpSchema);
