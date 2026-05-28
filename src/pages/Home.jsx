import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { LogoMercadoPago, LogoVisa, LogoMastercard, LogoAmex, LogoOxxo, LogoBBVA, LogoBanamex, LogoHSBC, LogoSantander } from '../components/PaymentLogos'
import heroBottle from '../assets/light_blue.jpg'
import styles from './Home.module.css'

const FILTERS = [
  { label: 'Todos',      value: 'all' },
  { label: 'Amaderado',  value: 'amaderado' },
  { label: 'Floral',     value: 'floral' },
  { label: 'Cítrico',    value: 'citrico' },
  { label: 'Oriental',   value: 'oriental' },
  { label: 'Dulce',      value: 'dulce' },
  { label: 'Fresco',     value: 'fresco' },
  { label: 'Árabe',      value: 'arabe' },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [search, setSearch] = useState('')

  useEffect(() => {
    supabase.from('products').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setProducts(data || []); setLoading(false) })
  }, [])

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    // Agrega esto a tu filtered:
    const matchFilter = activeFilter === 'all' || p.fragrance_type === activeFilter
    return !q || p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
  })

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ── HERO ── */}
      <header className={styles.hero}>
        {/* Giant background text watermark */}
        <div className={styles.heroWatermark} aria-hidden="true">
          TINTA &amp; AROMA
        </div>

        <div className={styles.heroGrid}>
          {/* Left col */}
          <div className={`${styles.heroLeft} animate-reveal`} style={{ animationDelay: '200ms' }}>
            <span className={styles.heroPill}>Nueva Colección</span>
            <h2 className={styles.heroTitle}>
              Arte.<br />
              Aroma.<br />
              <span className={styles.heroTitleAccent}>Esencia.</span>
            </h2>
            <p className={styles.heroDesc}>
              Chanel, Dior, Dolce & Gabbana, Tom Ford y más. Fragancias 100% originales al mejor precio.
            </p>
            <a href="#catalogo" className={styles.heroCta}>Ver Catálogo</a>
          </div>

          {/* Right col — hero bottle card */}
          <div className={`${styles.heroRight} animate-reveal`} style={{ animationDelay: '400ms' }}>
            <div className={styles.heroCard}>
              {/* Kraken logo top-left overlay */}
              <img
                src="/logo.png"
                alt="Tinta & Aroma"
                className={styles.heroKraken}
              />
              <img
                src={heroBottle}
                alt="Perfume destacado Tinta & Aroma"
                className={styles.heroBottleImg}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── CATALOG ── */}
      <section id="catalogo" className={styles.catalog}>
        {/* Filters row */}
        <div className={`${styles.filtersRow} animate-reveal`}>
          <span className={styles.filtersLabel}>Filtros</span>
          {FILTERS.map(f => (
            <button key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`${styles.filterBtn} ${activeFilter === f.value ? styles.filterActive : ''}`}>
              {f.label}
            </button>
          ))}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIco} viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 13L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Grid */}
        {loading && (
          <div className={styles.state}>
            <div className={styles.stateSpinner} />
            <p>Cargando colección...</p>
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className={styles.state}><p>No se encontraron fragancias</p></div>
        )}
        {!loading && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </section>

      {/* ── PAYMENT SECTION ── */}
      <section className={styles.paymentSection}>
        <div className={styles.paymentContainer}>
          <span className={styles.paymentLabel}>Aceptamos pago con tarjeta</span>
          <div className={styles.mpDivider} />
          <div className={styles.mpRow}>
            <div className={styles.mpMain}>
              <LogoMercadoPago height={22} />
            </div>
            <div className={styles.mpDivider} />
          </div>
          <div className={styles.logosBlock}>
            <div className={styles.logosRow}>
              <LogoVisa height={18} />
              <LogoMastercard height={22} />
              <LogoAmex height={18} />
            </div>
          </div>
          <div className={styles.logosDivider} />
          <div className={styles.logosBlock}>
            <div className={styles.logosRow}>
              <LogoBBVA height={18} />
              <LogoBanamex height={18} />
              <LogoHSBC height={18} />
              <LogoSantander height={18} />
            </div>
          </div>
          <div className={styles.logosDivider} />
          <div className={styles.logosBlock}>
            <div className={styles.logosRow}>
              <LogoOxxo height={18} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="nosotros" className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerLeft}>
            <h2 className={`${styles.footerTitle} animate-tracking`}>
              Tinta &<br />Aroma
            </h2>
            <p className={styles.footerDesc}>
              Fragancias de las mejores marcas del mundo.<br />
              Cada perfume es 100% original, seleccionado para quienes no se conforman con menos.
            </p>
          </div>

          <div className={styles.footerRight}>
            <a href="#catalogo" className={styles.footerLink}>Catálogo</a>
            <a href="#nosotros" className={styles.footerLink}>Nosotros</a>
            <div className={styles.footerSocials}>
              <span className={styles.footerSocialChip}>INSTAGRAM</span>
              <span className={styles.footerSocialChip}>TIKTOK</span>
              <span className={styles.footerSocialChip}>WHATSAPP</span>
            </div>
          </div>
        </div>

        {/* Kraken watermark in footer */}
        <div className={styles.footerKrakenWrap} aria-hidden="true">
          <img src="/logo.png" alt="" className={styles.footerKraken} />
        </div>
      </footer>
    </div>
  )
}
