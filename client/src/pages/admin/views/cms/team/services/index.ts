import { apiClient } from "../../../../../../services/apiClient";

export interface IMedia {
  type: 'image' | 'video';
  url: string;
  publicId?: string;
}
export type TeamMemberStatus = 'active' | 'inactive';

export interface ITeamMember {
  _id: string;
  name: string;
  designation: string;
  experience?: string;
  image: IMedia;
  order: number;
  status: TeamMemberStatus;
  createdAt: string;
  updatedAt: string;
}

interface ListResponse<T> { success: boolean; data: T[]; }
interface SingleResponse<T> { success: boolean; data: T; message?: string; }

function buildTeamMemberFormData(
  data: Partial<ITeamMember>,
  imageFile?: File | null
): FormData {
  const fd = new FormData();
  if (data.name) fd.append('name', data.name);
  if (data.designation) fd.append('designation', data.designation);
  if (data.experience) fd.append('experience', data.experience);
  if (data.order !== undefined) fd.append('order', String(data.order));
  if (data.status) fd.append('status', data.status);
  if (imageFile) fd.append('image', imageFile);
  return fd;
}

export const teamService = {
  getAll: async (status?: TeamMemberStatus): Promise<ListResponse<ITeamMember>> => {
    const qs = status ? `?status=${status}` : '';
    return apiClient(`/team/${qs}`, { method: 'GET' });
  },

  create: async (data: Partial<ITeamMember>, imageFile: File): Promise<SingleResponse<ITeamMember>> => {
    const body = buildTeamMemberFormData(data, imageFile);
    return apiClient('/team/admin', {
      method: 'POST',
      headers: { 'Content-Type': undefined as any },
      body,
    });
  },

  update: async (id: string, data: Partial<ITeamMember>, imageFile?: File | null): Promise<SingleResponse<ITeamMember>> => {
    const body = buildTeamMemberFormData(data, imageFile);
    return apiClient(`/team/admin/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': undefined as any },
      body,
    });
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> =>
    apiClient(`/team/admin/${id}`, { method: 'DELETE' }),
};
