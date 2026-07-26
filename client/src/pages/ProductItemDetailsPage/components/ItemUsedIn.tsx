import type { FC } from 'react'
import MediaItem from '../../../components/common/MediaItem'
import type { IUsageLocation } from '../types'
import { MapPin } from 'lucide-react'

interface ItemUsedInProps {
  usedIn?: IUsageLocation[]
}

const ItemUsedIn: FC<ItemUsedInProps> = ({ usedIn }) => {
  if (!usedIn || usedIn.length === 0) return null

  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 font-display text-base font-bold text-[#F5F5F7]">
        <MapPin size={16} className="text-[#5FC1D1]" />
        Used in
      </h2>
      <div className="space-y-4">
        {usedIn.map((location) => {
          const [hero, ...rest] = location.images ?? []

          return (
            <article
              key={location.name}
              className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0F]"
            >
              {hero ? (
                <div className="relative aspect-[21/9] overflow-hidden">
                  <MediaItem media={hero} alt={location.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 font-display text-base font-bold text-[#F5F5F7]">
                    {location.name}
                  </h3>
                </div>
              ) : (
                <h3 className="border-b border-white/[0.06] px-4 py-3 font-display text-base font-bold text-[#F5F5F7]">
                  {location.name}
                </h3>
              )}

              <div className="space-y-3 p-4">
                {location.description ? (
                  <p className="text-sm leading-relaxed text-[#A1A1A6]">{location.description}</p>
                ) : null}

                {rest.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto">
                    {rest.map((media, i) => (
                      <div
                        key={`${media.url}-${i}`}
                        className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10"
                      >
                        <MediaItem media={media} alt={`${location.name} ${i + 2}`} />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ItemUsedIn
