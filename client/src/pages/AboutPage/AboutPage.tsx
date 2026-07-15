import type { FC } from 'react'
import SEO from '../../components/SEO'
import AboutHero from './components/AboutHero'
import VisionMissionValues from './components/VisionMissionValues'
import ValueProposition from './components/ValueProposition'
import TeamSection from './components/TeamSection'
import EndorsedConnections from './components/EndorsedConnections'
import DistinctionStats from './components/DistinctionStats'
import CertificationBadges from './components/CertificationBadges'

const AboutPage: FC = () => (
  <>
    <SEO 
      title="About Us" 
      description="Learn about Bowling Planet, our vision, mission, and the team behind India's premier family entertainment centers."
    />
    <AboutHero />
    <DistinctionStats />
    <VisionMissionValues />
    <ValueProposition />
    <TeamSection />
    <EndorsedConnections />
    <CertificationBadges />
  </>
)

export default AboutPage
