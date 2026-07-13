export interface IMedia {
  type: 'image' | 'video'
  url: string
  publicId?: string
}

export type TeamMemberStatus = 'active' | 'inactive'

export interface ITeamMember {
  _id: string
  name: string
  designation: string
  experience?: string
  image: IMedia
  order: number
  status: TeamMemberStatus
  createdAt: string
  updatedAt: string
}

export interface GetAllTeamMembersParams {
  status?: TeamMemberStatus
}

// Mirrors sendResponse-style envelope in the Express controller —
// no pagination here, just { success, data }.
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}
