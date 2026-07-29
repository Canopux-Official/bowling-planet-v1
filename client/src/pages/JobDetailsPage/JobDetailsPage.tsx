import { type FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../components/common/Loader'
import ErrorState from '../../components/common/ErrorState'
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

  const { data: job, isLoading: loading, error, refetch } = useQuery({
    queryKey: ['public-job-details', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Job not found.')
      return await getJobBySlug(slug)
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })

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
            <ErrorState message={error.message || 'Unable to load this job.'} onRetry={() => void refetch()} />
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
