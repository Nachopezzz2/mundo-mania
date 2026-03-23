"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import { supabase } from "@/lib/supabase"
import type { Producto } from "@/lib/types"
import productosJson from "@/data/productos.json"

export default function Destacados() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("destacado", true)
        .eq("disponible", true)
        .order("created_at", { ascending: false })
        .limit(4)

      // Si Supabase no está configurado aún, usamos el JSON de ejemplo
      if (error || !data || data.length === 0) {
        setProductos(productosJson.filter((p) => p.destacado && p.disponible).slice(0, 4) as Producto[])
      } else {
        setProductos(data)
      }
    }
    load()
  }, [])

  return (
    <section id="novedades" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs text-neutral-400 tracking-widest uppercase mb-2">Lo más nuevo</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900">Novedades</h2>
          </div>
          <Link href="/catalogo" className="hidden sm:flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 transition-colors">
            Ver todo <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {productos.map((producto, i) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ProductCard producto={producto} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:hidden text-center">
          <Link href="/catalogo" className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center justify-center gap-1.5">
            Ver catálogo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
