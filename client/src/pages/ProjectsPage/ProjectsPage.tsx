import { type FC, useCallback, useEffect, useState } from 'react'
import SEO from '../../components/SEO'
import ErrorState from '../../components/common/ErrorState'
import ProjectFilters, { type ProjectFilterState } from './components/ProjectFilters'
import ProjectGrid from './components/ProjectGrid'
import Pagination from './components/Pagination'
import { useReveal } from '../../hooks/useReveal'
import type { IPaginationMeta, IProject } from './types'
import { getAllProjects } from './services/projectsApi'

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
  const headRef = useReveal()

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

  return (
    <div className="bg-black text-[#F5F5F7]">
      <SEO
        title="Our Projects"
        description="Explore the entertainment destinations and family entertainment centers we have built across India."
      />

      {/* Hero — use div to avoid global section overflow clipping */}
      <div className="relative px-5 pb-14 pt-32 sm:px-7 sm:pb-16 sm:pt-36">
        <div className="orb orb-teal pointer-events-none absolute left-1/2 top-[-20%] h-[560px] w-[680px] -translate-x-1/2 opacity-50" />
        <div className="orb orb-green pointer-events-none absolute bottom-[-8%] right-[-4%] h-[280px] w-[280px] opacity-70" />
        <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative z-[1] mx-auto max-w-[1100px] text-center">
          <div ref={headRef} className="reveal">
            <div className="label mb-6 justify-center">Our Work</div>
            <h1 className="font-display mb-5 text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold leading-[1.12] tracking-[-0.04em]">
              <span className="text-metallic block">Entertainment</span>
              <span className="text-gradient-brand block">Destinations</span>
              <span className="text-metallic block">We&apos;ve Built.</span>
            </h1>
            <p className="mx-auto max-w-[520px] text-[17px] leading-relaxed text-[#A1A1A6]">
              Selected FEC programmes delivered for malls, hotels, resorts and operators across India.
            </p>
          </div>
        </div>
      </div>

      {/* Listing */}
      <div className="relative px-5 pb-20 sm:px-7">
        <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
        <div className="relative z-[1] mx-auto max-w-[1200px]">
          <ProjectFilters
            value={filters}
            availableTags={availableTags}
            onChange={(next) => {
              setFilters(next)
              setPage(1)
            }}
          />
          {error ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : (
            <>
              <ProjectGrid projects={projects} loading={loading} />
              {!loading ? <Pagination meta={pagination} onPageChange={setPage} /> : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage
