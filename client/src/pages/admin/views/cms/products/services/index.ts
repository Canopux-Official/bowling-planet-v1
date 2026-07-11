import { apiClient } from "../../../../../../services/apiClient";


export interface IMedia {
    type: 'image' | 'video';
    url: string;
    publicId?: string;
}
export interface IFeaturePoint { title: string; description?: string; }
export interface IBulletList { heading: string; items: string[]; }
export interface IUsageLocation { name: string; description?: string; images?: IMedia[]; }
export type ProductStatus = 'active' | 'draft' | 'archived';

export interface IBaseProduct {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    thumbnail: IMedia;
    status: ProductStatus;
    createdAt: string;
    updatedAt: string;
}

export interface IProductItem {
    _id: string;
    baseProduct: string | IBaseProduct;
    title: string;
    slug: string;
    description?: string;
    thumbnail: IMedia;
    gallery?: IMedia[];
    featureList?: IBulletList[];
    points?: IFeaturePoint[];
    usedIn?: IUsageLocation[];
    price?: number;
    purchaseCount: number;
    featuredOrder: number;
    status: ProductStatus;
    createdAt: string;
    updatedAt: string;
}

interface ListResponse<T> {
    success: boolean;
    data: T[];
    pagination: { page: number; limit: number; total: number; pages: number };
}
interface SingleResponse<T> { success: boolean; data: T; message?: string; }

// ------------------------------------------------------------------
// Base Products
// ------------------------------------------------------------------
function buildBaseProductFormData(
    data: Partial<IBaseProduct>,
    thumbnailFile?: File | null
): FormData {
    const fd = new FormData();
    if (data.title) fd.append('title', data.title);
    if (data.description) fd.append('description', data.description);
    if (data.status) fd.append('status', data.status);
    if (thumbnailFile) fd.append('thumbnail', thumbnailFile);
    return fd;
}

export const baseProductService = {
    getAll: async (filters: { status?: string; search?: string; page?: number; limit?: number } = {}) => {
        const params = new URLSearchParams();
        if (filters.status) params.append('status', filters.status);
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', String(filters.page));
        if (filters.limit) params.append('limit', String(filters.limit));
        const qs = params.toString() ? `?${params.toString()}` : '';
        return apiClient(`/base-products/${qs}`, { method: 'GET' }) as Promise<ListResponse<IBaseProduct>>;
    },

    getBySlug: async (slug: string) =>
        apiClient(`/base-products/${slug}`, { method: 'GET' }) as Promise<SingleResponse<IBaseProduct>>,

    getWithItems: async (slug: string) =>
        apiClient(`/base-products/${slug}/with-items`, { method: 'GET' }) as Promise<SingleResponse<IBaseProduct & { items: IProductItem[] }>>,

    create: async (data: Partial<IBaseProduct>, thumbnailFile: File) => {
        const body = buildBaseProductFormData(data, thumbnailFile);
        return apiClient('/base-products/admin', {
            method: 'POST',
            headers: { 'Content-Type': undefined as any },
            body,
        }) as Promise<SingleResponse<IBaseProduct>>;
    },

    update: async (id: string, data: Partial<IBaseProduct>, thumbnailFile?: File | null) => {
        const body = buildBaseProductFormData(data, thumbnailFile);
        return apiClient(`/base-products/admin/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': undefined as any },
            body,
        }) as Promise<SingleResponse<IBaseProduct>>;
    },

    delete: async (id: string) =>
        apiClient(`/base-products/admin/${id}`, { method: 'DELETE' }) as Promise<{ success: boolean; message: string }>,
};

// ------------------------------------------------------------------
// Product Items
// ------------------------------------------------------------------
function buildProductItemFormData(
    data: Partial<IProductItem>,
    thumbnailFile?: File | null,
    galleryFiles: File[] = []
): FormData {
    const fd = new FormData();
    if (data.baseProduct) fd.append('baseProduct', data.baseProduct as string);
    if (data.title) fd.append('title', data.title);
    if (data.description) fd.append('description', data.description);
    if (data.status) fd.append('status', data.status);
    if (data.price !== undefined) fd.append('price', String(data.price));
    if (data.featuredOrder !== undefined) fd.append('featuredOrder', String(data.featuredOrder));
    if (data.featureList) fd.append('featureList', JSON.stringify(data.featureList));
    if (data.points) fd.append('points', JSON.stringify(data.points));
    if (data.usedIn) fd.append('usedIn', JSON.stringify(data.usedIn));
    if (data.gallery) fd.append('gallery', JSON.stringify(data.gallery)); // existing gallery kept on update
    if (thumbnailFile) fd.append('thumbnail', thumbnailFile);
    galleryFiles.forEach((f) => fd.append('gallery', f));
    return fd;
}

export const productItemService = {
    getAll: async (filters: {
        baseProduct?: string; status?: string; search?: string;
        page?: number; limit?: number; sort?: string;
    } = {}) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => { if (v !== undefined) params.append(k, String(v)); });
        const qs = params.toString() ? `?${params.toString()}` : '';
        return apiClient(`/product-items/${qs}`, { method: 'GET' }) as Promise<ListResponse<IProductItem>>;
    },

    getBySlug: async (slug: string) =>
        apiClient(`/product-items/${slug}`, { method: 'GET' }) as Promise<SingleResponse<IProductItem>>,

    getByBaseProduct: async (baseProductId: string) =>
        apiClient(`/product-items/by-base/${baseProductId}`, { method: 'GET' }) as Promise<SingleResponse<IProductItem[]>>,

    getFeatured: async (limit = 10) =>
        apiClient(`/product-items/featured?limit=${limit}`, { method: 'GET' }) as Promise<SingleResponse<IProductItem[]>>,

    create: async (data: Partial<IProductItem>, thumbnailFile: File, galleryFiles: File[] = []) => {
        const body = buildProductItemFormData(data, thumbnailFile, galleryFiles);
        return apiClient('/product-items/admin', {
            method: 'POST',
            headers: { 'Content-Type': undefined as any },
            body,
        }) as Promise<SingleResponse<IProductItem>>;
    },

    update: async (id: string, data: Partial<IProductItem>, thumbnailFile?: File | null, galleryFiles: File[] = []) => {
        const body = buildProductItemFormData(data, thumbnailFile, galleryFiles);
        return apiClient(`/product-items/admin/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': undefined as any },
            body,
        }) as Promise<SingleResponse<IProductItem>>;
    },

    incrementPurchase: async (id: string, by = 1) =>
        apiClient(`/product-items/admin/${id}/purchase`, {
            method: 'PATCH',
            body: JSON.stringify({ by }),
        }) as Promise<SingleResponse<IProductItem>>,

    delete: async (id: string) =>
        apiClient(`/product-items/admin/${id}`, { method: 'DELETE' }) as Promise<{ success: boolean; message: string }>,
};