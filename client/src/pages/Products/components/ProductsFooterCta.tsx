import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import { CTA } from '../../../constants/site'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

const ProductsFooterCta: FC = () => (
  <section
    aria-labelledby="products-cta-title"
    style={{
      background: theme.colors.void,
      padding: '96px 28px',
      borderTop: `1px solid ${theme.colors.border}`,
    }}
  >
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}
    >
      <motion.div variants={fadeUp} className="label" style={{ justifyContent: 'center', marginBottom: 18 }}>
        Consultation
      </motion.div>
      <motion.h2
        id="products-cta-title"
        variants={fadeUp}
        className="font-display"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          marginBottom: 16,
          color: theme.colors.text1,
        }}
      >
        Need a custom entertainment programme?
      </motion.h2>
      <motion.p
        variants={fadeUp}
        style={{ fontSize: 16, lineHeight: 1.75, color: theme.colors.text2, marginBottom: 32 }}
      >
        Share your site type, footprint and investment range. Our team will recommend a mix —
        consulting through operations — not a equipment list.
      </motion.p>
      <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to={CTA.bookConsultation.href} className="btn btn-primary">
          {CTA.bookConsultation.label}
        </Link>
        <Link to={CTA.requestQuote.href} className="btn btn-ghost">
          {CTA.requestQuote.label}
        </Link>
      </motion.div>
    </motion.div>
  </section>
)

export default ProductsFooterCta
