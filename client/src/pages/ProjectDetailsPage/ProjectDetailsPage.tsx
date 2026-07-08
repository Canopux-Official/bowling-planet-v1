import { type FC, useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'
import type { IProject } from '../ProjectsPage/services/projectsApi'
// 1. Import your mock project data array

import ProjectHero from './components/ProjectHero'
import ProjectGallery from './components/ProjectGallery'
import FeaturePointsList from './components/FeaturePointsList'
import BulletListSection from './components/BulletListSection'
import SetupStepsTimeline from './components/SetupStepsTimeline'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import styles from './ProjectDetailsPage.module.css'
import { MOCK_PROJECTS } from '../ProjectsPage/services/mockdata'

const ProjectDetailsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<IProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!slug) {
      setError('Project not found.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      // 2. Simulate network delay (e.g., 400ms) to witness your loader
      await new Promise((resolve) => setTimeout(resolve, 400));

      // 3. Find the specific project matching the URL slug parameter
      const matchedProject = MOCK_PROJECTS.find((p) => p.slug === slug);

      if (!matchedProject) {
        setProject(null)
        setError('Project not found.')
      } else {
        // Cast as IProject safely for template integration
        setProject(matchedProject as unknown as IProject)
      }
    } catch {
      setError('Unable to load this project.')
      setProject(null)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => {
    void load()
  }, [load])

  if (loading) {
    return (
      <main className={styles.page}>
        <Loader label="Loading project…" />
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className={styles.page}>
        <div className={styles.missing}>
          {error ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : (
            <>
              <h1>Project not found</h1>
              <p>This project is unavailable or the link is incorrect.</p>
            </>
          )}
          <Link to="/projects">Back to projects</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <ProjectHero
        title={project.title}
        description={project.description}
        tags={project.tags}
      />
      <ProjectGallery media={project.media} />
      <FeaturePointsList featurePoints={project.featurePoints} />
      <BulletListSection bulletList={project.bulletList} />
      <SetupStepsTimeline setupSteps={project.setupSteps} />
      <TestimonialsCarousel testimonials={project.testimonials} />
    </main>
  )
}

export default ProjectDetailsPage