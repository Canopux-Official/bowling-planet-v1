import React, { useEffect, useState, useMemo } from 'react';
import { Users, FileText, MousePointerClick, TrendingUp } from 'lucide-react';
import { theme } from '../../../../theme';
import { leadService } from '../leads/lead.service';
import { useToast } from '../../components/Toast';


const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  'New': { bg: 'rgba(59,130,246,0.08)', text: '#3B82F6', dot: '#3B82F6' },
  'Contacted': { bg: 'rgba(245,158,11,0.08)', text: '#D97706', dot: '#F59E0B' },
  'In Progress': { bg: 'rgba(139,92,246,0.08)', text: '#7C3AED', dot: '#8B5CF6' },
  'Closed': { bg: 'rgba(16,185,129,0.08)', text: '#059669', dot: '#10B981' },
  'Abandoned': { bg: 'rgba(239,68,68,0.08)', text: '#EF4444', dot: '#EF4444' },
};

export const DashboardView: React.FC = () => {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await leadService.getAll();
        setLeads(Array.isArray(res) ? res : res?.data || []);
      } catch (error) {
        showToast('error', 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [showToast]);

  const { pipelineCards, recentLeadsData, totalEvents } = useMemo(() => {
    const newLeads = leads.filter(l => l.status === 'New').length;
    const closedLeads = leads.filter(l => l.status === 'Closed').length;
    // Conversion rate not needed here anymore, but keeping totalLeads check is fine

    let totalEvents = 0;
    leads.forEach(l => {
      if (l.behavior?.eventLog) {
        totalEvents += l.behavior.eventLog.length;
      }
    });

    const pipelineCards = [
      { label: 'New Inquiries', value: newLeads.toString(), icon: Users, iconColor: '#3B82F6', iconBg: 'rgba(59,130,246,0.08)' },
      { label: 'In Progress', value: leads.filter(l => l.status === 'In Progress').length.toString(), icon: FileText, iconColor: '#8B5CF6', iconBg: 'rgba(139,92,246,0.08)' },
      { label: 'Contacted', value: leads.filter(l => l.status === 'Contacted').length.toString(), icon: MousePointerClick, iconColor: '#F59E0B', iconBg: 'rgba(245,158,11,0.08)' },
      { label: 'Closed Won', value: closedLeads.toString(), icon: TrendingUp, iconColor: '#10B981', iconBg: 'rgba(16,185,129,0.08)' },
    ];

    const sortedLeads = [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const topRecent = sortedLeads.slice(0, 4).map(l => ({
      name: l.name || 'Anonymous',
      interest: l.inquiryType || 'General',
      time: new Date(l.createdAt).toLocaleDateString(),
      status: l.status || 'New',
    }));

    return { pipelineCards, recentLeadsData: topRecent, totalEvents };
  }, [leads]);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  if (loading) return <div style={{ padding: '32px', color: theme.colors.adminTextMuted }}>Loading dashboard...</div>;

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ color: theme.colors.adminTextMuted, margin: '0 0 4px 0', fontSize: '13px', fontWeight: 500 }}>{greeting} 👋</p>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: theme.colors.adminText, margin: 0, letterSpacing: '-0.4px' }}>Dashboard</h1>
        <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Your business at a glance — as of today.</p>
      </div>

      {/* Pipeline Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {pipelineCards.map((stat, i) => (
          <div key={i} style={{ 
            backgroundColor: theme.colors.adminSurface, 
            borderRadius: '14px', 
            padding: '22px',
            border: `1px solid ${theme.colors.adminBorder}`,
            borderLeft: `4px solid ${stat.iconColor}`,
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
          }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <p style={{ color: '#000000', fontSize: '15px', fontWeight: 600, margin: 0 }}>{stat.label}</p>
              <div style={{ padding: '8px', backgroundColor: stat.iconBg, borderRadius: '9px', display: 'flex' }}>
                <stat.icon size={18} color={stat.iconColor} />
              </div>
            </div>
            {/* Value */}
            <h3 style={{ color: theme.colors.adminText, fontSize: '32px', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.8px' }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '16px', marginBottom: '16px' }}>
        <div style={{ backgroundColor: theme.colors.adminSurface, borderRadius: '14px', padding: '24px', border: `1px solid ${theme.colors.adminBorder}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', minHeight: '280px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: theme.colors.adminText, margin: '0 0 2px 0' }}>Activity Feed</h3>
              <p style={{ fontSize: '13px', color: theme.colors.adminTextMuted, margin: 0 }}>Latest engagements</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentLeadsData.length > 0 ? (
              <div style={{ fontSize: '14px', color: theme.colors.adminText }}>
                <b>Total leads in pipeline:</b> {leads.length}<br/>
                <b>Total button clicks tracked:</b> {totalEvents}
                <div style={{ marginTop: '24px', padding: '16px', backgroundColor: theme.colors.adminBg, borderRadius: '8px', border: `1px solid ${theme.colors.adminBorder}` }}>
                  For detailed engagement charts, traffic sources, and UTM analytics, please visit the <b>Analytics</b> tab.
                </div>
              </div>
            ) : (
              <div style={{ color: theme.colors.adminTextLight, fontSize: '13px', textAlign: 'center', marginTop: '40px' }}>No recent activity to show.</div>
            )}
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
            {recentLeadsData.map((lead, i) => {
              const sc = statusColors[lead.status] || { bg: '#F3F4F6', text: '#374151', dot: '#374151' };
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
                      {lead.name.split(' ').map((n: string) => n[0]).join('')}
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
