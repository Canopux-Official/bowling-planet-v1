import { apiClient } from '../../../services/apiClient'

const BASE = '/landing'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface IMedia {
  type: 'image' | 'video' | 'file'
  url: string
  publicId?: string
}

export interface ITestimonialShowcase {
  _id: string
  clientName: string
  designation?: string
  companyName?: string
  message: string
  rating?: number | null
  clientImage?: IMedia | null
  testimonialImage?: IMedia | null
  project: {
    title: string
    slug: string
  }
  createdAt: string
}

export interface GetShowcaseTestimonialsParams {
  limit?: number
  rating?: number
}

export interface GetShowcaseTestimonialsResponse {
  success: boolean
  count: number
  total: number
  data: ITestimonialShowcase[]
}

export interface IBlogSummary {
  _id: string
  title: string
  slug: string
  excerpt?: string
  coverImage?: IMedia
  author: string
  tags: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface GetPublishedBlogsParams {
  page?: number
  limit?: number
  tags?: string[]
  search?: string
}

export interface GetPublishedBlogsResponse {
  blogs: IBlogSummary[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface IProjectSummary {
  _id: string
  title: string
  slug: string
  description?: string
  tags: string[]
  media?: IMedia[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface GetAllProjectsParams {
  page?: number
  limit?: number
  tags?: string[]
  search?: string
}

export interface GetAllProjectsResponse {
  projects: IProjectSummary[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// ---------------------------------------------------------------------------
// GET /api/landing/testimonials
// ---------------------------------------------------------------------------

export const getShowcaseTestimonials = async (
  params: GetShowcaseTestimonialsParams = {}
): Promise<GetShowcaseTestimonialsResponse> => {
  const searchParams = new URLSearchParams()

  if (params.limit) searchParams.append('limit', String(params.limit))
  if (params.rating) searchParams.append('rating', String(params.rating))

  const url = `${BASE}/testimonials?${searchParams.toString()}`

  return apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' },
  }) as Promise<GetShowcaseTestimonialsResponse>
}

// ---------------------------------------------------------------------------
// GET /api/landing/blogs
// ---------------------------------------------------------------------------

export const getPublishedBlogs = async (
  params: GetPublishedBlogsParams = {}
): Promise<GetPublishedBlogsResponse> => {
  const searchParams = new URLSearchParams()
  searchParams.append('page', String(params.page ?? 1))
  searchParams.append('limit', String(params.limit ?? 10))

  if (params.search) searchParams.append('search', params.search)
  if (params.tags?.length) searchParams.append('tags', params.tags.join(','))

  const url = `${BASE}/blogs?${searchParams.toString()}`

  const res = (await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' },
  })) as {
    data: IBlogSummary[]
    meta: GetPublishedBlogsResponse['pagination']
  }

  return {
    blogs: res.data,
    pagination: res.meta,
  }
}

// ---------------------------------------------------------------------------
// GET /api/landing/projects
// ---------------------------------------------------------------------------

export const getAllProjects = async (
  params: GetAllProjectsParams = {}
): Promise<GetAllProjectsResponse> => {
  const searchParams = new URLSearchParams()
  searchParams.append('page', String(params.page ?? 1))
  searchParams.append('limit', String(params.limit ?? 10))

  if (params.search) searchParams.append('search', params.search)
  if (params.tags?.length) searchParams.append('tags', params.tags.join(','))

  const url = `${BASE}/projects?${searchParams.toString()}`

  const res = (await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' },
  })) as {
    data: {
      projects: IProjectSummary[]
      pagination: GetAllProjectsResponse['pagination']
    }
  }

  return {
    projects: res.data.projects,
    pagination: res.data.pagination,
  }
}