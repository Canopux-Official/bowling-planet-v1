import { type FC, useCallback, useEffect, useState } from 'react'
import ErrorState from '../../components/common/ErrorState'
import JobFilters, { type JobFilterState } from './components/JobFilters'
import JobGrid from './components/JobGrid'
import Pagination from './components/Pagination'
import { theme } from '../../theme'
import { useReveal } from '../../hooks/useReveal'
import {
  getAllJobs,
  type IJob,
  type IPaginationMeta,
} from './services/jobsApi'

const DEFAULT_FILTERS: JobFilterState = {
  search: '',
  jobType: '',
  workMode: '',
  experience: '',
  department: '',
  tags: [],
  sort: 'newest',
}

const PERKS = [
  { icon: '🚀', label: 'Growth Focused', sub: "Build a real career in India's fastest-growing industry" },
  { icon: '🤝', label: 'Collaborative', sub: "Work alongside some of India's best FEC consultants" },
  { icon: '🌍', label: 'Pan-India Impact', sub: 'Projects across malls, hotels and resorts' },
  { icon: '🎮', label: 'Cool Industry', sub: 'Entertainment, gaming and experiences at work daily' },
]

const JobsPage: FC = () => {
  const [filters, setFilters] = useState<JobFilterState>(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [jobs, setJobs] = useState<IJob[]>([])
  const [pagination, setPagination] = useState<IPaginationMeta>({ total: 0, page: 1, limit: 10, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const headRef = useReveal()
  const gridRef = useReveal()

  const load = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const data = await getAllJobs({
        status: 'open', page, limit: 10,
        search: filters.search || undefined,
        jobType: filters.jobType || undefined,
        workMode: filters.workMode || undefined,
        experience: filters.experience || undefined,
        department: filters.department || undefined,
        tags: filters.tags.length ? filters.tags : undefined,
        sort: filters.sort,
      })
      setJobs(data.jobs)
      setPagination(data.pagination)
      if (!filters.department) {
        setAvailableDepartments(Array.from(new Set(data.jobs.map((j) => j.department).filter((d): d is string => Boolean(d)))).sort())
      }
      if (filters.tags.length === 0) {
        setAvailableTags(Array.from(new Set(data.jobs.flatMap((j) => j.tags || []))).sort())
      }
    } catch {
      setError('Unable to load jobs.')
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => { void load() }, [load])

  return (
    <>
      {/* Hero */}
      <section style={{ background: theme.colors.void, padding: '140px 28px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-teal" style={{ width: 700, height: 600, top: '-25%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
        <div className="orb orb-green" style={{ width: 300, height: 300, bottom: '-5%', left: '-5%' }} />
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div ref={headRef} className="reveal" style={{ textAlign: 'center' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: 24 }}>Careers</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', marginBottom: 24 }}>
              <span className="text-metallic" style={{ display: 'block' }}>Build India's Best</span>
              <span className="text-gradient-brand" style={{ display: 'block' }}>Entertainment</span>
              <span className="text-metallic" style={{ display: 'block' }}>Destinations.</span>
            </h1>
            <p style={{ fontSize: 17, color: theme.colors.text2, maxWidth: 520, margin: '0 auto 52px', lineHeight: 1.75, fontFamily: theme.typography.fontBody }}>
              Join our team of consultants, designers and operators shaping the next generation of Family Entertainment Centers across India.
            </p>
          </div>

          <div ref={gridRef} className="reveal careers-perks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {PERKS.map((p) => (
              <div key={p.label} className="glass-card" style={{ padding: '22px 18px', textAlign: 'left', borderRadius: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontFamily: theme.typography.fontDisplay, fontWeight: 700, fontSize: 14, color: theme.colors.text1, marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 12, color: theme.colors.text3, fontFamily: theme.typography.fontBody, lineHeight: 1.5 }}>{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: theme.colors.surface, padding: '60px 28px 80px', position: 'relative' }}>
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <JobFilters
            value={filters}
            availableDepartments={availableDepartments}
            availableTags={availableTags}
            onChange={(next) => { setFilters(next); setPage(1) }}
          />
          {error ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : (
            <>
              <JobGrid jobs={jobs} loading={loading} />
              {!loading ? <Pagination meta={pagination} onPageChange={setPage} /> : null}
            </>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .careers-perks-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px)  { .careers-perks-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; } }
      `}</style>
    </>
  )
}

export default JobsPage
