import type { FC } from 'react'
import type { ITeamMember } from '../../services/teamApi'

interface TeamMemberCardProps {
  member: ITeamMember
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ member }) => (
  <article className="flex h-full flex-col items-center rounded-xl border border-white/[0.08] bg-[#111118] p-4 text-center transition-colors hover:border-[#5FC1D1]/35">
    <div className="mb-3 h-14 w-14 overflow-hidden rounded-full border border-[#5FC1D1]/30 bg-[#0A0A0F]">
      <img
        src={member.image.url}
        alt={member.name}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
    <h3 className="text-sm font-bold text-[#F5F5F7]">{member.name}</h3>
    <p className="mt-1 text-[11px] font-semibold text-[#5FC1D1]">{member.designation}</p>
    {member.experience ? (
      <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#636366]">{member.experience}</p>
    ) : null}
  </article>
)

export default TeamMemberCard
