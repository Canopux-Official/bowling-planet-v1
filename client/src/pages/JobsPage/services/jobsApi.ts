
import apiClient from '../../../hooks/apiClient'
import type {
  ApiListResponse,
  ApiResponse,
  GetAllJobsParams,
  GetAllJobsResponse,
  IJob,
  IPaginationMeta,
  JobSort,
  JobStatus,
  JobType,
  ExperienceLevel,
  WorkMode,
} from '../types'

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

const BASE = '/career'

// GET /api/jobs
export const getAllJobs = async (
  params: GetAllJobsParams = {}
): Promise<GetAllJobsResponse> => {
  const query: Record<string, unknown> = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  }

  if (params.status) query.status = params.status
  if (params.jobType) query.jobType = params.jobType
  if (params.workMode) query.workMode = params.workMode
  if (params.experience) query.experience = params.experience
  if (params.department) query.department = params.department
  if (params.tags?.length) query.tags = params.tags.join(',')
  if (params.search) query.search = params.search
  // Controller expects a Mongoose sort string ('-createdAt' | 'createdAt' | 'title'),
  // not the UI's 'newest' | 'oldest' | 'title', so translate it here.
  if (params.sort) query.sort = mapSortToQuery(params.sort)

  const res = await apiClient.get<ApiListResponse<IJob>>(BASE, query)

  // Reshape the sibling { data, pagination } into the nested shape JobsPage expects.
  return {
    jobs: res.data,
    pagination: res.pagination,
  }
}

function mapSortToQuery(sort: JobSort): string {
  switch (sort) {
    case 'oldest':
      return 'createdAt'
    case 'title':
      return 'title'
    case 'newest':
    default:
      return '-createdAt'
  }
}