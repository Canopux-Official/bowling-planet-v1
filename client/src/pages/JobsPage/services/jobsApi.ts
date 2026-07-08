import {
  mockJobs,
  mockPagination,
  type GetAllJobsParams,
  type GetAllJobsResponse,
  type IJob,
  type IPaginationMeta,
  type JobSort,
  type JobStatus,
  type JobType,
  type ExperienceLevel,
  type WorkMode,
} from './mockJobs'

export type {
  GetAllJobsParams,
  GetAllJobsResponse,
  IJob,
  IPaginationMeta,
  JobSort,
  JobStatus,
  JobType,
  ExperienceLevel,
  WorkMode,
}

export async function getAllJobs(params: GetAllJobsParams): Promise<GetAllJobsResponse> {
  // TODO: implement API call
  // Temporary local filter so UI filters work against mock data until the backend is wired.
  let jobs = [...mockJobs]

  if (params.status) jobs = jobs.filter((j) => j.status === params.status)
  if (params.jobType) jobs = jobs.filter((j) => j.jobType === params.jobType)
  if (params.workMode) jobs = jobs.filter((j) => j.workMode === params.workMode)
  if (params.experience) jobs = jobs.filter((j) => j.experience === params.experience)
  if (params.department) jobs = jobs.filter((j) => j.department === params.department)
  if (params.tags?.length) {
    jobs = jobs.filter((j) => params.tags!.some((t) => j.tags.includes(t)))
  }
  if (params.search?.trim()) {
    const q = params.search.trim().toLowerCase()
    jobs = jobs.filter((j) => j.title.toLowerCase().includes(q))
  }

  switch (params.sort) {
    case 'oldest':
      jobs.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      break
    case 'title':
      jobs.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'newest':
    default:
      jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      break
  }

  const page = params.page ?? 1
  const limit = params.limit ?? mockPagination.limit
  const total = jobs.length
  const totalPages = Math.max(1, Math.ceil(total / limit) || 1)
  const start = (page - 1) * limit
  const pageJobs = jobs.slice(start, start + limit)

  return Promise.resolve({
    jobs: pageJobs,
    pagination: { total, page, limit, totalPages },
  })
}
