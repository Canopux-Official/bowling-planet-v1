import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IJob } from '../services/jobsApi'
import Tag from '../../../components/common/Tag'
import { theme } from '../../../theme'

interface JobCardProps {
  job: IJob
}

const TYPE_COLORS: Record<string, string> = {
  'Full-time': '#5FC1D1',
  'Part-time': '#6DBD4E',
  Contract: '#C084FC',
  Internship: '#FFAA33',
  Freelance: '#FF5A5F',
}

const JobCard: FC<JobCardProps> = ({ job }) => {
  const accent = TYPE_COLORS[job.jobType] ?? '#5FC1D1'

  return (
    <Link
      to={`/careers/${job.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        textDecoration: 'none',
        color: 'inherit',
        background: `linear-gradient(135deg, ${accent}08, rgba(255,255,255,0.02))`,
        border: `1px solid ${accent}20`,
        borderRadius: 20,
        padding: '28px 28px 24px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}45`
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${accent}12`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${accent}20`
        ;(e.currentTarget as HTMLElement).style.transform = 'none'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)` }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          {job.department ? (
            <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, fontFamily: theme.typography.fontBody }}>
              {job.department}
            </p>
          ) : null}
          <h3 className="font-display" style={{ margin: 0, fontSize: 17, fontWeight: 700, color: theme.colors.text1, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
            {job.title}
          </h3>
        </div>
        {job.status === 'open' ? (
          <span style={{
            flexShrink: 0,
            padding: '4px 12px',
            background: 'rgba(109, 189, 78, 0.12)',
            border: '1px solid rgba(109, 189, 78, 0.3)',
            borderRadius: 980,
            fontSize: 11,
            fontWeight: 700,
            color: '#6DBD4E',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            Open
          </span>
        ) : null}
      </div>

      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
        {[job.location, job.jobType, job.workMode, job.experience].filter(Boolean).map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: theme.colors.text2, fontFamily: theme.typography.fontBody }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: accent, opacity: 0.7, flexShrink: 0 }} />
            {item}
          </li>
        ))}
      </ul>

      {job.tags.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {job.tags.slice(0, 4).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      ) : null}
    </Link>
  )
}

export default JobCard
