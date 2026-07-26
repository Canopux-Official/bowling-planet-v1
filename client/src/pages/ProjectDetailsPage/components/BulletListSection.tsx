import type { FC } from 'react'
import type { IBulletList } from '../../ProjectsPage/types'

interface BulletListSectionProps {
  bulletList?: IBulletList[]
}

const BulletListSection: FC<BulletListSectionProps> = ({ bulletList }) => {
  if (!bulletList || bulletList.length === 0) return null

  return (
    <div id="highlights" className="scroll-mt-32 bg-[#0A0A0F] px-5 py-16 sm:px-7 sm:py-20" aria-label="Project highlights">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10">
          <p className="label mb-4">Highlights</p>
          <h2 className="font-display text-[clamp(1.6rem,3vw,2.35rem)] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#F5F5F7]">
            Project Highlights
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {bulletList.map((block) => (
            <div
              key={block.heading}
              className="rounded-2xl border border-white/[0.12] bg-[#111118] p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-8 w-1 rounded-full bg-[#5FC1D1]" aria-hidden="true" />
                <h3 className="font-display text-lg font-bold text-[#F5F5F7]">{block.heading}</h3>
              </div>
              <ul className="space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#A1A1A6]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5FC1D1] shadow-[0_0_8px_#5FC1D1]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BulletListSection
