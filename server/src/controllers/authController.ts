import { Request, Response } from 'express';
import User from '../models/User';
import RefreshToken from '../models/RefreshToken';
import { hashPassword, comparePassword, hashToken } from '../utils/hashUtils';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwtUtils';
import { createOrUpdateOtp, verifyOtp } from '../services/otpService';
import { sendOtpEmail } from '../services/emailService';
import crypto from 'crypto';
import { verifyTurnstile } from '../utils/verifyCaptcha';

// SECURITY: No fallback — process.exit(1) in server.ts REQUIRED_ENV check fires before this loads.
const ADMIN_SECRET = process.env.ADMIN_SECRET!;


const sendTokenResponse = async (user: any, res: Response, message: string) => {
  const accessToken = generateAccessToken(user._id as any, user.role);
  const refreshToken = generateRefreshToken(user._id as any);
  const refreshTokenHash = hashToken(refreshToken);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiry

  // Enforce maximum 10 active devices/sessions per user
  const activeTokensCount = await RefreshToken.countDocuments({ userId: user._id, revoked: false });
  if (activeTokensCount >= 10) {
    // Find the oldest active tokens to revoke, leaving only the newest 9 active
    const tokensToRevoke = await RefreshToken.find({ userId: user._id, revoked: false })
      .sort({ createdAt: 1 }) // Oldest first
      .limit(activeTokensCount - 9); // e.g., if count is 10, limit is 1. If 12, limit is 3.

    const tokenIds = tokensToRevoke.map(t => t._id);
    await RefreshToken.updateMany(
      { _id: { $in: tokenIds } },
      { $set: { revoked: true } }
    );
  }

  await new RefreshToken({
    userId: user._id,
    tokenHash: refreshTokenHash,
    expiresAt,
  }).save();

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  res.status(200).json({
    message,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const signupAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, adminSecret,captchaToken } = req.body;

    if (!name || !email || !password || !adminSecret) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }
    const isHuman = await verifyTurnstile(captchaToken, req.ip);
    if (!isHuman) {
      res.status(400).json({ message: 'Captcha verification failed' });
      return;
    }

    if (adminSecret !== ADMIN_SECRET) {
      res.status(403).json({ message: 'Invalid Admin Secret' });
      return;
    }

    if (email === process.env.SUPERADMIN_EMAIL) {
      res.status(403).json({ message: 'The SuperAdmin email cannot be used to register a new Admin account' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
      return;
    }

    const passwordHash = await hashPassword(password);

    const user = new User({
      name,
      email,
      passwordHash,
      role: 'Admin',
      isVerified: false,
    });
    await user.save();

    const otp = await createOrUpdateOtp(user._id as any, 'signup');
    await sendOtpEmail(user.email, otp, 'signup');

    res.status(201).json({ message: 'Signup successful. Please verify your email with the OTP sent.' });
  } catch (error: unknown) {
    console.error('[Auth] signupAdmin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyUserOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, purpose } = req.body;

    if (!email || !otp || !purpose) {
      res.status(400).json({ message: 'Email, OTP, and purpose are required' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await verifyOtp(user._id as any, otp, purpose as 'signup' | 'reset-password' | 'login');

    if (purpose === 'signup') {
      user.isVerified = true;
      user.lastLoginAt = new Date();
      await user.save();
      await sendTokenResponse(user, res, 'Account verified and logged in successfully');
    } else if (purpose === 'reset-password') {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else if (purpose === 'login') {
      user.lastLoginAt = new Date();
      await user.save();

      await sendTokenResponse(user, res, 'Login successful');
    }
  } catch (error: unknown) {
    console.error('[Auth] verifyUserOtp error:', error);
    // Surface OTP-specific errors (e.g. 'Invalid OTP', 'Maximum attempts reached') to the user
    const msg = error instanceof Error ? error.message : 'Verification failed';
    res.status(400).json({ message: msg });
  }
};

export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, purpose } = req.body;

    if (!email || !purpose) {
      res.status(400).json({ message: 'Email and purpose are required' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const otp = await createOrUpdateOtp(user._id as any, purpose as 'signup' | 'reset-password');
    await sendOtpEmail(user.email, otp, purpose as 'signup' | 'reset-password', true);

    res.status(200).json({ message: 'A new OTP has been sent to your email.' });
  } catch (error: unknown) {
    console.error('[Auth] resendOtp error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, role ,captchaToken} = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const isHuman = await verifyTurnstile(captchaToken, req.ip);
    if (!isHuman) {
      res.status(400).json({ message: 'Captcha verification failed' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (role && user.role !== role) {
      res.status(403).json({ message: `Access denied. You are not registered as a ${role}.` });
      return;
    }

    if (!user.isVerified) {
      res.status(403).json({ message: 'Please verify your account first.' });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({ message: 'Account is deactivated. Contact SuperAdmin.' });
      return;
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate and send login OTP
    const otp = await createOrUpdateOtp(user._id as any, 'login');
    await sendOtpEmail(user.email, otp, 'login');

    res.status(200).json({
      message: 'Login OTP sent',
      step: 'OTP'
    });
  } catch (error: unknown) {
    console.error('[Auth] login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const refreshAuthToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    // Verify JWT syntax and expiry
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired refresh token' });
      return;
    }

    const tokenHash = hashToken(refreshToken);

    // Atomically find and mark the token as revoked
    const tokenRecord = await RefreshToken.findOneAndUpdate(
      { userId: decoded.userId, tokenHash, revoked: false },
      { $set: { revoked: true, revokedAt: new Date() } }
    );

    if (!tokenRecord) {
      // Token was not found or is ALREADY revoked
      // Check if it was revoked very recently (10 second grace period) due to concurrent tabs
      const recentlyRevoked = await RefreshToken.findOne({
        userId: decoded.userId,
        tokenHash,
        revoked: true,
        revokedAt: { $gt: new Date(Date.now() - 10000) }
      });

      if (!recentlyRevoked) {
        // TOKEN REUSE ATTACK DETECTED!
        // A revoked token was used outside the grace period. This means someone stole the token.
        // Action: Revoke ALL active sessions for this user to protect their account.
        await RefreshToken.updateMany(
          { userId: decoded.userId, revoked: false },
          { $set: { revoked: true, revokedAt: new Date() } }
        );
        res.status(401).json({ message: 'Security alert: Token reuse detected. All sessions have been terminated.' });
        return;
      }

      // If recentlyRevoked is true, this is a legitimate concurrent request from another tab.
      // We allow it to proceed and fork the session natively.
    }

    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      res.status(403).json({ message: 'User not found or inactive' });
      return;
    }

    await sendTokenResponse(user, res, 'Tokens refreshed');
  } catch (error: unknown) {
    console.error('[Auth] refreshAuthToken error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
      const tokenHash = hashToken(refreshToken);
      await RefreshToken.updateMany(
        { tokenHash },
        { $set: { revoked: true } }
      );
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: unknown) {
    console.error('[Auth] logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email,captchaToken } = req.body;

    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }
    const isHuman = await verifyTurnstile(captchaToken, req.ip);
    if (!isHuman) {
      res.status(400).json({ message: 'Captcha verification failed' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Return 200 to prevent email enumeration
      res.status(200).json({ message: 'If that email address is in our database, we will send you an email to reset your password.' });
      return;
    }

    const otp = await createOrUpdateOtp(user._id as any, 'reset-password');
    await sendOtpEmail(user.email, otp, 'reset-password');

    res.status(200).json({ message: 'If that email address is in our database, we will send you an email to reset your password.' });
  } catch (error: unknown) {
    console.error('[Auth] forgotPassword error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      res.status(400).json({ message: 'Email, OTP, and new password are required' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // This will throw if invalid
    await verifyOtp(user._id as any, otp, 'reset-password');

    user.passwordHash = await hashPassword(newPassword);
    await user.save();

    // Invalidate all existing refresh tokens
    await RefreshToken.updateMany(
      { userId: user._id, revoked: false },
      { $set: { revoked: true } }
    );

    res.status(200).json({ message: 'Password reset successfully. You can now login with your new password.' });
  } catch (error: unknown) {
    console.error('[Auth] resetPassword error:', error);
    const msg = error instanceof Error ? error.message : 'Reset failed';
    res.status(400).json({ message: msg });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as any; // populated by authenticateJWT
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const fullUser = await User.findById(user.userId); // req.user object structure is { userId, role }
    if (!fullUser || !fullUser.isActive) {
      res.status(403).json({ message: 'User not found or inactive' });
      return;
    }

    res.status(200).json({
      user: {
        id: fullUser._id,
        name: fullUser.name,
        email: fullUser.email,
        role: fullUser.role
      }
    });
  } catch (error: unknown) {
    console.error('[Auth] getMe error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as any;
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { name } = req.body;
    if (!name) {
      res.status(400).json({ message: 'Name is required' });
      return;
    }

    const fullUser = await User.findByIdAndUpdate(user.userId, { name }, { new: true });
    if (!fullUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: fullUser._id,
        name: fullUser.name,
        email: fullUser.email,
        role: fullUser.role
      }
    });
  } catch (error: unknown) {
    console.error('[Auth] updateProfile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
