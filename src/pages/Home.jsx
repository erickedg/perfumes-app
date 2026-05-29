import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import { LogoMercadoPago, LogoVisa, LogoMastercard, LogoAmex, LogoOxxo, LogoBBVA, LogoBanamex, LogoHSBC, LogoSantander } from '../components/PaymentLogos'
import heroBottle from '../assets/perfume.png'
import styles from './Home.module.css'

const FILTERS = [
  { label: 'Todos',     value: 'all' },
  { label: 'Amaderado', value: 'amaderado' },
  { label: 'Floral',    value: 'floral' },
  { label: 'Cítrico',   value: 'citrico' },
  { label: 'Oriental',  value: 'oriental' },
  { label: 'Dulce',     value: 'dulce' },
  { label: 'Fresco',    value: 'fresco' },
  { label: 'Árabe',     value: 'arabe' },
]

const BRANDS = ['Chanel','Dior','Tom Ford','YSL','Versace','Gucci','Paco Rabanne','Hugo Boss','Dolce & Gabbana','Armani','Creed','Hermès']

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [page, setPage] = useState(1)

  const PAGE_SIZE = 10

  useEffect(() => {
    supabase.from('products').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setProducts(data || []); setLoading(false) })
  }, [])

  useEffect(() => { setPage(1) }, [activeFilter, search])

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
    const matchFilter = activeFilter === 'all' || p.fragrance_type === activeFilter
    return matchSearch && matchFilter
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── HERO ── */}
      <header className={styles.hero}>
        {/* Watermark */}
        <div className={styles.heroWatermark} aria-hidden="true">Perfumes Calamar</div>

        {/* Red glow */}
        <div className={styles.heroGlow} aria-hidden="true" />

        <div className={`container ${styles.heroGrid}`}>
          {/* Left */}
          <div className={`${styles.heroLeft} animate-reveal`} style={{ animationDelay: '150ms' }}>
            <span className={styles.heroPill}>Marcas Originales</span>
            <h1 className={styles.heroTitle}>
              Arte.<br />
              Aroma.<br />
              <span className={styles.heroAccent}>Esencia.</span>
            </h1>
            <p className={styles.heroDesc}>
              Chanel, Dior, Dolce & Gabbana, Tom Ford y más.<br />
              Fragancias 100% originales al mejor precio.
            </p>
            <a href="#catalogo" className={styles.heroBtn}>Ver Catálogo</a>
          </div>

          {/* Right — bottle card */}
          <div className={`${styles.heroRight} animate-reveal`} style={{ animationDelay: '350ms' }}>
            <div className={styles.heroCard}>
              <img src="/calamar.png" alt="" className={styles.heroCardLogo} />
              <img src={heroBottle} alt="Fragancia destacada" className={styles.heroCardImg} />
              <div className={styles.heroCardOverlay} />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className={styles.heroScroll}>
          <div className={styles.heroScrollLine} />
        </div>
      </header>

      {/* ── BRANDS TICKER ── */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className={styles.tickerItem}>
              {b} <span className={styles.tickerDot}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      

      {/* ── CATALOG ── */}
      <section id="catalogo" className={styles.catalog}>
        <div className="container">
          <div className={styles.catalogHeader}>
            <h2 className={styles.catalogTitle}>Catálogo</h2>
            <p className={styles.catalogSub}>{filtered.length} fragancia{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          {/* Filters + search */}
          <div className={styles.filtersRow}>
            {FILTERS.map(f => (
              <button key={f.value} onClick={() => setActiveFilter(f.value)}
                className={`${styles.filterBtn} ${activeFilter === f.value ? styles.filterActive : ''}`}>
                {f.label}
              </button>
            ))}
            <div className={styles.searchWrap}>
              <svg className={styles.searchIco} viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar..." className={styles.searchInput} />
            </div>
          </div>

          {/* Grid */}
          {loading && (
            <div className={styles.state}>
              <div className={styles.spinner} />
              <p>Cargando colección...</p>
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className={styles.state}><p>No se encontraron fragancias</p></div>
          )}
          {!loading && filtered.length > 0 && (
            <>
              <div className={styles.grid}>
                {paginated.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} onClick={() => setSelectedProduct(p)} />
                ))}
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={p => { setPage(p); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }) }}
              />
            </>
          )}
        </div>
      </section>

      {/* ── PAYMENT ── */}
      <section className={styles.paymentSection}>
        <div className={styles.paymentContainer}>
          <span className={styles.paymentLabel}>Aceptamos pago con tarjeta</span>
          <div className={styles.mpDivider} />
          <LogoMercadoPago height={20} />
          <div className={styles.mpDivider} />
          <div className={styles.logosRow}>
            <LogoVisa height={16} />
            <LogoMastercard height={20} />
            <LogoAmex height={16} />
          </div>
          <div className={styles.mpDivider} />
          <div className={styles.logosRow}>
            <LogoBBVA height={16} />
            <LogoBanamex height={16} />
            <LogoHSBC height={16} />
            <LogoSantander height={16} />
          </div>
          <div className={styles.mpDivider} />
          <div className={styles.logosRow}>
            <LogoOxxo height={16} />
          </div>
        </div>
      </section>

      {/* ── PRODUCT MODAL ── */}
      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedProduct(null)} aria-label="Cerrar">✕</button>

            {selectedProduct.image_url ? (
              <div className={styles.modalImageWrap}>
                <img src={selectedProduct.image_url} alt={selectedProduct.name} className={styles.modalImage} />
                <div className={styles.modalImageOverlay} />
              </div>
            ) : (
              <div className={styles.modalImageEmpty}>
                <img src="/calamar.png" alt="" className={styles.modalPlaceholder} />
              </div>
            )}

            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                {selectedProduct.fragrance_type && (
                  <span className={styles.modalTypeBadge}>{selectedProduct.fragrance_type}</span>
                )}
                <span className={`${styles.modalStockBadge} ${selectedProduct.in_stock ? styles.modalInStock : styles.modalOutStock}`}>
                  {selectedProduct.in_stock ? 'En Stock' : 'Agotado'}
                </span>
              </div>

              <h2 className={styles.modalName}>{selectedProduct.name}</h2>
              <p className={styles.modalPrice}>
                ${Number(selectedProduct.price).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
              </p>

              {selectedProduct.description && (
                <p className={styles.modalDesc}>{selectedProduct.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer id="nosotros" className={styles.footer}>
        <div className={styles.footerGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerLeft}>
              <img src="/calamar.png" alt="Perfumes Calamar" className={styles.footerLogo} />
              <h2 className={`${styles.footerTitle} animate-tracking`}>
                Perfumes<br />Calamar
              </h2>
              <p className={styles.footerDesc}>
                Fragancias de las mejores marcas del mundo. Cada perfume es 100% original, seleccionado para quienes no se conforman con menos.
              </p>
            </div>

            <div className={styles.footerRight}>
              <a href="#catalogo" className={styles.footerLink}>Catálogo</a>
              <a href="#nosotros" className={styles.footerLink}>Nosotros</a>
              <a href="#" className={styles.footerLink}>Contacto</a>
              <div className={styles.footerSocials}>
                <span className={styles.footerChip}>INSTAGRAM</span>
                <span className={styles.footerChip}>TIKTOK</span>
                <span className={styles.footerChip}>WHATSAPP</span>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2024 Perfumes Calamar</span>
            <span></span>
          </div>
        </div>
      </footer>
    </div>
  )
}
