import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

if (!process.env.EMAIL_ADDRESS || !process.env.EMAIL_PASSWORD) {
  console.error(
    "❌ Email credentials not configured. Please set EMAIL_ADDRESS and EMAIL_PASSWORD in .env file"
  );
}

console.log(
  "Email credentials:",
  process.env.EMAIL_ADDRESS,
  process.env.EMAIL_PASSWORD
);

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
}