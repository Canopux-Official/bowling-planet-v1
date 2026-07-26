import type { FC } from 'react'

const VISION =
  'To be the most trusted partner for building and operating Family Entertainment Centers across India and key international markets.'

const MISSION =
  'Deliver complete entertainment programmes—consulting, planning, supply, installation and operations—that create durable commercial outcomes and memorable guest experiences.'

const VALUES = [
  'Excellence',
  'Integrity',
  'Client-centric',
  'Accountability',
  'Innovation',
  'Safety first',
  'Partnership',
  'Operational discipline',
]

const VisionMissionValues: FC = () => (
  <section aria-labelledby="about-vmv-heading">
    <div className="mb-4">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
        Who we are
      </p>
      <h2 id="about-vmv-heading" className="font-display text-lg font-bold text-[#F5F5F7]">
        Vision, mission & values
      </h2>
    </div>

    <div className="mb-3 grid gap-3 md:grid-cols-2">
      <article className="rounded-2xl border border-[#5FC1D1]/25 bg-gradient-to-br from-[#5FC1D1]/10 to-transparent p-5">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
          Vision
        </h3>
        <p className="text-sm leading-relaxed text-[#A1A1A6]">{VISION}</p>
      </article>
      <article className="rounded-2xl border border-[#6DBD4E]/25 bg-gradient-to-br from-[#6DBD4E]/10 to-transparent p-5">
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6DBD4E]">
          Mission
        </h3>
        <p className="text-sm leading-relaxed text-[#A1A1A6]">{MISSION}</p>
      </article>
    </div>

    <div className="rounded-2xl border border-white/[0.08] bg-[#111118] p-4 sm:p-5">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
        Values
      </h3>
      <div className="flex flex-wrap gap-2">
        {VALUES.map((value) => (
          <span
            key={value}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-[#F5F5F7]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#5FC1D1]" aria-hidden="true" />
            {value}
          </span>
        ))}
      </div>
    </div>
  </section>
)

export default VisionMissionValues
