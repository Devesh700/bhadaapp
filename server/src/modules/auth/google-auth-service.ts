// src/services/google-auth.service.ts
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { UserModel } from '../user/user.model';
import { creditCoins } from '../../utils/coin-manager';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface GoogleTokenPayload {
  sub: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email_verified: boolean;
}

export const verifyGoogleToken = async (credential: string): Promise<GoogleTokenPayload> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    if (!payload) {
      throw new Error('Invalid Google token payload');
    }
    
    return {
      sub: payload.sub,
      email: payload.email!,
      name: payload.name!,
      given_name: payload.given_name!,
      family_name: payload.family_name!,
      picture: payload.picture!,
      email_verified: payload.email_verified!,
    };
  } catch (error) {
    console.error('Google token verification failed:', error);
    throw new Error('Invalid Google token');
  }
};

export const authenticateWithGoogle = async (credential: string) => {
  try {
    const googleUser = await verifyGoogleToken(credential);
    
    // Check if user exists
    let user = await UserModel.findOne({ email: googleUser.email });
    let isNewUser = false;
    
    if (!user) {
      // Create new user from Google data
      isNewUser = true;
      const referralCode = await generateReferralCode();
      const initialCoins = 40; // Default user coins
      
      user = new UserModel({
        name: googleUser.name,
        email: googleUser.email,
        profile: {
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
        },
        profilePicture: googleUser.picture,
        role: 'user',
        authMethod: 'google',
        hasPassword: false,
        isEmailVerified: true, // Google emails are pre-verified
        referralCode,
        wallet: {
          coins: initialCoins,
          totalEarned: initialCoins,
          totalSpent: 0,
        },
        loginStats: {
          dailyLoginCount: 0,
          totalLogins: 0,
        },
        preferences: {
          notifications: {
            email: true,
            sms: false,
            push: true,
            marketing: false,
          },
          privacy: {
            showPhone: false,
            showEmail: false,
            showAddress: false,
          },
        },
        isActive: true,
        isProfileComplete: false,
      });
      
      await user.save();
    } else {
      // Update existing user's Google info if needed
      let shouldUpdate = false;
      
      if (!user.profilePicture && googleUser.picture) {
        user.profilePicture = googleUser.picture;
        shouldUpdate = true;
      }
      
      if (user.authMethod !== 'google') {
        user.authMethod = 'google';
        shouldUpdate = true;
      }
      
      if (!user.isEmailVerified) {
        user.isEmailVerified = true;
        shouldUpdate = true;
      }
      
      if (shouldUpdate) {
        await user.save();
      }
    }
    
    // Handle daily login for existing users
    if (!isNewUser) {
      await handleDailyLogin(String(user._id), user.role);
      // Refresh user data after daily login
      user = await UserModel.findById(user._id);
    }
    
    if (!user) throw new Error('User not found after update');
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    });
    
    // Update login stats
    const today = new Date().toDateString();
    const lastLogin = user.loginStats.lastLoginDate?.toDateString();
    
    if (today !== lastLogin) {
      user.loginStats.dailyLoginCount = 0;
    }
    
    user.loginStats.lastLoginDate = new Date();
    user.loginStats.totalLogins += 1;
    await user.save();
    
    return {
      token,
      data: user.toObject(),
      isNewUser
    };
  } catch (error) {
    throw error;
  }
};

// Helper function to generate referral code
const generateReferralCode = async (): Promise<string> => {
  let code: string;
  let exists: boolean;
  
  do {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const existingUser = await UserModel.findOne({ referralCode: code });
    exists = !!existingUser;
  } while (exists);
  
  return code;
};

// Handle daily login bonus
const handleDailyLogin = async (userId: string, role: string) => {
  const user = await UserModel.findById(userId);
  if (!user) return;
  
  const today = new Date().toDateString();
  const lastLogin = user.loginStats.lastLoginDate?.toDateString();
  
  // Check if it's a new day
  if (today !== lastLogin) {
    user.loginStats.dailyLoginCount = 0;
  }
  
  // Award daily login bonus
  const maxLogins = role === 'admin' ? 4 : 3;
  if (user.loginStats.dailyLoginCount < maxLogins) {
    await creditCoins(userId, 5, 'daily_login');
    user.loginStats.dailyLoginCount += 1;
    await user.save();
  }
};
