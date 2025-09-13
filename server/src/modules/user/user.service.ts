// src/services/user.service.ts
import { UserModel, IUser } from '../user/user.model';
import { Types } from 'mongoose';

export const getUserProfile = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId)
      .select('-password')
      .populate('referredBy', 'name email');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updateData: Partial<IUser>) => {
  try {
    // Remove sensitive fields that shouldn't be updated via this method
    const sanitizedData = { ...updateData };
    delete sanitizedData.password;
    delete sanitizedData.role;
    delete sanitizedData.wallet;
    delete sanitizedData.loginStats;
    delete sanitizedData.isActive;
    delete sanitizedData.isEmailVerified;
    delete sanitizedData.isPhoneVerified;
    
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...sanitizedData,
        isProfileComplete: await checkProfileCompleteness(userId, sanitizedData),
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const requestRoleUpgrade = async (userId: string, requestData: {
  businessDetails: IUser['businessDetails'];
  additionalInfo?: string;
}) => {
  try {
    const user = await UserModel.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.role !== 'user') {
      throw new Error('Only users can request role upgrade');
    }
    
    // Check if there's already a pending request
    const pendingRequest = user.roleUpgradeRequests?.find(
      req => req.status === 'pending'
    );
    
    if (pendingRequest) {
      throw new Error('You already have a pending upgrade request');
    }
    
    // Add the upgrade request
    const upgradeRequest = {
      requestedRole: 'vendor' as const,
      status: 'pending' as const,
      requestedAt: new Date(),
      notes: requestData.additionalInfo,
    };
    
    user.businessDetails = requestData.businessDetails;
    user.roleUpgradeRequests = user.roleUpgradeRequests || [];
    user.roleUpgradeRequests.push(upgradeRequest);
    
    await user.save();
    
    return {
      success: true,
      message: 'Role upgrade request submitted successfully',
      requestId: upgradeRequest,
    };
  } catch (error) {
    throw error;
  }
};

export const uploadProfilePicture = async (userId: string, fileUrl: string) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { profilePicture: fileUrl },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserPreferences = async (
  userId: string, 
  preferences: Partial<IUser['preferences']>
) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { preferences } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Helper function to check profile completeness
const checkProfileCompleteness = async (
  userId: string, 
  userData?: Partial<IUser>
): Promise<boolean> => {
  const user = userData || await UserModel.findById(userId);
  
  if (!user) return false;
  
  const requiredFields = [
    user.name,
    user.email,
    user.phone,
    user.profile?.firstName,
    user.profile?.lastName,
    user.address?.city,
    user.address?.state,
  ];
  
  return requiredFields.every(field => field && field.trim() !== '');
};

export const getUserStats = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId).select('loginStats wallet createdAt');
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Calculate additional stats
    const accountAge = Math.floor(
      (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return {
      loginStats: user.loginStats,
      wallet: user.wallet,
      accountAge,
      memberSince: user.createdAt,
    };
  } catch (error) {
    throw error;
  }
};
