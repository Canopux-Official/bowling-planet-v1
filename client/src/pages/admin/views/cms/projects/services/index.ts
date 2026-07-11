import { apiClient } from "../../../../../../services/apiClient";


export interface IMedia {
    type: 'image' | 'video';
    url: string;
    publicId?: string;
}

export interface IFeaturePoint {
    title: string;
    description?: string;
}

export interface IBulletList {
    heading: string;
    items: string[];
}

export interface ISetupStep {
    stepNumber: number;
    title: string;
    description?: string;
    points?: string[];
    image?: IMedia;
}

export interface ITestimonial {
    _id?: string;
    clientName: string;
    designation?: string;
    companyName?: string;
    message: string;
    rating?: number;
    clientImage?: IMedia;
}

export interface IProject {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    tags: string[];
    media?: IMedia[];
    featurePoints?: IFeaturePoint[];
    bulletList?: IBulletList[];
    setupSteps?: ISetupStep[];
    testimonials?: ITestimonial[];
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IProjectFilters {
    page?: number;
    limit?: number;
    tags?: string;
    isPublished?: boolean;
    search?: string;
    sort?: 'latest' | 'oldest' | 'title';
}

export interface IProjectsResponse {
    success: boolean;
    message: string;
    data: {
        projects: IProject[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
}

export interface ISingleProjectResponse {
    success: boolean;
    message: string;
    data: IProject;
}

/**
 * Converts structural data components alongside a file list into FormData blocks
 */
function buildProjectFormData(
    data: Partial<IProject>,
    galleryFiles: File[],
    setupStepFiles: { [index: number]: File } = {},
    testimonialFiles: { [index: number]: File } = {}
): FormData {
    const formData = new FormData();

    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.isPublished !== undefined) formData.append('isPublished', String(data.isPublished));
    if (data.tags) formData.append('tags', data.tags.join(','));
    if (data.media) formData.append('media', JSON.stringify(data.media));
    if (data.featurePoints) formData.append('featurePoints', JSON.stringify(data.featurePoints));
    if (data.bulletList) formData.append('bulletList', JSON.stringify(data.bulletList));
    if (data.setupSteps) formData.append('setupSteps', JSON.stringify(data.setupSteps));
    if (data.testimonials) formData.append('testimonials', JSON.stringify(data.testimonials));

    // Gallery files
    galleryFiles.forEach((file) => formData.append('images', file));

    // Setup-step images — fieldname encodes the index so the backend can route them
    Object.entries(setupStepFiles).forEach(([idx, file]) => {
        formData.append(`setupStepImage_${idx}`, file);
    });

    // Testimonial avatar images — same convention
    Object.entries(testimonialFiles).forEach(([idx, file]) => {
        formData.append(`testimonialImage_${idx}`, file);
    });

    return formData;
}

export const projectService = {
    getAll: async (filters: IProjectFilters = {}): Promise<IProjectsResponse> => {
        const params = new URLSearchParams();
        if (filters.page) params.append('page', String(filters.page));
        if (filters.limit) params.append('limit', String(filters.limit));
        if (filters.tags) params.append('tags', filters.tags);
        if (filters.isPublished !== undefined) params.append('isPublished', String(filters.isPublished));
        if (filters.search) params.append('search', filters.search);
        if (filters.sort) params.append('sort', filters.sort);

        const queryStr = params.toString() ? `?${params.toString()}` : '';
        return apiClient(`/project/${queryStr}`, { method: 'GET' });
    },

    getBySlug: async (slug: string): Promise<ISingleProjectResponse> => {
        return apiClient(`/project/${slug}`, { method: 'GET' });
    },

    create: async (
        projectData: Partial<IProject>,
        galleryFiles: File[] = [],
        setupStepFiles: { [index: number]: File } = {},
        testimonialFiles: { [index: number]: File } = {}
    ): Promise<ISingleProjectResponse> => {
        const body = buildProjectFormData(projectData, galleryFiles, setupStepFiles, testimonialFiles);
        return apiClient('/project/admin', {
            method: 'POST',
            headers: { 'Content-Type': undefined as any },
            body,
        });
    },

    update: async (
        id: string,
        projectData: Partial<IProject>,
        galleryFiles: File[] = [],
        setupStepFiles: { [index: number]: File } = {},
        testimonialFiles: { [index: number]: File } = {}
    ): Promise<ISingleProjectResponse> => {
        const body = buildProjectFormData(projectData, galleryFiles, setupStepFiles, testimonialFiles);
        return apiClient(`/project/admin/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': undefined as any },
            body,
        });
    },


    delete: async (id: string): Promise<{ success: boolean; message: string }> => {
        return apiClient(`/project/admin/${id}`, { method: 'DELETE' });
    },

    togglePublish: async (id: string, isPublished: boolean): Promise<ISingleProjectResponse> => {
        return apiClient(`/project/admin/${id}/publish`, {
            method: 'PATCH',
            body: JSON.stringify({ isPublished }),
        });
    }
};