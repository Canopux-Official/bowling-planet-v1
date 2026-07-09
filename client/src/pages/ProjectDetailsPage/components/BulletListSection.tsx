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
          <h2 className={styles.heading}>{block.heading}</h2>
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
