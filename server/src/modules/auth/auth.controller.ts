// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import * as authService from './auth.service';

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const { type } = req.query ;
    
    const result = await authService.sendOTP(email, type as string);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const verifyOTPAndAuth = async (req: Request, res: Response) => {
  try {
    const { email, otp, userType } = req.body;
    const { type } = req.query;
    
    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and OTP are required' 
      });
    }
    
    const result = await authService.verifyOTPAndAuth(email, otp, userType, type as string);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const {type } = req.query;
    const result = await authService.sendOTP(email,type as string);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Keep legacy endpoints for backward compatibility
export const register = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;
    const user = await authService.registerUser(req.body, role);
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const {token, user} = await authService.loginUser(email, password);
    res.json({ success: true, token,data:user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const dailyLogin = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id); // from auth middleware
    const role = req.user?.role;
    if(!userId || !role) {
      return res.status(400).json({ success: false, message: 'Invalid user data' });
    }
    const result = await authService.handleDailyLogin(userId as string, role);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getMe = async (req:Request, res: Response) => {
  try {
    const {user,token} = await authService.getMe(req);
    res.status(200).json({ success:true, data:user, token });
  } catch (error) {
    console.error('Get Me Error:', error);
    throw new Error('Could not fetch user data');
  }
}


export const checkEmailAuth = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const result = await authService.canLoginWithPassword(email);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const setPassword = async (req: Request, res: Response) => {
  try {
    const userId = String(req.user?._id);
    const { password } = req.body;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const result = await authService.setPassword(userId as string, password);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};