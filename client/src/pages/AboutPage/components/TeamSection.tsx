import { type FC, useCallback, useEffect, useState } from 'react'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import EmptyState from '../../../components/common/EmptyState'
import { getAllTeamMembers, type ITeamMember } from '../services/teamApi'
import TeamMemberCard from './TeamSection/TeamMemberCard'
import { theme } from '../../../theme'
import { useReveal } from '../../../hooks/useReveal'

const INITIAL_VISIBLE = 8

const TeamSection: FC = () => {
  const [members, setMembers] = useState<ITeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const headRef = useReveal()
  const gridRef = useReveal()

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllTeamMembers({ status: 'active' })
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
    <section style={{ background: theme.colors.surface, padding: '100px 28px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-teal" style={{ width: 500, height: 500, bottom: '-10%', right: '-8%', opacity: 0.4 }} />
      <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div ref={headRef} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>The People</div>
          <h2 className="font-display text-metallic" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 12 }}>
            Our Team.
          </h2>
          <p style={{ color: theme.colors.text2, fontSize: 16, maxWidth: 480, margin: '0 auto', fontFamily: theme.typography.fontBody }}>
            Operators, consultants and specialists who deliver entertainment programmes end to end.
          </p>
        </div>

        {loading ? <Loader label="Loading team…" /> : null}
        {error ? <ErrorState message={error} onRetry={() => void load()} /> : null}
        {!loading && !error && members.length === 0 ? (
          <EmptyState message="No team members to display yet." />
        ) : null}

        {!loading && !error && members.length > 0 ? (
          <div ref={gridRef} className="reveal">
            <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {visible.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
              ))}
            </div>
            {members.length > INITIAL_VISIBLE ? (
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ fontSize: 14 }}
                  onClick={() => setShowAll((prev) => !prev)}
                >
                  {showAll ? 'Show less' : 'View all team members'}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <style>{`
        @media (max-width: 1000px) { .team-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 700px)  { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 440px)  { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

export default TeamSection
