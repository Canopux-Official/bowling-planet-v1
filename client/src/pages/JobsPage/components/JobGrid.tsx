import type { FC } from 'react'
import type { IJob } from '../services/jobsApi'
import EmptyState from '../../../components/common/EmptyState'
import Loader from '../../../components/common/Loader'
import JobCard from './JobCard'
import styles from './JobGrid.module.css'

interface JobGridProps {
  jobs: IJob[]
  loading?: boolean
}

const JobGrid: FC<JobGridProps> = ({ jobs, loading }) => {
  if (loading) return <Loader label="Loading jobs…" />

  if (jobs.length === 0) {
    return <EmptyState message="No open roles match your filters." />
  }

  return (
    <div className={styles.grid}>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  )
}

export default JobGrid
