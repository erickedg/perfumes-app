import { motion } from 'motion/react'
import styles from './AnimatedFilterTabs.module.css'

export default function AnimatedFilterTabs({ filters, activeFilter, onFilterChange }) {
  return (
    <div className={styles.container}>
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`${styles.tab} ${activeFilter === f.value ? styles.tabActive : ''}`}
          aria-pressed={activeFilter === f.value}
        >
          {activeFilter === f.value && (
            <motion.span
              layoutId="filter-bubble"
              className={styles.bubble}
              transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
            />
          )}
          <span className={styles.label}>{f.label}</span>
        </button>
      ))}
    </div>
  )
}
