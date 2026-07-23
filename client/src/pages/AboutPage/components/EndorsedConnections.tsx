import type { FC } from 'react'
import { Network } from 'lucide-react'

const PARTNERS = [
  { name: 'IAAPA', color: '#5FC1D1' },
  { name: 'ISO', color: '#6DBD4E' },
  { name: 'AES', color: '#5FC1D1' },
  { name: 'RAW', color: '#6DBD4E' },
  { name: 'UNIS', color: '#5FC1D1' },
  { name: 'SEGA', color: '#6DBD4E' },
  { name: 'AMF', color: '#5FC1D1' },
  { name: 'Qubica', color: '#6DBD4E' },
]

const EndorsedConnections: FC = () => (
  <section aria-labelledby="about-partners-heading" className="border-t border-white/[0.08] pt-10">
    <div className="mb-4 flex items-center gap-2">
      <Network size={16} className="text-[#5FC1D1]" />
      <h2 id="about-partners-heading" className="font-display text-base font-bold text-[#F5F5F7]">
        Industry network
      </h2>
    </div>

    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
      {PARTNERS.map((partner) => (
        <div
          key={partner.name}
          className="flex h-16 cursor-default items-center justify-center rounded-xl border border-white/[0.08] bg-[#111118] px-2 transition-all hover:-translate-y-0.5 hover:border-[#5FC1D1]/40 hover:shadow-[0_8px_24px_rgba(95,193,209,0.08)]"
          title={partner.name}
        >
          <span className="text-sm font-bold tracking-wide text-[#F5F5F7]" style={{ color: partner.color }}>
            {partner.name}
          </span>
        </div>
      ))}
    </div>
  </section>
)

export default EndorsedConnections
