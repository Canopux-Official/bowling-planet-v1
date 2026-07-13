import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IMedia {
  type: 'image' | 'video';
  url: string;
  publicId?: string;
}

export type TeamMemberStatus = 'active' | 'inactive';


export interface ITeamMember extends Document {
  name: string;
  designation: string; 
  experience?: string; 
  image: IMedia;       
  order: number;       
  status: TeamMemberStatus;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    type: { type: String, enum: ['image', 'video'], required: true },
    url: { type: String, required: true },
    publicId: { type: String }, 
  },
  { _id: false }
);


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


TeamMemberSchema.index({ order: 1 });


export const TeamMember: Model<ITeamMember> = mongoose.model<ITeamMember>(
  'TeamMember',
  TeamMemberSchema
);
