import type { FC } from 'react'

interface ProjectHeroProps {
  description?: string
  tags: string[]
}

const ProjectHero: FC<ProjectHeroProps> = ({ description, tags }) => (
  <header className="space-y-3">
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
      Overview
    </p>

    {tags.length > 0 ? (
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#5FC1D1]/30 bg-[#5FC1D1]/10 px-2.5 py-1 text-[11px] font-semibold text-[#5FC1D1]"
          >
            {tag}
          </span>
        ))}
      </div>
    ) : null}

    {description ? (
      <p className="max-w-prose text-sm leading-relaxed text-[#A1A1A6]">{description}</p>
    ) : null}
  </header>
)

export default ProjectHero
