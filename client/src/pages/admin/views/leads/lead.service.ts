import { apiClient } from '../../../../services/apiClient';

export const leadService = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
    let url = '/leads?';
    if (params) {
      const query = new URLSearchParams();
      if (params.page) query.append('page', params.page.toString());
      if (params.limit) query.append('limit', params.limit.toString());
      if (params.status && params.status !== 'All') query.append('status', params.status);
      if (params.search) query.append('search', params.search);
      url += query.toString();
    }
    const res = await apiClient(url, { method: 'GET' });
    return res;
  },
  getAnalytics: async () => {
    const res = await apiClient('/leads/analytics', { method: 'GET' });
    return res;
  },
  getById: async (id: string) => {
    const res = await apiClient(`/leads/${id}`, { method: 'GET' });
    return res;
  },
  updateStatus: async (id: string, status: string) => {
    const res = await apiClient(`/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res;
  },
  delete: async (id: string) => {
    const res = await apiClient(`/leads/${id}`, { method: 'DELETE' });
    return res;
  }
};
