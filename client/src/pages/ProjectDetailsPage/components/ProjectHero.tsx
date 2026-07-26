import type { FC } from 'react'
import { Plus, Check } from 'lucide-react'
import { useLeadTracker } from '../../../context/LeadTrackerContext'

interface ProjectHeroProps {
  title: string
  description?: string
  tags: string[]
  projectId: string
}

const ProjectHero: FC<ProjectHeroProps> = ({ title, description, tags, projectId }) => {
  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = state.enquiryCart.some((i) => i.id === projectId)

  return (
    <div className="bg-transparent">
      {tags.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#5FC1D1]/30 bg-[#5FC1D1]/12 px-3 py-1 text-xs font-semibold text-[#7FD4E0]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <h1 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold leading-[1.18] tracking-[-0.03em] text-[#F5F5F7]">
        {title}
      </h1>

      {description ? (
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#A1A1A6] sm:text-base">
          {description}
        </p>
      ) : null}

      <div className="mt-6">
        <button
          type="button"
          onClick={() => addToEnquiry({ id: projectId, type: 'project', title })}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
            isAdded
              ? 'border-[#6DBD4E]/50 bg-[#6DBD4E]/10 text-[#6DBD4E]'
              : 'border-white/20 bg-transparent text-white hover:border-[#5FC1D1]/50 hover:bg-[#5FC1D1]/10 hover:text-[#5FC1D1]'
          }`}
        >
          {isAdded ? (
            <>
              <Check size={16} />
              Remove from enquiry
            </>
          ) : (
            <>
              <Plus size={16} />
              Add to enquiry
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ProjectHero
