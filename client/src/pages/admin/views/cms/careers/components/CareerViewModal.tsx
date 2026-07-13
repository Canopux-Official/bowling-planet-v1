import React from 'react';
import { X, MapPin, Briefcase, Clock, Users, Mail, Calendar } from 'lucide-react';

import type { IJob } from '../services';
import { theme } from '../../../../../../theme';

interface Props { job: IJob | null; isOpen: boolean; onClose: () => void; }

export const CareerViewModal: React.FC<Props> = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto', padding: '24px', color: theme.colors.adminText }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, color: statusColor(job.status) }}>{job.status}</span>
            <h2 style={{ margin: '4px 0 0 0' }}>{job.title}</h2>
            {job.department && <div style={{ color: theme.colors.adminTextMuted, fontSize: '14px', marginTop: '2px' }}>{job.department}</div>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText }}><X /></button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '16px', fontSize: '13px', color: theme.colors.adminTextMuted }}>
          <span style={metaItemStyle}><MapPin size={14} /> {job.location} ({job.workMode})</span>
          <span style={metaItemStyle}><Briefcase size={14} /> {job.jobType}</span>
          <span style={metaItemStyle}><Clock size={14} /> {job.experience}</span>
          <span style={metaItemStyle}><Users size={14} /> {job.openings} opening{job.openings !== 1 ? 's' : ''}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '16px', fontSize: '13px', color: theme.colors.adminTextMuted }}>
          <span style={metaItemStyle}><Mail size={14} /> {job.applicationEmail}</span>
          {job.applicationDeadline && (
            <span style={metaItemStyle}><Calendar size={14} /> Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {job.tags?.map((t, idx) => (
            <span key={idx} style={{ backgroundColor: theme.colors.adminBorder, padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>#{t}</span>
          ))}
        </div>

        <div style={{ marginBottom: '20px', whiteSpace: 'pre-wrap', color: theme.colors.adminTextMuted }}>
          {job.description}
        </div>

        {renderListSection('Eligibility Criteria', job.eligibilityCriteria)}
        {renderListSection('Requirements', job.requirements)}
        {renderListSection('Key Responsibilities', job.keyResponsibilities)}
        {renderListSection('Skills', job.skills)}
      </div>
    </div>
  );
};

function renderListSection(title: string, items?: string[]) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginBottom: '18px' }}>
      <h4 style={{ margin: '0 0 8px 0' }}>{title}</h4>
      <ul style={{ margin: 0, paddingLeft: '18px', color: theme.colors.adminTextMuted, fontSize: '14px' }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}

function statusColor(status: string) {
  if (status === 'open') return '#10b981';
  if (status === 'draft') return '#f59e0b';
  return '#ef4444';
}

const metaItemStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '6px' };
