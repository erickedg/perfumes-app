import { InfiniteSlider } from './InfiniteSlider'
import { ProgressiveBlur } from './ProgressiveBlur'
import styles from './BrandLogoCloud.module.css'

export function BrandLogoCloud({ brands }) {
  return (
    <div className={styles.wrapper}>
      {/* top rule */}
      <div className={styles.rule} />

      <div className={styles.inner}>
        <InfiniteSlider gap={56} speed={55} speedOnHover={28}>
          {brands.map((brand, i) => (
            <span key={`${brand}-${i}`} className={styles.brand}>
              {brand}
              <span className={styles.dot} aria-hidden="true">✦</span>
            </span>
          ))}
        </InfiniteSlider>

        {/* Progressive blur on left edge */}
        <ProgressiveBlur
          direction="left"
          blurIntensity={0.9}
          style={{
            position: 'absolute',
            top:    0,
            left:   0,
            height: '100%',
            width:  '140px',
            pointerEvents: 'none',
          }}
        />

        {/* Progressive blur on right edge */}
        <ProgressiveBlur
          direction="right"
          blurIntensity={0.9}
          style={{
            position: 'absolute',
            top:   0,
            right: 0,
            height: '100%',
            width:  '140px',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* bottom rule */}
      <div className={styles.rule} />
    </div>
  )
}

export default BrandLogoCloud
