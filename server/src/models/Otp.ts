import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
  userId: mongoose.Types.ObjectId;
  otpHash: string;
  purpose: 'signup' | 'reset-password' | 'login';
  attempts: number;
  isUsed: boolean;
  expiresAt: Date;
  createdAt: Date;
}

const OtpSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  otpHash: { type: String, required: true },
  purpose: { type: String, enum: ['signup', 'reset-password', 'login'], required: true },
  attempts: { type: Number, default: 0 },
  isUsed: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

// TTL index to automatically remove expired OTPs (plus some padding time e.g., 24 hours after expiry)
// We will set expireAfterSeconds to 0 so it expires exactly at `expiresAt`.
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IOtp>('Otp', OtpSchema);
