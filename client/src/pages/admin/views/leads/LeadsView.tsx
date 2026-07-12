import React, { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { theme } from '../../../../theme';

type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed' | 'Lost';

interface Lead {
  id: string;
  name: string;
  email: string;
  city: string;
  source: string;
  status: LeadStatus;
  date: string;
}

const mockLeads: Lead[] = [
  { id: '1', name: 'Acme Corp', email: 'hello@acmecorp.com', city: 'Mumbai', source: 'Google Ads', status: 'New', date: '2026-07-09' },
  { id: '2', name: 'Rajesh Kumar', email: 'rajesh.k@gmail.com', city: 'Delhi', source: 'Organic', status: 'In Progress', date: '2026-07-08' },
  { id: '3', name: 'FunZone Entertainment', email: 'info@funzone.in', city: 'Bangalore', source: 'Direct', status: 'Closed', date: '2026-07-05' },
  { id: '4', name: 'Priya Sharma', email: 'priyas@yahoo.com', city: 'Pune', source: 'Instagram', status: 'Contacted', date: '2026-07-07' },
  { id: '5', name: 'Strike Alley', email: 'contact@strikealley.com', city: 'Hyderabad', source: 'Referral', status: 'Lost', date: '2026-07-01' },
];

const getStatusColor = (status: LeadStatus) => {
  switch(status) {
    case 'New': return { bg: '#DBEAFE', text: '#1D4ED8' };
    case 'Contacted': return { bg: '#FEF3C7', text: '#B45309' };
    case 'In Progress': return { bg: '#E0E7FF', text: '#4338CA' };
    case 'Closed': return { bg: '#D1FAE5', text: '#047857' };
    case 'Lost': return { bg: '#FEE2E2', text: '#B91C1C' };
  }
};

export const LeadsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>CRM & Leads</h1>
          <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Manage your customer database and track inquiry statuses.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '10px' }} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.adminBorder}`,
                backgroundColor: theme.colors.adminSurface,
                fontSize: '14px',
                width: '240px',
                outline: 'none',
                color: theme.colors.adminText
              }}
            />
          </div>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '8px 16px', borderRadius: '8px', border: `1px solid ${theme.colors.adminBorder}`, 
            backgroundColor: theme.colors.adminSurface, color: '#4B5563', cursor: 'pointer',
            fontSize: '14px', fontWeight: 500
          }}>
            <Filter size={16} /> Filter
          </button>
          <button style={{ 
            padding: '8px 16px', borderRadius: '8px', border: 'none', 
            backgroundColor: theme.colors.teal, color: '#0B2B4A', cursor: 'pointer',
            fontSize: '14px', fontWeight: 600
          }}>
            Export CSV
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: theme.colors.adminBg, borderBottom: `1px solid ${theme.colors.adminBorder}` }}>
              <tr>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: theme.colors.adminTextMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lead Name</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: theme.colors.adminTextMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Info</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: theme.colors.adminTextMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location / Source</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: theme.colors.adminTextMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: theme.colors.adminTextMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: theme.colors.adminTextMuted, textTransform: 'uppercase', letterSpacing: '0.05em', width: '60px' }}></th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead) => {
                const statusColors = getStatusColor(lead.status);
                return (
                  <tr key={lead.id} style={{ borderBottom: `1px solid ${theme.colors.adminBorder}`, transition: 'background-color 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.backgroundColor = theme.colors.adminBg} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: 600, color: theme.colors.adminText, fontSize: '14px' }}>{lead.name}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ color: '#4B5563', fontSize: '14px' }}>{lead.email}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ color: '#4B5563', fontSize: '14px' }}>{lead.city}</div>
                      <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '2px' }}>{lead.source}</div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        backgroundColor: statusColors.bg, 
                        color: statusColors.text, 
                        padding: '4px 12px', 
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'inline-block'
                      }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', color: '#4B5563', fontSize: '14px' }}>
                      {lead.date}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
