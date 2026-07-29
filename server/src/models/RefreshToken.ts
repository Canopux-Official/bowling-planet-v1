import mongoose, { Schema, Document } from 'mongoose';

export interface IRefreshToken extends Document {
  userId: mongoose.Types.ObjectId;
  tokenHash: string;
  revoked: boolean;
  revokedAt?: Date;
  expiresAt: Date;
  createdAt: Date;
}

const RefreshTokenSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tokenHash: { type: String, required: true },
  revoked: { type: Boolean, default: false },
  revokedAt: { type: Date },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// PERFORMANCE + SECURITY: Compound indexes covering all query patterns in token rotation.
// Without these, every refresh is an O(n) scan over the entire tokens collection.
RefreshTokenSchema.index({ userId: 1, tokenHash: 1, revoked: 1 }); // findOneAndUpdate (token lookup)
RefreshTokenSchema.index({ userId: 1, revoked: 1 });                 // countDocuments + updateMany (session management)

export default mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema);
