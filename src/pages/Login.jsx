import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../App'
import styles from './Login.module.css'

export default function Login() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { if (session) navigate('/admin', { replace: true }) }, [session, navigate])

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Credenciales incorrectas'); setLoading(false) }
    else navigate('/admin', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link to="/" className={styles.back}>← Volver</Link>
        <div className={styles.header}>
          <div className={styles.logoWrap}>
            <img src="/logo.png" alt="Tinta & Aroma" className={styles.logoImg} />
          </div>
          <h1 className={styles.title}>Admin</h1>
          <p className={styles.subtitle}>Tinta & Aroma · Panel de gestión</p>
        </div>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Correo electrónico</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className={styles.input} placeholder="admin@ejemplo.com" required autoComplete="email"/>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className={styles.input} placeholder="••••••••" required autoComplete="current-password"/>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={loading} className={styles.btn}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
