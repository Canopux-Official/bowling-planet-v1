// import type { FC } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Tag from '../../../components/common/Tag'
// import MediaItem from '../../../components/common/MediaItem'
// import type { IProject } from '../types'
// import { theme } from '../../../theme'
// import { Plus, Check } from 'lucide-react'
// import { useLeadTracker } from '../../../context/LeadTrackerContext'

// interface ProjectCardProps {
//   project: IProject
// }

// // Cycle through accent colors per card index
// const ACCENT_COLORS = ['#5FC1D1', '#6DBD4E', '#C084FC', '#FFAA33']

// function truncate(text: string, max = 120): string {
//   if (text.length <= max) return text
//   return `${text.slice(0, max).trimEnd()}…`
// }

// const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
//   const navigate = useNavigate()
//   const { state, addToEnquiry } = useLeadTracker()
//   const isAdded = state.enquiryCart.some(i => i.id === (project._id || project.slug))

//   const thumb = project.media?.[0]
//   // Use first tag's hash to pick a stable accent color
//   const accent = ACCENT_COLORS[(project.title.charCodeAt(0) ?? 0) % ACCENT_COLORS.length]

//   return (
//     <div
//       onClick={() => navigate(`/projects/${project.slug}`)}
//       style={{
//         cursor: 'pointer',
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100%',
//         color: 'inherit',
//         background: `linear-gradient(180deg, ${accent}06, rgba(255,255,255,0.01))`,
//         border: `1px solid ${accent}18`,
//         borderRadius: 20,
//         overflow: 'hidden',
//         transition: 'all 0.3s ease',
//         position: 'relative',
//       }}
//       onMouseEnter={e => {
//         (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`
//         ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
//         ;(e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${accent}12`
//       }}
//       onMouseLeave={e => {
//         (e.currentTarget as HTMLElement).style.borderColor = `${accent}18`
//         ;(e.currentTarget as HTMLElement).style.transform = 'none'
//         ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
//       }}
//     >
//       {/* Top accent line */}
//       <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, zIndex: 1 }} />

//       <div style={{ aspectRatio: '16/10', background: theme.colors.surface2, overflow: 'hidden' }}>
//         {thumb ? (
//           <MediaItem media={thumb} alt={project.title} />
//         ) : (
//           <div style={{ width: '100%', height: '100%', background: theme.colors.surface3 }} aria-hidden="true" />
//         )}
//       </div>

//       <div style={{ padding: '22px 22px 26px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
//         <h3 className="font-display" style={{ margin: 0, fontSize: 17, fontWeight: 700, color: theme.colors.text1, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
//           {project.title}
//         </h3>
//         {project.description ? (
//           <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: theme.colors.text2, flex: 1, fontFamily: theme.typography.fontBody }}>
//             {truncate(project.description)}
//           </p>
//         ) : null}
//         {project.tags.length > 0 ? (
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
//             {project.tags.slice(0, 3).map((tag) => (
//               <Tag key={tag} label={tag} />
//             ))}
//           </div>
//         ) : null}

//         <button 
//           className={`btn-enquiry ${isAdded ? 'added' : ''}`}
//           onClick={(e) => {
//             e.stopPropagation();
//             addToEnquiry({ id: project._id || project.slug, type: 'project', title: project.title })
//           }}
//           style={{ marginTop: 'auto' }}
//         >
//           {isAdded ? (
//             <><Check size={14} /> Remove from Enquiry</>
//           ) : (
//             <><Plus size={14} /> Add to Enquiry</>
//           )}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ProjectCard


import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Tag from '../../../components/common/Tag'
import ImageCarousel from './ImageCarousel'
import type { IProject } from '../types'
import { theme } from '../../../theme'
import { Plus, Check, ArrowRight } from 'lucide-react'
import { useLeadTracker } from '../../../context/LeadTrackerContext'

interface ProjectCardProps {
  project: IProject
}

// Subtle card structural highlights
const ACCENT_COLORS = ['#5FC1D1', '#6DBD4E', '#C084FC', '#FFAA33']

function truncate(text: string, max = 120): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate()
  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = state.enquiryCart.some(i => i.id === (project._id || project.slug))

  // Use title to pick a stable border highlight color
  const accent = ACCENT_COLORS[(project.title.charCodeAt(0) ?? 0) % ACCENT_COLORS.length]

  const handleNavigateToDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/projects/${project.slug}`)
  }

  const handleAddToEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToEnquiry({ 
      id: project._id || project.slug, 
      type: 'project', 
      title: project.title 
    })
  }

  // Shared structural button styles
  const baseButtonStyle: React.CSSProperties = {
    flex: 1,
    padding: '11px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    transition: 'all 0.2s ease-in-out',
    fontFamily: theme.typography.fontBody,
  }

  return (
    <div
      onClick={handleNavigateToDetails}
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        color: 'inherit',
        background: `linear-gradient(180deg, ${accent}06, rgba(255,255,255,0.01))`,
        border: `1px solid ${accent}18`,
        borderRadius: 20,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = `${accent}40`
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${accent}12`
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = `${accent}18`
        ;(e.currentTarget as HTMLElement).style.transform = 'none'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {/* Top accent line */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 2, 
          background: `linear-gradient(90deg, ${accent}, transparent)`, 
          zIndex: 1 
        }} 
      />

      {/* Image Carousel */}
      <ImageCarousel 
        media={project.media} 
        title={project.title}
        accentColor={accent}
      />

      {/* Content */}
      <div style={{ 
        padding: '22px 22px 16px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 10, 
        flex: 1 
      }}>
        <h3 
          className="font-display" 
          style={{ 
            margin: 0, 
            fontSize: 17, 
            fontWeight: 700, 
            color: theme.colors.text1, 
            letterSpacing: '-0.02em', 
            lineHeight: 1.3 
          }}
        >
          {project.title}
        </h3>

        {project.description ? (
          <p 
            style={{ 
              margin: 0, 
              fontSize: 14, 
              lineHeight: 1.65, 
              color: theme.colors.text2, 
              flex: 1, 
              fontFamily: theme.typography.fontBody 
            }}
          >
            {truncate(project.description)}
          </p>
        ) : null}

        {project.tags.length > 0 ? (
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 6, 
            marginTop: 4 
          }}>
            {project.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div 
          style={{ 
            display: 'flex', 
            gap: 10, 
            marginTop: 'auto', 
            paddingTop: 12 
          }}
        >
          {/* See Details Button */}
          <button
            onClick={handleNavigateToDetails}
            style={{
              ...baseButtonStyle,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#ffffff'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#ffffff'
              ;(e.currentTarget as HTMLElement).style.color = '#111111'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.05)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)'
              ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
            }}
          >
            See Details
            <ArrowRight size={14} />
          </button>

          {/* Add to Enquiry Button */}
          <button
            onClick={handleAddToEnquiry}
            style={{
              ...baseButtonStyle,
              background: isAdded ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: isAdded ? '1px solid #4ADE80' : '1px solid rgba(255, 255, 255, 0.12)',
              color: isAdded ? '#4ADE80' : '#ffffff',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#ffffff'
              ;(e.currentTarget as HTMLElement).style.borderColor = '#ffffff'
              ;(e.currentTarget as HTMLElement).style.color = '#111111'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = isAdded ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 255, 255, 0.05)'
              ;(e.currentTarget as HTMLElement).style.borderColor = isAdded ? '#4ADE80' : 'rgba(255, 255, 255, 0.12)'
              ;(e.currentTarget as HTMLElement).style.color = isAdded ? '#4ADE80' : '#ffffff'
            }}
          >
            {isAdded ? (
              <>
                <Check size={14} color="#4ADE80" />
                Remove from Enquiry
              </>
            ) : (
              <>
                <Plus size={14} />
                Add to Enquiry
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard