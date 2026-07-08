/**
 * Shared project types — mirrors backend Mongoose schema exactly.
 * // Assumption: types colocated with list API to avoid an extra types folder.
 */

export interface IMedia {
  type: 'image' | 'video'
  url: string
  publicId?: string
}

export interface IFeaturePoint {
  title: string
  description?: string
}

export interface IBulletList {
  heading: string
  items: string[]
}

export interface ISetupStep {
  stepNumber: number
  title: string
  description?: string
  points?: string[]
  image?: IMedia
}

export interface ITestimonial {
  clientName: string
  designation?: string
  companyName?: string
  message: string
  rating?: number
  clientImage?: IMedia
}

export interface IProject {
  _id: string
  title: string
  slug: string
  description?: string
  tags: string[]
  media?: IMedia[]
  featurePoints?: IFeaturePoint[]
  bulletList?: IBulletList[]
  setupSteps?: ISetupStep[]
  testimonials?: ITestimonial[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface IPaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ProjectSort = 'newest' | 'oldest' | 'title'

export interface GetAllProjectsParams {
  page?: number
  limit?: number
  tags?: string[]
  search?: string
  sort?: ProjectSort
  isPublished?: boolean
}

export interface GetAllProjectsResponse {
  projects: IProject[]
  pagination: IPaginationMeta
}

export async function getAllProjects(
  params: GetAllProjectsParams,
): Promise<GetAllProjectsResponse> {
  // TODO: implement API call
  const page = params.page ?? 1
  const limit = params.limit ?? 9
  return {
    projects: [],
    pagination: { total: 0, page, limit, totalPages: 0 },
  }
}
