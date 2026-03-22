"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, MessageCircle } from "lucide-react"
import { CONFIG } from "@/lib/config"

const collageImages = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80", alt: "Juguetes" },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&q=80", alt: "Cotillón" },
  { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80", alt: "Regalería" },
  { src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80", alt: "Bijouterie" },
  { src: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80", alt: "Tecnología" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80", alt: "Bazar" },
]

export default function Hero() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappMensaje)}`

  return (
    <section className="min-h-screen flex items-center bg-white overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-6 w-full py-16 md:py-0 grid md:grid-cols-2 gap-12 md:gap-6 items-center">

        {/* Texto */}
        <div className="space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge ubicación */}
            <div className="inline-flex items-center gap-1.5 bg-neutral-100 rounded-full px-3 py-1.5 text-xs text-neutral-500 mb-6">
              <MapPin className="w-3 h-3" />
              Carmelo, Uruguay
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-neutral-900 leading-[0.9] mb-6">
              Mundo<br />
              <span className="text-[#1a4bc4]">Manía</span>
            </h1>

            <p className="text-neutral-500 text-lg max-w-sm leading-relaxed">
              Juguetería · Bazar · Regalería · Cotillón · Tecnología.<br />
              Todo en un solo lugar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-[#1a4bc4] hover:bg-[#1640a8] text-white font-semibold px-7 py-3.5 rounded-full transition-colors text-sm shadow-lg shadow-[#1a4bc4]/20"
            >
              Ver catálogo
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium px-7 py-3.5 rounded-full transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </motion.div>

          {/* Stats rápidos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex gap-8 pt-2"
          >
            {[
              { val: "5.6K", label: "en Facebook" },
              { val: "3.2K", label: "en Instagram" },
              { val: "+6", label: "categorías" },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-xl font-black text-neutral-900">{val}</p>
                <p className="text-xs text-neutral-400">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Collage de fotos */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] md:h-[560px]"
        >
          {/* Grid de imágenes con rotaciones */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-3">
            {collageImages.map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  transform: `rotate(${[-1.5, 1, -0.8, 1.2, -1, 0.5][i]}deg)`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </motion.div>
            ))}
          </div>

          {/* Badge flotante */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -bottom-4 -left-4 bg-[#f5c800] text-neutral-900 font-black text-xs px-4 py-2.5 rounded-2xl shadow-lg z-10 rotate-[-2deg]"
          >
            ¡Todo en Carmelo! 🎉
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
