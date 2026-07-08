import type { FC } from 'react'
import styles from './ValueProposition.module.css'

const POINTS = [
  { title: 'Industry Expertise', text: 'Deep FEC knowledge across attractions, ops and commercial design.' },
  { title: 'Innovative Solutions', text: 'Programme mixes tailored to catchment, capital and brand fit.' },
  { title: '17+ Years of Experience', text: 'Delivery history spanning destination and neighbourhood formats.' },
  { title: 'Turnkey Delivery', text: 'Consulting through installation, training and go-live support.' },
  { title: 'Global Sourcing', text: 'Access to curated attraction and games ecosystems worldwide.' },
  { title: 'ROI Focus', text: 'Planning decisions anchored to utilisation and unit economics.' },
  { title: 'Safety & Standards', text: 'Installation and ops guidance aligned to safety discipline.' },
  { title: 'Long-term Partnership', text: 'AMC and advisory support after opening, not only handover.' },
]

const ValueProposition: FC = () => (
  <section className={styles.section} aria-labelledby="value-prop-heading">
    <div className={styles.inner}>
      <h2 id="value-prop-heading" className={styles.heading}>
        Why partners choose us
      </h2>
      <div className={styles.grid}>
        {POINTS.map((point, index) => (
          <article key={point.title} className={styles.card}>
            <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
            <h3 className={styles.title}>{point.title}</h3>
            <p className={styles.text}>{point.text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default ValueProposition
