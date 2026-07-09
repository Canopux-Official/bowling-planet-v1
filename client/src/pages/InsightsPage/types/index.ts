export interface IMedia {
  type: 'image' | 'video' | 'file'
  url: string
  publicId: string
}

export interface IBlog {
  _id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImage?: IMedia
  author: string
  tags: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export type BlogListItem = Omit<IBlog, 'content'>

export interface IPaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ResourceType = 'pdf' | 'video' | 'tool' | 'link' | 'guide'

export interface IResource {
  _id: string
  title: string
  slug: string
  description: string
  type: ResourceType
  externalUrl: string
  category: string
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

// ---- HTTP envelopes, mirroring the Express controllers exactly ----

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

// getPublishedBlogs / getPublishedResources: meta is a sibling of data
export interface ApiListResponse<T> {
  success: boolean
  data: T[]
  meta: IPaginationMeta
}