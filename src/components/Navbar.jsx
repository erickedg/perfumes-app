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
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandSymbol}>✦</span>
          <span className={styles.brandName}>Maison de Parfums</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Catálogo</Link>
          {session ? (
            <>
              <Link to="/admin" className={styles.navLink}>Admin</Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>Salir</button>
            </>
          ) : (
            <Link to="/login" className={styles.navLinkMuted}>Acceso</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
