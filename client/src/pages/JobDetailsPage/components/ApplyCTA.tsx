import type { FC } from 'react'
import type { JobStatus } from '../../JobsPage/services/jobsApi'
import styles from './ApplyCTA.module.css'

interface ApplyCTAProps {
  applicationEmail: string
  applicationDeadline?: string
  status: JobStatus
}

function formatDeadline(value: string): string {
  return new Date(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function isDeadlinePassed(value: string): boolean {
  const end = new Date(value)
  end.setHours(23, 59, 59, 999)
  return end.getTime() < Date.now()
}

const ApplyCTA: FC<ApplyCTAProps> = ({
  applicationEmail,
  applicationDeadline,
  status,
}) => {
  if (status !== 'open') {
    return (
      <section className={styles.section}>
        <div className={styles.box}>
          <h2 className={styles.heading}>Applications closed</h2>
          <p className={styles.closed}>This role is no longer accepting applications.</p>
        </div>
      </section>
    )
  }

  const passed = applicationDeadline ? isDeadlinePassed(applicationDeadline) : false

  return (
    <section className={styles.section} aria-labelledby="apply-heading">
      <div className={styles.box}>
        <h2 id="apply-heading" className={styles.heading}>
          Apply for this role
        </h2>
        <p className={styles.copy}>
          Send your CV and a short note to{' '}
          <a href={`mailto:${applicationEmail}`}>{applicationEmail}</a>.
        </p>

        {applicationDeadline ? (
          <p className={`${styles.deadline} ${passed ? styles.passed : ''}`}>
            {passed
              ? `Deadline passed · ${formatDeadline(applicationDeadline)}`
              : `Application deadline · ${formatDeadline(applicationDeadline)}`}
          </p>
        ) : null}

        {!passed ? (
          <a className={styles.cta} href={`mailto:${applicationEmail}`}>
            Email to apply
          </a>
        ) : null}
      </div>
    </section>
  )
}

export default ApplyCTA
