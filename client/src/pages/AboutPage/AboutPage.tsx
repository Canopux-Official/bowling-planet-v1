import type { FC } from 'react'
import {
  Award,
  Globe2,
  Package,
  Briefcase,
  Wrench,
  LineChart,
  ShieldCheck,
  Handshake,
  Boxes,
  Target,
  Eye,
  History,
  Quote,
} from 'lucide-react'
import SEO from '../../components/SEO'
import TeamSection from './components/TeamSection'
import EndorsedConnections from './components/EndorsedConnections'

const STATS = [
  { num: '17+', label: 'Years' },
  { num: '21+', label: 'Projects' },
  { num: '700+', label: 'Games' },
  { num: '32%', label: 'Avg. ROI' },
]

const CERTS = [
  { title: 'ISO 9001:2015', sub: 'Quality certified', icon: Award },
  { title: 'IAAPA Member', sub: 'Global attractions', icon: Globe2 },
  { title: 'Authorized Exporter', sub: 'Sourcing & logistics', icon: Package },
]

const WHY = [
  { title: 'FEC consulting', text: 'Programme, layout and commercial planning.', icon: Briefcase },
  { title: 'Turnkey delivery', text: 'Supply, install, train and open.', icon: Wrench },
  { title: 'Global catalogue', text: 'Curated attractions and games.', icon: Boxes },
  { title: 'ROI discipline', text: 'Decisions tied to unit economics.', icon: LineChart },
  { title: 'Safety standards', text: 'Installation and ops guidance.', icon: ShieldCheck },
  { title: 'Aftercare', text: 'AMC and advisory post-opening.', icon: Handshake },
]

/** Company history — unique vs home (not duplicated elsewhere on this page) */
const TIMELINE = [
  { year: '2006', event: "Ranjith Pillai begins career in India's cinema & FEC industry" },
  { year: '2012', event: 'Leads operations for Cinemax & Inox FEC annexe rollouts' },
  { year: '2017', event: 'Consulting mandate for KidZania, Essel World, and Woop' },
  { year: '2020', event: 'Bowling Planet founded — full-stack FEC consulting firm' },
  { year: 'Today', event: '50+ venues across PAN-India & the Middle East' },
]

const AboutPage: FC = () => (
  <div className="about-catalogue min-h-[60vh] bg-black text-[#F5F5F7]">
    <SEO
      title="About Us"
      description="Bowling Planet — FEC consulting, planning, supply and installation for malls, hotels and investors."
    />

    <div className="mx-auto max-w-[1200px] space-y-12 px-5 pb-16 pt-24 sm:space-y-14 sm:px-7 sm:pt-28">
      {/* Intro — two column, no tint wash */}
      <header className="grid items-start gap-8 border-b border-white/[0.08] pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <img
              src="/logo.avif"
              alt="Bowling Planet"
              className="h-14 w-auto sm:h-16"
            />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
                Company profile
              </p>
              <h1 className="font-display text-[clamp(1.45rem,2.8vw,1.9rem)] font-extrabold tracking-[-0.02em] text-[#F5F5F7]">
                Bowling Planet
              </h1>
            </div>
          </div>

          <p className="max-w-xl text-[15px] leading-relaxed text-[#A1A1A6]">
            Entertainment consulting firm for Family Entertainment Centers—strategy, sourcing and
            delivery for malls, hotels, resorts and investors.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Consulting', 'Planning', 'Supply', 'Installation'].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-[#111118] px-3 py-1.5 text-xs font-semibold text-[#F5F5F7]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-white/[0.1] bg-[#111118] p-5">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
            At a glance
          </p>
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/[0.06] bg-black/40 px-3 py-3"
              >
                <div className="font-display text-2xl font-extrabold text-[#5FC1D1]">{s.num}</div>
                <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#636366]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-white/[0.06] pt-4 text-xs leading-relaxed text-[#86868B]">
            ₹0 franchise fees · End-to-end programme ownership
          </p>
        </aside>
      </header>

      {/* Journey + Founder note — new content from home Our Story */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <section aria-labelledby="about-journey-heading">
          <div className="mb-4 flex items-center gap-2">
            <History size={16} className="text-[#5FC1D1]" />
            <h2 id="about-journey-heading" className="font-display text-base font-bold text-[#F5F5F7]">
              Our journey
            </h2>
          </div>
          <ol className="relative space-y-0 border-l border-white/[0.1] pl-5">
            {TIMELINE.map((item, i) => (
              <li key={item.year} className="relative pb-5 last:pb-0">
                <span
                  className={`absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${
                    i === TIMELINE.length - 1
                      ? 'border-[#FFAA33] bg-[#FFAA33]/30'
                      : 'border-[#5FC1D1] bg-[#5FC1D1]/25'
                  }`}
                />
                <p
                  className={`text-[11px] font-bold uppercase tracking-wider ${
                    i === TIMELINE.length - 1 ? 'text-[#FFAA33]' : 'text-[#5FC1D1]'
                  }`}
                >
                  {item.year}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#A1A1A6]">{item.event}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="about-founder-heading">
          <div className="mb-4 flex items-center gap-2">
            <Quote size={16} className="text-[#6DBD4E]" />
            <h2 id="about-founder-heading" className="font-display text-base font-bold text-[#F5F5F7]">
              Founder&apos;s note
            </h2>
          </div>
          <article className="rounded-2xl border border-white/[0.1] bg-[#111118] p-5 sm:p-6">
            <p className="text-sm italic leading-relaxed text-[#D8DCE3]">
              &ldquo;Great entertainment centers don&apos;t happen by accident. They are engineered —
              with data, design, and seventeen years of hard-won insight.&rdquo;
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#86868B]">
              Ranjith Pillai founded Bowling Planet in 2020 after two decades at the center of India&apos;s
              cinema and FEC expansion — advising on site selection, revenue modeling, and operations for
              recognizable entertainment brands.
            </p>
            <div className="mt-5 border-t border-white/[0.08] pt-4">
              <p className="text-sm font-bold text-[#F5F5F7]">Ranjith Pillai</p>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5FC1D1]">
                Founder &amp; Managing Director
              </p>
            </div>
          </article>
        </section>
      </div>

      {/* Credentials + Why us — two column on desktop */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <section aria-labelledby="about-certs-heading">
          <div className="mb-4 flex items-center gap-2">
            <Award size={16} className="text-[#5FC1D1]" />
            <h2 id="about-certs-heading" className="font-display text-base font-bold text-[#F5F5F7]">
              Credentials
            </h2>
          </div>
          <div className="space-y-3">
            {CERTS.map((c) => {
              const Icon = c.icon
              return (
                <article
                  key={c.title}
                  className="group flex cursor-default items-center gap-4 rounded-xl border border-white/[0.08] bg-[#111118] p-4 transition-colors hover:border-[#5FC1D1]/40"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#5FC1D1]/30 bg-[#5FC1D1]/10 text-[#5FC1D1] transition-colors group-hover:bg-[#5FC1D1]/20">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F5F7]">{c.title}</h3>
                    <p className="text-xs text-[#86868B]">{c.sub}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="about-why-heading">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase size={16} className="text-[#6DBD4E]" />
            <h2 id="about-why-heading" className="font-display text-base font-bold text-[#F5F5F7]">
              Why partners choose us
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {WHY.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="group rounded-xl border border-white/[0.08] bg-[#0A0A0F] p-4 transition-colors hover:border-[#6DBD4E]/35"
                >
                  <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg border border-[#6DBD4E]/25 bg-[#6DBD4E]/10 text-[#6DBD4E]">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-[#F5F5F7]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#86868B]">{item.text}</p>
                </article>
              )
            })}
          </div>
        </section>
      </div>

      {/* Vision / Mission — two column */}
      <section
        aria-labelledby="about-purpose-heading"
        className="grid gap-3 md:grid-cols-2"
      >
        <h2 id="about-purpose-heading" className="sr-only">
          Vision and mission
        </h2>
        <article className="rounded-2xl border border-white/[0.1] bg-[#111118] p-5 sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-[#5FC1D1]">
            <Eye size={16} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">Vision</span>
          </div>
          <p className="text-sm leading-relaxed text-[#A1A1A6]">
            The most trusted partner for building and operating FECs across India and key markets.
          </p>
        </article>
        <article className="rounded-2xl border border-white/[0.1] bg-[#111118] p-5 sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-[#6DBD4E]">
            <Target size={16} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">Mission</span>
          </div>
          <p className="text-sm leading-relaxed text-[#A1A1A6]">
            Complete programmes—consult, plan, supply, install, operate—for lasting commercial outcomes.
          </p>
        </article>
      </section>

      <EndorsedConnections />
      <TeamSection />
    </div>
  </div>
)

export default AboutPage
