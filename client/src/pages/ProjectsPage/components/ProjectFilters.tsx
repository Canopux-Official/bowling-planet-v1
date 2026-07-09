import type { FC } from 'react'

import Tag from '../../../components/common/Tag'
import styles from './ProjectFilters.module.css'
import type { ProjectSort } from '../types'

export interface ProjectFilterState {
  search: string
  tags: string[]
  sort: ProjectSort
}

interface ProjectFiltersProps {
  value: ProjectFilterState
  availableTags: string[]
  onChange: (next: ProjectFilterState) => void
}

const ProjectFilters: FC<ProjectFiltersProps> = ({ value, availableTags, onChange }) => {
  const toggleTag = (tag: string) => {
    const tags = value.tags.includes(tag)
      ? value.tags.filter((t) => t !== tag)
      : [...value.tags, tag]
    onChange({ ...value, tags })
  }

  return (
    <div className={styles.filters}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="project-search">
          Search
        </label>
        <input
          id="project-search"
          className={styles.input}
          type="search"
          value={value.search}
          placeholder="Search projects…"
          onChange={(e) => onChange({ ...value, search: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="project-sort">
          Sort
        </label>
        <select
          id="project-sort"
          className={styles.select}
          value={value.sort}
          onChange={(e) => onChange({ ...value, sort: e.target.value as ProjectSort })}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      {availableTags.length > 0 ? (
        <div className={styles.tags} aria-label="Filter by tags">
          {availableTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              active={value.tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ProjectFilters
