import { type FC, useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'
import type { IJob } from '../JobsPage/services/jobsApi'
import { getJobBySlug } from './services/jobDetailsApi'
import JobHeader from './components/JobHeader'
import JobOverview from './components/JobOverview'
import EligibilityCriteriaList from './components/EligibilityCriteriaList'
import RequirementsList from './components/RequirementsList'
import KeyResponsibilitiesList from './components/KeyResponsibilitiesList'
import SkillsList from './components/SkillsList'
import ApplyCTA from './components/ApplyCTA'
import styles from './JobDetailsPage.module.css'

const JobDetailsPage: FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [job, setJob] = useState<IJob | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!slug) {
      setError('Job not found.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await getJobBySlug(slug)
      setJob(data)
    } catch {
      setError('Unable to load this job.')
      setJob(null)
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
        <Loader label="Loading job…" />
      </main>
    )
  }

  if (error || !job) {
    return (
      <main className={styles.page}>
        <div className={styles.missing}>
          {error ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : (
            <ErrorState message="Job not found." />
          )}
          <p>
            <Link to="/careers">Back to careers</Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <JobHeader
        title={job.title}
        department={job.department}
        location={job.location}
        jobType={job.jobType}
        workMode={job.workMode}
        experience={job.experience}
        openings={job.openings}
        applicationDeadline={job.applicationDeadline}
      />
      <JobOverview description={job.description} />
      <EligibilityCriteriaList eligibilityCriteria={job.eligibilityCriteria} />
      <RequirementsList requirements={job.requirements} />
      <KeyResponsibilitiesList keyResponsibilities={job.keyResponsibilities} />
      <SkillsList skills={job.skills} />
      <ApplyCTA
        applicationEmail={job.applicationEmail}
        applicationDeadline={job.applicationDeadline}
        status={job.status}
      />
    </main>
  )
}

export default JobDetailsPage
