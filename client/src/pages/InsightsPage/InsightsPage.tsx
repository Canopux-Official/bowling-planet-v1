import type { FC } from 'react'
import BlogsColumn from './components/BlogsColumn'
import ResourcesColumn from './components/ResourcesColumn'
import styles from './InsightsPage.module.css'

const InsightsPage: FC = () => (
  <main className={styles.page}>
    <div className={styles.inner}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Insights</span>
        <h1 className={styles.title}>Blogs & resources</h1>
        <p className={styles.subtitle}>
          Practical notes and downloadable tools for FEC operators, investors and destination partners.
        </p>
      </header>

      <div className={styles.columns}>
        <BlogsColumn />
        <ResourcesColumn />
      </div>
    </div>
  </main>
)

export default InsightsPage
