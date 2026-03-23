"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import categorias from "@/data/categorias.json"

export default function Categorias() {
  return (
    <section id="categorias" className="py-24 md:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs text-neutral-400 tracking-widest uppercase mb-2">Lo que tenemos</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900">
              Categorías
            </h2>
          </div>
          <Link href="/catalogo" className="hidden sm:flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-900 transition-colors">
            Ver todo <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categorias.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/catalogo?categoria=${cat.id}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#1a4bc4]/30 bg-white hover:shadow-lg transition-all duration-300"
              >
                {/* Imagen */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.imagen}
                    alt={cat.nombre}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 17vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-2xl">{cat.emoji}</span>
                </div>
                {/* Label */}
                <div className="px-3 py-2.5 flex items-center justify-between">
                  <p className="font-semibold text-neutral-900 text-sm">{cat.nombre}</p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#1a4bc4] transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
