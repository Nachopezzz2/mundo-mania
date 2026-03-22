"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"
import { Plus, Pencil, Trash2, Upload, X, Check, Loader2, Package, LogOut } from "lucide-react"
import categorias from "@/data/categorias.json"

interface Producto {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  imagen: string | null
  destacado: boolean
  disponible: boolean
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "mundomania2024"

const emptyForm = {
  nombre: "",
  descripcion: "",
  categoria: "jugueteria",
  imagen: null as string | null,
  destacado: false,
  disponible: true,
}

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_auth")
    if (saved === "true") setAuth(true)
  }, [])

  useEffect(() => {
    if (auth) fetchProductos()
  }, [auth])

  async function fetchProductos() {
    setLoading(true)
    const { data } = await supabase.from("productos").select("*").order("created_at", { ascending: false })
    setProductos(data || [])
    setLoading(false)
  }

  function login() {
    if (password === ADMIN_PASSWORD) {
      setAuth(true)
      sessionStorage.setItem("admin_auth", "true")
    } else {
      setPasswordError(true)
      setTimeout(() => setPasswordError(false), 1500)
    }
  }

  function logout() {
    setAuth(false)
    sessionStorage.removeItem("admin_auth")
  }

  function openNew() {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(p: Producto) {
    setForm({ nombre: p.nombre, descripcion: p.descripcion, categoria: p.categoria, imagen: p.imagen, destacado: p.destacado, disponible: p.disponible })
    setEditId(p.id)
    setShowForm(true)
  }

  async function uploadImage(file: File) {
    setUploading(true)
    const ext = file.name.split(".").pop()
    const filename = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from("productos").upload(filename, file)
    if (!error) {
      const { data } = supabase.storage.from("productos").getPublicUrl(filename)
      setForm((f) => ({ ...f, imagen: data.publicUrl }))
    }
    setUploading(false)
  }

  async function save() {
    if (!form.nombre.trim()) return
    setSaving(true)
    if (editId) {
      await supabase.from("productos").update(form).eq("id", editId)
    } else {
      await supabase.from("productos").insert(form)
    }
    setSaving(false)
    setShowForm(false)
    fetchProductos()
  }

  async function deleteProducto(id: string) {
    if (!confirm("¿Eliminar este producto?")) return
    setDeletingId(id)
    await supabase.from("productos").delete().eq("id", id)
    setDeletingId(null)
    fetchProductos()
  }

  // Login screen
  if (!auth) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#f5c800] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-neutral-900" />
            </div>
            <h1 className="text-xl font-black text-neutral-900">Admin · Mundo Manía</h1>
            <p className="text-neutral-400 text-sm mt-1">Ingresá la contraseña para continuar</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors ${
                passwordError ? "border-red-400 bg-red-50" : "border-neutral-200 focus:border-neutral-400"
              }`}
            />
            <button
              onClick={login}
              className="w-full bg-[#1a4bc4] hover:bg-[#1640a8] text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <h1 className="font-black text-neutral-900">Admin · Mundo Manía</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={openNew}
              className="flex items-center gap-2 bg-[#1a4bc4] hover:bg-[#1640a8] text-white font-medium px-4 py-2 rounded-full text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo producto
            </button>
            <button onClick={logout} className="p-2 text-neutral-400 hover:text-neutral-700">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-24 text-neutral-400">
            <Package className="w-10 h-10 mx-auto mb-3" />
            <p>No hay productos aún</p>
            <button onClick={openNew} className="mt-4 text-sm text-[#1a4bc4] hover:underline">
              Agregar el primero
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productos.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-neutral-100 overflow-hidden group">
                {/* Imagen */}
                <div className="relative aspect-square bg-neutral-50">
                  {p.imagen ? (
                    <Image src={p.imagen} alt={p.nombre} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-200">
                      <Package className="w-10 h-10" />
                    </div>
                  )}
                  {p.destacado && (
                    <span className="absolute top-2 left-2 bg-[#f5c800] text-neutral-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      Destacado
                    </span>
                  )}
                  {!p.disponible && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="text-xs font-bold text-neutral-500 bg-white px-3 py-1 rounded-full border">
                        No disponible
                      </span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="font-semibold text-neutral-900 text-sm truncate">{p.nombre}</p>
                  <p className="text-neutral-400 text-xs mt-0.5 capitalize">{p.categoria}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-neutral-200 hover:border-neutral-400 text-neutral-600 text-xs py-2 rounded-lg transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Editar
                    </button>
                    <button
                      onClick={() => deleteProducto(p.id)}
                      disabled={deletingId === p.id}
                      className="flex items-center justify-center w-9 h-9 border border-neutral-200 hover:border-red-300 hover:text-red-500 text-neutral-400 rounded-lg transition-colors"
                    >
                      {deletingId === p.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 sticky top-0 bg-white">
              <h2 className="font-black text-neutral-900">{editId ? "Editar producto" : "Nuevo producto"}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-5">
              {/* Imagen */}
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide block mb-2">Foto</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative aspect-video rounded-xl border-2 border-dashed border-neutral-200 hover:border-[#1a4bc4] transition-colors cursor-pointer overflow-hidden bg-neutral-50 flex items-center justify-center group"
                >
                  {form.imagen ? (
                    <Image src={form.imagen} alt="preview" fill className="object-cover" />
                  ) : (
                    <div className="text-center text-neutral-400 group-hover:text-[#1a4bc4] transition-colors">
                      {uploading ? (
                        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-xs font-medium">Tocá para subir una foto</p>
                          <p className="text-xs text-neutral-300 mt-0.5">Desde el celular o la computadora</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                />
                {form.imagen && (
                  <button
                    onClick={() => setForm((f) => ({ ...f, imagen: null }))}
                    className="mt-2 text-xs text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    Quitar foto
                  </button>
                )}
              </div>

              {/* Nombre */}
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide block mb-2">Nombre *</label>
                <input
                  value={form.nombre}
                  onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                  placeholder="Ej: Auto de colección"
                  className="w-full border border-neutral-200 focus:border-[#1a4bc4] rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide block mb-2">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
                  placeholder="Descripción breve del producto..."
                  rows={3}
                  className="w-full border border-neutral-200 focus:border-[#1a4bc4] rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Categoría */}
              <div>
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide block mb-2">Categoría</label>
                <select
                  value={form.categoria}
                  onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
                  className="w-full border border-neutral-200 focus:border-[#1a4bc4] rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white"
                >
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="flex gap-4">
                {[
                  { key: "destacado", label: "Destacado en inicio" },
                  { key: "disponible", label: "Disponible" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setForm((f) => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                      form[key as keyof typeof form]
                        ? "bg-[#1a4bc4] border-[#1a4bc4] text-white"
                        : "border-neutral-200 text-neutral-500"
                    }`}
                  >
                    {form[key as keyof typeof form] && <Check className="w-3.5 h-3.5" />}
                    {label}
                  </button>
                ))}
              </div>

              {/* Guardar */}
              <button
                onClick={save}
                disabled={saving || !form.nombre.trim()}
                className="w-full bg-[#1a4bc4] hover:bg-[#1640a8] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {saving ? "Guardando..." : editId ? "Guardar cambios" : "Agregar producto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
