import { type FC, useCallback, useEffect, useState } from 'react'
import ErrorState from '../../components/common/ErrorState'
import ProjectFilters, { type ProjectFilterState } from './components/ProjectFilters'
import ProjectGrid from './components/ProjectGrid'
import Pagination from './components/Pagination'
import {
  getAllProjects,
  type IPaginationMeta,
  type IProject,
} from './services/projectsApi'
import styles from './ProjectsPage.module.css'

const DEFAULT_FILTERS: ProjectFilterState = {
  search: '',
  tags: [],
  sort: 'newest',
}

const ProjectsPage: FC = () => {
  const [filters, setFilters] = useState<ProjectFilterState>(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [projects, setProjects] = useState<IProject[]>([])
  const [pagination, setPagination] = useState<IPaginationMeta>({
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 0,
  })
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllProjects({
        page,
        limit: 9,
        search: filters.search || undefined,
        tags: filters.tags.length ? filters.tags : undefined,
        sort: filters.sort,
        isPublished: true,
      })
      setProjects(data.projects)
      setPagination(data.pagination)
      // Collect tags from current result set until a dedicated tags endpoint exists.
      const tags = Array.from(new Set(data.projects.flatMap((p) => p.tags))).sort()
      if (tags.length) setAvailableTags(tags)
    } catch {
      setError('Unable to load projects.')
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => {
    void load()
  }, [load])

  const handleFiltersChange = (next: ProjectFilterState) => {
    setFilters(next)
    setPage(1)
  }

  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Projects</span>
          <h1 className={styles.title}>Our work</h1>
          <p className={styles.subtitle}>
            Selected entertainment destinations delivered for malls, hotels, resorts and operators.
          </p>
        </header>

        <ProjectFilters
          value={filters}
          availableTags={availableTags}
          onChange={handleFiltersChange}
        />

        {error ? (
          <ErrorState message={error} onRetry={() => void load()} />
        ) : (
          <>
            <ProjectGrid projects={projects} loading={loading} />
            {!loading ? (
              <Pagination meta={pagination} onPageChange={setPage} />
            ) : null}
          </>
        )}
      </div>
    </main>
  )
}

export default ProjectsPage
