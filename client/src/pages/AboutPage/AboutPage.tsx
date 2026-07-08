import type { FC } from 'react'
import AboutHero from './components/AboutHero'
import VisionMissionValues from './components/VisionMissionValues'
import ValueProposition from './components/ValueProposition'
import TeamSection from './components/TeamSection'
import EndorsedConnections from './components/EndorsedConnections'
import DistinctionStats from './components/DistinctionStats'
import CertificationBadges from './components/CertificationBadges'
import styles from './AboutPage.module.css'

const AboutPage: FC = () => (
  <main className={styles.page}>
    <AboutHero />
    <VisionMissionValues />
    <ValueProposition />
    <TeamSection />
    <EndorsedConnections />
    <DistinctionStats />
    <CertificationBadges />
  </main>
)

export default AboutPage
