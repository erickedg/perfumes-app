import styles from './BgAnimateButton.module.css'

export default function BgAnimateButton({ children, href, onClick, className = '' }) {
  const Inner = href ? 'a' : 'button'
  const innerProps = href ? { href } : { onClick, type: 'button' }

  return (
    <div className={`${styles.wrap} ${className}`}>
      <span className={styles.spin} aria-hidden="true" />
      <Inner className={styles.inner} {...innerProps}>
        {children}
      </Inner>
    </div>
  )
}
