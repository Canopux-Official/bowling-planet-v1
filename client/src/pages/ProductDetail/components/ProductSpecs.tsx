import { type FC } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../theme'
import type { Product } from '../../../types/product'
import { fadeUp, staggerContainer, viewportOnce } from '../../../animations/motion'

interface Props {
  product: Product
}

const ProductSpecs: FC<Props> = ({ product }) => (
  <section
    aria-labelledby="specs-title"
    style={{ background: theme.colors.void, padding: '96px 28px', borderBottom: `1px solid ${theme.colors.border}` }}
  >
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
        <motion.div variants={fadeUp} className="label" style={{ marginBottom: 16 }}>
          Technical Specifications
        </motion.div>
        <motion.h2
          id="specs-title"
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: 40,
            color: theme.colors.text1,
          }}
        >
          Engineering & operating parameters
        </motion.h2>

        <motion.div variants={fadeUp} style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: theme.typography.fontBody,
            }}
          >
            <caption className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              Technical specifications for {product.name}
            </caption>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.colors.borderMd}` }}>
                <th
                  scope="col"
                  style={{
                    textAlign: 'left',
                    padding: '14px 16px 14px 0',
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: theme.colors.text3,
                    fontWeight: 600,
                    width: '34%',
                  }}
                >
                  Parameter
                </th>
                <th
                  scope="col"
                  style={{
                    textAlign: 'left',
                    padding: '14px 0',
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: theme.colors.text3,
                    fontWeight: 600,
                  }}
                >
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {product.specifications.map((spec) => (
                <tr key={spec.label} style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                  <th
                    scope="row"
                    style={{
                      textAlign: 'left',
                      padding: '20px 16px 20px 0',
                      fontSize: 15,
                      fontWeight: 600,
                      color: theme.colors.text1,
                      verticalAlign: 'top',
                    }}
                  >
                    {spec.label}
                  </th>
                  <td
                    style={{
                      padding: '20px 0',
                      fontSize: 15,
                      lineHeight: 1.65,
                      color: theme.colors.text2,
                      verticalAlign: 'top',
                    }}
                  >
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  </section>
)

export default ProductSpecs
