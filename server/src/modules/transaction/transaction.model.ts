import { Document, model, Schema, Types } from "mongoose";

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  transactionType: 'credit' | 'debit';
  amount: number;
  reason:
    | 'registration'
    | 'daily_login'
    | 'referral'
    | 'contact_view'
    | 'whatsapp_contact'
    | 'property_search'
    | 'property_listing'
    | 'prime_listing'
    | 'verification_badge'
    | 'rejection_penalty'
    | 'topup';
  referenceId?: Types.ObjectId;
  description?: string;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transactionType: { type: String, enum: ['credit', 'debit'], required: true },
    amount: { type: Number, required: true },
    reason: {
      type: String,
      enum: [
        'registration',
        'daily_login',
        'referral',
        'contact_view',
        'whatsapp_contact',
        'property_search',
        'property_listing',
        'prime_listing',
        'verification_badge',
        'rejection_penalty',
        'topup',
      ],
      required: true,
    },
    referenceId: { type: Schema.Types.ObjectId },
    description: String,
    balanceBefore: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const TransactionModel = model<ITransaction>('Transaction', TransactionSchema);
