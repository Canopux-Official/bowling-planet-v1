import type { FC } from 'react'
import Tag from '../../../components/common/Tag'
import type { ProjectSort } from '../types'
import { Search } from 'lucide-react'

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
    <div className="mb-10 rounded-2xl border border-white/[0.08] bg-[#111118]/80 p-4 backdrop-blur-sm sm:p-5">
      <div className="relative max-w-lg">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#48484A]"
        />
        <input
          id="project-search"
          type="search"
          value={value.search}
          placeholder="Search projects by name…"
          aria-label="Search projects"
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          className="w-full rounded-xl border border-white/[0.08] bg-black/60 py-3 pl-10 pr-4 text-sm text-[#F5F5F7] outline-none transition-colors placeholder:text-[#48484A] focus:border-[#5FC1D1]/45"
        />
      </div>

      {availableTags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter by tags">
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
