import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceDetail extends Document {
  slug: string;
  seo: {
    title: string;
    description: string;
  };
  header: {
    subtitle: string;
    title: string;
    accentColor: string;
    leadId: string;
    image?: { url: string; public_id: string };
  };
  hero: {
    missionText: string;
    timelineTitle: string;
    image?: { url: string; public_id: string };
  };
  timeline: {
    phase: string;
    label: string;
    iconName: string;
    color: string;
  }[];
  metrics: {
    target: number;
    suffix: string;
    label: string;
    color: string;
    image?: { url: string; public_id: string };
  }[];
  features: {
    title: string;
    short: string;
    iconName: string;
    image?: { url: string; public_id: string };
  }[];
  gallery: {
    title: string;
    tag?: string;
    image?: { url: string; public_id: string };
  }[];
  crossLink: {
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}

const ServiceDetailSchema = new Schema<IServiceDetail>(
  {
    slug: { type: String, required: true, unique: true },
    seo: {
      title: { type: String },
      description: { type: String },
    },
    header: {
      subtitle: { type: String },
      title: { type: String },
      accentColor: { type: String, default: '#5FC1D1' },
      leadId: { type: String },
      image: { url: { type: String }, public_id: { type: String } },
    },
    hero: {
      missionText: { type: String },
      timelineTitle: { type: String },
      image: { url: { type: String }, public_id: { type: String } },
    },
    timeline: [
      {
        phase: { type: String },
        label: { type: String },
        iconName: { type: String },
        color: { type: String },
      },
    ],
    metrics: [
      {
        target: { type: Number },
        suffix: { type: String },
        label: { type: String },
        color: { type: String },
        image: { url: { type: String }, public_id: { type: String } },
      },
    ],
    features: [
      {
        title: { type: String },
        short: { type: String },
        iconName: { type: String },
        image: { url: { type: String }, public_id: { type: String } },
      },
    ],
    gallery: [
      {
        title: { type: String },
        tag: { type: String },
        image: { url: { type: String }, public_id: { type: String } },
      },
    ],
    crossLink: {
      text: { type: String },
      buttonText: { type: String },
      buttonLink: { type: String },
    },
  },
  { timestamps: true }
);

export const ServiceDetail = mongoose.model<IServiceDetail>('ServiceDetail', ServiceDetailSchema);
