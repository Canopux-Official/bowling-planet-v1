import { type FC, useState } from 'react'
import { Expand, Play, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const hasMultiple = media.length > 1

  const prev = () => setActive((i) => (i - 1 + media.length) % media.length)
  const next = () => setActive((i) => (i + 1) % media.length)

  return (
    <>
      <div id="gallery" className="bg-transparent">
        <h2 className="font-display mb-5 text-[clamp(1.4rem,2.5vw,1.85rem)] font-extrabold tracking-[-0.02em] text-[#F5F5F7]">
          Gallery
        </h2>

        <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
          {hasMultiple ? (
            <div className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:max-h-[460px] lg:w-[92px] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible">
              {media.map((item, i) => (
                <button
                  key={`${item.url}-${i}`}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View media ${i + 1}`}
                  aria-current={i === active ? 'true' : undefined}
                  className={`relative h-[68px] w-[88px] shrink-0 overflow-hidden rounded-xl border-2 transition-colors lg:h-[78px] lg:w-full ${
                    i === active
                      ? 'border-[#5FC1D1]'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <MediaItem media={item} alt="" />
                  {item.type === 'video' ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                      <Play size={14} className="text-white" fill="white" />
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}

          <div className="relative order-1 min-h-[240px] flex-1 overflow-hidden rounded-2xl bg-transparent lg:order-2 lg:min-h-[420px]">
            <MediaItem
              media={current}
              alt={`Gallery item ${active + 1}`}
              controls={current.type === 'video'}
            />

            <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              {active + 1} / {media.length}
            </span>

            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              {hasMultiple ? (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous media"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-[#5FC1D1]/50 hover:text-[#5FC1D1]"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next media"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:border-[#5FC1D1]/50 hover:text-[#5FC1D1]"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Open fullscreen viewer"
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:border-[#5FC1D1]/50 hover:text-[#5FC1D1]"
              >
                <Expand size={12} />
                Expand
              </button>
            </div>
          </div>
        </div>
      </div>

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
