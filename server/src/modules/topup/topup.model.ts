import { Document, model, Schema, Types } from "mongoose";

export interface ITopup extends Document {
  userId: Types.ObjectId;
  amount: number;
  coins: number;
  paymentId: string;
  paymentStatus: 'pending' | 'success' | 'failed';
  paymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TopupSchema = new Schema<ITopup>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    coins: { type: Number, required: true },
    paymentId: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    paymentMethod: String,
  },
  { timestamps: true }
);

export const TopupModel = model<ITopup>('Topup', TopupSchema);
