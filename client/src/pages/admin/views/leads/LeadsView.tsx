import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Trash2 } from 'lucide-react';
import { theme } from '../../../../theme';
import { useNavigate } from 'react-router-dom';
import { leadService } from './lead.service';
import { useToast } from '../../components/Toast';


const getStatusColor = (status: string) => {
  switch(status) {
    case 'New': return { bg: '#DBEAFE', text: '#1D4ED8' };
    case 'Contacted': return { bg: '#FEF3C7', text: '#B45309' };
    case 'Closed': return { bg: '#D1FAE5', text: '#047857' };
    case 'Abandoned': return { bg: '#FEE2E2', text: '#B91C1C' };
    default: return { bg: '#F3F4F6', text: '#374151' };
  }
};

export const LeadsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await leadService.getAll();
      setLeads(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      showToast('error', 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this lead forever?')) return;
    try {
      await leadService.delete(id);
      showToast('success', 'Lead deleted');
      fetchLeads();
    } catch (err) {
      showToast('error', 'Failed to delete lead');
    }
  };

  const filteredLeads = leads.filter(l => 
    (l.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (l.phone || '').includes(searchTerm) ||
    (l.city || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 600, color: theme.colors.adminTextMuted, textTransform: 'uppercase', letterSpacing: '0.05em', width: '100px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: theme.colors.adminTextMuted }}>Loading leads...</td></tr>
              ) : filteredLeads.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: theme.colors.adminTextMuted }}>No leads found.</td></tr>
              ) : (
                filteredLeads.map((lead) => {
                  const statusColors = getStatusColor(lead.status);
                  const isReturning = lead.behavior?.isReturningVisitor;
                  return (
                    <tr 
                      key={lead._id} 
                      onClick={() => navigate(`/admin/leads/${lead._id}`)}
                      style={{ 
                        borderBottom: `1px solid ${theme.colors.adminBorder}`, 
                        transition: 'background-color 0.2s', 
                        cursor: 'pointer',
                        backgroundColor: lead.status === 'New' ? '#F0F9FF' : 'transparent'
                      }} 
                      onMouseOver={e => e.currentTarget.style.backgroundColor = lead.status === 'New' ? '#E0F2FE' : theme.colors.adminBg} 
                      onMouseOut={e => e.currentTarget.style.backgroundColor = lead.status === 'New' ? '#F0F9FF' : 'transparent'}
                    >
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: 600, color: theme.colors.adminText, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {lead.name || 'Unknown'} 
                          {isReturning && <span style={{ fontSize: '10px', backgroundColor: '#F3F4F6', padding: '2px 6px', borderRadius: '4px', color: '#4B5563' }}>Returning</span>}
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ color: '#4B5563', fontSize: '14px' }}>{lead.phone || '-'}</div>
                        {lead.email && <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '2px' }}>{lead.email}</div>}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ color: '#4B5563', fontSize: '14px' }}>{lead.city || '-'}</div>
                        <div style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '2px' }}>
                          {lead.utm?.source ? `${lead.utm.source} / ${lead.utm.medium || ''}` : 'Direct'}
                        </div>
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
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right', display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate(`/admin/leads/${lead._id}`); }}
                          style={{ background: 'none', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', cursor: 'pointer', padding: '6px', color: '#4B5563' }}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(lead._id, e)}
                          style={{ background: 'none', border: `1px solid ${theme.colors.adminBorder}`, borderRadius: '6px', cursor: 'pointer', padding: '6px', color: '#EF4444' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
