import { UserModel } from '../user/user.model';
import { creditCoins } from '../../utils/coin-manager';
import { generateReferralCode } from '../../utils/referals.utils';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { Request } from 'express';

interface RegisterUserInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  referredBy?: string;
}

export const registerUser = async (userData: RegisterUserInput, role: 'user' | 'vendor') => {
  const initialCoins = role === 'user' ? 40 : 50;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ 
      $or: [{ email: userData.email }, { phone: userData.phone }] 
    });
    
    if (existingUser) {
      throw new Error('User already exists with this email or phone');
    }

    // Generate referral code
    const referralCode = await generateReferralCode();

    // Handle referredBy logic
    let referredByObjectId = undefined;
    if (userData.referredBy) {
      const referrer = await UserModel.findOne({ referralCode: userData.referredBy });
      if (referrer) {
        referredByObjectId = referrer._id;
      }
    }

    // Create new user - let the pre-save hook handle password hashing
    const newUser = new UserModel({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password, // This will be hashed by pre-save hook
      role,
      referralCode,
      referredBy: referredByObjectId,
      wallet: {
        coins: initialCoins,
        totalEarned: initialCoins,
        totalSpent: 0,
      },
      loginStats: {
        dailyLoginCount: 0,
        totalLogins: 0,
      },
      isEmailVerified: false,
      isPhoneVerified: false,
      isActive: true,
    });

    // Save the user (this triggers the pre-save hook)
    await newUser.save();

    // Handle referral bonus AFTER user is saved
    if (referredByObjectId) {
      await creditCoins(referredByObjectId.toString(), 20, 'referral', newUser._id);
      await creditCoins(newUser._id as string, 10, 'referral', referredByObjectId);
    }

    // Return user without password
    const userResponse = newUser.toObject();
    
    return userResponse;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};



export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // JWT Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  });

  // Update login stats
  const today = new Date().toDateString();
  const lastLogin = user.loginStats.lastLoginDate?.toDateString();

  // Reset daily login count if new day
  if (today !== lastLogin) {
    user.loginStats.dailyLoginCount = 0;
  }

  user.loginStats.lastLoginDate = new Date();
  user.loginStats.totalLogins += 1;
  await user.save();

  return { token, user };
};

export const handleDailyLogin = async (userId: string, role: 'user' | 'vendor' | 'admin') => {
  const maxLogins = role === 'user' ? 3 : 4;
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  // Reset daily login if date changed
  const today = new Date().toDateString();
  const lastLoginDate = user.loginStats.lastLoginDate
    ? new Date(user.loginStats.lastLoginDate).toDateString()
    : null;

  if (lastLoginDate !== today) {
    user.loginStats.dailyLoginCount = 0;
  }

  if (user.loginStats.dailyLoginCount < maxLogins) {
    await creditCoins(userId, 5, 'daily_login');

    user.loginStats.dailyLoginCount += 1;
    user.loginStats.lastLoginDate = new Date();
    user.loginStats.totalLogins += 1;

    await user.save();
    return { success: true, message: 'Login bonus credited' };
  }

  return { success: false, message: 'Daily login limit reached' };
};


export const getMe = async (req:Request) => {
  const userId = req.user?._id;
  if(!userId) throw new Error('User not found');

  const user = await UserModel.findById(userId).select('-password');
  if(!user) throw new Error('User not found');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  });

  return {user, token};
}