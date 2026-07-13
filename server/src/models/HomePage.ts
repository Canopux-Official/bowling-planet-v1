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
  trustedBrands: string[];
  featuredProjects: {
    projectIds: mongoose.Types.ObjectId[];
  };
  productInventory: {
    arcadeGamesCount: string;
    majorAttractionsCount: string;
    redemptionGamesCount: string;
  };
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
    trustedBrands: { type: [String], default: [] },
    featuredProjects: {
      projectIds: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    },
    productInventory: {
      arcadeGamesCount: { type: String, default: '200+ Titles' },
      majorAttractionsCount: { type: String, default: '30+ Categories' },
      redemptionGamesCount: { type: String, default: '500+ SKUs' },
    },
  },
  { timestamps: true }
);

export const HomePage = mongoose.model<IHomePage>('HomePage', HomePageSchema);
