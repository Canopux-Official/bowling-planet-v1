import { apiClient } from "../../../../../../services/apiClient";


export type ResourceType = 'pdf' | 'video' | 'tool' | 'link' | 'guide';

export interface IResource {
  _id: string;
  title: string;
  slug: string;
  description: string;
  type: ResourceType;
  externalUrl: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IResourceFilters {
  category?: string;
  type?: ResourceType;
  status?: 'published' | 'draft';
  page?: number;
  limit?: number;
}

interface ListResponse<T> {
  success: boolean;
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}
interface SingleResponse<T> { success: boolean; data: T; message?: string; }

export const resourceService = {
  getAllAdmin: async (filters: IResourceFilters = {}): Promise<ListResponse<IResource>> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v !== undefined) params.append(k, String(v)); });
    const qs = params.toString() ? `?${params.toString()}` : '';
    return apiClient(`/resource/admin/all${qs}`, { method: 'GET' });
  },

  getBySlug: async (slug: string): Promise<SingleResponse<IResource>> =>
    apiClient(`/resource/${slug}`, { method: 'GET' }),

  create: async (data: Partial<IResource>): Promise<SingleResponse<IResource>> =>
    apiClient('/resource/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: async (id: string, data: Partial<IResource>): Promise<SingleResponse<IResource>> =>
    apiClient(`/resource/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: async (id: string): Promise<{ success: boolean; message: string }> =>
    apiClient(`/resource/admin/${id}`, { method: 'DELETE' }),

  togglePublish: async (id: string): Promise<SingleResponse<IResource>> =>
    apiClient(`/resource/admin/${id}/toggle-publish`, { method: 'PATCH' }),
};
