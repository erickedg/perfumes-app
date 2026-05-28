import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { supabase } from '../lib/supabase'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
    setMenuOpen(false)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <img src="/calamar.png" alt="Perfumes Calamar" className={styles.brandLogo} />
          <div className={styles.brandText}>
            <span className={styles.brandMain}>Perfumes<span>Calamar</span></span>
            <span className={styles.brandSub}>Fragancias Selectas</span>
          </div>
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span className={menuOpen ? styles.barTop + ' ' + styles.barTopOpen : styles.barTop} />
          <span className={menuOpen ? styles.barMid + ' ' + styles.barMidOpen : styles.barMid} />
          <span className={menuOpen ? styles.barBot + ' ' + styles.barBotOpen : styles.barBot} />
        </button>

        <nav className={styles.links + (menuOpen ? ' ' + styles.linksOpen : '')}>
          <a href="#catalogo" className={styles.link} onClick={closeMenu}>Catálogo</a>
          <a href="#nosotros" className={styles.link} onClick={closeMenu}>Nosotros</a>
          {session && (
            <>
              <Link to="/admin" className={styles.link} onClick={closeMenu}>Admin</Link>
              <button onClick={handleLogout} className={styles.link} style={{color:'var(--red)'}}>Salir</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
