import type { FC } from 'react'
import styles from './Tag.module.css'

interface TagProps {
  label: string
  onClick?: () => void
  active?: boolean
}

const Tag: FC<TagProps> = ({ label, onClick, active }) => {
  if (onClick) {
    return (
      <button
        type="button"
        className={`${styles.tag} ${styles.clickable} ${active ? styles.active : ''}`}
        onClick={onClick}
        aria-pressed={active}
      >
        {label}
      </button>
    )
  }

  return <span className={styles.tag}>{label}</span>
}

export default Tag
