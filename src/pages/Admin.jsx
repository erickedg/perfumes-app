import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'
import styles from './Admin.module.css'

const BUCKET = 'perfume-images'

const FRAGRANCE_TYPES = [
  { label: 'Sin especificar', value: '' },
  { label: 'Amaderado',       value: 'amaderado' },
  { label: 'Floral',          value: 'floral' },
  { label: 'Cítrico',         value: 'citrico' },
  { label: 'Oriental',        value: 'oriental' },
  { label: 'Dulce',           value: 'dulce' },
  { label: 'Fresco',          value: 'fresco' },
  { label: 'Árabe',           value: 'arabe' },
]

const emptyForm = {
  name: '',
  description: '',
  price: '',
  in_stock: true,
  image_url: '',
  fragrance_type: '',
}

export default function Admin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [msg, setMsg] = useState({ text: '', type: '' })
  const [adminPage, setAdminPage] = useState(1)
  const fileRef = useRef()

  const PAGE_SIZE = 10

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts(resetPage = false) {
    setLoading(true)
    const { data, error } = await supabase
      .from('products').select('*').order('created_at', { ascending: false })
    if (!error) {
      setProducts(data || [])
      if (resetPage) setAdminPage(1)
    }
    setLoading(false)
  }

  function notify(text, type = 'success') {
    setMsg({ text, type })
    setTimeout(() => setMsg({ text: '', type: '' }), 3500)
  }

  function handleField(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function uploadImage(file) {
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from(BUCKET).upload(filename, file, {
      cacheControl: '3600', upsert: false
    })
    if (error) throw error
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename)
    return data.publicUrl
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      let image_url = form.image_url

      if (imageFile) {
        image_url = await uploadImage(imageFile)
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        in_stock: form.in_stock,
        image_url,
        fragrance_type: form.fragrance_type || null,
      }

      let error
      if (editingId) {
        ;({ error } = await supabase.from('products').update(payload).eq('id', editingId))
      } else {
        ;({ error } = await supabase.from('products').insert([payload]))
      }

      if (error) throw error

      notify(editingId ? 'Producto actualizado ✓' : 'Producto agregado ✓')
      resetForm()
      fetchProducts(true)
    } catch (err) {
      notify(err.message || 'Error al guardar', 'error')
    } finally {
      setSaving(false)
    }
  }

  function startEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description || '',
      price: product.price,
      in_stock: product.in_stock,
      image_url: product.image_url || '',
      fragrance_type: product.fragrance_type || '',
    })
    setImageFile(null)
    setImagePreview(product.image_url || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setImagePreview('')
    if (fileRef.current) fileRef.current.value = ''
  }

  async function handleDelete(product) {
    if (!window.confirm(`¿Eliminar "${product.name}"?`)) return
    setDeleting(product.id)
    try {
      // Optionally delete image from storage
      if (product.image_url?.includes(BUCKET)) {
        const path = product.image_url.split(`${BUCKET}/`)[1]
        if (path) await supabase.storage.from(BUCKET).remove([path])
      }
      const { error } = await supabase.from('products').delete().eq('id', product.id)
      if (error) throw error
      notify('Producto eliminado')
      fetchProducts(true)
    } catch (err) {
      notify(err.message || 'Error al eliminar', 'error')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <main className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Panel de Administración</h1>
          <p className={styles.pageSub}>Gestión de inventario</p>
        </div>

        {msg.text && (
          <div className={`${styles.toast} ${styles[msg.type]}`}>{msg.text}</div>
        )}

        {/* ─── FORM ─────────────────────────────────── */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            {editingId ? 'Editar producto' : 'Agregar producto'}
          </h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              {/* Left col */}
              <div className={styles.formLeft}>
                <div className={styles.field}>
                  <label className={styles.label}>Nombre del perfume *</label>
                  <input
                    name="name" value={form.name} onChange={handleField}
                    className={styles.input} placeholder="Ej. Noir Absolu" required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Descripción</label>
                  <textarea
                    name="description" value={form.description} onChange={handleField}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Notas olfativas, familia aromática, ocasión..."
                    rows={4}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Tipo de fragancia</label>
                  <select
                    name="fragrance_type" value={form.fragrance_type} onChange={handleField}
                    className={`${styles.input} ${styles.select}`}
                  >
                    {FRAGRANCE_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Precio (MXN) *</label>
                    <input
                      name="price" type="number" step="0.01" min="0"
                      value={form.price} onChange={handleField}
                      className={styles.input} placeholder="1200.00" required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Estado</label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox" name="in_stock"
                        checked={form.in_stock} onChange={handleField}
                      />
                      <span className={styles.toggleTrack}>
                        <span className={styles.toggleThumb} />
                      </span>
                      <span className={styles.toggleLabel}>
                        {form.in_stock ? 'En stock' : 'Agotado'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right col: image */}
              <div className={styles.formRight}>
                <label className={styles.label}>Imagen del producto</label>
                <div
                  className={styles.dropzone}
                  onClick={() => fileRef.current?.click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className={styles.preview} />
                  ) : (
                    <div className={styles.dropzoneEmpty}>
                      <span className={styles.dropzoneIcon}>↑</span>
                      <p>Click para subir imagen</p>
                      <p className={styles.dropzoneHint}>JPG, PNG, WEBP</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef} type="file" accept="image/*"
                  onChange={handleFile} style={{ display: 'none' }}
                />
                {imagePreview && (
                  <button type="button" className={styles.clearImg}
                    onClick={() => { setImageFile(null); setImagePreview(''); setForm(f => ({ ...f, image_url: '' })) }}>
                    Quitar imagen
                  </button>
                )}
              </div>
            </div>

            <div className={styles.formActions}>
              {editingId && (
                <button type="button" onClick={resetForm} className={styles.cancelBtn}>
                  Cancelar edición
                </button>
              )}
              <button type="submit" disabled={saving} className={styles.submitBtn}>
                {saving ? 'Guardando...' : editingId ? 'Actualizar producto' : 'Agregar producto'}
              </button>
            </div>
          </form>
        </section>

        {/* ─── PRODUCT LIST ─────────────────────────── */}
        <section className={styles.listSection}>
          <div className={styles.listHeader}>
            <h2 className={styles.sectionTitle}>Inventario</h2>
            <span className={styles.listCount}>{products.length} productos</span>
          </div>

          {loading ? (
            <p className={styles.stateText}>Cargando...</p>
          ) : products.length === 0 ? (
            <p className={styles.stateText}>Sin productos. Agrega el primero arriba.</p>
          ) : (
            <>
              <div className={styles.table}>
                <div className={styles.tableHead}>
                  <span>Producto</span>
                  <span>Precio</span>
                  <span>Estado</span>
                  <span>Acciones</span>
                </div>
                {products.slice((adminPage - 1) * PAGE_SIZE, adminPage * PAGE_SIZE).map(p => (
                  <div key={p.id} className={styles.tableRow}>
                    <div className={styles.productCell}>
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className={styles.thumb} />
                      ) : (
                        <div className={styles.thumbEmpty}>✦</div>
                      )}
                      <div>
                        <p className={styles.productName}>{p.name}</p>
                        <p className={styles.productDesc}>{p.description?.slice(0, 60)}{p.description?.length > 60 ? '...' : ''}</p>
                      </div>
                    </div>
                    <div className={styles.rowMeta}>
                      <span className={styles.priceCell}>
                        ${Number(p.price).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </span>
                      <span className={`${styles.statusBadge} ${p.in_stock ? styles.inStock : styles.outStock}`}>
                        {p.in_stock ? 'En stock' : 'Agotado'}
                      </span>
                    </div>
                    <div className={styles.actions}>
                      <button onClick={() => startEdit(p)} className={styles.editBtn}>Editar</button>
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={deleting === p.id}
                        className={styles.deleteBtn}
                      >
                        {deleting === p.id ? '...' : 'Eliminar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                page={adminPage}
                totalPages={Math.ceil(products.length / PAGE_SIZE)}
                onChange={setAdminPage}
              />
            </>
          )}
        </section>
      </main>
    </div>
  )
}
