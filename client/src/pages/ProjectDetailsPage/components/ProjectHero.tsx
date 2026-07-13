import type { FC } from 'react'
import Tag from '../../../components/common/Tag'
import styles from './ProjectHero.module.css'
import { Plus, Check } from 'lucide-react'
import { useLeadTracker } from '../../../context/LeadTrackerContext'

interface ProjectHeroProps {
  title: string
  description?: string
  tags: string[]
  projectId: string
}

const ProjectHero: FC<ProjectHeroProps> = ({ title, description, tags, projectId }) => {
  const { state, addToEnquiry } = useLeadTracker()
  const isAdded = state.enquiryCart.some((i: any) => i.id === projectId)

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {tags.length > 0 ? (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        ) : null}
        <h1 className={styles.title}>{title}</h1>
        {description ? <p className={styles.description}>{description}</p> : null}
        
        <div style={{ marginTop: '32px' }}>
          <button
            type="button"
            className={`btn-enquiry ${isAdded ? 'added' : ''}`}
            style={{ width: 'auto', padding: '16px 32px', fontSize: 15 }}
            onClick={() => addToEnquiry({ id: projectId, type: 'project', title })}
          >
            {isAdded ? (
              <><Check size={18} /> Remove from Enquiry</>
            ) : (
              <><Plus size={18} /> Enquire About Project</>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProjectHero
