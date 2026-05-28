import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { name, description, price, image_url, in_stock } = product

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {image_url ? (
          <img src={image_url} alt={name} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            <span>✦</span>
          </div>
        )}
        <span className={`${styles.badge} ${in_stock ? styles.inStock : styles.outStock}`}>
          {in_stock ? 'En stock' : 'Agotado'}
        </span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>${Number(price).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</p>
      </div>
    </article>
  )
}
