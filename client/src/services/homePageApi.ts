import { apiClient } from './apiClient';

export interface HomePageData {
  _id?: string;
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
    projectIds: any[]; // Depending on if it's populated or just IDs
  };
  productInventory: {
    arcadeGamesCount: string;
    majorAttractionsCount: string;
    redemptionGamesCount: string;
  };
}

export const homePageApi = {
  getHomePageData: async (): Promise<HomePageData> => {
    const res = await apiClient('/homepage', { method: 'GET' });
    return res.data;
  },
  
  updateHomePageData: async (data: Partial<HomePageData>): Promise<{ success: boolean; data: HomePageData }> => {
    const res = await apiClient('/homepage', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res;
  }
};
