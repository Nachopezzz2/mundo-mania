"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, X } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import { supabase } from "@/lib/supabase"
import type { Producto } from "@/lib/types"
import productosJson from "@/data/productos.json"
import categorias from "@/data/categorias.json"

export default function CatalogoPage() {
  const [busqueda, setBusqueda] = useState("")
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null)
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Leer categoría de la URL si viene de un link de categoría
    const params = new URLSearchParams(window.location.search)
    const cat = params.get("categoria")
    if (cat) setCategoriaActiva(cat)
  }, [])

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("disponible", true)
        .order("created_at", { ascending: false })

      if (error || !data || data.length === 0) {
        setProductos(productosJson.filter((p) => p.disponible) as Producto[])
      } else {
        setProductos(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideCategoria = categoriaActiva ? p.categoria === categoriaActiva : true
      const coincideBusqueda = busqueda
        ? p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          (p.descripcion || "").toLowerCase().includes(busqueda.toLowerCase())
        : true
      return coincideCategoria && coincideBusqueda
    })
  }, [busqueda, categoriaActiva, productos])

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <p className="text-xs text-neutral-400 tracking-widest uppercase mb-3">Todos los productos</p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900">Catálogo</h1>
      </div>

      {/* Filtros sticky */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
            <input
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-400 w-48"
            />
            {busqueda && (
              <button onClick={() => setBusqueda("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategoriaActiva(null)}
              className={`text-xs px-4 py-2 rounded-full border transition-colors ${categoriaActiva === null ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-500 hover:border-neutral-400"}`}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id === categoriaActiva ? null : cat.id)}
                className={`text-xs px-4 py-2 rounded-full border transition-colors ${categoriaActiva === cat.id ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-500 hover:border-neutral-400"}`}
              >
                {cat.emoji} {cat.nombre}
              </button>
            ))}
          </div>

          <span className="sm:ml-auto text-xs text-neutral-400">
            {productosFiltrados.length} producto{productosFiltrados.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-neutral-100 animate-pulse aspect-square" />
            ))}
          </div>
        ) : productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 text-neutral-300">
            <Search className="w-10 h-10 mx-auto mb-4" />
            <p className="text-neutral-400 font-medium">Sin resultados</p>
            <button onClick={() => { setBusqueda(""); setCategoriaActiva(null) }} className="mt-3 text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-2">
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
