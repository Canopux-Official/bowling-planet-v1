import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import { fadeUp, staggerContainer } from '../../../animations/motion'

const ProductsHero: FC = () => (
  <section
    aria-labelledby="products-hero-title"
    style={{
      background: theme.colors.void,
      padding: '120px 28px 64px',
      borderBottom: `1px solid ${theme.colors.border}`,
    }}
  >
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}
    >
      <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
        <ol
          style={{
            display: 'flex',
            gap: 8,
            listStyle: 'none',
            padding: 0,
            margin: 0,
            fontSize: 13,
            color: theme.colors.text2,
          }}
        >
          <li>
            <Link to="/" style={{ color: theme.colors.text2, textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li style={{ color: theme.colors.text1 }} aria-current="page">
            Solutions
          </li>
        </ol>
      </nav>

      <motion.div variants={fadeUp} className="label" style={{ marginBottom: 18 }}>
        Entertainment Solutions
      </motion.div>
      <motion.h1
        id="products-hero-title"
        variants={fadeUp}
        className="font-display"
        style={{
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.035em',
          lineHeight: 1.08,
          maxWidth: 760,
          marginBottom: 20,
          color: theme.colors.text1,
        }}
      >
        Complete programmes for entertainment destinations
      </motion.h1>
      <motion.p
        variants={fadeUp}
        style={{
          fontSize: 17,
          lineHeight: 1.75,
          color: theme.colors.text2,
          maxWidth: 580,
          margin: 0,
        }}
      >
        Explore turnkey solutions spanning consulting, planning, supply, installation and operations —
        not equipment catalogues.
      </motion.p>
    </motion.div>
  </section>
)

export default ProductsHero
