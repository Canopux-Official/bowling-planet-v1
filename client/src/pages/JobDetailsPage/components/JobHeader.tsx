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

function isClosingSoon(value: string): boolean {
  const diff = new Date(value).getTime() - Date.now()
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 7
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
    <div className={styles.grid} aria-hidden="true" />
    <div className={styles.inner}>
      <div className={styles.eyebrow}>
        <span className={styles.eyebrowLine} />
        <span className={styles.eyebrowText}>
          {department ? department : 'Open Position'}
        </span>
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.metaRow}>
        <ul className={styles.meta}>
          <li className={styles.metaChip}>{location}</li>
          <li className={styles.metaChip}>{jobType}</li>
          <li className={styles.metaChip}>{workMode}</li>
          <li className={styles.metaChip}>{experience}</li>
          <li className={styles.metaChip}>
            {openings} opening{openings === 1 ? '' : 's'}
          </li>
        </ul>

        {applicationDeadline ? (
          <div
            className={`${styles.deadline} ${
              isClosingSoon(applicationDeadline) ? styles.deadlineUrgent : ''
            }`}
          >
            <span className={styles.deadlineDot} />
            Apply by {formatDeadline(applicationDeadline)}
          </div>
        ) : null}
      </div>
    </div>
  </header>
)

export default JobHeader