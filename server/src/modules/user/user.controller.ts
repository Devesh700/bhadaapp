// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import * as userService from './user.service';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    
    const user = await userService.getUserProfile(userId as string);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    
    const updatedUser = await userService.updateUserProfile(userId as string, req.body);
    
    res.json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const requestRoleUpgrade = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    
    const result = await userService.requestRoleUpgrade(userId as string, req.body);
    
    res.json({
      success: true,
      data: result,
      message: 'Role upgrade request submitted successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    const { fileUrl } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    
    if (!fileUrl) {
      return res.status(400).json({
        success: false,
        message: 'File URL is required'
      });
    }
    
    const updatedUser = await userService.uploadProfilePicture(userId as string, fileUrl);
    
    res.json({
      success: true,
      data: updatedUser,
      message: 'Profile picture updated successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    
    const updatedUser = await userService.updateUserPreferences(userId as string, req.body);
    
    res.json({
      success: true,
      data: updatedUser,
      message: 'Preferences updated successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getUserStats = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    
    const stats = await userService.getUserStats(userId as string);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


export const getUpgradeRequests = async (req: Request, res: Response) => {
  try {
    const adminId = req.user?._id;
    if(!adminId || req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message:"Forbidden"
      })
    }
    const requests = await userService.getRoleUpgradeRequests();
    res.status(200).json({
      success: true,
      data: requests,
      message: " Role upgrade requests fetched successfully" 
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || "An Error Occured"
    })
  }
}

export const reviewRoleUpgradeRequest = async (req:Request, res: Response) => {
  try {
    const { requestId} = req.params;
    const { action, notes, userId }= req.body;
    const adminId = String(req.user?._id);
    if(!adminId || req.user?.role !== 'admin' ) {
      return res.status(403).json({
        success:false,
        message:"Forbidden"
      })
    }
    const result = await userService.reviewRoleUpgradeRequest(adminId as string, userId,requestId, action, notes);
    res.status(200).json({
      success:true,
      data: result,
      message: 'Role upgrade request reviewed successfully'
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: (error as Error).message || "An error occured"
    })
  }
}