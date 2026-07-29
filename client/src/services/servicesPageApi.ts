import { apiClient } from './apiClient';

export interface ServicesPageData {
  _id?: string;
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

export const servicesPageApi = {
  getServicesPageData: async (): Promise<ServicesPageData | null> => {
    try {
      const response = await apiClient('/services-page');
      return response.data || null;
    } catch (error) {
      console.error('Error fetching Services Page data:', error);
      return null;
    }
  },

  updateServicesPageData: async (data: ServicesPageData, files?: { [key: string]: File }): Promise<{ success: boolean; message: string; data?: ServicesPageData }> => {
    try {
      const formData = new FormData();
      
      formData.append('services', JSON.stringify(data.services || []));
      formData.append('processSteps', JSON.stringify(data.processSteps || []));
      formData.append('galleryImages', JSON.stringify(data.galleryImages || []));

      if (files) {
        Object.keys(files).forEach(key => {
          formData.append(key, files[key]);
        });
      }

      const response = await apiClient('/services-page', {
        method: 'PUT',
        body: formData,
      });

      return response;
    } catch (error: any) {
      console.error('Error updating Services Page data:', error);
      throw new Error(error.response?.data?.message || 'Failed to update Services Page data');
    }
  },
};
