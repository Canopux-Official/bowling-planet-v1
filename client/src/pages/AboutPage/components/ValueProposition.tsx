import type { FC } from 'react'

const POINTS = [
  { title: 'Industry expertise', text: 'FEC knowledge across attractions, operations and commercial design.', color: '#5FC1D1' },
  { title: 'Turnkey delivery', text: 'Consulting through installation, training and go-live support.', color: '#6DBD4E' },
  { title: 'Global sourcing', text: 'Curated attractions and games ecosystems worldwide.', color: '#5FC1D1' },
  { title: 'ROI-led planning', text: 'Programme decisions anchored to utilisation and unit economics.', color: '#6DBD4E' },
  { title: 'Safety & standards', text: 'Installation and ops guidance with safety discipline.', color: '#5FC1D1' },
  { title: 'Long-term partnership', text: 'AMC and advisory support after opening—not only handover.', color: '#6DBD4E' },
]

const ValueProposition: FC = () => (
  <section aria-labelledby="about-why-heading">
    <div className="mb-4">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
        Why choose us
      </p>
      <h2 id="about-why-heading" className="font-display text-lg font-bold text-[#F5F5F7]">
        What partners rely on us for
      </h2>
    </div>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {POINTS.map((point, idx) => (
        <article
          key={point.title}
          className="relative overflow-hidden rounded-xl border border-white/[0.08] p-4 transition-colors hover:border-[#5FC1D1]/35"
          style={{
            background: `linear-gradient(180deg, ${point.color}10, transparent)`,
          }}
        >
          <span className="font-display text-2xl font-extrabold text-white/[0.06]" aria-hidden="true">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-1 text-sm font-bold text-[#F5F5F7]">{point.title}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#A1A1A6]">{point.text}</p>
        </article>
      ))}
    </div>
  </section>
)

export default ValueProposition
