import { Request, Response } from 'express';
import * as authService from './auth.service';

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
    const { token, user } = await authService.loginUser(email, password);

    // Trigger daily login reward
    await authService.handleDailyLogin(user._id as string, user.role);

    res.json({ token, data:user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const dailyLogin = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // from auth middleware
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