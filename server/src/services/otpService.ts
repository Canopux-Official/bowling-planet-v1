import crypto from 'crypto';
import Otp from '../models/Otp';
import { hashToken } from '../utils/hashUtils';
import mongoose from 'mongoose';

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 5;

export const generateOtp = (): string => {
  // Generate a cryptographically secure 6-digit OTP
  return crypto.randomInt(100000, 999999).toString();
};

export const createOrUpdateOtp = async (userId: mongoose.Types.ObjectId, purpose: 'signup' | 'reset-password' | 'login'): Promise<string> => {
  const COOLDOWN_MS = 90 * 1000; // 90 seconds
  
  // Atomic check and update of lastOtpSentAt to prevent concurrent spam
  const user = await mongoose.model('User').findOneAndUpdate(
    {
      _id: userId,
      $or: [
        { lastOtpSentAt: { $exists: false } },
        { lastOtpSentAt: null },
        { lastOtpSentAt: { $lt: new Date(Date.now() - COOLDOWN_MS) } }
      ]
    },
    { $set: { lastOtpSentAt: new Date() } },
    { returnDocument: 'after' }
  );

  if (!user) {
    throw new Error('Please wait 90 seconds before requesting a new OTP.');
  }

  const otp = generateOtp();
  const otpHash = hashToken(otp);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  // Invalidate any existing unused OTPs for this user and purpose
  await Otp.updateMany(
    { userId, purpose, isUsed: false },
    { $set: { isUsed: true } }
  );

  // Create new OTP
  const newOtp = new Otp({
    userId,
    otpHash,
    purpose,
    expiresAt,
    attempts: 0,
    isUsed: false,
  });

  await newOtp.save();
  return otp;
};

export const verifyOtp = async (userId: mongoose.Types.ObjectId, providedOtp: string, purpose: 'signup' | 'reset-password' | 'login'): Promise<boolean> => {
  // Atomically fetch the most recent OTP and increment its attempts
  // This completely prevents concurrent brute-force attacks
  const otpRecord = await Otp.findOneAndUpdate(
    {
      userId,
      purpose,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    },
    { $inc: { attempts: 1 } },
    { returnDocument: 'after', sort: { _id: -1 } }
  );

  if (!otpRecord) {
    throw new Error('Invalid or expired OTP');
  }

  if (otpRecord.attempts > MAX_ATTEMPTS) {
    throw new Error('Maximum verification attempts reached. Please request a new OTP.');
  }

  const hashedProvidedOtp = hashToken(providedOtp);

  let isMatch = false;
  try {
    // Prevent Timing Attacks by using constant-time string comparison
    isMatch = crypto.timingSafeEqual(
      Buffer.from(otpRecord.otpHash, 'utf8'),
      Buffer.from(hashedProvidedOtp, 'utf8')
    );
  } catch (e) {
    // If lengths differ, it will throw. Fallback to false.
    isMatch = false;
  }

  if (isMatch) {
    // Atomically mark as used to prevent a race condition where two concurrent
    // requests with the correct OTP both succeed.
    const updateResult = await Otp.updateOne(
      { _id: otpRecord._id, isUsed: false },
      { $set: { isUsed: true } }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error('OTP has already been used.');
    }

    return true;
  } else {
    throw new Error('Invalid OTP');
  }
};
