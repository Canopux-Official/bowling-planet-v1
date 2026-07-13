import { type FC } from 'react'
import { useReveal } from '../../../hooks/useReveal'
import { useLeadTracker } from '../../../context/LeadTrackerContext'
import { Plus, Check } from 'lucide-react'
import { MOCK_PROJECTS } from '../../ProjectsPage/services/mockdata'

const DEFAULT_PROJECTS = MOCK_PROJECTS.slice(0, 4).map(p => ({
  id: p._id || p.slug || '',
  name: p.title || '',
  image: p.media?.[0]?.url || '/products/Bowling_Lane_Dubai.avif',
  color: '#5FC1D1'
}));

const PortfolioSection: FC<{ data?: { projectIds: any[] } }> = ({ data }) => {
  const titleRef = useReveal()
  const gridRef  = useReveal()
  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = (id: string) => state.enquiryCart.some(item => item.id === id);

  const featuredProjects = data?.projectIds && data.projectIds.length > 0 
    ? data.projectIds.map(p => ({
        id: p._id || p.id,
        name: p.title || p.name,
        image: p.media?.[0]?.url || p.image || '/products/Bowling_Lane_Dubai.avif',
        color: '#5FC1D1'
      }))
    : DEFAULT_PROJECTS;

  return (
    <section id="portfolio" style={{ background: '#000000', padding: '80px 28px 0px', position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-green" style={{ width: 500, height: 500, top: '5%', right: '-5%' }} />

      <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Title row ──────────────────────────────────── */}
        <div
          ref={titleRef}
          className="reveal"
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <h2 className="font-display text-metallic" style={{
            fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 5rem)',
            letterSpacing: '-0.04em', lineHeight: 1.05,
          }}>
            Our Work.
          </h2>
          <div className="text-gradient-brand" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 600, marginTop: 16 }}>
            Our Prestigious Projects.
          </div>
        </div>

        {/* ── Project grid (Symmetric 2x2) ────────────────── */}
        <div
          ref={gridRef}
          className="stagger portfolio-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: 24, marginBottom: 64,
          }}
        >
          {featuredProjects.map((p, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{ overflow: 'hidden', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              {/* Image Container */}
              <div className="portfolio-img" style={{ height: 300, position: 'relative', overflow: 'hidden', background: '#0A0A0F' }}>
                <img 
                  src={p.image} 
                  alt={p.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s var(--ease)' }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              
              {/* Details Container */}
              <div className="portfolio-card-details" style={{ padding: '24px 28px', background: 'rgba(10, 10, 15, 0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="font-display portfolio-title" style={{ fontSize: 20, fontWeight: 700, color: '#F5F5F7', marginBottom: 4 }}>
                  {p.name}
                </h3>
                <div style={{ width: 40, height: 2, background: p.color, borderRadius: 2, marginTop: 12, marginBottom: 24 }} />
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToEnquiry({ id: p.id || p.name, type: 'project', title: p.name });
                  }}
                  className={`btn-enquiry ${isAdded(p.id || p.name) ? 'added' : ''}`}
                >
                  {isAdded(p.id || p.name) ? (
                    <><Check size={14} /> Remove from Enquiry</>
                  ) : (
                    <><Plus size={14} /> Add to Enquiry</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── View All Projects Button ────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 0 }} className="reveal">
          <button
            className="btn btn-ghost"
            onClick={() => console.log('TODO: connect to full portfolio page')}
            aria-label="View all Bowling Planet projects"
          >
            View All Projects →
          </button>
        </div>

      </div>
    </section>
  )
}

export default PortfolioSection


