import mongoose, { Schema, Document, Model } from 'mongoose';

// ------------------------------------------------------------------
// Sub-document interfaces
// ------------------------------------------------------------------
export interface IMedia {
  type: 'image' | 'video';
  url: string;
  publicId?: string; // Crucial tracking reference for Cloudinary deletions/swaps
}

export type TeamMemberStatus = 'active' | 'inactive';

// ------------------------------------------------------------------
// TeamMember interface
// ------------------------------------------------------------------
export interface ITeamMember extends Document {
  name: string;
  designation: string; // e.g. "Operations Head"
  experience?: string; // e.g. "8+ years"
  image: IMedia;       // Singular component mimicking the product thumbnail architecture
  order: number;       // Controls display order on the frontend team layout page
  status: TeamMemberStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ------------------------------------------------------------------
// Sub-schemas
// ------------------------------------------------------------------
const MediaSchema = new Schema<IMedia>(
  {
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    publicId: { type: String }, // Explicit tracking string mapping back to Cloudinary
  },
  { _id: false }
);

// ------------------------------------------------------------------
// TeamMember schema
// ------------------------------------------------------------------
const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    designation: { 
      type: String, 
      required: true, 
      trim: true 
    },
    experience: { 
      type: String,
      trim: true
    },
    image: { 
      type: MediaSchema, 
      required: true 
    },
    order: { 
      type: Number, 
      default: 0 
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Explicit index layer mirroring your original design strategy
TeamMemberSchema.index({ order: 1 });

// ------------------------------------------------------------------
// Model export
// ------------------------------------------------------------------
export const TeamMember: Model<ITeamMember> = mongoose.model<ITeamMember>(
  'TeamMember',
  TeamMemberSchema
);