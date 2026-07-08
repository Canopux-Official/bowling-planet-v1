import type { FC } from 'react'
import styles from './JobHeader.module.css'

interface JobHeaderProps {
  title: string
  department?: string
  location: string
  jobType: string
  workMode: string
  experience: string
  openings: number
  applicationDeadline?: string
}

function formatDeadline(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const JobHeader: FC<JobHeaderProps> = ({
  title,
  department,
  location,
  jobType,
  workMode,
  experience,
  openings,
  applicationDeadline,
}) => (
  <header className={styles.header}>
    <div className={styles.inner}>
      {department ? <p className={styles.department}>{department}</p> : null}
      <h1 className={styles.title}>{title}</h1>
      <ul className={styles.meta}>
        <li>{location}</li>
        <li>{jobType}</li>
        <li>{workMode}</li>
        <li>{experience}</li>
        <li>
          {openings} opening{openings === 1 ? '' : 's'}
        </li>
        {applicationDeadline ? (
          <li>Deadline: {formatDeadline(applicationDeadline)}</li>
        ) : null}
      </ul>
    </div>
  </header>
)

export default JobHeader
