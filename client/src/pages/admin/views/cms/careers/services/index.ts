import { apiClient } from "../../../../../../services/apiClient";


export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'] as const;
export const EXPERIENCE_LEVELS = ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'] as const;
export const WORK_MODE = ['On-site', 'Remote', 'Hybrid'] as const;
export const JOB_STATUS = ['open', 'closed', 'draft'] as const;

export type JobType = typeof JOB_TYPES[number];
export type ExperienceLevel = typeof EXPERIENCE_LEVELS[number];
export type WorkMode = typeof WORK_MODE[number];
export type JobStatus = typeof JOB_STATUS[number];

export interface IJob {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  workMode: WorkMode;
  jobType: JobType;
  experience: ExperienceLevel;
  eligibilityCriteria: string[];
  requirements: string[];
  keyResponsibilities: string[];
  skills: string[];
  tags: string[];
  department?: string;
  openings: number;
  applicationEmail: string;
  applicationDeadline?: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IJobFilters {
  status?: JobStatus;
  jobType?: JobType;
  workMode?: WorkMode;
  experience?: ExperienceLevel;
  department?: string;
  tags?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

interface ListResponse<T> {
  success: boolean;
  data: T[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}
interface SingleResponse<T> { success: boolean; data: T; message?: string; }

export const careerService = {
  getAll: async (filters: IJobFilters = {}): Promise<ListResponse<IJob>> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v !== undefined) params.append(k, String(v)); });
    const qs = params.toString() ? `?${params.toString()}` : '';
    return apiClient(`/career/${qs}`, { method: 'GET' });
  },

  getBySlug: async (slug: string): Promise<SingleResponse<IJob>> =>
    apiClient(`/career/${slug}`, { method: 'GET' }),

  getById: async (id: string): Promise<SingleResponse<IJob>> =>
    apiClient(`/career/admin/id/${id}`, { method: 'GET' }),

  create: async (data: Partial<IJob>): Promise<SingleResponse<IJob>> =>
    apiClient('/career/admin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: async (id: string, data: Partial<IJob>): Promise<SingleResponse<IJob>> =>
    apiClient(`/career/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: async (id: string): Promise<{ success: boolean; message: string }> =>
    apiClient(`/career/admin/${id}`, { method: 'DELETE' }),
};