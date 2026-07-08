import type { FC } from 'react'
import type { ITeamMember } from '../../services/teamApi'
import styles from './TeamMemberCard.module.css'

interface TeamMemberCardProps {
  member: ITeamMember
}

const TeamMemberCard: FC<TeamMemberCardProps> = ({ member }) => (
  <article className={styles.card}>
    <div className={styles.avatar}>
      <img src={member.image.url} alt={member.name} loading="lazy" />
    </div>
    <h3 className={styles.name}>{member.name}</h3>
    <p className={styles.role}>{member.designation}</p>
    {member.experience ? (
      <p className={styles.experience}>{member.experience}</p>
    ) : null}
  </article>
)

export default TeamMemberCard
