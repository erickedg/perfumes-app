import styles from './ProductCard.module.css'

const BG_COLORS = ['#1a1010', '#100d0d', '#141010', '#0f0c0c', '#181212', '#120e0e']

export default function ProductCard({ product, index = 0 }) {
  const { name, description, price, image_url, in_stock } = product
  const bg = BG_COLORS[index % BG_COLORS.length]

  return (
    <article className={styles.card} style={{ animationDelay: `${(index + 1) * 80}ms` }}>
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
              <img src="/calamar.png" alt="" className={styles.placeholderImg} />
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
