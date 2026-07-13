import React from 'react';
import { X } from 'lucide-react';

import type { ITeamMember } from '../services';
import { theme } from '../../../../../../theme';

interface Props { member: ITeamMember | null; isOpen: boolean; onClose: () => void; }

export const TeamMemberViewModal: React.FC<Props> = ({ member, isOpen, onClose }) => {
  if (!isOpen || !member) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: theme.colors.adminSurface, border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '12px', width: '100%', maxWidth: '420px', padding: '24px', color: theme.colors.adminText, textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme.colors.adminText }}><X /></button>
        </div>
        <img src={member.image?.url} alt={member.name} style={{ width: '110px', height: '110px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto 16px', border: `1px solid ${theme.colors.adminBorder}` }} />
        <h2 style={{ margin: 0 }}>{member.name}</h2>
        <div style={{ color: theme.colors.adminTextMuted, marginTop: '4px' }}>{member.designation}</div>
        {member.experience && <div style={{ color: theme.colors.adminTextMuted, fontSize: '14px', marginTop: '10px' }}>{member.experience}</div>}
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '13px', color: theme.colors.adminTextMuted }}>
          <span style={{ color: member.status === 'active' ? '#10b981' : '#ef4444', fontWeight: 700, textTransform: 'uppercase' }}>
            {member.status}
          </span>
          <span>Order: {member.order}</span>
        </div>
      </div>
    </div>
  );
};
