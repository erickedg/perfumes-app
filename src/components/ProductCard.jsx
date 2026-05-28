import styles from './ProductCard.module.css'

const BG_COLORS = ['#DFF1EC', '#FFE4D6', '#E7E5E4', '#D6E8F5', '#E8E0F5', '#FFF3D6']

export default function ProductCard({ product, index = 0 }) {
  const { name, description, price, image_url, in_stock } = product
  const bg = BG_COLORS[index % BG_COLORS.length]

  return (
    <article className={`${styles.card} animate-reveal`} style={{ animationDelay: `${(index + 1) * 80}ms` }}>
      <div className={styles.imageWrap} style={{ background: bg }}>
        <div className={styles.badgeWrap}>
          {in_stock
            ? <span className={`${styles.badge} ${styles.inStock}`}>En Stock</span>
            : <span className={`${styles.badge} ${styles.outStock}`}>Agotado</span>
          }
        </div>
        {image_url
          ? <img src={image_url} alt={name} className={styles.image} loading="lazy" />
          : <div className={styles.placeholder}>
              <svg viewBox="0 0 40 48" fill="none" width="36" xmlns="http://www.w3.org/2000/svg" opacity="0.2">
                <path d="M20 2C14 2 10 7 10 13C10 18 12 21 14 23L12 28C10 26 7 25 5 27C3 29 4 32 6 33C4 34 3 37 5 39C3 40 3 43 5 44C7 45 9 43 10 41C11 44 14 46 16 44C17 46 19 47 20 47C21 47 23 46 24 44C26 46 29 45 30 41C31 43 33 45 35 44C37 43 37 40 35 39C37 37 36 34 34 33C36 32 37 29 35 27C33 25 30 26 28 28L26 23C28 21 30 18 30 13C30 7 26 2 20 2Z" fill="var(--ink)"/>
              </svg>
            </div>
        }
      </div>

      <div className={styles.info}>
        <div className={styles.infoLeft}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.notes}>{description}</p>
        </div>
        <p className={styles.price}>${Number(price).toLocaleString('es-MX')}</p>
      </div>
    </article>
  )
}
