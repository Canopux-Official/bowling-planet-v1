import type { FC } from 'react'
import { Search } from 'lucide-react'
import type { ProjectSort } from '../types'
import ExpandablePills from '../../../components/common/ExpandablePills'

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

const pillClass = (active: boolean) =>
  `shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
    active
      ? 'border-[#5FC1D1] bg-[#5FC1D1]/15 text-[#5FC1D1]'
      : 'border-white/15 bg-[#111118] text-[#A1A1A6] hover:border-[#5FC1D1]/40 hover:text-[#F5F5F7]'
  }`

const ProjectFilters: FC<ProjectFiltersProps> = ({ value, availableTags, onChange }) => {
  const toggleTag = (tag: string) => {
    const tags = value.tags.includes(tag)
      ? value.tags.filter((t) => t !== tag)
      : [...value.tags, tag]
    onChange({ ...value, tags })
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="relative max-w-md">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#48484A]" />
        <input
          id="project-search"
          type="search"
          value={value.search}
          placeholder="Search projects…"
          aria-label="Search projects"
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          className="w-full rounded-xl border border-white/[0.1] bg-[#111118] py-2.5 pl-10 pr-4 text-sm text-[#F5F5F7] outline-none transition-colors placeholder:text-[#48484A] focus:border-[#5FC1D1]/50"
        />
      </div>

      {availableTags.length > 0 ? (
        <ExpandablePills aria-label="Filter by category tags">
          <button
            type="button"
            onClick={() => onChange({ ...value, tags: [] })}
            className={pillClass(value.tags.length === 0)}
          >
            All projects
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={pillClass(value.tags.includes(tag))}
            >
              {tag}
            </button>
          ))}
        </ExpandablePills>
      ) : null}
    </div>
  )
}

export default ProjectFilters
