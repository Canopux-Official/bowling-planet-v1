
import { apiClient } from '../../../services/apiClient'
import type {
  ApiListResponse,
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
  // 1. Construct URL search parameters
  const searchParams = new URLSearchParams()
  searchParams.append('page', String(params.page ?? 1))
  searchParams.append('limit', String(params.limit ?? 10))

  if (params.status) searchParams.append('status', params.status)
  if (params.jobType) searchParams.append('jobType', params.jobType)
  if (params.workMode) searchParams.append('workMode', params.workMode)
  if (params.experience) searchParams.append('experience', params.experience)
  if (params.department) searchParams.append('department', params.department)
  if (params.search) searchParams.append('search', params.search)
  
  if (params.tags?.length) {
    searchParams.append('tags', params.tags.join(','))
  }
  
  if (params.sort) {
    searchParams.append('sort', mapSortToQuery(params.sort))
  }

  const url = `${BASE}?${searchParams.toString()}`

  // 2. Call apiClient directly with the required config and skip-refresh flag
  const res = await apiClient(url, {
    method: 'GET',
    headers: { 'x-skip-auth-refresh': 'true' }
  }) as ApiListResponse<IJob>

  // 3. Reshape the sibling { data, pagination } into the nested shape JobsPage expects.
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
