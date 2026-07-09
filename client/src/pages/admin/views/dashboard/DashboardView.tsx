import React from 'react';
import { Users, FileText, MousePointerClick, TrendingUp, ArrowUpRight, ArrowDownRight, Circle } from 'lucide-react';
import { theme } from '../../../../theme';

const statCards = [
  { label: 'Total Leads (30d)', value: '142', change: '+12%', isUp: true, icon: Users, iconColor: '#3B82F6', iconBg: 'rgba(59,130,246,0.08)' },
  { label: 'New Inquiries', value: '18', change: '+4%', isUp: true, icon: FileText, iconColor: '#10B981', iconBg: 'rgba(16,185,129,0.08)' },
  { label: 'Avg. Conversion', value: '4.2%', change: '+1.1%', isUp: true, icon: TrendingUp, iconColor: '#8B5CF6', iconBg: 'rgba(139,92,246,0.08)' },
  { label: 'Link Clicks', value: '1,204', change: '-2%', isUp: false, icon: MousePointerClick, iconColor: '#F59E0B', iconBg: 'rgba(245,158,11,0.08)' },
];

const recentLeads = [
  { name: 'Rohan Sharma', interest: 'Franchise Inquiry', time: '12 min ago', status: 'New' },
  { name: 'Priya Mehta', interest: 'Bowling Alley Setup', time: '1h ago', status: 'Contacted' },
  { name: 'Arjun Patel', interest: 'Arcade Lane Package', time: '3h ago', status: 'In Progress' },
  { name: 'Kavita Singh', interest: 'Corporate Event', time: 'Yesterday', status: 'Closed' },
];

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  'New': { bg: 'rgba(59,130,246,0.08)', text: '#3B82F6', dot: '#3B82F6' },
  'Contacted': { bg: 'rgba(245,158,11,0.08)', text: '#D97706', dot: '#F59E0B' },
  'In Progress': { bg: 'rgba(139,92,246,0.08)', text: '#7C3AED', dot: '#8B5CF6' },
  'Closed': { bg: 'rgba(16,185,129,0.08)', text: '#059669', dot: '#10B981' },
};

export const DashboardView: React.FC = () => {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ color: theme.colors.adminTextMuted, margin: '0 0 4px 0', fontSize: '13px', fontWeight: 500 }}>{greeting} 👋</p>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: theme.colors.adminText, margin: 0, letterSpacing: '-0.4px' }}>Dashboard</h1>
        <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Your business at a glance — as of today.</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {statCards.map((stat, i) => (
          <div key={i} style={{ 
            backgroundColor: theme.colors.adminSurface, 
            borderRadius: '14px', 
            padding: '22px',
            border: `1px solid ${theme.colors.adminBorder}`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            transition: 'box-shadow 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <p style={{ color: '#000000', fontSize: '15px', fontWeight: 600, margin: 0 }}>{stat.label}</p>
              <div style={{ padding: '8px', backgroundColor: stat.iconBg, borderRadius: '9px', display: 'flex' }}>
                <stat.icon size={18} color={stat.iconColor} />
              </div>
            </div>
            {/* Value */}
            <h3 style={{ color: theme.colors.adminText, fontSize: '30px', fontWeight: 700, margin: '0 0 10px 0', letterSpacing: '-0.8px' }}>{stat.value}</h3>
            {/* Change badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '3px',
                color: stat.isUp ? theme.colors.adminSuccess : theme.colors.adminDanger, 
                fontSize: '12px', fontWeight: 600,
                backgroundColor: stat.isUp ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                padding: '2px 7px', borderRadius: '20px'
              }}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
              <span style={{ color: theme.colors.adminTextLight, fontSize: '12px' }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '16px', marginBottom: '16px' }}>
        {/* Chart Placeholder */}
        <div style={{ backgroundColor: theme.colors.adminSurface, borderRadius: '14px', padding: '24px', border: `1px solid ${theme.colors.adminBorder}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', minHeight: '280px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: theme.colors.adminText, margin: '0 0 2px 0' }}>Traffic Overview</h3>
              <p style={{ fontSize: '13px', color: theme.colors.adminTextMuted, margin: 0 }}>Visitor data for the last 30 days</p>
            </div>
            <select style={{ 
              padding: '6px 12px', borderRadius: '8px', border: `1px solid ${theme.colors.adminBorder}`,
              fontSize: '13px', color: theme.colors.adminText, backgroundColor: theme.colors.adminBg,
              cursor: 'pointer', outline: 'none'
            }}>
              <option>Last 30 days</option>
              <option>Last 7 days</option>
            </select>
          </div>
          <div style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            height: '190px', backgroundColor: theme.colors.adminBg, 
            borderRadius: '10px', border: `1px dashed ${theme.colors.adminBorderStrong}`,
            flexDirection: 'column', gap: '8px'
          }}>
            <TrendingUp size={28} color={theme.colors.adminBorderStrong} />
            <span style={{ color: theme.colors.adminTextLight, fontSize: '13px' }}>Chart integration coming soon</span>
          </div>
        </div>

        {/* Recent Leads */}
        <div style={{ backgroundColor: theme.colors.adminSurface, borderRadius: '14px', padding: '24px', border: `1px solid ${theme.colors.adminBorder}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: theme.colors.adminText, margin: '0 0 2px 0' }}>Recent Leads</h3>
              <p style={{ fontSize: '13px', color: theme.colors.adminTextMuted, margin: 0 }}>Latest form submissions</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {recentLeads.map((lead, i) => {
              const sc = statusColors[lead.status];
              return (
                <div key={i} style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  padding: '10px 12px', borderRadius: '8px',
                  transition: 'background 0.15s',
                  cursor: 'pointer'
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = theme.colors.adminBg)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #CBD5E1, #94A3B8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700, color: '#fff', flexShrink: 0
                    }}>
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px', color: theme.colors.adminText }}>{lead.name}</div>
                      <div style={{ fontSize: '11px', color: theme.colors.adminTextMuted }}>{lead.interest}</div>
                    </div>
                  </div>
                  <span style={{ 
                    fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '20px',
                    backgroundColor: sc.bg, color: sc.text, whiteSpace: 'nowrap'
                  }}>
                    {lead.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
