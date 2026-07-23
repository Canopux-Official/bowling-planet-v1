/**
 * Franchise intro — compact header (no cinematic hero)
 * Still renders API-driven value props
 */
import { type FC } from 'react'
import type { IFranchiseValueProp } from '../../../services/franchisePageApi'

interface FranchiseHeroProps {
  valueProps: IFranchiseValueProp[]
}

const FranchiseHero: FC<FranchiseHeroProps> = ({ valueProps }) => (
  <header className="border-b border-white/[0.08] px-5 py-6 sm:px-7 sm:py-7">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
          Franchise
        </p>
        <h1 className="font-display text-[clamp(1.4rem,2.6vw,1.85rem)] font-extrabold tracking-[-0.02em] text-[#F5F5F7]">
          Own an entertainment business
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[#A1A1A6]">
          Partner with Bowling Planet for turnkey FEC consulting, supply and launch support—
          with ₹0 franchise fees.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <a
          href="#apply"
          className="inline-flex cursor-pointer items-center rounded-full border border-[#5FC1D1]/45 bg-[#5FC1D1]/15 px-4 py-2.5 text-sm font-semibold text-[#5FC1D1] transition-colors hover:bg-[#5FC1D1]/25"
        >
          Apply now →
        </a>
        <a
          href="#investment"
          className="inline-flex cursor-pointer items-center rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-[#F5F5F7] transition-colors hover:border-[#5FC1D1]/40 hover:text-[#5FC1D1]"
        >
          Investment models
        </a>
      </div>
    </div>

    {valueProps.length > 0 ? (
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {valueProps.map((vp) => (
          <div
            key={vp.label}
            className="rounded-xl border border-white/[0.08] bg-[#111118] p-3 sm:p-4"
          >
            <div className="mb-1.5 text-lg" aria-hidden="true">
              {vp.icon}
            </div>
            <div className="text-sm font-bold leading-snug text-[#F5F5F7]">{vp.label}</div>
            <div className="mt-0.5 text-[11px] leading-snug text-[#636366]">{vp.sub}</div>
          </div>
        ))}
      </div>
    ) : null}
  </header>
)

export default FranchiseHero
