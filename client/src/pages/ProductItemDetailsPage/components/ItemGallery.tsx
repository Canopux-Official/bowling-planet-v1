import { type FC, useState } from 'react'
import MediaItem from '../../../components/common/MediaItem'
import Lightbox from '../../../components/common/Lightbox'
import type { IMedia } from '../types'
import { ZoomIn } from 'lucide-react'

interface ItemGalleryProps {
  thumbnail: IMedia
  gallery?: IMedia[]
  title: string
}

const ItemGallery: FC<ItemGalleryProps> = ({ thumbnail, gallery, title }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(0)

  const extras = gallery ?? []
  const allMedia = [thumbnail, ...extras]

  return (
    <section aria-label={`${title} gallery`} className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.1] bg-[#111118] text-left"
        aria-label={`Zoom in on ${title}`}
      >
        <MediaItem media={allMedia[selected]} alt={title} />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1.5 text-xs font-semibold text-[#F5F5F7] backdrop-blur-sm transition-colors group-hover:border-[#5FC1D1]/50 group-hover:text-[#5FC1D1]">
          <ZoomIn size={13} />
          Zoom
        </span>
      </button>

      {allMedia.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Select image">
          {allMedia.map((media, i) => (
            <button
              key={`${media.url}-${i}`}
              type="button"
              role="tab"
              aria-selected={selected === i}
              onClick={() => setSelected(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-colors ${
                selected === i
                  ? 'border-[#5FC1D1] ring-1 ring-[#5FC1D1]/40'
                  : 'border-white/15 hover:border-[#5FC1D1]/40'
              }`}
            >
              <MediaItem media={media} alt="" />
            </button>
          ))}
        </div>
      ) : null}

      <Lightbox
        media={allMedia}
        initialIndex={selected}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}

export default ItemGallery
