"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, MessageCircle, ArrowRight } from "lucide-react"
import { CONFIG } from "@/lib/config"

// Fotos reales de productos del local
const marqueeImages = [
  "/images/productos/fb_22.jpg",
  "/images/productos/fb_27.jpg",
  "/images/productos/fb_42.jpg",
  "/images/productos/fb_45.jpg",
  "/images/productos/fb_104.jpg",
  "/images/productos/ig_01.jpg",
  "/images/productos/fb_08.jpg",
  "/images/productos/fb_30.jpg",
  "/images/productos/fb_34.jpg",
  "/images/productos/fb_132.jpg",
  "/images/productos/ig_07.jpg",
  "/images/productos/fb_113.jpg",
  "/images/productos/fb_120.jpg",
  "/images/productos/fb_128.jpg",
  "/images/productos/fb_086.jpg",
]

const categorias = ["Juguetería", "Bazar", "Regalería", "Cotillón", "Escolar", "Bijouterie", "Herramientas"]

export default function Hero() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappMensaje)}`

  return (
    <section className="relative bg-[#1a4bc4] overflow-hidden min-h-screen flex flex-col">

      {/* Fondo con patrón sutil */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
        backgroundSize: "32px 32px"
      }} />

      {/* Contenido principal */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-12">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Texto */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-xs font-medium mb-8 border border-white/20">
                  <MapPin className="w-3.5 h-3.5" />
                  Uruguay 373, Carmelo
                </div>

                <h1 className="text-6xl md:text-7xl lg:text-[88px] font-black tracking-tighter text-white leading-[0.88] mb-6">
                  Mundo<br />
                  <span className="text-[#f5c800]">Manía</span>
                </h1>

                <p className="text-white/70 text-lg leading-relaxed max-w-xs">
                  Tu comercio de confianza en Carmelo.<br />
                  Todo lo que necesitás, en un solo lugar.
                </p>
              </motion.div>

              {/* Pills de categorías */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-wrap gap-2"
              >
                {categorias.map((cat) => (
                  <span key={cat} className="bg-white/10 border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full">
                    {cat}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 bg-[#f5c800] hover:bg-[#e6b800] text-neutral-900 font-bold px-7 py-3.5 rounded-full transition-all text-sm shadow-xl shadow-black/20 hover:-translate-y-0.5"
                >
                  Ver catálogo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium px-7 py-3.5 rounded-full transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex gap-8 pt-2"
              >
                {[
                  { val: "5.6K", label: "seguidores FB" },
                  { val: "3.2K", label: "seguidores IG" },
                  { val: "+8", label: "categorías" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-black text-white">{val}</p>
                    <p className="text-xs text-white/50 mt-0.5">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mosaico de productos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:grid grid-cols-3 gap-3 h-[480px]"
            >
              {[
                { img: "/images/productos/fb_42.jpg", tall: true, row: "row-span-2" },
                { img: "/images/productos/fb_22.jpg", tall: false, row: "" },
                { img: "/images/productos/ig_01.jpg", tall: false, row: "" },
                { img: "/images/productos/fb_45.jpg", tall: false, row: "" },
                { img: "/images/productos/fb_104.jpg", tall: false, row: "" },
              ].map(({ img, row }, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                  className={`relative rounded-2xl overflow-hidden bg-white/10 ${row} ${i === 0 ? "row-span-2" : ""}`}
                >
                  <Image
                    src={img}
                    alt="Producto"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Banda inferior: marquee infinito de productos */}
      <div className="relative border-t border-white/10 py-4 overflow-hidden bg-black/20">
        <div className="flex gap-3 animate-marquee w-max">
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
