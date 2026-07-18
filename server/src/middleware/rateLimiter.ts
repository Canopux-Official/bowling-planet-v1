import rateLimit from 'express-rate-limit';

// General auth rate limiter for login/signup
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// Stricter rate limiter for OTP verification and Forgot Password
export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { message: 'Too many OTP attempts from this IP, please try again after 15 minutes' },
});

// Limiter for public lead submission endpoints (Vercel free tier protection)
export const leadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  limit: 30,           // max 30 lead writes per minute per IP to accommodate ROI calculator interactions
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please slow down.' },
});

// Limiter for token refresh to prevent token cycling attacks
export const refreshLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many refresh attempts. Please try again shortly.' },
});
