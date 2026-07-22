import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import SEO from '../../components/SEO'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'
import ProjectHero from './components/ProjectHero'
import ProjectGallery from './components/ProjectGallery'
import FeaturePointsList from './components/FeaturePointsList'
import BulletListSection from './components/BulletListSection'
import SetupStepsTimeline from './components/SetupStepsTimeline'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import type { IProject } from '../ProjectsPage/types'
import { getProjectBySlug } from './services/projectDetailsApi'

const ProjectDetailsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<IProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('features')

  const load = useCallback(async () => {
    if (!slug) {
      setError('Project not found.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await getProjectBySlug(slug)
      setProject(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load this project.'
      setProject(null)
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    void load()
  }, [load])

  const navItems = useMemo(() => {
    if (!project) return []
    const items: { id: string; label: string }[] = []
    if (project.featurePoints && project.featurePoints.length > 0) {
      items.push({ id: 'features', label: 'Features' })
    }
    if (project.setupSteps && project.setupSteps.length > 0) {
      items.push({ id: 'steps', label: 'Steps' })
    }
    if (project.testimonials && project.testimonials.length > 0) {
      items.push({ id: 'testimonials', label: 'Testimonials' })
    }
    if (project.bulletList && project.bulletList.length > 0) {
      items.push({ id: 'highlights', label: 'Highlights' })
    }
    return items
  }, [project])

  useEffect(() => {
    if (navItems.length === 0) return
    setActiveSection(navItems[0].id)

    const observers: IntersectionObserver[] = []
    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(item.id)
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [navItems, project])

  if (loading) {
    return (
      <div className="project-details-page flex min-h-[60vh] items-center justify-center bg-black px-7 pt-32">
        <Loader label="Loading project…" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="project-details-page min-h-[60vh] bg-black px-7 pt-32">
        <div className="mx-auto max-w-xl text-center">
          {error ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-[#F5F5F7]">Project not found</h1>
              <p className="mt-2 text-[#A1A1A6]">This project is unavailable or the link is incorrect.</p>
            </>
          )}
          <Link to="/projects" className="mt-6 inline-block text-sm text-[#5FC1D1] hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="project-details-page bg-black text-[#F5F5F7]">
      <SEO
        title={project.title}
        description={project.description || `Read about the ${project.title} project`}
      />

      {/* Top */}
      <div className="relative px-5 pb-8 pt-28 sm:px-7 sm:pt-32">
        <div className="orb orb-teal pointer-events-none absolute right-[-8%] top-0 h-[380px] w-[380px] opacity-35" />
        <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-20" />

        <div className="relative z-[1] mx-auto max-w-[1100px]">
          <Link
            to="/projects"
            className="mb-5 inline-flex text-sm text-[#A1A1A6] transition-colors hover:text-[#5FC1D1]"
          >
            ← All projects
          </Link>

          {/* Hero + Gallery as separate transparent blocks */}
          <div className="flex flex-col gap-10 sm:gap-12">
            <ProjectHero
              title={project.title}
              description={project.description}
              tags={project.tags}
              projectId={project._id || project.slug}
            />
            <ProjectGallery media={project.media} />
          </div>
        </div>
      </div>

      {/* Sticky horizontal section nav — fills width, no empty sidebar */}
      {navItems.length > 0 ? (
        <div className="sticky top-16 z-40 border-y border-white/[0.08] bg-black/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1100px] gap-2 overflow-x-auto px-5 py-3 sm:px-7">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-[#5FC1D1]/15 text-[#5FC1D1]'
                    : 'text-[#A1A1A6] hover:bg-white/[0.04] hover:text-[#F5F5F7]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <FeaturePointsList featurePoints={project.featurePoints} />
      <SetupStepsTimeline setupSteps={project.setupSteps} />
      <TestimonialsCarousel testimonials={project.testimonials} />
      <BulletListSection bulletList={project.bulletList} />
    </div>
  )
}

export default ProjectDetailsPage
