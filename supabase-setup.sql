-- 1. Tabla de productos
create table productos (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  descripcion text,
  categoria text not null,
  imagen text,
  destacado boolean default false,
  disponible boolean default true,
  created_at timestamp with time zone default now()
);

-- 2. Permitir lectura pública
alter table productos enable row level security;
create policy "Public read" on productos for select using (true);
create policy "Admin insert" on productos for insert with check (true);
create policy "Admin update" on productos for update using (true);
create policy "Admin delete" on productos for delete using (true);

-- 3. Bucket para imágenes
insert into storage.buckets (id, name, public) values ('productos', 'productos', true);
create policy "Public images" on storage.objects for select using (bucket_id = 'productos');
create policy "Upload images" on storage.objects for insert with check (bucket_id = 'productos');
create policy "Delete images" on storage.objects for delete using (bucket_id = 'productos');
