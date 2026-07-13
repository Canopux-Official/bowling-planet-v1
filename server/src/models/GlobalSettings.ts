import mongoose, { Schema, Document } from 'mongoose';

export interface ISocialLink {
  platform: string;
  url: string;
}

export interface IGlobalSettings extends Document {
  contact: {
    email: string;
    phoneDisplay: string;
    location: string;
  };
  socials: {
    whatsappNumber: string;
    links: ISocialLink[];
  };
  company: {
    name: string;
    tagline: string;
  };
}

const GlobalSettingsSchema: Schema = new Schema(
  {
    contact: {
      email: { type: String, default: 'pr@bowlingplanet.co.in' },
      phoneDisplay: { type: String, default: '+91 95125 45959' },
      location: { type: String, default: 'Surat, Gujarat, India' },
    },
    socials: {
      whatsappNumber: { type: String, default: '919512545959' },
      links: [
        {
          platform: { type: String },
          url: { type: String },
        },
      ],
    },
    company: {
      name: { type: String, default: 'Bowling Planet' },
      tagline: { 
        type: String, 
        default: 'FEC consulting, equipment distribution, and franchise development. Based in Surat, Gujarat — building entertainment destinations across India and beyond.' 
      },
    },
  },
  {
    timestamps: true,
  }
);



export const GlobalSettings = mongoose.model<IGlobalSettings>('GlobalSettings', GlobalSettingsSchema);
