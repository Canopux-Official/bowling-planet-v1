// import React, { useState, useEffect } from 'react';
// import { X, Plus, Trash2, Upload } from 'lucide-react';
// import { type IProject, projectService, type IFeaturePoint, type IBulletList, type ISetupStep, type ITestimonial } from '../services';
// import { theme } from '../../../../../../theme';

// interface ProjectModalProps {
//   project: IProject | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onSaveSuccess: () => void;
// }

// export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, onSaveSuccess }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // --- Core Fields ---
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tagsInput, setTagsInput] = useState('');
//   const [isPublished, setIsPublished] = useState(false);

//   // --- Gallery Media States ---
//   const [existingMedia, setExistingMedia] = useState<any[]>([]);
//   const [newFiles, setNewFiles] = useState<File[]>([]);

//   // --- Dynamic Mongoose Arrays States ---
//   const [featurePoints, setFeaturePoints] = useState<IFeaturePoint[]>([]);
//   const [bulletLists, setBulletLists] = useState<IBulletList[]>([]);
//   const [setupSteps, setSetupSteps] = useState<ISetupStep[]>([]);
//   const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);

//   useEffect(() => {
//     if (project) {
//       setTitle(project.title || '');
//       setDescription(project.description || '');
//       setTagsInput(project.tags ? project.tags.join(', ') : '');
//       setIsPublished(project.isPublished || false);
//       setExistingMedia(project.media || []);
//       setFeaturePoints(project.featurePoints || []);
//       setBulletLists(project.bulletList || []);
//       setSetupSteps(project.setupSteps || []);
//       setTestimonials(project.testimonials || []);
//     } else {
//       setTitle('');
//       setDescription('');
//       setTagsInput('');
//       setIsPublished(false);
//       setExistingMedia([]);
//       setFeaturePoints([]);
//       setBulletLists([]);
//       setSetupSteps([]);
//       setTestimonials([]);
//     }
//     setNewFiles([]);
//     setError('');
//   }, [project, isOpen]);

//   if (!isOpen) return null;

//   // --- Media Handlers ---
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setNewFiles([...newFiles, ...Array.from(e.target.files)]);
//     }
//   };

//   // --- Dynamic Array Actions: Feature Points ---
//   const addFeaturePoint = () => setFeaturePoints([...featurePoints, { title: '', description: '' }]);
//   const updateFeaturePoint = (idx: number, key: keyof IFeaturePoint, val: string) => {
//     const updated = [...featurePoints];
//     updated[idx] = { ...updated[idx], [key]: val };
//     setFeaturePoints(updated);
//   };
//   const removeFeaturePoint = (idx: number) => setFeaturePoints(featurePoints.filter((_, i) => i !== idx));

//   // --- Dynamic Array Actions: Bullet Lists ---
//   const addBulletList = () => setBulletLists([...bulletLists, { heading: '', items: [''] }]);
//   const updateBulletHeading = (idx: number, val: string) => {
//     const updated = [...bulletLists];
//     updated[idx].heading = val;
//     setBulletLists(updated);
//   };
//   const addBulletItem = (listIdx: number) => {
//     const updated = [...bulletLists];
//     updated[listIdx].items.push('');
//     setBulletLists(updated);
//   };
//   const updateBulletItem = (listIdx: number, itemIdx: number, val: string) => {
//     const updated = [...bulletLists];
//     updated[listIdx].items[itemIdx] = val;
//     setBulletLists(updated);
//   };
//   const removeBulletItem = (listIdx: number, itemIdx: number) => {
//     const updated = [...bulletLists];
//     updated[listIdx].items = updated[listIdx].items.filter((_, i) => i !== itemIdx);
//     setBulletLists(updated);
//   };
//   const removeBulletList = (idx: number) => setBulletLists(bulletLists.filter((_, i) => i !== idx));

//   // --- Dynamic Array Actions: Setup Steps ---
//   const addSetupStep = () => {
//     setSetupSteps([...setupSteps, { stepNumber: setupSteps.length + 1, title: '', description: '', points: [''] }]);
//   };
//   const updateSetupStepField = (idx: number, key: keyof ISetupStep, val: any) => {
//     const updated = [...setupSteps];
//     updated[idx] = { ...updated[idx], [key]: val };
//     setSetupSteps(updated);
//   };
//   const addSetupPoint = (stepIdx: number) => {
//     const updated = [...setupSteps];
//     if (!updated[stepIdx].points) updated[stepIdx].points = [];
//     updated[stepIdx].points?.push('');
//     setSetupSteps(updated);
//   };
//   const updateSetupPoint = (stepIdx: number, ptIdx: number, val: string) => {
//     const updated = [...setupSteps];
//     if (updated[stepIdx].points) updated[stepIdx].points![ptIdx] = val;
//     setSetupSteps(updated);
//   };
//   const removeSetupPoint = (stepIdx: number, ptIdx: number) => {
//     const updated = [...setupSteps];
//     if (updated[stepIdx].points) {
//       updated[stepIdx].points = updated[stepIdx].points!.filter((_, i) => i !== ptIdx);
//     }
//     setSetupSteps(updated);
//   };
//   const removeSetupStep = (idx: number) => {
//     setSetupSteps(setupSteps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, stepNumber: i + 1 })));
//   };

//   // --- Dynamic Array Actions: Testimonials ---
//   const addTestimonial = () => {
//     setTestimonials([...testimonials, { clientName: '', message: '', designation: '', companyName: '', rating: 5 }]);
//   };
//   const updateTestimonialField = (idx: number, key: keyof ITestimonial, val: any) => {
//     const updated = [...testimonials];
//     updated[idx] = { ...updated[idx], [key]: val };
//     setTestimonials(updated);
//   };
//   const removeTestimonial = (idx: number) => setTestimonials(testimonials.filter((_, i) => i !== idx));

//   // --- Form Submission Pipeline ---
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     const formattedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
//     const payload: Partial<IProject> = {
//       title,
//       description,
//       isPublished,
//       tags: formattedTags,
//       media: existingMedia,
//       featurePoints,
//       bulletList: bulletLists,
//       setupSteps,
//       testimonials
//     };

//     try {
//       if (project?._id) {
//         await projectService.update(project._id, payload, newFiles);
//       } else {
//         await projectService.create(payload, newFiles);
//       }
//       onSaveSuccess();
//       onClose();
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong saving the project.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={backdropStyle}>
//       <div style={containerStyle}>
//         <div style={headerStyle}>
//           <h2 style={{ margin: 0, color: theme.colors.adminText }}>{project ? 'Edit Project Config' : 'Create New Project'}</h2>
//           <button onClick={onClose} style={closeIconBtnStyle}><X /></button>
//         </div>

//         <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
//           {error && <div style={{ color: '#ff4d4d', fontSize: '14px', fontWeight: 500 }}>{error}</div>}

//           {/* Section: Title & Description */}
//           <div style={rowStyle}>
//             <div style={{ flex: 1 }}>
//               <label style={labelStyle}>Title</label>
//               <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
//             </div>
//             <div style={{ flex: 1 }}>
//               <label style={labelStyle}>Tags (comma separated)</label>
//               <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="react, node, dynamic" style={inputStyle} />
//             </div>
//           </div>

//           <div>
//             <label style={labelStyle}>Main Description</label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={inputStyle} />
//           </div>

//           <hr style={dividerStyle} />

//           {/* Section: Gallery Photos */}
//           <div>
//             <label style={labelStyle}>Gallery Media Uploads</label>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
//               {existingMedia.map((m, i) => (
//                 <div key={i} style={thumbnailWrapperStyle}>
//                   <img src={m.url} alt="gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                   <button type="button" onClick={() => setExistingMedia(existingMedia.filter((_, idx) => idx !== i))} style={deleteThumbBtnStyle}><Trash2 size={12} /></button>
//                 </div>
//               ))}
//               {newFiles.map((f, i) => (
//                 <div key={i} style={{ ...thumbnailWrapperStyle, opacity: 0.7, backgroundColor: theme.colors.adminBorder }}>
//                   <div style={{ fontSize: '10px', padding: '4px', color: theme.colors.adminText }}>{f.name}</div>
//                   <button type="button" onClick={() => setNewFiles(newFiles.filter((_, idx) => idx !== i))} style={deleteThumbBtnStyle}><Trash2 size={12} /></button>
//                 </div>
//               ))}
//             </div>
//             <label style={uploadAreaStyle}>
//               <Upload size={16} /> Add Fresh Assets
//               <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
//             </label>
//           </div>

//           <hr style={dividerStyle} />

//           {/* Sub-Section: Feature Points */}
//           <div style={cardSectionStyle}>
//             <div style={sectionHeaderStyle}>
//               <h3 style={sectionTitleStyle}>Key Features</h3>
//               <button type="button" onClick={addFeaturePoint} style={subAddBtnStyle}><Plus size={14} /> Add Feature</button>
//             </div>
//             {featurePoints.map((fp, idx) => (
//               <div key={idx} style={arrayItemRowStyle}>
//                 <input type="text" placeholder="Feature Title" value={fp.title} onChange={(e) => updateFeaturePoint(idx, 'title', e.target.value)} required style={inputStyle} />
//                 <input type="text" placeholder="Short Description" value={fp.description || ''} onChange={(e) => updateFeaturePoint(idx, 'description', e.target.value)} style={inputStyle} />
//                 <button type="button" onClick={() => removeFeaturePoint(idx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
//               </div>
//             ))}
//           </div>

//           {/* Sub-Section: Bullet Lists */}
//           <div style={cardSectionStyle}>
//             <div style={sectionHeaderStyle}>
//               <h3 style={sectionTitleStyle}>Bullet Point Lists</h3>
//               <button type="button" onClick={addBulletList} style={subAddBtnStyle}><Plus size={14} /> Add List Group</button>
//             </div>
//             {bulletLists.map((bl, listIdx) => (
//               <div key={listIdx} style={subCardStyle}>
//                 <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
//                   <input type="text" placeholder="List Heading (e.g., Technologies Used)" value={bl.heading} onChange={(e) => updateBulletHeading(listIdx, e.target.value)} required style={inputStyle} />
//                   <button type="button" onClick={() => removeBulletList(listIdx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
//                 </div>
//                 <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                   {bl.items.map((item, itemIdx) => (
//                     <div key={itemIdx} style={{ display: 'flex', gap: '8px' }}>
//                       <input type="text" placeholder={`Item #${itemIdx + 1}`} value={item} onChange={(e) => updateBulletItem(listIdx, itemIdx, e.target.value)} required style={inputStyle} />
//                       <button type="button" onClick={() => removeBulletItem(listIdx, itemIdx)} style={removeIconBtnStyle}><Trash2 size={14} /></button>
//                     </div>
//                   ))}
//                   <button type="button" onClick={() => addBulletItem(listIdx)} style={{ ...subAddBtnStyle, alignSelf: 'flex-start', marginTop: '4px' }}><Plus size={12} /> Add List Item</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Sub-Section: Setup Steps */}
//           <div style={cardSectionStyle}>
//             <div style={sectionHeaderStyle}>
//               <h3 style={sectionTitleStyle}>Installation & Setup Steps</h3>
//               <button type="button" onClick={addSetupStep} style={subAddBtnStyle}><Plus size={14} /> Add Step</button>
//             </div>
//             {setupSteps.map((step, stepIdx) => (
//               <div key={stepIdx} style={subCardStyle}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
//                   <span style={{ color: theme.colors.adminTextMuted, fontWeight: 600 }}>Step {step.stepNumber}</span>
//                   <button type="button" onClick={() => removeSetupStep(stepIdx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
//                   <input type="text" placeholder="Step Title" value={step.title} onChange={(e) => updateSetupStepField(stepIdx, 'title', e.target.value)} required style={inputStyle} />
//                   <textarea placeholder="Step Subtext Description" value={step.description || ''} onChange={(e) => updateSetupStepField(stepIdx, 'description', e.target.value)} rows={2} style={inputStyle} />
//                 </div>

//                 {/* Nested Steps Point Arrays */}
//                 <div style={{ paddingLeft: '16px' }}>
//                   <label style={{ ...labelStyle, fontSize: '12px' }}>Detailed Sub-points</label>
//                   {step.points?.map((pt, ptIdx) => (
//                     <div key={ptIdx} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
//                       <input type="text" placeholder="Sub-point item description" value={pt} onChange={(e) => updateSetupPoint(stepIdx, ptIdx, e.target.value)} style={inputStyle} />
//                       <button type="button" onClick={() => removeSetupPoint(stepIdx, ptIdx)} style={removeIconBtnStyle}><Trash2 size={14} /></button>
//                     </div>
//                   ))}
//                   <button type="button" onClick={() => addSetupPoint(stepIdx)} style={{ ...subAddBtnStyle, fontSize: '11px', marginTop: '4px' }}><Plus size={12} /> Add Sub-point</button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Sub-Section: Testimonials */}
//           <div style={cardSectionStyle}>
//             <div style={sectionHeaderStyle}>
//               <h3 style={sectionTitleStyle}>Client Testimonials</h3>
//               <button type="button" onClick={addTestimonial} style={subAddBtnStyle}><Plus size={14} /> Add Review</button>
//             </div>
//             {testimonials.map((test, tIdx) => (
//               <div key={tIdx} style={subCardStyle}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
//                   <input type="text" placeholder="Client Name" value={test.clientName} onChange={(e) => updateTestimonialField(tIdx, 'clientName', e.target.value)} required style={{ ...inputStyle, width: '45%' }} />
//                   <input type="number" min={1} max={5} placeholder="Rating (1-5)" value={test.rating || 5} onChange={(e) => updateTestimonialField(tIdx, 'rating', Number(e.target.value))} style={{ ...inputStyle, width: '20%' }} />
//                   <button type="button" onClick={() => removeTestimonial(tIdx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
//                 </div>
//                 <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
//                   <input type="text" placeholder="Designation (e.g. CEO)" value={test.designation || ''} onChange={(e) => updateTestimonialField(tIdx, 'designation', e.target.value)} style={inputStyle} />
//                   <input type="text" placeholder="Company Name" value={test.companyName || ''} onChange={(e) => updateTestimonialField(tIdx, 'companyName', e.target.value)} style={inputStyle} />
//                 </div>
//                 <textarea placeholder="Review Message Text Content" value={test.message} onChange={(e) => updateTestimonialField(tIdx, 'message', e.target.value)} required rows={2} style={inputStyle} />
//               </div>
//             ))}
//           </div>

//           <hr style={dividerStyle} />

//           {/* Control Flags Footer Layout */}
//           <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: theme.colors.adminText, fontWeight: 500 }}>
//             <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} style={{ transform: 'scale(1.1)' }} />
//             Publish project directly to visibility indexes
//           </label>

//           <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
//             <button type="button" onClick={onClose} disabled={loading} style={cancelBtnStyle}>Cancel</button>
//             <button type="submit" disabled={loading} style={saveBtnStyle}>{loading ? 'Saving Layout...' : 'Save Configuration'}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // --- Embedded Layout CSS Inline Constants Profiles ---
// const backdropStyle: React.CSSProperties = {
//   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//   backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', justifyContent: 'center',
//   alignItems: 'center', zIndex: 1000, padding: '20px'
// };
// const containerStyle: React.CSSProperties = {
//   backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`,
//   borderRadius: '12px', width: '100%', maxWidth: '800px', maxHeight: '92vh',
//   overflowY: 'auto', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
// };
// const headerStyle: React.CSSProperties = {
//   display: 'flex', justifyContent: 'space-between', padding: '20px 24px',
//   borderBottom: `1px solid ${theme.colors.adminBorder}`, position: 'sticky', top: 0,
//   backgroundColor: theme.colors.adminSurface, zIndex: 10
// };
// const rowStyle: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' };
// const labelStyle: React.CSSProperties = { display: 'block', color: theme.colors.adminText, marginBottom: '6px', fontSize: '14px', fontWeight: 600 };
// const inputStyle: React.CSSProperties = {
//   width: '100%', padding: '10px 12px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.1)',
//   border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminText, outline: 'none', boxSizing: 'border-box', fontSize: '14px'
// };
// const dividerStyle: React.CSSProperties = { border: 0, borderTop: `1px solid ${theme.colors.adminBorder}`, margin: '8px 0' };
// const cardSectionStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };
// const sectionHeaderStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
// const sectionTitleStyle: React.CSSProperties = { margin: 0, fontSize: '15px', color: theme.colors.adminText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' };
// const subCardStyle: React.CSSProperties = { padding: '14px', backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px' };
// const arrayItemRowStyle: React.CSSProperties = { display: 'flex', gap: '10px', alignItems: 'center' };
// const uploadAreaStyle: React.CSSProperties = {
//   display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `1px dashed ${theme.colors.adminBorder}`,
//   padding: '16px', borderRadius: '8px', cursor: 'pointer', color: theme.colors.adminTextMuted, fontSize: '14px', backgroundColor: 'rgba(0,0,0,0.05)'
// };
// const thumbnailWrapperStyle: React.CSSProperties = { position: 'relative', width: '75px', height: '75px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', overflow: 'hidden' };
// const deleteThumbBtnStyle: React.CSSProperties = { position: 'absolute', top: '2px', right: '2px', backgroundColor: 'rgba(255,77,77,0.9)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', padding: '4px' };
// const subAddBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px', background: 'none', color: '#3b82f6', border: 'none', cursor: 'pointer', padding: '4px', fontSize: '13px', fontWeight: 600 };
// const removeIconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' };
// const closeIconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText };
// const cancelBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px' };
// const saveBtnStyle: React.CSSProperties = { padding: '10px 18px', border: 'none', backgroundColor: '#3b82f6', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' };



import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { type IProject, projectService, type IFeaturePoint, type IBulletList, type ISetupStep, type ITestimonial } from '../services';
import { theme } from '../../../../../../theme';
import { useToast } from '../../../../components/Toast';

interface ProjectModalProps {
  project: IProject | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, onSaveSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  // --- Core Fields ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // --- Gallery Media States ---
  const [existingMedia, setExistingMedia] = useState<any[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  // --- Dynamic Mongoose Arrays States ---
  const [featurePoints, setFeaturePoints] = useState<IFeaturePoint[]>([]);
  const [bulletLists, setBulletLists] = useState<IBulletList[]>([]);
  const [setupSteps, setSetupSteps] = useState<ISetupStep[]>([]);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);

  // Local state map to track files tied to nested sub-structures
  const [setupStepFiles, setSetupStepFiles] = useState<{ [key: number]: File }>({});
  const [testimonialFiles, setTestimonialFiles] = useState<{ [key: number]: File }>({});

  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setDescription(project.description || '');
      setTagsInput(project.tags ? project.tags.join(', ') : '');
      setIsPublished(project.isPublished || false);
      setExistingMedia(project.media || []);
      setFeaturePoints(project.featurePoints || []);
      setBulletLists(project.bulletList || []);
      setSetupSteps(project.setupSteps || []);
      setTestimonials(project.testimonials || []);
    } else {
      setTitle('');
      setDescription('');
      setTagsInput('');
      setIsPublished(false);
      setExistingMedia([]);
      setFeaturePoints([]);
      setBulletLists([]);
      setSetupSteps([]);
      setTestimonials([]);
    }
    setNewFiles([]);
    setSetupStepFiles({});
    setTestimonialFiles({});
    setError('');
  }, [project, isOpen]);

  if (!isOpen) return null;

  // --- Media Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles([...newFiles, ...Array.from(e.target.files)]);
    }
  };

  // --- Dynamic Array Actions ---
  const addFeaturePoint = () => setFeaturePoints([...featurePoints, { title: '', description: '' }]);
  const updateFeaturePoint = (idx: number, key: keyof IFeaturePoint, val: string) => {
    const updated = [...featurePoints];
    updated[idx] = { ...updated[idx], [key]: val };
    setFeaturePoints(updated);
  };
  const removeFeaturePoint = (idx: number) => setFeaturePoints(featurePoints.filter((_, i) => i !== idx));

  const addBulletList = () => setBulletLists([...bulletLists, { heading: '', items: [''] }]);
  const updateBulletHeading = (idx: number, val: string) => {
    const updated = [...bulletLists];
    updated[idx].heading = val;
    setBulletLists(updated);
  };
  const addBulletItem = (listIdx: number) => {
    const updated = [...bulletLists];
    updated[listIdx].items.push('');
    setBulletLists(updated);
  };
  const updateBulletItem = (listIdx: number, itemIdx: number, val: string) => {
    const updated = [...bulletLists];
    updated[listIdx].items[itemIdx] = val;
    setBulletLists(updated);
  };
  const removeBulletItem = (listIdx: number, itemIdx: number) => {
    const updated = [...bulletLists];
    updated[listIdx].items = updated[listIdx].items.filter((_, i) => i !== itemIdx);
    setBulletLists(updated);
  };
  const removeBulletList = (idx: number) => setBulletLists(bulletLists.filter((_, i) => i !== idx));

  const addSetupStep = () => {
    setSetupSteps([...setupSteps, { stepNumber: setupSteps.length + 1, title: '', description: '', points: [''] }]);
  };
  const updateSetupStepField = (idx: number, key: keyof ISetupStep, val: any) => {
    const updated = [...setupSteps];
    updated[idx] = { ...updated[idx], [key]: val };
    setSetupSteps(updated);
  };
  const addSetupPoint = (stepIdx: number) => {
    const updated = [...setupSteps];
    if (!updated[stepIdx].points) updated[stepIdx].points = [];
    updated[stepIdx].points?.push('');
    setSetupSteps(updated);
  };
  const updateSetupPoint = (stepIdx: number, ptIdx: number, val: string) => {
    const updated = [...setupSteps];
    if (updated[stepIdx].points) updated[stepIdx].points![ptIdx] = val;
    setSetupSteps(updated);
  };
  const removeSetupPoint = (stepIdx: number, ptIdx: number) => {
    const updated = [...setupSteps];
    if (updated[stepIdx].points) {
      updated[stepIdx].points = updated[stepIdx].points!.filter((_, i) => i !== ptIdx);
    }
    setSetupSteps(updated);
  };
  const removeSetupStep = (idx: number) => {
    setSetupSteps(setupSteps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, stepNumber: i + 1 })));
    const updatedFiles = { ...setupStepFiles };
    delete updatedFiles[idx];
    setSetupStepFiles(updatedFiles);
  };
  const handleSetupStepImageChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSetupStepFiles({ ...setupStepFiles, [idx]: e.target.files[0] });
    }
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { clientName: '', message: '', designation: '', companyName: '', rating: 5 }]);
  };
  const updateTestimonialField = (idx: number, key: keyof ITestimonial, val: any) => {
    const updated = [...testimonials];
    updated[idx] = { ...updated[idx], [key]: val };
    setTestimonials(updated);
  };
  const removeTestimonial = (idx: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== idx));
    const updatedFiles = { ...testimonialFiles };
    delete updatedFiles[idx];
    setTestimonialFiles(updatedFiles);
  };
  const handleTestimonialImageChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTestimonialFiles({ ...testimonialFiles, [idx]: e.target.files[0] });
    }
  };

  // --- Form Submission Pipeline ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const payload: Partial<IProject> = {
      title,
      description,
      isPublished,
      tags: formattedTags,
      media: existingMedia,
      featurePoints,
      bulletList: bulletLists,
      setupSteps,
      testimonials
    };

    try {
      if (project?._id) {
        await projectService.update(project._id, payload, newFiles, setupStepFiles, testimonialFiles);
        showToast('success', 'Project updated successfully');
      } else {
        await projectService.create(payload, newFiles, setupStepFiles, testimonialFiles);
        showToast('success', 'Project created successfully');
      }
      onSaveSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.message || 'Something went wrong saving the project.';
      setError(msg);
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={backdropStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, color: theme.colors.adminText }}>{project ? 'Edit Project Config' : 'Create New Project'}</h2>
          <button onClick={onClose} style={closeIconBtnStyle}><X /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && <div style={{ color: '#ff4d4d', fontSize: '14px', fontWeight: 500 }}>{error}</div>}

          {/* Section: Title & Description */}
          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Tags (comma separated)</label>
              <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="react, node, dynamic" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Main Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={inputStyle} />
          </div>

          <hr style={dividerStyle} />

          {/* Section: Gallery Photos */}
          <div>
            <label style={labelStyle}>Gallery Media Uploads</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              {existingMedia.map((m, i) => (
                <div key={i} style={thumbnailWrapperStyle}>
                  <img src={m.url} alt="gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button type="button" onClick={() => setExistingMedia(existingMedia.filter((_, idx) => idx !== i))} style={deleteThumbBtnStyle}><Trash2 size={12} /></button>
                </div>
              ))}
              {newFiles.map((f, i) => (
                <div key={i} style={{ ...thumbnailWrapperStyle, opacity: 0.7, backgroundColor: theme.colors.adminBorder }}>
                  <div style={{ fontSize: '10px', padding: '4px', color: theme.colors.adminText }}>{f.name}</div>
                  <button type="button" onClick={() => {
                    // 1. Update the state
                    setNewFiles((prevFiles) => prevFiles.filter((_, idx) => idx !== i));

                    // 2. Show the toast immediately
                    showToast('success', 'Deleting....');

                    // 3. Delay the reload so the toast is visible
                    setTimeout(() => {
                      window.location.reload();
                    }, 1200); // 1200ms gives the user enough time to read "Deleting...."
                  }} style={deleteThumbBtnStyle}><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
            <label style={uploadAreaStyle}>
              <Upload size={16} /> Add Fresh Assets
              <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            </label>
          </div>

          <hr style={dividerStyle} />

          {/* Sub-Section: Feature Points */}
          <div style={cardSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={sectionTitleStyle}>Key Features</h3>
              <button type="button" onClick={addFeaturePoint} style={subAddBtnStyle}><Plus size={14} /> Add Feature</button>
            </div>
            {featurePoints.map((fp, idx) => (
              <div key={idx} style={arrayItemRowStyle}>
                <input type="text" placeholder="Feature Title" value={fp.title} onChange={(e) => updateFeaturePoint(idx, 'title', e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="Short Description" value={fp.description || ''} onChange={(e) => updateFeaturePoint(idx, 'description', e.target.value)} style={inputStyle} />
                <button type="button" onClick={() => removeFeaturePoint(idx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>

          {/* Sub-Section: Bullet Lists */}
          <div style={cardSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={sectionTitleStyle}>Bullet Point Lists</h3>
              <button type="button" onClick={addBulletList} style={subAddBtnStyle}><Plus size={14} /> Add List Group</button>
            </div>
            {bulletLists.map((bl, listIdx) => (
              <div key={listIdx} style={subCardStyle}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                  <input type="text" placeholder="List Heading (e.g., Technologies Used)" value={bl.heading} onChange={(e) => updateBulletHeading(listIdx, e.target.value)} required style={inputStyle} />
                  <button type="button" onClick={() => removeBulletList(listIdx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
                </div>
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {bl.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" placeholder={`Item #${itemIdx + 1}`} value={item} onChange={(e) => updateBulletItem(listIdx, itemIdx, e.target.value)} required style={inputStyle} />
                      <button type="button" onClick={() => removeBulletItem(listIdx, itemIdx)} style={removeIconBtnStyle}><Trash2 size={14} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addBulletItem(listIdx)} style={{ ...subAddBtnStyle, alignSelf: 'flex-start', marginTop: '4px' }}><Plus size={12} /> Add List Item</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sub-Section: Setup Steps */}
          <div style={cardSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={sectionTitleStyle}>Installation & Setup Steps</h3>
              <button type="button" onClick={addSetupStep} style={subAddBtnStyle}><Plus size={14} /> Add Step</button>
            </div>
            {setupSteps.map((step, stepIdx) => (
              <div key={stepIdx} style={subCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: theme.colors.adminTextMuted, fontWeight: 600 }}>Step {step.stepNumber}</span>
                  <button type="button" onClick={() => removeSetupStep(stepIdx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input type="text" placeholder="Step Title" value={step.title} onChange={(e) => updateSetupStepField(stepIdx, 'title', e.target.value)} required style={inputStyle} />
                    <textarea placeholder="Step Subtext Description" value={step.description || ''} onChange={(e) => updateSetupStepField(stepIdx, 'description', e.target.value)} rows={2} style={inputStyle} />
                  </div>

                  {/* Local Step Image Context */}
                  <div style={{ width: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <label style={inlineImageUploadAreaStyle}>
                      {setupStepFiles[stepIdx] ? (
                        <div style={{ fontSize: '11px', textAlign: 'center', wordBreak: 'break-all', padding: '4px' }}>{setupStepFiles[stepIdx].name}</div>
                      ) : step.image?.url ? (
                        <img src={step.image.url} alt="Step" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                          <ImageIcon size={16} /> Step Image
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={(e) => handleSetupStepImageChange(stepIdx, e)} style={{ display: 'none' }} />
                    </label>
                    {(step.image?.url || setupStepFiles[stepIdx]) && (
                      <button type="button" style={{ background: 'none', color: '#ff4d4d', border: 'none', fontSize: '11px', cursor: 'pointer' }} onClick={() => {
                        updateSetupStepField(stepIdx, 'image', undefined);
                        const updated = { ...setupStepFiles };
                        delete updated[stepIdx];
                        setSetupStepFiles(updated);
                      }}>Remove Image</button>
                    )}
                  </div>
                </div>

                <div style={{ paddingLeft: '16px' }}>
                  <label style={{ ...labelStyle, fontSize: '12px' }}>Detailed Sub-points</label>
                  {step.points?.map((pt, ptIdx) => (
                    <div key={ptIdx} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                      <input type="text" placeholder="Sub-point item description" value={pt} onChange={(e) => updateSetupPoint(stepIdx, ptIdx, e.target.value)} style={inputStyle} />
                      <button type="button" onClick={() => removeSetupPoint(stepIdx, ptIdx)} style={removeIconBtnStyle}><Trash2 size={14} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addSetupPoint(stepIdx)} style={{ ...subAddBtnStyle, fontSize: '11px', marginTop: '4px' }}><Plus size={12} /> Add Sub-point</button>
                </div>
              </div>
            ))}
          </div>

          {/* Sub-Section: Testimonials */}
          <div style={cardSectionStyle}>
            <div style={sectionHeaderStyle}>
              <h3 style={sectionTitleStyle}>Client Testimonials</h3>
              <button type="button" onClick={addTestimonial} style={subAddBtnStyle}><Plus size={14} /> Add Review</button>
            </div>
            {testimonials.map((test, tIdx) => (
              <div key={tIdx} style={subCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <input type="text" placeholder="Client Name" value={test.clientName} onChange={(e) => updateTestimonialField(tIdx, 'clientName', e.target.value)} required style={{ ...inputStyle, width: '45%' }} />
                  <input type="number" min={1} max={5} placeholder="Rating (1-5)" value={test.rating || 5} onChange={(e) => updateTestimonialField(tIdx, 'rating', Number(e.target.value))} style={{ ...inputStyle, width: '20%' }} />
                  <button type="button" onClick={() => removeTestimonial(tIdx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="text" placeholder="Designation (e.g. CEO)" value={test.designation || ''} onChange={(e) => updateTestimonialField(tIdx, 'designation', e.target.value)} style={inputStyle} />
                      <input type="text" placeholder="Company Name" value={test.companyName || ''} onChange={(e) => updateTestimonialField(tIdx, 'companyName', e.target.value)} style={inputStyle} />
                    </div>
                    <textarea placeholder="Review Message Text Content" value={test.message} onChange={(e) => updateTestimonialField(tIdx, 'message', e.target.value)} required rows={2} style={inputStyle} />
                  </div>

                  {/* Local Testimonial Profile Avatar Image Context */}
                  <div style={{ width: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <label style={{ ...inlineImageUploadAreaStyle, width: '70px', height: '70px', borderRadius: '50%' }}>
                      {testimonialFiles[tIdx] ? (
                        <div style={{ fontSize: '9px', textAlign: 'center', padding: '2px' }}>Selected</div>
                      ) : test.clientImage?.url ? (
                        <img src={test.clientImage.url} alt="Client" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '10px' }}>
                          <ImageIcon size={14} /> Avatar
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={(e) => handleTestimonialImageChange(tIdx, e)} style={{ display: 'none' }} />
                    </label>
                    {(test.clientImage?.url || testimonialFiles[tIdx]) && (
                      <button type="button" style={{ background: 'none', color: '#ff4d4d', border: 'none', fontSize: '11px', cursor: 'pointer' }} onClick={() => {
                        updateTestimonialField(tIdx, 'clientImage', undefined);
                        const updated = { ...testimonialFiles };
                        delete updated[tIdx];
                        setTestimonialFiles(updated);
                      }}>Clear</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr style={dividerStyle} />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: theme.colors.adminText, fontWeight: 500 }}>
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} style={{ transform: 'scale(1.1)' }} />
            Publish project directly to visibility indexes
          </label>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} disabled={loading} style={cancelBtnStyle}>Cancel</button>
            <button type="submit" disabled={loading} style={saveBtnStyle}>{loading ? 'Saving Layout...' : 'Save Configuration'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- CSS Inline Constant Profiles ---
const backdropStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', justifyContent: 'center',
  alignItems: 'center', zIndex: 1000, padding: '20px'
};
const containerStyle: React.CSSProperties = {
  backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`,
  borderRadius: '12px', width: '100%', maxWidth: '800px', maxHeight: '92vh',
  overflowY: 'auto', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)'
};
const headerStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', padding: '20px 24px',
  borderBottom: `1px solid ${theme.colors.adminBorder}`, position: 'sticky', top: 0,
  backgroundColor: theme.colors.adminSurface, zIndex: 10
};
const rowStyle: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' };
const labelStyle: React.CSSProperties = { display: 'block', color: theme.colors.adminText, marginBottom: '6px', fontSize: '14px', fontWeight: 600 };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.1)',
  border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminText, outline: 'none', boxSizing: 'border-box', fontSize: '14px'
};
const dividerStyle: React.CSSProperties = { border: 0, borderTop: `1px solid ${theme.colors.adminBorder}`, margin: '8px 0' };
const cardSectionStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };
const sectionHeaderStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const sectionTitleStyle: React.CSSProperties = { margin: 0, fontSize: '15px', color: theme.colors.adminText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' };
const subCardStyle: React.CSSProperties = { padding: '14px', backgroundColor: 'rgba(255,255,255,0.02)', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '8px' };
const arrayItemRowStyle: React.CSSProperties = { display: 'flex', gap: '10px', alignItems: 'center' };
const uploadAreaStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: `1px dashed ${theme.colors.adminBorder}`,
  padding: '16px', borderRadius: '8px', cursor: 'pointer', color: theme.colors.adminTextMuted, fontSize: '14px', backgroundColor: 'rgba(0,0,0,0.05)'
};
const inlineImageUploadAreaStyle: React.CSSProperties = {
  display: 'flex', width: '100%', height: '64px', alignItems: 'center', justifyContent: 'center',
  border: `1px dashed ${theme.colors.adminBorder}`, borderRadius: '6px', cursor: 'pointer',
  color: theme.colors.adminTextMuted, backgroundColor: 'rgba(0,0,0,0.15)', overflow: 'hidden'
};
const thumbnailWrapperStyle: React.CSSProperties = { position: 'relative', width: '75px', height: '75px', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', overflow: 'hidden' };
const deleteThumbBtnStyle: React.CSSProperties = { position: 'absolute', top: '2px', right: '2px', backgroundColor: 'rgba(255,77,77,0.9)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer', padding: '4px' };
const subAddBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px', background: 'none', color: '#3b82f6', border: 'none', cursor: 'pointer', padding: '4px', fontSize: '13px', fontWeight: 600 };
const removeIconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' };
const closeIconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px' };
const saveBtnStyle: React.CSSProperties = { padding: '10px 18px', border: 'none', backgroundColor: '#3b82f6', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' };
