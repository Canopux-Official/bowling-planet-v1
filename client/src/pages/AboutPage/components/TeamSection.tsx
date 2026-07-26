import { type FC, useCallback, useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import EmptyState from '../../../components/common/EmptyState'
import { getAllTeamMembers, type ITeamMember } from '../services/teamApi'
import TeamMemberCard from './TeamSection/TeamMemberCard'

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
      setMembers([...data].sort((a, b) => a.order - b.order))
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
    <section aria-labelledby="about-team-heading" className="border-t border-white/[0.08] pt-10">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Users size={16} className="text-[#5FC1D1]" />
            <h2 id="about-team-heading" className="font-display text-base font-bold text-[#F5F5F7]">
              Leadership & team
            </h2>
          </div>
          <p className="text-sm text-[#86868B]">Specialists behind programme delivery.</p>
        </div>
        {!loading && !error && members.length > 0 ? (
          <p className="text-xs font-semibold text-[#636366]">{members.length} members</p>
        ) : null}
      </div>

      {loading ? <Loader label="Loading team…" /> : null}
      {error ? <ErrorState message={error} onRetry={() => void load()} /> : null}
      {!loading && !error && members.length === 0 ? (
        <EmptyState message="No team members to display yet." />
      ) : null}

      {!loading && !error && members.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((member) => (
              <TeamMemberCard key={member._id} member={member} />
            ))}
          </div>
          {members.length > INITIAL_VISIBLE ? (
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="cursor-pointer rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-[#5FC1D1] transition-colors hover:border-[#5FC1D1]/45 hover:bg-[#5FC1D1]/10"
              >
                {showAll ? 'Show less' : 'View full team'}
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  )
}

export default TeamSection
