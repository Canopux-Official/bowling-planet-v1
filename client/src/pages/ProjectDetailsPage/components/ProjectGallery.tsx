import { type FC, useState } from 'react'
import { Expand, Play, ZoomIn } from 'lucide-react'
import MediaItem from '../../../components/common/MediaItem'
import Lightbox from '../../../components/common/Lightbox'
import type { IMedia } from '../../ProjectsPage/types'

interface ProjectGalleryProps {
  media?: IMedia[]
}

const ProjectGallery: FC<ProjectGalleryProps> = ({ media }) => {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!media || media.length === 0) return null

  const current = media[active]

  return (
    <>
      <section id="gallery" aria-label="Project gallery" className="space-y-3">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111118] text-left"
          aria-label="Open gallery fullscreen"
        >
          <MediaItem
            media={current}
            alt={`Gallery item ${active + 1}`}
            controls={current.type === 'video'}
          />
          <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {active + 1} / {media.length}
          </span>
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1.5 text-xs font-semibold text-[#F5F5F7] backdrop-blur-sm transition-colors group-hover:border-[#5FC1D1]/50 group-hover:text-[#5FC1D1]">
            {current.type === 'video' ? <Play size={13} /> : <ZoomIn size={13} />}
            {current.type === 'video' ? 'Play' : 'Zoom'}
          </span>
        </button>

        {media.length > 1 ? (
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Select media">
            {media.map((item, i) => (
              <button
                key={`${item.url}-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                aria-label={`View media ${i + 1}`}
                className={`relative h-16 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-colors ${
                  i === active
                    ? 'border-[#5FC1D1] ring-1 ring-[#5FC1D1]/40'
                    : 'border-white/15 hover:border-[#5FC1D1]/40'
                }`}
              >
                <MediaItem media={item} alt="" />
                {item.type === 'video' ? (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                    <Play size={12} className="text-white" fill="white" />
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#5FC1D1] hover:underline"
        >
          <Expand size={14} />
          Open fullscreen gallery
        </button>
      </section>

      <Lightbox
        media={media}
        initialIndex={active}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}

export default ProjectGallery
