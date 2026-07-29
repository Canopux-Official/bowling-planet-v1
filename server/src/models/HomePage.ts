import mongoose, { Schema, Document } from 'mongoose';

export interface IHomePage extends Document {
  hero: {
    rotatingActivities: string[];
  };
  stats: {
    yearsOfExperience: string;
    productsAndEquip: string;
    projectsDelivered: string;
    citiesServed: string;
  };
  trustedBrands: {
    name: string;
    image?: { url: string; public_id: string };
  }[];
  featuredProjects: {
    projectIds: mongoose.Types.ObjectId[];
  };
  productCategories: {
    title: string;
    desc: string;
    icon: string;
    count: string;
    color: string;
    image?: { url: string; public_id: string };
  }[];
  services: {
    title: string;
    subtitle: string;
    image?: { url: string; public_id: string };
  }[];
  caseStudies: {
    client: string;
    challenge: string;
    solution: string;
    result: string;
    metric: string;
    image?: { url: string; public_id: string };
  }[];
}

const HomePageSchema: Schema = new Schema(
  {
    hero: {
      rotatingActivities: { type: [String], default: [] },
    },
    stats: {
      yearsOfExperience: { type: String, default: '17+' },
      productsAndEquip: { type: String, default: '700+' },
      projectsDelivered: { type: String, default: '50+' },
      citiesServed: { type: String, default: '10+' },
    },
    trustedBrands: {
      type: [
        {
          name: String,
          image: { url: String, public_id: String },
        },
      ],
      default: [],
    },
    featuredProjects: {
      projectIds: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    },
    productCategories: {
      type: [
        {
          title: String,
          desc: String,
          icon: String,
          count: String,
          color: String,
          image: { url: String, public_id: String },
        },
      ],
      default: [],
    },
    services: {
      type: [
        {
          title: String,
          subtitle: String,
          image: { url: String, public_id: String },
        },
      ],
      default: [],
    },
    caseStudies: {
      type: [
        {
          client: String,
          challenge: String,
          solution: String,
          result: String,
          metric: String,
          image: { url: String, public_id: String },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const HomePage = mongoose.model<IHomePage>('HomePage', HomePageSchema);
