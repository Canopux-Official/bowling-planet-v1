import type { FC } from 'react'
import styles from './VisionMissionValues.module.css'

const VISION =
  'To be the most trusted partner for building and operating Family Entertainment Centers across India and key international markets.'

const MISSION =
  'Deliver complete entertainment programmes — consulting, planning, supply, installation and operations — that create durable commercial outcomes for investors and memorable experiences for guests.'

const VALUES = [
  'Excellence',
  'Integrity',
  'Client-Centric Approach',
  'Accountability',
  'Innovation',
  'Safety First',
  'Partnership',
  'Operational Discipline',
]

const VisionMissionValues: FC = () => (
  <section className={styles.section} aria-label="Vision, mission and values">
    <div className={styles.inner}>
      <article className={styles.card}>
        <h2 className={styles.label}>Our Vision</h2>
        <p className={styles.text}>{VISION}</p>
      </article>
      <article className={styles.card}>
        <h2 className={styles.label}>Our Mission</h2>
        <p className={styles.text}>{MISSION}</p>
      </article>
      <article className={styles.card}>
        <h2 className={styles.label}>Our Values</h2>
        <ul className={styles.values}>
          {VALUES.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </article>
    </div>
  </section>
)

export default VisionMissionValues
