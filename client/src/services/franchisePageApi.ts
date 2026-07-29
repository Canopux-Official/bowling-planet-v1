import { apiClient } from './apiClient';

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

export interface FranchisePageData {
  _id?: string;
  valueProps: IFranchiseValueProp[];
  investmentTiers: IFranchiseInvestmentTier[];
  faqs: IFranchiseFAQ[];
  whyUs: IFranchiseWhyUs[];
  offerings: IFranchiseOffering[];
  process: IFranchiseProcess[];
  qualifications: IFranchiseQualification[];
}

export const franchisePageApi = {
  getFranchisePageData: async (): Promise<{ success: boolean; data: FranchisePageData }> => {
    const res = await apiClient('/franchise-page', {
      method: 'GET',
      headers: { 'x-skip-auth-refresh': 'true' },
    });
    return res;
  },

  updateFranchisePageData: async (data: Partial<FranchisePageData> | FormData): Promise<{ success: boolean; data: FranchisePageData }> => {
    const isFormData = data instanceof FormData;
    const res = await apiClient('/franchise-page', {
      method: 'PUT',
      headers: isFormData ? {} : undefined, // apiClient handles FormData headers automatically
      body: isFormData ? data : JSON.stringify(data),
    });
    return res;
  }
};
