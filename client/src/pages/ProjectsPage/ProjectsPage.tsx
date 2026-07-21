// import { type FC, useCallback, useEffect, useState } from 'react'
// import SEO from '../../components/SEO'
// import ErrorState from '../../components/common/ErrorState'
// import ProjectFilters, { type ProjectFilterState } from './components/ProjectFilters'
// import ProjectGrid from './components/ProjectGrid'
// import Pagination from './components/Pagination'
// import { theme } from '../../theme'
// import { useReveal } from '../../hooks/useReveal'
// import type { IPaginationMeta, IProject } from './types'
// import { getAllProjects } from './services/projectsApi'

// const DEFAULT_FILTERS: ProjectFilterState = {
//   search: '',
//   tags: [],
//   sort: 'newest',
// }

// const ProjectsPage: FC = () => {
//   const [filters, setFilters] = useState<ProjectFilterState>(DEFAULT_FILTERS)
//   const [page, setPage] = useState(1)
//   const [projects, setProjects] = useState<IProject[]>([])
//   const [pagination, setPagination] = useState<IPaginationMeta>({ total: 0, page: 1, limit: 9, totalPages: 0 })
//   const [availableTags, setAvailableTags] = useState<string[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const headRef = useReveal()

//   const load = useCallback(async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       const data = await getAllProjects({
//         page, limit: 9,
//         search: filters.search || undefined,
//         tags: filters.tags.length ? filters.tags : undefined,
//         sort: filters.sort,
//         isPublished: true,
//       })
//       setProjects(data.projects)
//       setPagination(data.pagination)
//       const tags = Array.from(new Set(data.projects.flatMap((p) => p.tags))).sort()
//       if (tags.length) setAvailableTags(tags)
//     } catch {
//       setError('Unable to load projects.')
//     } finally {
//       setLoading(false)
//     }
//   }, [filters, page])

//   useEffect(() => { void load() }, [load])

//   const handleFiltersChange = (next: ProjectFilterState) => {
//     setFilters(next)
//     setPage(1)
//   }

//   return (
//     <>
//       <SEO 
//         title="Our Projects" 
//         description="Explore the entertainment destinations and family entertainment centers we have built across India."
//       />
//       {/* Hero */}
//       <section style={{ background: theme.colors.void, padding: '140px 28px 80px', position: 'relative', overflow: 'hidden' }}>
//         <div className="orb orb-teal" style={{ width: 700, height: 600, top: '-25%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
//         <div className="orb orb-green" style={{ width: 300, height: 300, bottom: '-5%', right: '-5%' }} />
//         <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
//         <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
//           <div ref={headRef} className="reveal" style={{ textAlign: 'center' }}>
//             <div className="label" style={{ justifyContent: 'center', marginBottom: 24 }}>Our Work</div>
//             <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', marginBottom: 24 }}>
//               <span className="text-metallic" style={{ display: 'block' }}>Entertainment</span>
//               <span className="text-gradient-brand" style={{ display: 'block' }}>Destinations</span>
//               <span className="text-metallic" style={{ display: 'block' }}>We've Built.</span>
//             </h1>
//             <p style={{ fontSize: 17, color: theme.colors.text2, maxWidth: 520, margin: '0 auto', lineHeight: 1.75, fontFamily: theme.typography.fontBody }}>
//               Selected FEC programmes delivered for malls, hotels, resorts and operators across India.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <section style={{ background: theme.colors.surface, padding: '60px 28px 80px', position: 'relative' }}>
//         <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
//         <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
//           <ProjectFilters value={filters} availableTags={availableTags} onChange={handleFiltersChange} />
//           {error ? (
//             <ErrorState message={error} onRetry={() => void load()} />
//           ) : (
//             <>
//               <ProjectGrid projects={projects} loading={loading} />
//               {!loading ? <Pagination meta={pagination} onPageChange={setPage} /> : null}
//             </>
//           )}
//         </div>
//       </section>
//     </>
//   )
// }

// export default ProjectsPage



import { type FC, useCallback, useEffect, useState } from 'react'
import SEO from '../../components/SEO'
import ErrorState from '../../components/common/ErrorState'
import ProjectFilters, { type ProjectFilterState } from './components/ProjectFilters'
import ProjectGrid from './components/ProjectGrid'
import Pagination from './components/Pagination'
import { theme } from '../../theme'
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
  const [pagination, setPagination] = useState<IPaginationMeta>({ total: 0, page: 1, limit: 9, totalPages: 0 })
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const headRef = useReveal()

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getAllProjects({
        page, limit: 9,
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

  useEffect(() => { void load() }, [load])

  const handleFiltersChange = (next: ProjectFilterState) => {
    setFilters(next)
    setPage(1)
  }

  return (
    <>
      <SEO 
        title="Our Projects" 
        description="Explore the entertainment destinations and family entertainment centers we have built across India."
      />
      {/* Hero */}
      <section style={{ background: theme.colors.void, padding: '140px 28px 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-teal" style={{ width: 700, height: 600, top: '-25%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
        <div className="orb orb-green" style={{ width: 300, height: 300, bottom: '-5%', right: '-5%' }} />
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div ref={headRef} className="reveal" style={{ textAlign: 'center' }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', marginBottom: 24 }}>
              <span className="text-gradient-brand">FEC Consulting</span>
              <span className="text-metallic" style={{ display: 'block' }}>Portfolio</span>
            </h1>
            <p style={{ fontSize: 16, color: theme.colors.text2, maxWidth: 480, margin: '0 auto', lineHeight: 1.6, fontFamily: theme.typography.fontBody }}>
              Expert Family Entertainment Center solutions delivered across India.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: theme.colors.surface, padding: '60px 28px 80px', position: 'relative' }}>
        <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <ProjectFilters value={filters} availableTags={availableTags} onChange={handleFiltersChange} />
          {error ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : (
            <>
              <ProjectGrid projects={projects} loading={loading} />
              {!loading ? <Pagination meta={pagination} onPageChange={setPage} /> : null}
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default ProjectsPage