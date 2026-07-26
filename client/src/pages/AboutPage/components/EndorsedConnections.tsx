import type { FC } from 'react'
import { Network } from 'lucide-react'

const PARTNERS = [
  { name: 'IAAPA', logo: '/partners/iaapa.svg' },
  { name: 'ISO', logo: '/partners/iso.svg' },
  { name: 'AES', logo: '/partners/aes.svg' },
  { name: 'RAW', logo: '/partners/raw.svg' },
  { name: 'UNIS', logo: '/partners/unis.svg' },
  { name: 'SEGA', logo: '/partners/sega.svg' },
  { name: 'AMF', logo: '/partners/amf.svg' },
]

const EndorsedConnections: FC = () => (
  <section aria-labelledby="about-partners-heading" className="border-t border-white/[0.08] pt-10">
    <div className="mb-4 flex items-center gap-2">
      <Network size={16} className="text-[#5FC1D1]" />
      <h2 id="about-partners-heading" className="font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-[#F5F5F7]">
        Industry network
      </h2>
    </div>

    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
      {PARTNERS.map((partner) => (
        <div
          key={partner.name}
          className="flex h-16 cursor-default items-center justify-center rounded-xl border border-white/[0.08] bg-[#111118] px-3 transition-all hover:-translate-y-0.5 hover:border-[#5FC1D1]/40 hover:shadow-[0_8px_24px_rgba(95,193,209,0.08)]"
          title={partner.name}
        >
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-h-9 w-auto max-w-[88%] object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </section>
)

export default EndorsedConnections
