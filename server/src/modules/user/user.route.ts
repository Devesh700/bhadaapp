// src/routes/user.routes.ts
import { Router } from 'express';
import * as userController from './user.controller';
import { authMiddleware } from '../../middlewares/auth';

const router = Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.post('/upload-picture', userController.uploadProfilePicture);

// Preferences
router.put('/preferences', userController.updatePreferences);

// Role upgrade
router.post('/request-role-upgrade', userController.requestRoleUpgrade);

// Stats
router.get('/stats', userController.getUserStats);

router.get("/review", userController.getUpgradeRequests)
router.put("/review/:requestId", userController.reviewRoleUpgradeRequest);

export default router;
