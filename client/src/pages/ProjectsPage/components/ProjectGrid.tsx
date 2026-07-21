// import type { FC } from 'react'

// import EmptyState from '../../../components/common/EmptyState'
// import Loader from '../../../components/common/Loader'
// import ProjectCard from './ProjectCard'
// import styles from './ProjectGrid.module.css'
// import type { IProject } from '../types'

// interface ProjectGridProps {
//   projects: IProject[]
//   loading?: boolean
// }

// const ProjectGrid: FC<ProjectGridProps> = ({ projects, loading }) => {
//   if (loading) return <Loader label="Loading projects…" />

//   if (projects.length === 0) {
//     return <EmptyState message="No projects match your filters." />
//   }

//   return (
//     <div className={styles.grid}>
//       {projects.map((project) => (
//         <ProjectCard key={project._id} project={project} />
//       ))}
//     </div>
//   )
// }

// export default ProjectGrid


import type { FC } from 'react'
import EmptyState from '../../../components/common/EmptyState'
import Loader from '../../../components/common/Loader'
import ProjectCard from './ProjectCard'
import styles from './ProjectGrid.module.css'
import type { IProject } from '../types'

interface ProjectGridProps {
  projects: IProject[]
  loading?: boolean
}

const ProjectGrid: FC<ProjectGridProps> = ({ projects, loading }) => {
  if (loading) return <Loader label="Loading projects…" />

  if (projects.length === 0) {
    return <EmptyState message="No projects match your filters." />
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project._id || project.slug} project={project} />
      ))}
    </div>
  )
}

export default ProjectGrid