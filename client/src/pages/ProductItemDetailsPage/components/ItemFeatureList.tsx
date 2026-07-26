import type { FC } from 'react'
import type { IBulletList } from '../../ProjectsPage/types'
import { Check } from 'lucide-react'

interface ItemFeatureListProps {
  featureList?: IBulletList[]
}

const ItemFeatureList: FC<ItemFeatureListProps> = ({ featureList }) => {
  if (!featureList || featureList.length === 0) return null

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#111118] p-5">
      <h2 className="mb-4 font-display text-base font-bold text-[#F5F5F7]">Features</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {featureList.map((group) => (
          <div key={group.heading}>
            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#5FC1D1]">
              {group.heading}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-snug text-[#A1A1A6]">
                  <Check size={14} className="mt-0.5 shrink-0 text-[#6DBD4E]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ItemFeatureList
