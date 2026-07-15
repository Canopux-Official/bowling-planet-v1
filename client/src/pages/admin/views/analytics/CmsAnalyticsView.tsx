import React, { useEffect, useState } from 'react';
import { theme } from '../../../../theme';
import { leadService } from '../leads/lead.service';
import { useToast } from '../../components/Toast';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { Users, TrendingUp, MousePointerClick, Smartphone } from 'lucide-react';

// ─── Responsive grid CSS injected once ────────────────────────────────────────
const ANALYTICS_STYLE = `
  .analytics-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 24px;
  }
  .analytics-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }
  @media (max-width: 1024px) {
    .analytics-grid-2 {
      grid-template-columns: 1fr;
    }
    .analytics-grid-4 {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .analytics-grid-4 {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .analytics-grid-2 {
      gap: 16px;
    }
  }
`;

// ─── Custom Tooltip component with guaranteed contrast ─────────────────────────
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      backgroundColor: '#1E293B',
      border: '1px solid #334155',
      borderRadius: '10px',
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      minWidth: '120px',
    }}>
      {label && (
        <div style={{ color: '#94A3B8', fontSize: '11px', marginBottom: '6px', fontWeight: 500 }}>
          {label}
        </div>
      )}
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.color || p.fill || '#6366F1' }} />
          <span style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: 600 }}>
            {p.name ? `${p.name}: ` : ''}{p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color, bg }: {
  icon: any; label: string; value: number | string; color: string; bg: string;
}) => (
  <div style={{
    backgroundColor: theme.colors.adminSurface,
    border: `1px solid ${theme.colors.adminBorder}`,
    borderRadius: '14px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  }}>
    <div style={{
      width: '48px', height: '48px', borderRadius: '12px',
      backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Icon size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: '13px', color: theme.colors.adminTextMuted, fontWeight: 500, marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '26px', fontWeight: 700, color: theme.colors.adminText, lineHeight: 1 }}>{value}</div>
    </div>
  </div>
);

// ─── Chart Card wrapper ───────────────────────────────────────────────────────
const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{
    backgroundColor: theme.colors.adminSurface,
    borderRadius: '14px',
    padding: '24px',
    border: `1px solid ${theme.colors.adminBorder}`,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    minWidth: 0, // prevents overflow in grid
  }}>
    <h3 style={{ fontSize: '15px', fontWeight: 700, color: theme.colors.adminText, margin: '0 0 20px 0', letterSpacing: '-0.01em' }}>
      {title}
    </h3>
    <div style={{ height: '280px' }}>
      {children}
    </div>
  </div>
);

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

export const CmsAnalyticsView: React.FC = () => {
  const { showToast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await leadService.getAnalytics();
        setAnalyticsData(res?.data || null);
      } catch (error) {
        showToast('error', 'Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [showToast]);

  const {
    statusData = [],
    utmData = [],
    dailyLeads = [],
    eventData = [],
    deviceData = [],
    enquiryData = [],
    totalLeads = 0,
    newLeads = 0,
    mobileLeads = 0,
    totalEvents = 0
  } = analyticsData || {};

  // Axis tick colors — always dark enough to be visible
  const tickStyle = { fill: '#64748B', fontSize: 11 };

  if (loading) return (
    <div style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: theme.colors.adminTextMuted }}>
      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #E2E8F0', borderTopColor: '#6366F1', animation: 'spin 0.8s linear infinite' }} />
      Loading analytics...
    </div>
  );

  return (
    <div>
      {/* Inject responsive styles */}
      <style>{ANALYTICS_STYLE}</style>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: theme.colors.adminText, margin: 0, letterSpacing: '-0.02em' }}>
          Analytics &amp; Conversions
        </h1>
        <p style={{ color: theme.colors.adminTextMuted, margin: '4px 0 0 0', fontSize: '14px' }}>
          Lead sources, engagement, and behavioral data.
        </p>
      </div>

      {/* KPI Summary Cards */}
      <div className="analytics-grid-4">
        <StatCard icon={Users}            label="Total Leads"    value={totalLeads}   color="#6366F1" bg="#EEF2FF" />
        <StatCard icon={TrendingUp}       label="New Leads"      value={newLeads}     color="#10B981" bg="#ECFDF5" />
        <StatCard icon={MousePointerClick} label="CTA Events"   value={totalEvents}  color="#F59E0B" bg="#FFFBEB" />
        <StatCard icon={Smartphone}       label="Mobile Users"  value={mobileLeads}  color="#3B82F6" bg="#EFF6FF" />
      </div>

      {/* Row 1: Line chart + Pie chart */}
      <div className="analytics-grid-2">
        <ChartCard title="Leads Over Time (Last 14 Days)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyLeads} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="date" 
                tick={tickStyle} 
                tickLine={false} 
                axisLine={false} 
                interval="preserveStartEnd" 
                tickFormatter={(val) => {
                  const d = new Date(val);
                  return isNaN(d.getTime()) ? val : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis allowDecimals={false} tick={tickStyle} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="count" name="Leads" stroke="#6366F1" strokeWidth={2.5} dot={{ r: 3, fill: '#6366F1', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Lead Status Pipeline">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} cx="50%" cy="45%" innerRadius={65} outerRadius={100} paddingAngle={4} dataKey="value">
                {statusData.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span style={{ color: theme.colors.adminText, fontSize: '12px' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 2: Bar charts */}
      <div className="analytics-grid-2">
        <ChartCard title="UTM Sources (Traffic)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={utmData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" allowDecimals={false} tick={tickStyle} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" tick={tickStyle} tickLine={false} axisLine={false} width={90} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
              <Bar dataKey="value" name="Leads" fill="#8B5CF6" radius={[0, 5, 5, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top CTA Engagements">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={eventData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" allowDecimals={false} tick={tickStyle} tickLine={false} axisLine={false} />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={tickStyle} 
                tickLine={false} 
                axisLine={false} 
                width={140} 
                tickFormatter={(val) => val.length > 20 ? val.substring(0, 20) + '...' : val}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
              <Bar dataKey="count" name="Events" fill="#6366F1" radius={[0, 5, 5, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Row 3: Device + Locations */}
      <div className="analytics-grid-2">
        <ChartCard title="Device Split">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="45%" innerRadius={65} outerRadius={100} paddingAngle={4} dataKey="value">
                {deviceData.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span style={{ color: theme.colors.adminText, fontSize: '12px' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Enquiry Interests">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={enquiryData} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" allowDecimals={false} tick={tickStyle} tickLine={false} axisLine={false} />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={tickStyle} 
                tickLine={false} 
                axisLine={false} 
                width={140} 
                tickFormatter={(val) => val.length > 20 ? val.substring(0, 20) + '...' : val}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(16,185,129,0.06)' }} />
              <Bar dataKey="count" name="Enquiries" fill="#10B981" radius={[0, 5, 5, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};
