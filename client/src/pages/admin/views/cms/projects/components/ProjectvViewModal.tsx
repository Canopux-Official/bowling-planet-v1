// import React from 'react';

// import { X } from 'lucide-react';
// import type { IProject } from '../services';
// import { theme } from '../../../../../../theme';


// interface ProjectViewModalProps {
//   project: IProject | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const ProjectViewModal: React.FC<ProjectViewModalProps> = ({ project, isOpen, onClose }) => {
//   if (!isOpen || !project) return null;

//   return (
//     <div style={{
//       position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//       backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center',
//       alignItems: 'center', zIndex: 1000, padding: '20px'
//     }}>
//       <div style={{
//         backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`,
//         borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '85vh',
//         overflowY: 'auto', padding: '24px', color: theme.colors.adminText
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//           <div>
//             <span style={{ fontSize: '12px', color: project.isPublished ? '#10b981' : '#f59e0b', textTransform: 'uppercase', fontWeight: 700 }}>
//               {project.isPublished ? 'Published' : 'Draft'}
//             </span>
//             <h2 style={{ margin: '4px 0 0 0' }}>{project.title}</h2>
//           </div>
//           <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText }}><X /></button>
//         </div>

//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
//           {project.tags?.map((t, idx) => (
//             <span key={idx} style={{ backgroundColor: theme.colors.adminBorder, padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
//               #{t}
//             </span>
//           ))}
//         </div>

//         <div style={{ marginBottom: '20px', whiteSpace: 'pre-wrap', color: theme.colors.adminTextMuted }}>
//           {project.description || 'No description assigned to this project profile.'}
//         </div>

//         {/* Image Grid view */}
//         {project.media && project.media.length > 0 && (
//           <div style={{ marginBottom: '20px' }}>
//             <h4 style={{ margin: '0 0 8px 0' }}>Media Gallery ({project.media.length})</h4>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
//               {project.media.map((m, idx) => (
//                 <img key={idx} src={m.url} alt="Gallery" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', border: `1px solid ${theme.colors.adminBorder}` }} />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Setup Steps implementation list preview */}
//         {project.setupSteps && project.setupSteps.length > 0 && (
//           <div>
//             <h4 style={{ margin: '0 0 8px 0' }}>Setup Steps Sequence</h4>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//               {project.setupSteps.map((step) => (
//                 <div key={step.stepNumber} style={{ borderLeft: `3px solid ${theme.colors.adminBorder}`, paddingLeft: '12px' }}>
//                   <div style={{ fontWeight: 600 }}>Step {step.stepNumber}: {step.title}</div>
//                   <div style={{ fontSize: '14px', color: theme.colors.adminTextMuted }}>{step.description}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { X, Star } from 'lucide-react';
import type { IProject } from '../services';
import { theme } from '../../../../../../theme';

interface ProjectViewModalProps {
  project: IProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectViewModal: React.FC<ProjectViewModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000, padding: '20px'
    }}>
      <div style={{
        backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`,
        borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '85vh',
        overflowY: 'auto', padding: '24px', color: theme.colors.adminText
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', color: project.isPublished ? '#10b981' : '#f59e0b', textTransform: 'uppercase', fontWeight: 700 }}>
              {project.isPublished ? 'Published' : 'Draft'}
            </span>
            <h2 style={{ margin: '4px 0 0 0' }}>{project.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText }}><X /></button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {project.tags?.map((t, idx) => (
            <span key={idx} style={{ backgroundColor: theme.colors.adminBorder, padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
              #{t}
            </span>
          ))}
        </div>

        <div style={{ marginBottom: '20px', whiteSpace: 'pre-wrap', color: theme.colors.adminTextMuted }}>
          {project.description || 'No description assigned to this project profile.'}
        </div>

        {/* Image Grid view */}
        {project.media && project.media.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Media Gallery ({project.media.length})</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
              {project.media.map((m, idx) => (
                <img key={idx} src={m.url} alt="Gallery" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', border: `1px solid ${theme.colors.adminBorder}` }} />
              ))}
            </div>
          </div>
        )}

        {/* Feature Points */}
        {project.featurePoints && project.featurePoints.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Key Features</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
              {project.featurePoints.map((fp, idx) => (
                <div key={idx} style={cardStyle}>
                  <div style={{ fontWeight: 600 }}>{fp.title}</div>
                  {fp.description && (
                    <div style={{ fontSize: '13px', color: theme.colors.adminTextMuted, marginTop: '4px' }}>{fp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bullet Lists */}
        {project.bulletList && project.bulletList.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Bullet Point Lists</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.bulletList.map((bl, idx) => (
                <div key={idx} style={cardStyle}>
                  <div style={{ fontWeight: 600, marginBottom: '6px' }}>{bl.heading}</div>
                  <ul style={{ margin: 0, paddingLeft: '18px', color: theme.colors.adminTextMuted, fontSize: '14px' }}>
                    {bl.items.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Setup Steps */}
        {project.setupSteps && project.setupSteps.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Setup Steps Sequence</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {project.setupSteps.map((step) => (
                <div key={step.stepNumber} style={{ borderLeft: `3px solid ${theme.colors.adminBorder}`, paddingLeft: '12px', display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>Step {step.stepNumber}: {step.title}</div>
                    {step.description && (
                      <div style={{ fontSize: '14px', color: theme.colors.adminTextMuted, marginTop: '2px' }}>{step.description}</div>
                    )}
                    {step.points && step.points.length > 0 && (
                      <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', color: theme.colors.adminTextMuted, fontSize: '13px' }}>
                        {step.points.map((pt, i) => <li key={i}>{pt}</li>)}
                      </ul>
                    )}
                  </div>
                  {step.image?.url && (
                    <img
                      src={step.image.url}
                      alt={`Step ${step.stepNumber}`}
                      style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: `1px solid ${theme.colors.adminBorder}`, flexShrink: 0 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {project.testimonials && project.testimonials.length > 0 && (
          <div style={sectionStyle}>
            <h4 style={sectionTitleStyle}>Client Testimonials</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.testimonials.map((t, idx) => (
                <div key={t._id || idx} style={cardStyle}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {t.clientImage?.url ? (
                      <img
                        src={t.clientImage.url}
                        alt={t.clientName}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: `1px solid ${theme.colors.adminBorder}`, flexShrink: 0 }}
                      />
                    ) : (
                      <div style={{
                        width: '44px', height: '44px', borderRadius: '50%', backgroundColor: theme.colors.adminBorder,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0
                      }}>
                        {t.clientName?.[0]?.toUpperCase() || '?'}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{t.clientName}</div>
                      {(t.designation || t.companyName) && (
                        <div style={{ fontSize: '12px', color: theme.colors.adminTextMuted }}>
                          {[t.designation, t.companyName].filter(Boolean).join(' · ')}
                        </div>
                      )}
                    </div>
                    {t.rating !== undefined && (
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < (t.rating || 0) ? '#f59e0b' : 'none'}
                            color={i < (t.rating || 0) ? '#f59e0b' : theme.colors.adminBorder}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '14px', color: theme.colors.adminTextMuted, marginTop: '8px' }}>
                    {t.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const sectionStyle: React.CSSProperties = { marginBottom: '20px' };
const sectionTitleStyle: React.CSSProperties = { margin: '0 0 8px 0' };
const cardStyle: React.CSSProperties = {
  padding: '12px', backgroundColor: 'rgba(255,255,255,0.02)',
  border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px'
};