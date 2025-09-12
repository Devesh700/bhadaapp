// // src/services/auth.service.ts
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import crypto from 'crypto';
// import { UserModel, IUser } from '../user/user.model';
// import { sendOTPEmail } from './email.service';
// import { creditCoins } from '../../utils/coin-manager';
// import { Request } from 'express';

// // OTP Storage (in production, use Redis)
// const otpStore = new Map<string, { otp: string; expiresAt: Date; attempts: number }>();

// export const sendOTP = async (email: string) => {
//   try {
//     // Generate 6-digit OTP
//     const otp = Math.random().toString().substr(2, 6);
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
//     // Store OTP
//     otpStore.set(email, { otp, expiresAt, attempts: 0 });
    
//     // Send OTP via email
//     const otpSent = await sendOTPEmail(email, otp);
    
//     return { success: true, message: 'OTP sent successfully', otpSent };
//   } catch (error) {
//     throw new Error('Failed to send OTP');
//   }
// };

// export const verifyOTPAndAuth = async (email: string, otp: string, userType?: 'user' | 'owner' | 'admin') => {
//   try {
//     // Check OTP
//     const otpData = otpStore.get(email);
    
//     if (!otpData) {
//       throw new Error('OTP not found or expired');
//     }
    
//     if (otpData.expiresAt < new Date()) {
//       otpStore.delete(email);
//       throw new Error('OTP expired');
//     }
    
//     if (otpData.attempts >= 3) {
//       otpStore.delete(email);
//       throw new Error('Too many failed attempts');
//     }
    
//     if (otpData.otp !== otp) {
//       otpData.attempts++;
//       throw new Error('Invalid OTP');
//     }
    
//     // OTP verified, remove from store
//     otpStore.delete(email);
    
//     // Check if user exists
//     let user = await UserModel.findOne({ email });
//     let isNewUser = false;
    
//     if (!user) {
//       // Create new user
//       isNewUser = true;
//       const referralCode = await generateReferralCode();
//       const defaultUserType = userType || 'user';
//       const initialCoins = defaultUserType === 'user' ? 40 : defaultUserType === 'owner' ? 50 : 100;
      
//       user = new UserModel({
//         name: email.split('@')[0], // Use email prefix as default name
//         email,
//         phone: '', // Can be updated later
//         password: crypto.randomBytes(32).toString('hex'), // Random password
//         role: defaultUserType,
//         referralCode,
//         wallet: {
//           coins: initialCoins,
//           totalEarned: initialCoins,
//           totalSpent: 0,
//         },
//         loginStats: {
//           dailyLoginCount: 0,
//           totalLogins: 0,
//         },
//         isEmailVerified: true, // Email is verified via OTP
//         isPhoneVerified: false,
//         isActive: true,
//       });
      
//       await user.save();
//     }
    
//     // Handle daily login for existing users
//     if (!isNewUser) {
//       await handleDailyLogin(String(user._id), user.role);
//       // Refresh user data after daily login
//       user = await UserModel.findById(user._id);
//     }

//     if (!user) throw new Error('User not found');

    
//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
//       expiresIn: '7d'
//     });
    
//     // Update login stats
//     const today = new Date().toDateString();
//     const lastLogin = user.loginStats.lastLoginDate?.toDateString();
    
//     if (today !== lastLogin) {
//       user.loginStats.dailyLoginCount = 0;
//     }
    
//     user.loginStats.lastLoginDate = new Date();
//     user.loginStats.totalLogins += 1;
//     await user.save();
    
//     return {
//       token,
//       user: user.toObject(),
//       isNewUser
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// // export const handleDailyLogin = async (userId: string, role: string) => {
// //   const user = await UserModel.findById(userId);
// //   if (!user) return;
  
// //   const today = new Date().toDateString();
// //   const lastLogin = user.loginStats.lastLoginDate?.toDateString();
  
// //   // Check if it's a new day
// //   if (today !== lastLogin) {
// //     user.loginStats.dailyLoginCount = 0;
// //   }
  
// //   // Award daily login bonus
// //   const maxLogins = role === 'admin' ? 4 : 3;
// //   if (user.loginStats.dailyLoginCount < maxLogins) {
// //     await creditCoins(userId, 5, 'daily_login');
// //     user.loginStats.dailyLoginCount += 1;
// //     await user.save();
// //   }
// // };

// const generateReferralCode = async (): Promise<string> => {
//   let code: string;
//   let exists: boolean;
  
//   do {
//     code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     const existingUser = await UserModel.findOne({ referralCode: code });
//     exists = !!existingUser;
//   } while (exists);
  
//   return code;
// };

// // Legacy login method (keep for backward compatibility)
// export const loginUser = async (email: string, password: string) => {
//   const user = await UserModel.findOne({ email });
//   if (!user) throw new Error('User not found');
  
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error('Invalid credentials');
  
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
//     expiresIn: '7d'
//   });
  
//   await handleDailyLogin(String(user._id), user.role);
  
//   return { token, user };
// };


// export const registerUser = async (userData: IUser, role: 'user' | 'vendor') => {
//   const initialCoins = role === 'user' ? 40 : 50;

//   try {
//     // Check if user already exists
//     const existingUser = await UserModel.findOne({ 
//       $or: [{ email: userData.email }, { phone: userData.phone }] 
//     });
    
//     if (existingUser) {
//       throw new Error('User already exists with this email or phone');
//     }

//     // Generate referral code
//     const referralCode = await generateReferralCode();

//     // Handle referredBy logic
//     let referredByObjectId = undefined;
//     if (userData.referredBy) {
//       const referrer = await UserModel.findOne({ referralCode: userData.referredBy });
//       if (referrer) {
//         referredByObjectId = referrer._id;
//       }
//     }

//     // Create new user - let the pre-save hook handle password hashing
//     const newUser = new UserModel({
//       name: userData.name,
//       email: userData.email,
//       phone: userData.phone,
//       password: userData.password, // This will be hashed by pre-save hook
//       role,
//       referralCode,
//       referredBy: referredByObjectId,
//       wallet: {
//         coins: initialCoins,
//         totalEarned: initialCoins,
//         totalSpent: 0,
//       },
//       loginStats: {
//         dailyLoginCount: 0,
//         totalLogins: 0,
//       },
//       isEmailVerified: false,
//       isPhoneVerified: false,
//       isActive: true,
//     });

//     // Save the user (this triggers the pre-save hook)
//     await newUser.save();

//     // Handle referral bonus AFTER user is saved
//     if (referredByObjectId) {
//       await creditCoins(referredByObjectId.toString(), 20, 'referral', newUser._id);
//       await creditCoins(newUser._id as string, 10, 'referral', referredByObjectId);
//     }

//     // Return user without password
//     const userResponse = newUser.toObject();
    
//     return userResponse;
//   } catch (error) {
//     console.error('Registration error:', error);
//     throw error;
//   }
// };


// export const handleDailyLogin = async (userId: string, role: 'user' | 'vendor' | 'admin') => {
//   const maxLogins = role === 'user' ? 3 : 4;
//   const user = await UserModel.findById(userId);
//   if (!user) throw new Error('User not found');

//   // Reset daily login if date changed
//   const today = new Date().toDateString();
//   const lastLoginDate = user.loginStats.lastLoginDate
//     ? new Date(user.loginStats.lastLoginDate).toDateString()
//     : null;

//   if (lastLoginDate !== today) {
//     user.loginStats.dailyLoginCount = 0;
//   }

//   if (user.loginStats.dailyLoginCount < maxLogins) {
//     await creditCoins(userId, 5, 'daily_login');

//     user.loginStats.dailyLoginCount += 1;
//     user.loginStats.lastLoginDate = new Date();
//     user.loginStats.totalLogins += 1;

//     await user.save();
//     return { success: true, message: 'Login bonus credited' };
//   }

//   return { success: false, message: 'Daily login limit reached' };
// };


// export const getMe = async (req:Request) => {
//   const userId = req.user?._id;
//   if(!userId) throw new Error('User not found');

//   const user = await UserModel.findById(userId).select('-password');
//   if(!user) throw new Error('User not found');

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
//     expiresIn: '7d'
//   });

//   return {user, token};
// }





// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { UserModel, IUser } from '../user/user.model';
import { sendOTPEmail } from './email.service';
import { creditCoins } from '../../utils/coin-manager';
import { Request } from 'express';

// OTP Storage (in production, use Redis)
const otpStore = new Map<string, { otp: string; expiresAt: Date; attempts: number }>();

export const sendOTP = async (email: string) => {
  try {
    // Generate 6-digit OTP
    const otp = Math.random().toString().substr(2, 6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Store OTP
    otpStore.set(email, { otp, expiresAt, attempts: 0 });
    
    // Send OTP via email
    const otpSent = await sendOTPEmail(email, otp);
    
    return { success: true, message: 'OTP sent successfully', otpSent };
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

export const verifyOTPAndAuth = async (email: string, otp: string, userType?: 'user' | 'vendor' | 'admin') => {
  try {
    // Check OTP
    const otpData = otpStore.get(email);
    
    if (!otpData) {
      throw new Error('OTP not found or expired');
    }
    
    if (otpData.expiresAt < new Date()) {
      otpStore.delete(email);
      throw new Error('OTP expired');
    }
    
    if (otpData.attempts >= 3) {
      otpStore.delete(email);
      throw new Error('Too many failed attempts');
    }
    
    if (otpData.otp !== otp) {
      otpData.attempts++;
      throw new Error('Invalid OTP');
    }
    
    // OTP verified, remove from store
    otpStore.delete(email);
    
    // Check if user exists
    let user = await UserModel.findOne({ email });
    let isNewUser = false;
    
    if (!user) {
      // Create new user WITHOUT password
      isNewUser = true;
      const referralCode = await generateReferralCode();
      const defaultUserType = userType || 'user';
      const initialCoins = defaultUserType === 'user' ? 40 : defaultUserType === 'vendor' ? 50 : 100;
      
      user = new UserModel({
        name: email.split('@')[0], // Use email prefix as default name
        email,
        phone: '', // Can be updated later
        // NO PASSWORD SET - user can set it later if they want
        hasPassword: false,
        authMethod: 'email',
        role: defaultUserType,
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
        isEmailVerified: true, // Email is verified via OTP
        isPhoneVerified: false,
        isActive: true,
      });
      
      await user.save();
    }
    
    // Handle daily login for existing users
    if (!isNewUser) {
      await handleDailyLogin(String(user._id), user.role);
      // Refresh user data after daily login
      user = await UserModel.findById(user._id);
    }

    if (!user) throw new Error('User not found');
    
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

// Enhanced legacy login method
export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');
  
  // Check if user has a password set
  if (!user.hasPassword || !user.password) {
    throw new Error('This account was created with email verification. Please use "Continue with Email" to sign in, or set a password first.');
  }
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  });
  
  await handleDailyLogin(String(user._id), user.role);
  
  return { token, user };
};

// New method to set password for OTP users
export const setPassword = async (userId: string, newPassword: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');
  
  user.password = newPassword; // Will be hashed by pre-save hook
  user.hasPassword = true;
  user.authMethod = 'password'; // Update auth method
  
  await user.save();
  
  return { success: true, message: 'Password set successfully' };
};

// Method to check if user can login with password
export const canLoginWithPassword = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) return { exists: false, hasPassword: false };
  
  return { 
    exists: true, 
    hasPassword: user.hasPassword,
    authMethod: user.authMethod 
  };
};

// Rest of your existing functions remain the same...
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

export const registerUser = async (userData: any, role: 'user' | 'vendor') => {
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
      hasPassword: true,
      authMethod: 'password',
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
      await creditCoins(String(newUser._id), 10, 'referral', referredByObjectId);
    }

    // Return user without password
    const userResponse = newUser.toObject();
    
    return userResponse;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
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

export const getMe = async (req: Request) => {
  const userId = req.user?._id;
  if(!userId) throw new Error('User not found');

  const user = await UserModel.findById(userId).select('-password');
  if(!user) throw new Error('User not found');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  });

  return {user, token};
}
