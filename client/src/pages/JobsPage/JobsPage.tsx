import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import ErrorState from '../../components/common/ErrorState'
import JobFilters, { type JobFilterState } from './components/JobFilters'
import JobGrid from './components/JobGrid'
import Pagination from './components/Pagination'
import {
  getAllJobs,
  type IJob,
  type IPaginationMeta,
} from './services/jobsApi'
import { mockJobs } from './services/mockJobs'
import styles from './JobsPage.module.css'

const DEFAULT_FILTERS: JobFilterState = {
  search: '',
  jobType: '',
  workMode: '',
  experience: '',
  department: '',
  tags: [],
  sort: 'newest',
}

const JobsPage: FC = () => {
  const [filters, setFilters] = useState<JobFilterState>(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [jobs, setJobs] = useState<IJob[]>([])
  const [pagination, setPagination] = useState<IPaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Assumption: derive filter option lists from mockJobs until a dedicated metadata endpoint exists.
  const availableDepartments = useMemo(
    () =>
      Array.from(
        new Set(mockJobs.map((j) => j.department).filter((d): d is string => Boolean(d))),
      ).sort(),
    [],
  )
  const availableTags = useMemo(
    () => Array.from(new Set(mockJobs.flatMap((j) => j.tags))).sort(),
    [],
  )

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllJobs({
        status: 'open',
        page,
        limit: 10,
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
    } catch {
      setError('Unable to load jobs.')
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => {
    void load()
  }, [load])

  const handleFiltersChange = (next: JobFilterState) => {
    setFilters(next)
    setPage(1)
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Careers</span>
          <h1 className={styles.title}>Open roles</h1>
          <p className={styles.subtitle}>
            Join the team building entertainment destinations across India — consulting, design,
            operations and digital.
          </p>
        </header>

        <JobFilters
          value={filters}
          availableDepartments={availableDepartments}
          availableTags={availableTags}
          onChange={handleFiltersChange}
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
    </main>
  )
}

export default JobsPage
