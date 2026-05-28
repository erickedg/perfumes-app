# Perfumes App 🌹

Catálogo de perfumes con panel de administración. Stack: **React + Vite + Supabase**, desplegado en **Vercel**.

---

## Pasos para poner en marcha el proyecto

### PASO 1 — Crear cuenta y proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita.
2. Crea un nuevo proyecto (guarda la contraseña de la base de datos).
3. Espera ~2 minutos a que el proyecto esté listo.

---

### PASO 2 — Ejecutar el SQL de configuración

1. En el dashboard de Supabase, ve a **SQL Editor** (menú izquierdo).
2. Copia todo el contenido del archivo `supabase_setup.sql` de este proyecto.
3. Pégalo en el editor y haz clic en **Run**.

Esto crea:
- La tabla `products` con todas las columnas necesarias
- Las políticas de seguridad (RLS) que permiten lectura pública y escritura solo para admins
- El bucket `perfume-images` en Supabase Storage

---

### PASO 3 — Crear el usuario admin

1. En Supabase, ve a **Authentication → Users**.
2. Haz clic en **Add user → Create new user**.
3. Ingresa el correo y contraseña que usarás para el admin.
4. ✅ Eso es todo — no hay nada que exponer en el frontend.

---

### PASO 4 — Obtener las claves de Supabase

1. En Supabase, ve a **Settings → API**.
2. Copia:
   - **Project URL** → es tu `VITE_SUPABASE_URL`
   - **anon public key** → es tu `VITE_SUPABASE_ANON_KEY`

> ⚠️ NUNCA uses la `service_role key` en el frontend. Solo la `anon key`.

---

### PASO 5 — Configurar variables de entorno locales

Crea un archivo `.env.local` en la raíz del proyecto (copia `.env.example`):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### PASO 6 — Instalar dependencias y correr en local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

- **Catálogo público:** `/`
- **Login admin:** `/login`
- **Panel admin:** `/admin` (requiere login)

---

### PASO 7 — Deploy en Vercel

1. Sube el proyecto a GitHub (asegúrate de que `.env.local` esté en `.gitignore`).
2. Ve a [vercel.com](https://vercel.com) → **New Project** → importa tu repo.
3. En la sección **Environment Variables**, agrega:
   - `VITE_SUPABASE_URL` → tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY` → tu anon key
4. Haz clic en **Deploy**. ¡Listo!

---

## Estructura del proyecto

```
perfumes-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegación
│   │   ├── Navbar.module.css
│   │   ├── ProductCard.jsx     # Tarjeta de producto
│   │   └── ProductCard.module.css
│   ├── pages/
│   │   ├── Home.jsx            # Catálogo público
│   │   ├── Home.module.css
│   │   ├── Login.jsx           # Login del admin
│   │   ├── Login.module.css
│   │   ├── Admin.jsx           # Panel de gestión
│   │   └── Admin.module.css
│   ├── lib/
│   │   └── supabase.js         # Cliente de Supabase
│   ├── App.jsx                 # Rutas + AuthContext
│   ├── main.jsx
│   └── index.css               # Variables globales
├── supabase_setup.sql          # Script SQL a ejecutar en Supabase
├── .env.example                # Plantilla de variables de entorno
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## Seguridad

| Aspecto | Solución |
|---|---|
| Credenciales admin | Manejadas por Supabase Auth, nunca en el frontend |
| Escritura a BD | Bloqueada por RLS para usuarios no autenticados |
| Anon Key expuesta | Es segura: solo permite lo que las políticas RLS permiten |
| Imágenes | Subidas a Supabase Storage con JWT del admin |

---

## Funcionalidades

### Vista pública (`/`)
- Grid de productos con foto, nombre, descripción y precio
- Badge de stock / agotado
- Filtro por estado (todos / en stock / agotados)
- Búsqueda por nombre o descripción

### Panel admin (`/admin`)
- Login seguro con Supabase Auth
- Agregar productos con nombre, descripción, precio, imagen y estado
- Editar cualquier producto existente
- Eliminar productos (con confirmación)
- Subida de imágenes a Supabase Storage
- Toggle de stock en tiempo real
