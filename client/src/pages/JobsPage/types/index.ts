export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance'
export type ExperienceLevel = 'Fresher' | '0-1 years' | '1-3 years' | '3-5 years' | '5+ years'
export type WorkMode = 'On-site' | 'Remote' | 'Hybrid'
export type JobStatus = 'open' | 'closed' | 'draft'

export interface IJob {
  _id: string
  title: string
  slug: string
  description: string
  location: string
  workMode: WorkMode
  jobType: JobType
  experience: ExperienceLevel
  eligibilityCriteria: string[]
  requirements: string[]
  keyResponsibilities: string[]
  skills: string[]
  tags: string[]
  department?: string
  openings: number
  applicationEmail: string
  applicationDeadline?: string
  status: JobStatus
  createdAt: string
  updatedAt: string
}

export interface IPaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type JobSort = 'newest' | 'oldest' | 'title'

export interface GetAllJobsParams {
  status?: JobStatus
  jobType?: JobType
  workMode?: WorkMode
  experience?: ExperienceLevel
  department?: string
  tags?: string[]
  search?: string
  page?: number
  limit?: number
  sort?: JobSort
}

// What the UI (JobsPage) consumes — same nested shape as before,
// even though the backend returns pagination as a sibling of data.
export interface GetAllJobsResponse {
  jobs: IJob[]
  pagination: IPaginationMeta
}

// ---- HTTP envelopes, mirroring the Express controller exactly ----

// Single-item responses: createJob, getJobBySlug, getJobById, updateJob
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

// getAllJobs response: pagination is a SIBLING of data, not nested in it
export interface ApiListResponse<T> {
  success: boolean
  data: T[]
  pagination: IPaginationMeta
}