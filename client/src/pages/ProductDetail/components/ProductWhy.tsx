import { type FC } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductWhy: FC<Props> = ({ product }) => (
  <section
    aria-labelledby="why-title"
    style={{ background: theme.colors.surface, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
  >
    <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <div
          className="why-header"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 56, alignItems: 'end' }}
        >
          <div>
            <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
              Why Bowling Planet
            </motion.div>
            <motion.h2
              id="why-title"
              variants={fadeUp}
              className="font-display"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: theme.colors.text1,
                margin: 0,
              }}
            >
              A long-term delivery partner
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            style={{ margin: 0, color: theme.colors.text2, fontSize: 16, lineHeight: 1.75 }}
          >
            Equipment alone does not open or sustain an entertainment destination. Bowling Planet covers
            the advisory, delivery and post-opening layers that protect capital over the life of the venue.
          </motion.p>
        </div>

        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          {product.whyBowlingPlanet.map((point, i) => (
            <motion.li
              key={point.id}
              variants={fadeUp}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 240px 1fr',
                gap: 24,
                padding: '28px 0',
                borderBottom: `1px solid ${theme.colors.border}`,
                alignItems: 'start',
              }}
              className="why-row"
            >
              <span style={{ color: theme.colors.teal, fontWeight: 600, fontSize: 14, letterSpacing: '0.08em' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display" style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.colors.text1 }}>
                {point.title}
              </h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: theme.colors.text2 }}>
                {point.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </div>

    <style>{`
      @media (max-width: 800px) {
        .why-header { grid-template-columns: 1fr !important; gap: 20px !important; }
        .why-row { grid-template-columns: 48px 1fr !important; }
        .why-row h3 { grid-column: 2; }
        .why-row p { grid-column: 1 / -1; }
      }
    `}</style>
  </section>
)

export default ProductWhy
