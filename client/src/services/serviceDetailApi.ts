import { apiClient } from './apiClient';

export interface IServiceDetail {
  _id?: string;
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
    image?: { url: string; public_id: string } | any;
  };
  hero: {
    missionText: string;
    timelineTitle: string;
    image?: { url: string; public_id: string } | any;
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
    image?: { url: string; public_id: string } | any;
  }[];
  features: {
    title: string;
    short: string;
    iconName: string;
    image?: { url: string; public_id: string } | any;
  }[];
  gallery: {
    title: string;
    tag?: string;
    image?: { url: string; public_id: string } | any;
  }[];
  crossLink: {
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}

export const serviceDetailApi = {
  getAll: async (): Promise<IServiceDetail[]> => {
    return apiClient('/service-details');
  },
  
  getBySlug: async (slug: string): Promise<IServiceDetail> => {
    return apiClient(`/service-details/${slug}`);
  },

  create: async (data: IServiceDetail): Promise<IServiceDetail> => {
    return apiClient('/service-details', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<IServiceDetail>): Promise<IServiceDetail> => {
    return apiClient(`/service-details/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<void> => {
    return apiClient(`/service-details/${id}`, {
      method: 'DELETE',
    });
  },
};
