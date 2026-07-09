import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'Admin' | 'SuperAdmin';
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  lastOtpSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'SuperAdmin'], required: true },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    lastOtpSentAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
