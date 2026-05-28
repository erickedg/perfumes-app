-- ============================================================
-- SETUP COMPLETO DE SUPABASE PARA PERFUMES APP
-- Ejecuta este script en el SQL Editor de Supabase
-- ============================================================

-- 1. TABLA DE PRODUCTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  price       NUMERIC(10, 2) NOT NULL DEFAULT 0,
  image_url   TEXT,
  in_stock    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Activar RLS en la tabla
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- POLÍTICA PÚBLICA: cualquiera puede LEER productos
CREATE POLICY "Lectura pública de productos"
  ON products FOR SELECT
  USING (true);

-- POLÍTICA ADMIN: solo usuarios autenticados pueden insertar/editar/borrar
CREATE POLICY "Admin puede insertar productos"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin puede actualizar productos"
  ON products FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin puede eliminar productos"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- 3. STORAGE BUCKET PARA IMÁGENES
-- ============================================================
-- Crear el bucket (si no existe)
INSERT INTO storage.buckets (id, name, public)
VALUES ('perfume-images', 'perfume-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- POLÍTICA STORAGE: lectura pública
CREATE POLICY "Imágenes públicas"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'perfume-images');

-- POLÍTICA STORAGE: solo admin puede subir
CREATE POLICY "Admin puede subir imágenes"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'perfume-images');

-- POLÍTICA STORAGE: solo admin puede eliminar
CREATE POLICY "Admin puede eliminar imágenes"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'perfume-images');

-- ============================================================
-- LISTO. Ahora crea tu usuario admin desde el dashboard:
-- Supabase → Authentication → Users → Add user
-- ============================================================
