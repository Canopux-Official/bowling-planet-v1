import type { FC } from 'react'
import styles from './EndorsedConnections.module.css'

const PARTNERS = [
  { name: 'IAAPA', color: 'rgba(95,193,209,0.18)' },
  { name: 'ISO', color: 'rgba(109,189,78,0.18)' },
  { name: 'AES', color: 'rgba(95,193,209,0.14)' },
  { name: 'RAW', color: 'rgba(109,189,78,0.14)' },
  { name: 'UNIS', color: 'rgba(95,193,209,0.12)' },
  { name: 'SEGA', color: 'rgba(109,189,78,0.12)' },
  { name: 'AMF', color: 'rgba(95,193,209,0.16)' },
  { name: 'Qubica', color: 'rgba(109,189,78,0.16)' },
]

const EndorsedConnections: FC = () => (
  <section className={styles.section} aria-labelledby="partners-heading">
    <div className={styles.inner}>
      <h2 id="partners-heading" className={styles.heading}>
        Endorsed connections
      </h2>
      <div className={styles.row}>
        {PARTNERS.map((partner) => (
          <div
            key={partner.name}
            className={styles.logo}
            style={{ background: partner.color }}
            aria-label={partner.name}
          >
            {partner.name}
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default EndorsedConnections
