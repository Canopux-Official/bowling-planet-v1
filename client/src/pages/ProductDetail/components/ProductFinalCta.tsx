import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import { CTA } from '../../../constants/site'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

const ProductFinalCta: FC = () => (
  <section
    aria-labelledby="final-cta-title"
    style={{
      background: theme.colors.surface,
      padding: '112px 28px',
      borderBottom: `1px solid ${theme.colors.border}`,
    }}
  >
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}
    >
      <motion.div variants={fadeUp} className="label" style={{ justifyContent: 'center', marginBottom: 20 }}>
        Next Step
      </motion.div>
      <motion.h2
        id="final-cta-title"
        variants={fadeUp}
        className="font-display"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.12,
          marginBottom: 20,
          color: theme.colors.text1,
        }}
      >
        Let&apos;s build your entertainment destination
      </motion.h2>
      <motion.p
        variants={fadeUp}
        style={{
          fontSize: 17,
          lineHeight: 1.75,
          color: theme.colors.text2,
          maxWidth: 540,
          margin: '0 auto 40px',
        }}
      >
        Share your site, footprint and investment range. Our team will respond with a structured consultation —
        not a generic sales pitch.
      </motion.p>
      <motion.div
        variants={fadeUp}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}
      >
        <Link to={CTA.bookConsultation.href} className="btn btn-primary">
          {CTA.bookConsultation.label}
        </Link>
        <Link to={CTA.talkToExperts.href} className="btn btn-ghost">
          {CTA.talkToExperts.label}
        </Link>
        <Link to={CTA.requestProposal.href} className="btn btn-ghost">
          {CTA.requestProposal.label}
        </Link>
      </motion.div>
    </motion.div>
  </section>
)

export default ProductFinalCta
