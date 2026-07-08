import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IJob } from '../services/jobsApi'
import Tag from '../../../components/common/Tag'
import Badge from '../../../components/common/Badge'
import styles from './JobCard.module.css'

interface JobCardProps {
  job: IJob
}

const JobCard: FC<JobCardProps> = ({ job }) => (
  <Link to={`/careers/${job.slug}`} className={styles.card}>
    <div className={styles.top}>
      <div>
        {job.department ? <p className={styles.department}>{job.department}</p> : null}
        <h3 className={styles.title}>{job.title}</h3>
      </div>
      {job.status === 'open' ? <Badge label="Open" variant="success" /> : null}
    </div>

    <ul className={styles.meta}>
      <li>{job.location}</li>
      <li>{job.jobType}</li>
      <li>{job.workMode}</li>
      <li>{job.experience}</li>
    </ul>

    {job.tags.length > 0 ? (
      <div className={styles.tags}>
        {job.tags.slice(0, 4).map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    ) : null}
  </Link>
)

export default JobCard
