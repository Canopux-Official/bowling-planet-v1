import { Router } from 'express';
import {
  signupAdmin,
  verifyUserOtp,
  resendOtp,
  login,
  refreshAuthToken,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  updateProfile,
} from '../controllers/authController';
import { authLimiter, otpLimiter, refreshLimiter } from '../middleware/rateLimiter';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Rate limited auth endpoints
router.post('/signup', authLimiter, signupAdmin);
router.post('/login', authLimiter, login);

// Stricter rate limits for OTP
router.post('/verify-otp', otpLimiter, verifyUserOtp);
router.post('/resend-otp', otpLimiter, resendOtp);
router.post('/forgot-password', otpLimiter, forgotPassword);
router.post('/reset-password', otpLimiter, resetPassword);

// Token management
router.post('/refresh-token', refreshLimiter, refreshAuthToken);
router.post('/logout', logout); // In a real scenario, might also use authenticateJWT here, but refresh token is in body
router.get('/me', authenticateJWT, getMe);
router.put('/me', authenticateJWT, updateProfile);

export default router;
