// import type { FC } from 'react'
// import SEO from '../../components/SEO'
// import BlogsColumn from './components/BlogsColumn'
// import ResourcesColumn from './components/ResourcesColumn'
// import { theme } from '../../theme'
// import { useReveal } from '../../hooks/useReveal'

// const InsightsPage: FC = () => {
//   const headRef = useReveal()

//   return (
//     <>
//       <SEO 
//         title="Insights & Resources" 
//         description="Practical notes, blogs, and downloadable tools for FEC operators, investors, and destination partners."
//       />
//       {/* Hero */}
//       <section style={{ background: theme.colors.void, padding: '140px 28px 80px', position: 'relative', overflow: 'hidden' }}>
//         <div className="orb orb-teal" style={{ width: 700, height: 600, top: '-25%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }} />
//         <div className="orb orb-green" style={{ width: 300, height: 300, bottom: '-5%', right: '-5%' }} />
//         <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }} />
//         <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
//           <div ref={headRef} className="reveal" style={{ textAlign: 'center' }}>
//             <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.04em', marginBottom: 24 }}>
//               <span className="text-metallic" style={{ display: 'block' }}>Blogs &</span>
//               <span className="text-gradient-brand" style={{ display: 'block' }}>Resources</span>
//             </h1>
//             <p style={{ fontSize: 17, color: theme.colors.text2, maxWidth: 520, margin: '0 auto', lineHeight: 1.75, fontFamily: theme.typography.fontBody }}>
//               Practical notes and downloadable tools for FEC operators, investors and destination partners.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Content */}
//       <section style={{ background: theme.colors.surface, padding: '60px 28px 80px', position: 'relative' }}>
//         <div aria-hidden="true" className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }} />
//         <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
//           <div className="insights-columns" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32, alignItems: 'start' }}>
//             <BlogsColumn />
//             <ResourcesColumn />
//           </div>
//         </div>
//       </section>

//       <style>{`
//         @media (max-width: 960px) { .insights-columns { grid-template-columns: 1fr !important; } }
//       `}</style>
//     </>
//   )
// }

// export default InsightsPage



import type { FC } from 'react'
import SEO from '../../components/SEO'
import BlogsColumn from './components/BlogsColumn'
import ResourcesColumn from './components/ResourcesColumn'

const InsightsPage: FC = () => {
  return (
    <div className="insights-catalogue min-h-[60vh] bg-black text-[#F5F5F7]">
      <SEO 
        title="Insights & Resources" 
        description="Practical notes, blogs, and downloadable tools for FEC operators, investors, and destination partners."
      />

      {/* Hero — FEC destination strategy studio backdrop */}
      <header className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0">
          <img
            src="/heroes/blogs-hero-planning-studio.png"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-[center_45%]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.94) 100%), radial-gradient(ellipse 80% 60% at 70% 40%, rgba(95,193,209,0.18), transparent 60%)',
            }}
          />
        </div>

        <div className="relative z-[1] mx-auto max-w-[1280px] px-5 pb-10 pt-24 sm:px-7 sm:pb-12 sm:pt-28">
          <div className="mb-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5FC1D1]">
              Resources
            </p>
            <h1 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-[-0.02em] text-[#F5F5F7]">
              Blogs & Resources
            </h1>
          </div>
          <p className="max-w-[560px] text-sm leading-relaxed text-[#A1A1A6]">
            Practical notes and downloadable tools for FEC operators, investors and destination partners.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-8 sm:px-7">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <BlogsColumn />
          <ResourcesColumn />
        </div>
      </div>
    </div>
  )
}

export default InsightsPage