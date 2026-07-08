import type { FC } from 'react'
import type {
  ExperienceLevel,
  JobSort,
  JobType,
  WorkMode,
} from '../services/jobsApi'
import Tag from '../../../components/common/Tag'
import styles from './JobFilters.module.css'

export interface JobFilterState {
  search: string
  jobType: JobType | ''
  workMode: WorkMode | ''
  experience: ExperienceLevel | ''
  department: string
  tags: string[]
  sort: JobSort
}

interface JobFiltersProps {
  value: JobFilterState
  availableDepartments: string[]
  availableTags: string[]
  onChange: (next: JobFilterState) => void
}

const JOB_TYPES: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
const WORK_MODES: WorkMode[] = ['On-site', 'Remote', 'Hybrid']
const EXPERIENCE: ExperienceLevel[] = ['Fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years']

const JobFilters: FC<JobFiltersProps> = ({
  value,
  availableDepartments,
  availableTags,
  onChange,
}) => {
  const toggleTag = (tag: string) => {
    const tags = value.tags.includes(tag)
      ? value.tags.filter((t) => t !== tag)
      : [...value.tags, tag]
    onChange({ ...value, tags })
  }

  return (
    <div className={styles.filters}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="job-search">
          Search
        </label>
        <input
          id="job-search"
          className={styles.input}
          type="search"
          value={value.search}
          placeholder="Search by title…"
          onChange={(e) => onChange({ ...value, search: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="job-type">
          Job type
        </label>
        <select
          id="job-type"
          className={styles.select}
          value={value.jobType}
          onChange={(e) => onChange({ ...value, jobType: e.target.value as JobType | '' })}
        >
          <option value="">All</option>
          {JOB_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="work-mode">
          Work mode
        </label>
        <select
          id="work-mode"
          className={styles.select}
          value={value.workMode}
          onChange={(e) => onChange({ ...value, workMode: e.target.value as WorkMode | '' })}
        >
          <option value="">All</option>
          {WORK_MODES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="experience">
          Experience
        </label>
        <select
          id="experience"
          className={styles.select}
          value={value.experience}
          onChange={(e) =>
            onChange({ ...value, experience: e.target.value as ExperienceLevel | '' })
          }
        >
          <option value="">All</option>
          {EXPERIENCE.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="department">
          Department
        </label>
        <select
          id="department"
          className={styles.select}
          value={value.department}
          onChange={(e) => onChange({ ...value, department: e.target.value })}
        >
          <option value="">All</option>
          {availableDepartments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="job-sort">
          Sort
        </label>
        <select
          id="job-sort"
          className={styles.select}
          value={value.sort}
          onChange={(e) => onChange({ ...value, sort: e.target.value as JobSort })}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      {availableTags.length > 0 ? (
        <div className={styles.tags} aria-label="Filter by tags">
          {availableTags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              active={value.tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default JobFilters
