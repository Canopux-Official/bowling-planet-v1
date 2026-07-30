// import type { FC } from 'react'
// import type { ITeamMember } from '../../services/teamApi'

// interface TeamMemberCardProps {
//   member: ITeamMember
// }

// const TeamMemberCard: FC<TeamMemberCardProps> = ({ member }) => (
//   <article className="flex h-full flex-col items-center rounded-xl border border-white/[0.08] bg-[#111118] p-4 text-center transition-colors hover:border-[#5FC1D1]/35">
//     <div className="mb-3 h-14 w-14 overflow-hidden rounded-full border border-[#5FC1D1]/30 bg-[#0A0A0F]">
//       <img
//         src={member.image.url}
//         alt={member.name}
//         loading="lazy"
//         className="h-full w-full object-cover"
//       />
//     </div>
//     <h3 className="text-sm font-bold text-[#F5F5F7]">{member.name}</h3>
//     <p className="mt-1 text-[11px] font-semibold text-[#5FC1D1]">{member.designation}</p>
//     {member.experience ? (
//       <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#636366]">{member.experience}</p>
//     ) : null}
//   </article>
// )

// export default TeamMemberCard


import type { FC } from 'react'
import type { ITeamMember } from '../../services/teamApi'

interface TeamMemberCardProps {
  member: ITeamMember
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ member }) => (
  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111118] transition-all duration-300 hover:-translate-y-1 hover:border-[#5FC1D1]/40 hover:shadow-[0_24px_48px_-24px_rgba(95,193,209,0.4)]">
    {/* Mat / frame — any image ratio sits fully visible inside, like a print in a passe-partout */}
    <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#0A0A0F] p-4 sm:p-5">
      {/* faint radial vignette behind the mat for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(95,193,209,0.08), transparent 65%)',
        }}
      />

      {/* registration ticks — corners of the mat, light up on hover */}
      <span className="absolute left-2.5 top-2.5 h-3 w-3 border-l border-t border-white/15 transition-colors duration-300 group-hover:border-[#5FC1D1]/80" />
      <span className="absolute right-2.5 top-2.5 h-3 w-3 border-r border-t border-white/15 transition-colors duration-300 group-hover:border-[#5FC1D1]/80" />
      <span className="absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-white/15 transition-colors duration-300 group-hover:border-[#5FC1D1]/80" />
      <span className="absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-white/15 transition-colors duration-300 group-hover:border-[#5FC1D1]/80" />

      {/* image — object-contain so nothing is ever cropped, whatever the source ratio */}
      <div className="relative h-full w-full overflow-hidden rounded-lg border border-white/[0.06] bg-[#111118]">
        <img
          src={member.image.url}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-contain object-center grayscale-[55%] transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
    </div>

    {/* Divider that grows from center on hover */}
    <div className="relative h-px w-full bg-white/[0.08]">
      <div className="absolute inset-y-0 left-1/2 w-0 -translate-x-1/2 bg-[#5FC1D1] transition-all duration-500 ease-out group-hover:w-full" />
    </div>

    {/* Copy */}
    <div className="flex flex-1 flex-col gap-1.5 p-4 text-center sm:text-left">
      <h3 className="text-sm font-bold leading-tight text-[#F5F5F7]">{member.name}</h3>

      <span className="inline-flex w-fit items-center self-center rounded-full border border-[#5FC1D1]/25 bg-[#5FC1D1]/[0.08] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#5FC1D1] sm:self-start">
        {member.designation}
      </span>

      {member.experience ? (
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#8A8A92]">
          {member.experience}
        </p>
      ) : null}
    </div>
  </article>
)

export default TeamMemberCard