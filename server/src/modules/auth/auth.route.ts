import { Router } from 'express';
import * as authController from './auth.controller';
import { authMiddleware } from '../../middlewares/auth';
import { googleAuth } from './google-auth-controller';

const router = Router();

// Register user/vendor
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getMe)
// Daily login bonus
router.post('/daily-login', authMiddleware, authController.dailyLogin);


router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTPAndAuth);
router.post('/resend-otp', authController.resendOTP);
router.post('/check-email', authController.checkEmailAuth);
router.post('/set-password',authMiddleware, authController.setPassword)
router.post("/google",googleAuth)

export default router;
