import { type FC, useCallback, useEffect, useState } from 'react'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import EmptyState from '../../../components/common/EmptyState'
import { getAllTeamMembers, type ITeamMember } from '../services/teamApi'
import TeamMemberCard from './TeamSection/TeamMemberCard'
import styles from './TeamSection.module.css'

const INITIAL_VISIBLE = 8

const TeamSection: FC = () => {
  const [members, setMembers] = useState<ITeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllTeamMembers({ status: 'active' })
      // Safety net sort — API is expected to return order ascending already.
      const sorted = [...data].sort((a, b) => a.order - b.order)
      setMembers(sorted)
    } catch {
      setError('Unable to load team members.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const visible = showAll ? members : members.slice(0, INITIAL_VISIBLE)

  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <div className={styles.inner}>
        <h2 id="team-heading" className={styles.heading}>
          Our team
        </h2>
        <p className={styles.subtitle}>
          Operators, consultants and specialists who deliver entertainment programmes end to end.
        </p>

        {loading ? <Loader label="Loading team…" /> : null}
        {error ? <ErrorState message={error} onRetry={() => void load()} /> : null}
        {!loading && !error && members.length === 0 ? (
          <EmptyState message="No team members to display yet." />
        ) : null}

        {!loading && !error && members.length > 0 ? (
          <>
            <div className={styles.grid}>
              {visible.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
              ))}
            </div>
            {members.length > INITIAL_VISIBLE ? (
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.toggle}
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? 'Show less' : 'View More'}
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  )
}

export default TeamSection
