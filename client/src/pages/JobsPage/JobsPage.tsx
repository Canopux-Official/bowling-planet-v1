import { type FC, useCallback, useEffect, useState } from 'react'
import ErrorState from '../../components/common/ErrorState'
import JobFilters, { type JobFilterState } from './components/JobFilters'
import JobGrid from './components/JobGrid'
import Pagination from './components/Pagination'
import {
  getAllJobs,
  type IJob,
  type IPaginationMeta,
} from './services/jobsApi'
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

  // Dynamic filter options extracted from API data arrays
  const [availableDepartments, setAvailableDepartments] = useState<string[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])

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

      // 1. Extract departments dynamically if no department filter is actively set
      if (!filters.department) {
        const uniqueDeps = Array.from(
          new Set(data.jobs.map((j) => j.department).filter((d): d is string => Boolean(d)))
        ).sort()
        setAvailableDepartments(uniqueDeps)
      }

      // 2. Extract tags dynamically if no tag filters are actively set
      if (filters.tags.length === 0) {
        const uniqueTags = Array.from(
          new Set(data.jobs.flatMap((j) => j.tags || []))
        ).sort()
        setAvailableTags(uniqueTags)
      }

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