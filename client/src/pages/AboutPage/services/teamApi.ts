import {
  mockTeamMembers,
  type ITeamMember,
  type TeamMemberStatus,
} from './mockTeamMembers'

export type { ITeamMember, TeamMemberStatus }

export interface GetAllTeamMembersParams {
  status?: TeamMemberStatus
}

export async function getAllTeamMembers(
  params?: GetAllTeamMembersParams,
): Promise<ITeamMember[]> {
  // TODO: implement API call
  const status = params?.status ?? 'active'
  const members = mockTeamMembers
    .filter((m) => m.status === status)
    .sort((a, b) => a.order - b.order)
  return Promise.resolve(members)
}
