/**
 * Products catalogue — discovery experience
 * Hero → Intro → Tabs → Search → Sidebar → Sort → Grid → Pagination → CTA
 */
import { type FC, useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { theme } from '../../theme'
import { SITE, ROUTES } from '../../constants/site'
import type {
  BusinessType,
  ProductCategory,
  ProductFilterState,
  ProductQueryResult,
  SortOption,
} from '../../types/product'
import {
  createDefaultFilters,
  getFilterOptions,
  queryProducts,
} from '../../services/productService'
import { absoluteUrl, buildBreadcrumbSchema, buildOrganizationSchema, toJsonLd } from '../../utils/seo'
import ProductsHero from './components/ProductsHero'
import CategoryTabs from './components/CategoryTabs'
import ProductSearch from './components/ProductSearch'
import ProductSidebarFilters from './components/ProductSidebarFilters'
import ProductSortBar from './components/ProductSortBar'
import ProductGrid from './components/ProductGrid'
import ProductPagination from './components/ProductPagination'
import ProductsFooterCta from './components/ProductsFooterCta'

const ProductsPage: FC = () => {
  const [filters, setFilters] = useState<ProductFilterState>(createDefaultFilters)
  const [result, setResult] = useState<ProductQueryResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [industries, setIndustries] = useState<string[]>([])
  const [applications, setApplications] = useState<string[]>([])
  const [mobileFilters, setMobileFilters] = useState(false)

  useEffect(() => {
    getFilterOptions().then((opts) => {
      setIndustries(opts.industries)
      setApplications(opts.applications)
    })
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)
    queryProducts(filters).then((data) => {
      if (!active) return
      setResult(data)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [filters])

  const updateFilters = useCallback((partial: Partial<ProductFilterState>) => {
    setFilters((prev) => {
      const next = { ...prev, ...partial }
      if (!('page' in partial)) next.page = 1
      return next
    })
  }, [])

  const toggleInArray = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  const title = `Entertainment Solutions | ${SITE.name}`
  const description =
    'Browse turnkey FEC solutions — bowling, VR, soft play, arcade and major attractions. Consulting, planning, supply, installation and operations from Bowling Planet.'

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={absoluteUrl(ROUTES.products)} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absoluteUrl(ROUTES.products)} />
        <script type="application/ld+json">{toJsonLd(buildOrganizationSchema())}</script>
        <script type="application/ld+json">
          {toJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Solutions', path: '/products' },
            ]),
          )}
        </script>
      </Helmet>

      <ProductsHero />

      <section
        aria-label="Introduction"
        style={{
          background: theme.colors.surface,
          padding: '40px 28px',
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <p
          style={{
            maxWidth: theme.layout.maxWidth,
            margin: '0 auto',
            fontSize: 15,
            lineHeight: 1.75,
            color: theme.colors.text2,
          }}
        >
          Every listing is a programme package — scope, space, industries and delivery model —
          so malls, hotels, developers and operators can shortlist by business fit before requesting a consultation.
        </p>
      </section>

      <CategoryTabs
        active={filters.category}
        onChange={(category: ProductCategory | 'All') => updateFilters({ category })}
      />

      <section style={{ background: theme.colors.surface, padding: '40px 28px 80px' }}>
        <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto' }}>
          <ProductSearch
            value={filters.search}
            onChange={(search) => updateFilters({ search })}
          />

          <div
            className="products-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: 32,
              alignItems: 'start',
            }}
          >
            <ProductSidebarFilters
              industries={industries}
              applications={applications}
              selectedIndustries={filters.industries}
              selectedBusinessTypes={filters.businessTypes}
              selectedApplications={filters.applications}
              onToggleIndustry={(value) =>
                updateFilters({ industries: toggleInArray(filters.industries, value) })
              }
              onToggleBusinessType={(value: BusinessType) =>
                updateFilters({ businessTypes: toggleInArray(filters.businessTypes, value) })
              }
              onToggleApplication={(value) =>
                updateFilters({ applications: toggleInArray(filters.applications, value) })
              }
              onClear={() =>
                updateFilters({
                  industries: [],
                  businessTypes: [],
                  applications: [],
                })
              }
              mobileOpen={mobileFilters}
              onCloseMobile={() => setMobileFilters(false)}
            />

            <div>
              <ProductSortBar
                total={result?.total ?? 0}
                sort={filters.sort}
                onSortChange={(sort: SortOption) => updateFilters({ sort })}
                onOpenFilters={() => setMobileFilters(true)}
              />
              <ProductGrid items={result?.items ?? []} loading={loading} />
              <ProductPagination
                page={result?.page ?? 1}
                totalPages={result?.totalPages ?? 1}
                onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
              />
            </div>
          </div>
        </div>
      </section>

      <ProductsFooterCta />

      <style>{`
        @media (max-width: 960px) {
          .products-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}

export default ProductsPage
