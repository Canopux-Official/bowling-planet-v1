import type { FC } from 'react'
import styles from './CertificationBadges.module.css'

const BADGES = [
  {
    title: 'ISO 9001:2015 Certified',
    text: 'Quality management systems supporting consistent project delivery and documentation.',
  },
  {
    title: 'Proud IAAPA Member',
    text: 'Connected to global attractions standards, education and industry best practices.',
  },
  {
    title: 'Authorized Exporter',
    text: 'Structured sourcing and logistics pathways for international and domestic programmes.',
  },
]

const CertificationBadges: FC = () => (
  <section className={styles.section} aria-labelledby="certifications-heading">
    <div className={styles.inner}>
      <h2 id="certifications-heading" className={styles.heading}>
        Certifications & memberships
      </h2>
      <div className={styles.grid}>
        {BADGES.map((badge) => (
          <article key={badge.title} className={styles.card}>
            <h3 className={styles.title}>{badge.title}</h3>
            <p className={styles.text}>{badge.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default CertificationBadges
