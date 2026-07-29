import { type FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import EmptyState from '../../../components/common/EmptyState'
import {
  getPublishedResources,
  type ResourceType,
} from '../services/resourcesApi'
import ResourceCard from './ResourcesColumn/ResourceCard'
import ResourcesPagination from './ResourcesColumn/ResourcesPagination'
import styles from './ResourcesColumn.module.css'

const RESOURCE_TYPES: ResourceType[] = ['pdf', 'video', 'tool', 'link', 'guide']

const ResourcesColumn: FC = () => {
  const [category, setCategory] = useState('')
  const [type, setType] = useState<ResourceType | ''>('')
  const [page, setPage] = useState(1)

  const { data: allCategories } = useQuery({
    queryKey: ['public-resources-categories'],
    queryFn: async () => {
      const data = await getPublishedResources({ page: 1, limit: 100 })
      return Array.from(new Set(data.resources.map((r) => r.category))).sort()
    },
    staleTime: 5 * 60 * 1000,
  })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['public-resources', page, category, type],
    queryFn: async () => {
      return await getPublishedResources({
        page,
        limit: 4,
        category: category || undefined,
        type: type || undefined,
      })
    },
    staleTime: 5 * 60 * 1000,
  })

  const categories = allCategories || []
  const resources = data?.resources || []
  const meta = data?.meta || { page: 1, limit: 4, total: 0, totalPages: 0 }

  return (
    <section className={styles.column} aria-labelledby="resources-heading">
      <h2 id="resources-heading" className={styles.heading}>
        Resources
      </h2>

      <div className={styles.filters}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="resource-category">
            Category
          </label>
          <select
            id="resource-category"
            className={styles.select}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setPage(1) // Reset to first page on filter change
            }}
          >
            <option value="">All</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="resource-type">
            Type
          </label>
          <select
            id="resource-type"
            className={styles.select}
            value={type}
            onChange={(e) => {
              setType(e.target.value as ResourceType | '')
              setPage(1) // Reset to first page on filter change
            }}
          >
            <option value="">All</option>
            {RESOURCE_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? <Loader label="Loading resources…" /> : null}
      {error ? <ErrorState message="Unable to load resources." onRetry={() => void refetch()} /> : null}
      {!isLoading && !error && resources.length === 0 ? (
        <EmptyState message="No published resources found." />
      ) : null}

      {!isLoading && !error && resources.length > 0 ? (
        <>
          <div className={styles.list}>
            {resources.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
          <ResourcesPagination meta={meta} onPageChange={setPage} />
        </>
      ) : null}
    </section>
  )
}

export default ResourcesColumn
