import rateLimit from 'express-rate-limit';

// General auth rate limiter for login/signup
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20, // limit each IP to 20 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Stricter rate limiter for OTP verification and Forgot Password
export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // limit each IP to 5 OTP related requests per windowMs
  message: { message: 'Too many OTP attempts from this IP, please try again after 15 minutes' },
});
