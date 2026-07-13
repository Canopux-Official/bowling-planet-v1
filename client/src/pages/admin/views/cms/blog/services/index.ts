import { apiClient } from "../../../../../../services/apiClient";


export interface IMedia {
    type: 'image' | 'video' | 'file';
    url: string;
    publicId: string;
}

export interface IBlog {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    coverImage?: IMedia;
    author: string;
    tags: string[];
    isPublished: boolean;
    publishedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface IBlogFilters {
    status?: 'published' | 'draft';
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
}

interface ListResponse<T> {
    success: boolean;
    data: T[];
    meta: { page: number; limit: number; total: number; totalPages: number };
}
interface SingleResponse<T> { success: boolean; data: T; message?: string; }

export const blogService = {
    getAllAdmin: async (filters: IBlogFilters = {}): Promise<ListResponse<IBlog>> => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => { if (v !== undefined) params.append(k, String(v)); });
        const qs = params.toString() ? `?${params.toString()}` : '';
        return apiClient(`/blog/admin/all${qs}`, { method: 'GET' });
    },

    getBySlug: async (slug: string): Promise<SingleResponse<IBlog>> =>
        apiClient(`/blog/${slug}`, { method: 'GET' }),

    create: async (data: Partial<IBlog>): Promise<SingleResponse<IBlog>> =>
        apiClient('/blog/admin', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: async (id: string, data: Partial<IBlog>): Promise<SingleResponse<IBlog>> =>
        apiClient(`/blog/admin/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: async (id: string): Promise<{ success: boolean; message: string }> =>
        apiClient(`/blog/admin/${id}`, { method: 'DELETE' }),

    togglePublish: async (id: string): Promise<SingleResponse<IBlog>> =>
        apiClient(`/blog/admin/${id}/toggle-publish`, { method: 'PATCH' }),

    // Used both for cover image and inline editor images
    uploadImage: async (file: File): Promise<{ success: boolean; data: IMedia }> => {
        const fd = new FormData();
        fd.append('image', file);
        const res = await apiClient('/blog/admin/upload-image', {
            method: 'POST',
            headers: { 'Content-Type': undefined as any },
            body: fd,
        });
        return {
            ...res,
            data: { ...res.data, type: 'image' as const }, // backend doesn't return `type`, schema requires it
        };
    },
};
