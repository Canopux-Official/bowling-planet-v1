import type { FC } from 'react'

import styles from './BulletListSection.module.css'
import type { IBulletList } from '../../ProjectsPage/types'

interface BulletListSectionProps {
  bulletList?: IBulletList[]
}

const BulletListSection: FC<BulletListSectionProps> = ({ bulletList }) => {
  if (!bulletList || bulletList.length === 0) return null

  return (
    <section className={styles.section} aria-label="Project details lists">
      {bulletList.map((block) => (
        <div key={block.heading} className={styles.block}>
          <div className={styles.headingCol}>
            <span className={styles.accentBar} aria-hidden="true" />
            <h2 className={styles.heading}>{block.heading}</h2>
          </div>
          <ul className={styles.list}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default BulletListSection