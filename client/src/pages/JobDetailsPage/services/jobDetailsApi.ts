import type { IJob } from '../../JobsPage/services/mockJobs'
import { mockJobs } from '../../JobsPage/services/mockJobs'

export async function getJobBySlug(slug: string): Promise<IJob> {
  // TODO: implement API call
  const found = mockJobs.find((job) => job.slug === slug)
  return Promise.resolve(found ?? mockJobs[0])
}
