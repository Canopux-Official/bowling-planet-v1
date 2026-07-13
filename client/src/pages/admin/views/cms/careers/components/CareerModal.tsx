import React, { useEffect, useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

import {
  careerService, type IJob, JOB_TYPES, EXPERIENCE_LEVELS, WORK_MODE, JOB_STATUS,
} from '../services';
import { useToast } from '../../../../components/Toast';
import { theme } from '../../../../../../theme';


interface Props {
  job: IJob | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export const CareerModal: React.FC<Props> = ({ job, isOpen, onClose, onSaveSuccess }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState<typeof WORK_MODE[number]>('On-site');
  const [jobType, setJobType] = useState<typeof JOB_TYPES[number]>('Full-time');
  const [experience, setExperience] = useState<typeof EXPERIENCE_LEVELS[number]>('Fresher');
  const [department, setDepartment] = useState('');
  const [openings, setOpenings] = useState('1');
  const [applicationEmail, setApplicationEmail] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [status, setStatus] = useState<typeof JOB_STATUS[number]>('open');
  const [tagsInput, setTagsInput] = useState('');

  const [eligibilityCriteria, setEligibilityCriteria] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [keyResponsibilities, setKeyResponsibilities] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (job) {
      setTitle(job.title || '');
      setDescription(job.description || '');
      setLocation(job.location || '');
      setWorkMode(job.workMode || 'On-site');
      setJobType(job.jobType || 'Full-time');
      setExperience(job.experience || 'Fresher');
      setDepartment(job.department || '');
      setOpenings(String(job.openings ?? 1));
      setApplicationEmail(job.applicationEmail || '');
      setApplicationDeadline(job.applicationDeadline ? job.applicationDeadline.slice(0, 10) : '');
      setStatus(job.status || 'open');
      setTagsInput(job.tags ? job.tags.join(', ') : '');
      setEligibilityCriteria(job.eligibilityCriteria || []);
      setRequirements(job.requirements || []);
      setKeyResponsibilities(job.keyResponsibilities || []);
      setSkills(job.skills || []);
    } else {
      setTitle(''); setDescription(''); setLocation(''); setWorkMode('On-site');
      setJobType('Full-time'); setExperience('Fresher'); setDepartment('');
      setOpenings('1'); setApplicationEmail(''); setApplicationDeadline('');
      setStatus('open'); setTagsInput('');
      setEligibilityCriteria([]); setRequirements([]); setKeyResponsibilities([]); setSkills([]);
    }
    setError('');
  }, [job, isOpen]);

  if (!isOpen) return null;

  // --- Generic helpers for the four string-array fields ---
  const makeArrayHandlers = (list: string[], setList: (v: string[]) => void) => ({
    add: () => setList([...list, '']),
    update: (idx: number, val: string) => {
      const u = [...list]; u[idx] = val; setList(u);
    },
    remove: (idx: number) => setList(list.filter((_, i) => i !== idx)),
  });

  const eligibilityHandlers = makeArrayHandlers(eligibilityCriteria, setEligibilityCriteria);
  const requirementsHandlers = makeArrayHandlers(requirements, setRequirements);
  const responsibilitiesHandlers = makeArrayHandlers(keyResponsibilities, setKeyResponsibilities);
  const skillsHandlers = makeArrayHandlers(skills, setSkills);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload: Partial<IJob> = {
      title,
      description,
      location,
      workMode,
      jobType,
      experience,
      department: department || undefined,
      openings: Number(openings) || 1,
      applicationEmail,
      applicationDeadline: applicationDeadline || undefined,
      status,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      eligibilityCriteria: eligibilityCriteria.filter(Boolean),
      requirements: requirements.filter(Boolean),
      keyResponsibilities: keyResponsibilities.filter(Boolean),
      skills: skills.filter(Boolean),
    };

    try {
      if (job) {
        await careerService.update(job._id, payload);
        showToast('success', 'Job updated successfully');
      } else {
        await careerService.create(payload);
        showToast('success', 'Job created successfully');
      }
      onSaveSuccess();
      onClose();
    } catch (err: any) {
      const msg = err.message || 'Failed to save job';
      setError(msg);
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  const renderStringArraySection = (
    label: string,
    list: string[],
    handlers: ReturnType<typeof makeArrayHandlers>,
    placeholder: string
  ) => (
    <div style={cardSectionStyle}>
      <div style={sectionHeaderStyle}>
        <h3 style={sectionTitleStyle}>{label}</h3>
        <button type="button" onClick={handlers.add} style={subAddBtnStyle}><Plus size={14} /> Add</button>
      </div>
      {list.map((val, idx) => (
        <div key={idx} style={arrayItemRowStyle}>
          <input placeholder={placeholder} value={val} onChange={(e) => handlers.update(idx, e.target.value)} style={inputStyle} />
          <button type="button" onClick={() => handlers.remove(idx)} style={removeIconBtnStyle}><Trash2 size={16} /></button>
        </div>
      ))}
    </div>
  );

  return (
    <div style={backdropStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, color: theme.colors.adminText }}>{job ? 'Edit Job Posting' : 'Create Job Posting'}</h2>
          <button onClick={onClose} style={iconBtnStyle}><X /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && <div style={{ color: '#ff4d4d', fontSize: '14px', fontWeight: 500 }}>{error}</div>}

          <div style={rowStyle}>
            <div style={{ flex: 2 }}>
              <label style={labelStyle}>Job Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Department</label>
              <input value={department} onChange={(e) => setDepartment(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required style={inputStyle} />
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Location</label>
              <input value={location} onChange={(e) => setLocation(e.target.value)} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Work Mode</label>
              <select value={workMode} onChange={(e) => setWorkMode(e.target.value as any)} style={inputStyle}>
                {WORK_MODE.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Job Type</label>
              <select value={jobType} onChange={(e) => setJobType(e.target.value as any)} style={inputStyle}>
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Experience</label>
              <select value={experience} onChange={(e) => setExperience(e.target.value as any)} style={inputStyle}>
                {EXPERIENCE_LEVELS.map((ex) => <option key={ex} value={ex}>{ex}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={inputStyle}>
                {JOB_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Openings</label>
              <input type="number" min={1} value={openings} onChange={(e) => setOpenings(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Application Deadline</label>
              <input type="date" value={applicationDeadline} onChange={(e) => setApplicationDeadline(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Application Email</label>
              <input type="email" value={applicationEmail} onChange={(e) => setApplicationEmail(e.target.value)} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Tags (comma separated)</label>
              <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="remote, urgent" style={inputStyle} />
            </div>
          </div>

          <hr style={dividerStyle} />

          {renderStringArraySection('Eligibility Criteria', eligibilityCriteria, eligibilityHandlers, 'Eligibility item')}
          {renderStringArraySection('Requirements', requirements, requirementsHandlers, 'Requirement item')}
          {renderStringArraySection('Key Responsibilities', keyResponsibilities, responsibilitiesHandlers, 'Responsibility item')}
          {renderStringArraySection('Skills', skills, skillsHandlers, 'Skill')}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} disabled={loading} style={cancelBtnStyle}>Cancel</button>
            <button type="submit" disabled={loading} style={saveBtnStyle}>{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const backdropStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.65)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' };
const containerStyle: React.CSSProperties = { backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '760px', maxHeight: '92vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' };
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${theme.colors.adminBorder}`, position: 'sticky', top: 0, backgroundColor: theme.colors.adminSurface, zIndex: 10 };
const rowStyle: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap' };
const labelStyle: React.CSSProperties = { display: 'block', color: theme.colors.adminText, marginBottom: '6px', fontSize: '14px', fontWeight: 600 };
const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.1)', border: `1px solid ${theme.colors.adminBorder}`, color: theme.colors.adminText, outline: 'none', boxSizing: 'border-box', fontSize: '14px' };
const dividerStyle: React.CSSProperties = { border: 0, borderTop: `1px solid ${theme.colors.adminBorder}`, margin: '4px 0' };
const cardSectionStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '10px' };
const sectionHeaderStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const sectionTitleStyle: React.CSSProperties = { margin: 0, fontSize: '15px', color: theme.colors.adminText, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' };
const arrayItemRowStyle: React.CSSProperties = { display: 'flex', gap: '10px', alignItems: 'center' };
const subAddBtnStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '4px', background: 'none', color: '#3b82f6', border: 'none', cursor: 'pointer', padding: '4px', fontSize: '13px', fontWeight: 600 };
const removeIconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '4px' };
const iconBtnStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText };
const cancelBtnStyle: React.CSSProperties = { padding: '10px 18px', border: `1px solid ${theme.colors.adminBorder}`, background: 'none', borderRadius: '6px', color: theme.colors.adminText, cursor: 'pointer', fontSize: '14px' };
const saveBtnStyle: React.CSSProperties = { padding: '10px 18px', border: 'none', backgroundColor: '#3b82f6', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px' };
