import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import MediaItem from '../../../components/common/MediaItem'
import type { IProject } from '../types'
import { Plus, Check, ArrowUpRight } from 'lucide-react'
import { useLeadTracker } from '../../../context/LeadTrackerContext'

interface ProjectCardProps {
  project: IProject
}

function truncate(text: string, max = 100): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate()
  const { state, addToEnquiry } = useLeadTracker()
  const projectId = project._id || project.slug
  const isAdded = state.enquiryCart.some((i) => i.id === projectId)
  const thumb = project.media?.[0]

  const goToDetails = () => navigate(`/projects/${project.slug}`)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#111118] transition-all duration-300 hover:-translate-y-1 hover:border-[#5FC1D1]/35 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      {/* Image — clickable to details */}
      <button
        type="button"
        onClick={goToDetails}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-[#0A0A0F] text-left"
        aria-label={`View ${project.title}`}
      >
        {thumb ? (
          <MediaItem media={thumb} alt={project.title} className="transition-transform duration-500 group-hover:scale-[1.04]" />
        ) : (
          <div className="h-full w-full bg-[#1A1A24]" aria-hidden="true" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent opacity-80" />

        {project.tags.length > 0 ? (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-[#F5F5F7] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <button type="button" onClick={goToDetails} className="text-left">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-[17px] font-bold leading-snug tracking-tight text-[#F5F5F7] transition-colors group-hover:text-[#5FC1D1]">
              {project.title}
            </h3>
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-[#86868B] transition-colors group-hover:border-[#5FC1D1]/40 group-hover:text-[#5FC1D1]">
              <ArrowUpRight size={14} />
            </span>
          </div>
          {project.description ? (
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1A6]">
              {truncate(project.description)}
            </p>
          ) : null}
        </button>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
          <button
            type="button"
            onClick={goToDetails}
            className="text-sm font-semibold text-[#5FC1D1] transition-opacity hover:opacity-80"
          >
            View project →
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              addToEnquiry({ id: projectId, type: 'project', title: project.title })
            }}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${
              isAdded
                ? 'border-[#6DBD4E]/45 bg-[#6DBD4E]/10 text-[#6DBD4E]'
                : 'border-white/15 text-[#F5F5F7] hover:border-[#5FC1D1]/45 hover:text-[#5FC1D1]'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={13} />
                Added
              </>
            ) : (
              <>
                <Plus size={13} />
                Enquire
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
