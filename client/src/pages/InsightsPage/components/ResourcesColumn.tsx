import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import Loader from '../../../components/common/Loader'
import ErrorState from '../../../components/common/ErrorState'
import EmptyState from '../../../components/common/EmptyState'
import {
  getPublishedResources,
  type IPaginationMeta,
  type IResource,
  type ResourceType,
} from '../services/resourcesApi'
import { mockResources } from '../services/mockResources'
import ResourceCard from './ResourcesColumn/ResourceCard'
import ResourcesPagination from './ResourcesColumn/ResourcesPagination'
import styles from './ResourcesColumn.module.css'

const RESOURCE_TYPES: ResourceType[] = ['pdf', 'video', 'tool', 'link', 'guide']

const ResourcesColumn: FC = () => {
  const [resources, setResources] = useState<IResource[]>([])
  const [meta, setMeta] = useState<IPaginationMeta>({
    page: 1,
    limit: 4,
    total: 0,
    totalPages: 0,
  })
  const [category, setCategory] = useState('')
  const [type, setType] = useState<ResourceType | ''>('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(mockResources.map((r) => r.category))).sort(),
    [],
  )

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPublishedResources({
        page,
        limit: 4,
        category: category || undefined,
        type: type || undefined,
      })
      setResources(data.resources)
      setMeta(data.meta)
    } catch {
      setError('Unable to load resources.')
    } finally {
      setLoading(false)
    }
  }, [page, category, type])

  useEffect(() => {
    void load()
  }, [load])

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
              setPage(1)
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
              setPage(1)
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

      {loading ? <Loader label="Loading resources…" /> : null}
      {error ? <ErrorState message={error} onRetry={() => void load()} /> : null}
      {!loading && !error && resources.length === 0 ? (
        <EmptyState message="No published resources found." />
      ) : null}

      {!loading && !error && resources.length > 0 ? (
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
