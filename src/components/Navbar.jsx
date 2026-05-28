import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import { supabase } from '../lib/supabase'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { session } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand}>
          TINTA & AROMA
        </Link>
        <nav className={styles.links}>
          <a href="#catalogo" className={styles.link}>Catálogo</a>
          <a href="#nosotros" className={styles.link}>Nosotros</a>
          {session && (
            <>
              <Link to="/admin" className={styles.link}>Admin</Link>
              <button onClick={handleLogout} className={styles.link} style={{color:'var(--accent)'}}>Salir</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
