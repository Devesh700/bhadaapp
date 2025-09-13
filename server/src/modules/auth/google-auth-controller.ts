// src/controllers/google-auth.controller.ts
import { Request, Response } from 'express';
import * as googleAuthService from './google-auth-service';

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { credential, code } = req.body;
    
    if (!credential && !code) {
      return res.status(400).json({
        success: false,
        message: 'Google credential or authorization code is required'
      });
    }
    
    let result;
    
    if (credential) {
      // Handle ID token from Google One Tap or Sign-In button
      result = await googleAuthService.authenticateWithGoogle(credential);
    } else if (code) {
      // Handle authorization code flow (if implementing)
      throw new Error('Authorization code flow not implemented yet');
    }
    
    res.json({
      success: true,
      ...result,
      message: 'Google authentication successful'
    });
  } catch (error: any) {
    console.error('Google authentication error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Google authentication failed'
    });
  }
};
