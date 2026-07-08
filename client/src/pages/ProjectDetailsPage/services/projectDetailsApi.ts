import type { IProject } from '../../ProjectsPage/services/projectsApi'

export async function getProjectBySlug(slug: string): Promise<IProject> {
  // TODO: implement API call
  return {
    _id: '',
    title: '',
    slug,
    tags: [],
    isPublished: true,
    createdAt: '',
    updatedAt: '',
  }
}
