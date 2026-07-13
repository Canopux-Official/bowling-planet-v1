import { apiClient } from './apiClient';

export interface ISocialLink {
  platform: string;
  url: string;
  _id?: string;
}

export interface GlobalSettingsData {
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

export const globalSettingsApi = {
  getSettings: async (): Promise<{ success: boolean; data: GlobalSettingsData }> => {
    const response = await apiClient('/global-settings', { method: 'GET' });
    return response;
  },

  updateSettings: async (data: GlobalSettingsData): Promise<{ success: boolean; data: GlobalSettingsData }> => {
    const response = await apiClient('/global-settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }
};
