import React, { useEffect, useState, useMemo } from 'react';
import { theme } from '../../../../theme';
import { leadService } from '../leads/lead.service';
import { useToast } from '../../components/Toast';
import { BarChart3, TrendingUp, Users, MousePointerClick, RefreshCcw } from 'lucide-react';

export const CmsAnalyticsView: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await leadService.getAll();
      setLeads(Array.isArray(res) ? res : res?.data || []);
    } catch (err) {
      showToast('error', 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const closedLeads = leads.filter(l => l.status === 'Closed').length;
    const abandonedForms = leads.filter(l => l.isPartial).length;
    const newLeads = leads.filter(l => l.status === 'New').length;

    let totalEvents = 0;
    let returningVisitors = 0;
    const ctaCounts: Record<string, number> = {};
    const sources: Record<string, number> = {};

    leads.forEach(l => {
      if (l.behavior?.isReturningVisitor) returningVisitors++;
      
      // Secondary data: Sources
      const src = l.utm?.source || 'Direct';
      sources[src] = (sources[src] || 0) + 1;

      // Secondary data: Event clicks
      if (l.behavior?.eventLog) {
        totalEvents += l.behavior.eventLog.length;
        l.behavior.eventLog.forEach((ev: any) => {
          ctaCounts[ev.label] = (ctaCounts[ev.label] || 0) + 1;
        });
      }
    });

    const topCTAs = Object.entries(ctaCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const conversionRate = totalLeads ? ((closedLeads / totalLeads) * 100).toFixed(1) : 0;

    return { totalLeads, closedLeads, newLeads, abandonedForms, totalEvents, returningVisitors, topCTAs, sources, conversionRate };
  }, [leads]);

  if (loading) return <div style={{ padding: '32px', color: theme.colors.adminTextMuted }}>Loading analytics...</div>;

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText, margin: 0 }}>Analytics & Reports</h1>
          <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>Track primary leads and secondary interactions across the platform.</p>
        </div>
        <button onClick={fetchLeads} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '8px', border: `1px solid ${theme.colors.adminBorder}`, backgroundColor: theme.colors.adminSurface, color: theme.colors.adminText, cursor: 'pointer' }}>
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <StatCard title="Total Leads" value={stats.totalLeads} icon={<Users size={20} color="#3B82F6" />} bg="#DBEAFE" />
        <StatCard title="New Inquiries" value={stats.newLeads} icon={<BarChart3 size={20} color="#F59E0B" />} bg="#FEF3C7" />
        <StatCard title="Closed Won" value={stats.closedLeads} icon={<TrendingUp size={20} color="#10B981" />} bg="#D1FAE5" />
        <StatCard title="Conversion Rate" value={`${stats.conversionRate}%`} icon={<TrendingUp size={20} color="#8B5CF6" />} bg="#EDE9FE" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Primary Data */}
        <div style={{ backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.adminText, margin: '0 0 20px 0', borderBottom: `1px solid ${theme.colors.adminBorder}`, paddingBottom: '12px' }}>Primary Data Insights</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme.colors.adminTextMuted, fontSize: '14px' }}>Abandoned Carts / Forms</span>
              <span style={{ fontWeight: 600, color: '#EF4444' }}>{stats.abandonedForms}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: theme.colors.adminTextMuted, fontSize: '14px' }}>Returning Visitors</span>
              <span style={{ fontWeight: 600, color: theme.colors.adminText }}>{stats.returningVisitors}</span>
            </div>
          </div>
          
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.adminText, marginTop: '32px', marginBottom: '16px' }}>Traffic Sources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(stats.sources).map(([src, count], idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, backgroundColor: theme.colors.adminBg, height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(count as number / stats.totalLeads) * 100}%`, backgroundColor: theme.colors.teal, height: '100%' }} />
                </div>
                <div style={{ width: '80px', fontSize: '13px', color: theme.colors.adminText, textAlign: 'right' }}>{src} ({count as number})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Data */}
        <div style={{ backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.adminText, margin: '0 0 20px 0', borderBottom: `1px solid ${theme.colors.adminBorder}`, paddingBottom: '12px' }}>Secondary Data (CTA Tracking)</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4338CA' }}><MousePointerClick size={20} /></div>
            <div>
              <div style={{ fontSize: '12px', color: theme.colors.adminTextMuted, marginBottom: '4px' }}>Total Tracked Clicks</div>
              <div style={{ fontSize: '20px', color: theme.colors.adminText, fontWeight: 700 }}>{stats.totalEvents}</div>
            </div>
          </div>

          <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.adminText, marginBottom: '16px' }}>Top Performing CTAs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.topCTAs.length > 0 ? stats.topCTAs.map(([label, count], idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: theme.colors.adminBg, borderRadius: '8px', border: `1px solid ${theme.colors.adminBorder}` }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: theme.colors.adminText }}>{label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: theme.colors.teal }}>{count as number} clicks</span>
              </div>
            )) : (
              <div style={{ fontSize: '13px', color: theme.colors.adminTextMuted }}>No click events tracked yet.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bg }: any) => (
  <div style={{ backgroundColor: theme.colors.adminSurface, borderRadius: '12px', border: `1px solid ${theme.colors.adminBorder}`, padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '13px', color: theme.colors.adminTextMuted, marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '24px', fontWeight: 700, color: theme.colors.adminText }}>{value}</div>
    </div>
  </div>
);
