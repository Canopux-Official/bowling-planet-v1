import { apiClient } from '../../../../services/apiClient';

export const leadService = {
  getAll: async () => {
    const res = await apiClient('/leads', { method: 'GET' });
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
