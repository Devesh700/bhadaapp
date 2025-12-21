// src/services/email.service.ts
import { Resend } from 'resend';
import { sendEmail } from '../../services/email.service';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTPEmail = async (email: string, otp: string) => {
    console.log("Sending OTP email to:", email, "with OTP:", otp);
  await sendEmail({
    // from: 'onboarding@resend.dev', // Replace with your verified domain/sender
    to: email,
    subject: 'Your Bhada.in Verification Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Bhada.in!</h2>
        <p>Your verification code is:</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; color: #1f2937; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This email was sent by Bhada.in - Your trusted platform for finding the perfect home.
        </p>
      </div>
    `,
  });
  return otp;
};
