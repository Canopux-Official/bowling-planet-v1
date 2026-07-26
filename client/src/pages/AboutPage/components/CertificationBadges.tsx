import type { FC } from 'react'
import { Award, Globe2, Package } from 'lucide-react'

const BADGES = [
  {
    title: 'ISO 9001:2015',
    text: 'Quality systems for consistent project delivery.',
    icon: Award,
    color: '#5FC1D1',
  },
  {
    title: 'IAAPA Member',
    text: 'Aligned to global attractions standards.',
    icon: Globe2,
    color: '#6DBD4E',
  },
  {
    title: 'Authorized Exporter',
    text: 'Structured sourcing and logistics pathways.',
    icon: Package,
    color: '#5FC1D1',
  },
]

const CertificationBadges: FC = () => (
  <section aria-labelledby="about-certs-heading">
    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
      <div>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
          Credentials
        </p>
        <h2 id="about-certs-heading" className="font-display text-lg font-bold text-[#F5F5F7]">
          Certifications & memberships
        </h2>
      </div>
    </div>

    <div className="grid gap-3 sm:grid-cols-3">
      {BADGES.map((badge) => {
        const Icon = badge.icon
        return (
          <article
            key={badge.title}
            className="rounded-2xl border border-white/[0.1] bg-[#111118] p-4 transition-colors hover:border-[#5FC1D1]/35"
            style={{
              background: `linear-gradient(160deg, ${badge.color}12, #111118 55%)`,
            }}
          >
            <div
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border"
              style={{ borderColor: `${badge.color}40`, color: badge.color, background: `${badge.color}15` }}
            >
              <Icon size={16} />
            </div>
            <h3 className="font-display text-[15px] font-bold text-[#F5F5F7]">{badge.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#A1A1A6]">{badge.text}</p>
          </article>
        )
      })}
    </div>
  </section>
)

export default CertificationBadges
