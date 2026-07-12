import type { FC } from 'react'
import type { ITeamMember } from '../../services/teamApi'
import { theme } from '../../../../theme'

interface TeamMemberCardProps {
  member: ITeamMember
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ member }) => (
  <article
    className="glass-card"
    style={{
      padding: '28px 24px',
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 12,
    }}
  >
    <div style={{
      width: 80,
      height: 80,
      borderRadius: '50%',
      overflow: 'hidden',
      border: `2px solid ${theme.colors.teal}40`,
      flexShrink: 0,
    }}>
      <img
        src={member.image.url}
        alt={member.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <div>
      <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: theme.colors.text1, marginBottom: 4, letterSpacing: '-0.01em' }}>
        {member.name}
      </h3>
      <p style={{ fontSize: 13, color: theme.colors.teal, fontFamily: theme.typography.fontBody, fontWeight: 600, marginBottom: member.experience ? 6 : 0 }}>
        {member.designation}
      </p>
      {member.experience ? (
        <p style={{ fontSize: 12, color: theme.colors.text3, fontFamily: theme.typography.fontBody, lineHeight: 1.5 }}>
          {member.experience}
        </p>
      ) : null}
    </div>
  </article>
)

export default TeamMemberCard
