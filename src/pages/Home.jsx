import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import styles from './Home.module.css'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // 'all' | 'in_stock' | 'out_stock'
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    else setProducts(data || [])
    setLoading(false)
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.description?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || 
                        (filter === 'in_stock' && p.in_stock) || 
                        (filter === 'out_stock' && !p.in_stock)
    return matchSearch && matchFilter
  })

  return (
    <div className={styles.page}>
      <Navbar />

      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className={styles.heroEyebrow}>colección</p>
            <h1 className={styles.heroTitle}>
              Fragancias<br />
              <em>Selectas</em>
            </h1>
            <p className={styles.heroSub}>
              Descubre nuestra colección de perfumes de autor, cada uno con su historia única.
            </p>
          </div>
          <div className={styles.heroDivider} />
        </section>

        {/* Filters */}
        <section className={styles.filters}>
          <div className="container">
            <div className={styles.filterRow}>
              <div className={styles.searchWrap}>
                <input
                  type="text"
                  placeholder="Buscar perfume..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.filterBtns}>
                {[
                  { key: 'all', label: 'Todos' },
                  { key: 'in_stock', label: 'En stock' },
                  { key: 'out_stock', label: 'Agotados' },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`${styles.filterBtn} ${filter === f.key ? styles.active : ''}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className={styles.catalog}>
          <div className="container">
            {loading && (
              <div className={styles.state}>
                <span className={styles.stateIcon}>✦</span>
                <p>Cargando colección...</p>
              </div>
            )}
            {error && (
              <div className={styles.state}>
                <p style={{ color: '#e08080' }}>Error al cargar productos: {error}</p>
              </div>
            )}
            {!loading && !error && filtered.length === 0 && (
              <div className={styles.state}>
                <span className={styles.stateIcon}>○</span>
                <p>No se encontraron productos</p>
              </div>
            )}
            {!loading && !error && filtered.length > 0 && (
              <>
                <p className={styles.count}>{filtered.length} fragancia{filtered.length !== 1 ? 's' : ''}</p>
                <div className={styles.grid}>
                  {filtered.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <span className={styles.footerSymbol}>✦</span>
          <p>Maison de Parfums · Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  )
}
