import axios, { type AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message || error?.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const apiClient = {
  get: async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
    const res = await axiosInstance.get<T>(url, { params });
    return res.data;
  },
  post: async <T>(url: string, body?: unknown): Promise<T> => {
    const res = await axiosInstance.post<T>(url, body);
    return res.data;
  },
  put: async <T>(url: string, body?: unknown): Promise<T> => {
    const res = await axiosInstance.put<T>(url, body);
    return res.data;
  },
  patch: async <T>(url: string, body?: unknown): Promise<T> => {
    const res = await axiosInstance.patch<T>(url, body);
    return res.data;
  },
  delete: async <T>(url: string): Promise<T> => {
    const res = await axiosInstance.delete<T>(url);
    return res.data;
  },
};

export default apiClient;