import mongoose, { Document, Schema } from 'mongoose';

export interface IServicesPage extends Document {
  services: {
    tag: string;
    title: string;
    subtitle: string;
    image?: { url: string; public_id: string };
    accentColor: string;
    stats: { label: string; value: string }[];
    features: string[];
  }[];
  processSteps: {
    num: string;
    title: string;
    desc: string;
    image?: { url: string; public_id: string };
  }[];
  galleryImages: {
    image?: { url: string; public_id: string };
    label: string;
  }[];
}

const ServicesPageSchema = new Schema<IServicesPage>(
  {
    services: [
      {
        tag: { type: String },
        title: { type: String },
        subtitle: { type: String },
        image: {
          url: { type: String },
          public_id: { type: String },
        },
        accentColor: { type: String, default: '#5FC1D1' },
        stats: [
          {
            label: { type: String },
            value: { type: String },
          },
        ],
        features: [{ type: String }],
      },
    ],
    processSteps: [
      {
        num: { type: String },
        title: { type: String },
        desc: { type: String },
        image: {
          url: { type: String },
          public_id: { type: String },
        },
      },
    ],
    galleryImages: [
      {
        image: {
          url: { type: String },
          public_id: { type: String },
        },
        label: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const ServicesPage = mongoose.model<IServicesPage>('ServicesPage', ServicesPageSchema);
