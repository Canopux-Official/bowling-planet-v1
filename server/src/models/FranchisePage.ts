import mongoose, { Schema, Document } from 'mongoose';

export interface IFranchiseValueProp {
  icon: string;
  label: string;
  sub: string;
}

export interface IFranchiseInvestmentTier {
  name: string;
  color: string;
  size: string;
  totalInvestment: string;
  majorAttractions: number | string;
  arcadeGames: number | string;
  otherHorizons: string;
  gamesCost: string;
  interiorCost: string;
  franchiseFee: string;
  consultingFee: string;
  ideal: string;
  popular?: boolean;
}

export interface IFranchiseFAQ {
  q: string;
  a: string;
}

export interface IFranchiseWhyUs {
  title: string;
  subtitle: string;
  image?: { url: string; public_id: string };
}

export interface IFranchiseOffering {
  label: string;
  desc: string;
  image?: { url: string; public_id: string };
}

export interface IFranchiseProcess {
  title: string;
  desc: string;
  image?: { url: string; public_id: string };
}

export interface IFranchiseQualification {
  title: string;
  desc: string;
}

export interface IFranchisePage extends Document {
  valueProps: IFranchiseValueProp[];
  investmentTiers: IFranchiseInvestmentTier[];
  faqs: IFranchiseFAQ[];
  whyUs: IFranchiseWhyUs[];
  offerings: IFranchiseOffering[];
  process: IFranchiseProcess[];
  qualifications: IFranchiseQualification[];
}

const FranchiseValuePropSchema = new Schema<IFranchiseValueProp>({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  sub: { type: String, required: true },
});

const FranchiseInvestmentTierSchema = new Schema<IFranchiseInvestmentTier>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  totalInvestment: { type: String, required: true },
  majorAttractions: { type: Schema.Types.Mixed, required: true }, // Mixed because it could be "0" or number
  arcadeGames: { type: Schema.Types.Mixed, required: true },
  otherHorizons: { type: String, required: true },
  gamesCost: { type: String, required: true },
  interiorCost: { type: String, required: true },
  franchiseFee: { type: String, required: true },
  consultingFee: { type: String, required: true },
  ideal: { type: String, required: true },
  popular: { type: Boolean, default: false },
});

const FranchiseFAQSchema = new Schema<IFranchiseFAQ>({
  q: { type: String, required: true },
  a: { type: String, required: true },
});

const FranchiseWhyUsSchema = new Schema<IFranchiseWhyUs>({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  image: { url: String, public_id: String },
});

const FranchiseOfferingSchema = new Schema<IFranchiseOffering>({
  label: { type: String, required: true },
  desc: { type: String, required: true },
  image: { url: String, public_id: String },
});

const FranchiseProcessSchema = new Schema<IFranchiseProcess>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  image: { url: String, public_id: String },
});

const FranchiseQualificationSchema = new Schema<IFranchiseQualification>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
});

const FranchisePageSchema = new Schema<IFranchisePage>(
  {
    valueProps: { type: [FranchiseValuePropSchema], default: [] },
    investmentTiers: { type: [FranchiseInvestmentTierSchema], default: [] },
    faqs: { type: [FranchiseFAQSchema], default: [] },
    whyUs: { type: [FranchiseWhyUsSchema], default: [] },
    offerings: { type: [FranchiseOfferingSchema], default: [] },
    process: { type: [FranchiseProcessSchema], default: [] },
    qualifications: { type: [FranchiseQualificationSchema], default: [] },
  },
  { timestamps: true }
);

export const FranchisePage = mongoose.model<IFranchisePage>('FranchisePage', FranchisePageSchema);
