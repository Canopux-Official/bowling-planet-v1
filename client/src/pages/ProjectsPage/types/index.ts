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

// HTTP envelope only — mirrors sendResponse() in the Express controller.
// Not a domain type, so it stays separate from the shapes above.
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}