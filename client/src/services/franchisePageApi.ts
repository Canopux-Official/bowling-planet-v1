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

export interface FranchisePageData {
  _id?: string;
  valueProps: IFranchiseValueProp[];
  investmentTiers: IFranchiseInvestmentTier[];
  faqs: IFranchiseFAQ[];
}

export const franchisePageApi = {
  getFranchisePageData: async (): Promise<{ success: boolean; data: FranchisePageData }> => {
    const res = await apiClient('/franchise-page', {
      method: 'GET',
      headers: { 'x-skip-auth-refresh': 'true' },
    });
    return res;
  },

  updateFranchisePageData: async (data: Partial<FranchisePageData>): Promise<{ success: boolean; data: FranchisePageData }> => {
    const res = await apiClient('/franchise-page', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res;
  }
};
