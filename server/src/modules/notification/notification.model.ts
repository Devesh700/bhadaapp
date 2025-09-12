import { Document, model, Schema, Types } from "mongoose";

export interface INotification extends Document {
  userId: Types.ObjectId;
  title: string;
  message: string;
  type: 'coin_credit' | 'coin_debit' | 'property_approved' | 'property_rejected' | 'new_registration';
  isRead: boolean;
  referenceId?: Types.ObjectId;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['coin_credit', 'coin_debit', 'property_approved', 'property_rejected', 'new_registration'],
      required: true,
    },
    isRead: { type: Boolean, default: false },
    referenceId: { type: Schema.Types.ObjectId },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const NotificationModel = model<INotification>('Notification', NotificationSchema);
