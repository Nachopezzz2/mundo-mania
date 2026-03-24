"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, MessageCircle, ArrowRight } from "lucide-react"
import { CONFIG } from "@/lib/config"

const poolImagenes = [
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
  "/images/productos/fb_076.jpg",
  "/images/productos/fb_079.jpg",
  "/images/productos/fb_096.jpg",
  "/images/productos/fb_093.jpg",
  "/images/productos/fb_115.jpg",
  "/images/productos/fb_101.jpg",
  "/images/productos/fb_067.jpg",
  "/images/productos/fb_069.jpg",
  "/images/productos/fb_084.jpg",
  "/images/productos/ig_06.jpg",
]

// Scattered photo cards — positioned as % within the full-width hero
// Each photo is placed so they surround the centered text block
const scatteredPhotos = [
  // Far left column
  { src: poolImagenes[0],  x: "2%",   y: "12%",  w: 160, h: 195, r: -7,  delay: 0.20 },
  { src: poolImagenes[11], x: "2%",   y: "56%",  w: 145, h: 165, r:  5,  delay: 0.35 },
  // Near left
  { src: poolImagenes[5],  x: "17%",  y: "5%",   w: 130, h: 140, r:  4,  delay: 0.28 },
  { src: poolImagenes[8],  x: "16%",  y: "62%",  w: 140, h: 155, r: -5,  delay: 0.40 },
  // Near right
  { src: poolImagenes[2],  x: "71%",  y: "4%",   w: 135, h: 145, r: -4,  delay: 0.32 },
  { src: poolImagenes[9],  x: "72%",  y: "60%",  w: 140, h: 160, r:  6,  delay: 0.44 },
  // Far right column
  { src: poolImagenes[4],  x: "86%",  y: "10%",  w: 155, h: 185, r:  5,  delay: 0.22 },
  { src: poolImagenes[7],  x: "86%",  y: "57%",  w: 145, h: 155, r: -6,  delay: 0.38 },
]

const categorias = ["Juguetería", "Bazar", "Regalería", "Cotillón", "Escolar", "Bijouterie", "Herramientas"]

export default function Hero() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappMensaje)}`

  return (
    <section className="relative bg-[#1a4bc4] overflow-hidden min-h-screen flex flex-col select-none">

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "30px 30px" }}
      />

      {/* Warm glow — top right */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#f5c800]/15 blur-[140px] pointer-events-none" />
      {/* Cool shadow — bottom left */}
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#0a1e60]/70 blur-[100px] pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-10">

          {/* Scattered photos — large desktop only */}
          <div className="hidden xl:block pointer-events-none absolute inset-x-4 inset-y-0 z-0">
            {scatteredPhotos.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.75, rotate: p.r - 8 }}
                animate={{ opacity: 1, scale: 1, rotate: p.r }}
                transition={{ duration: 0.75, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  left: p.x,
                  top: p.y,
                  width: p.w,
                  height: p.h,
                  pointerEvents: "auto",
                }}
                whileHover={{ scale: 1.07, rotate: 0, zIndex: 30, transition: { duration: 0.2 } }}
                className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer"
              >
                <Image src={p.src} alt="" fill className="object-cover" sizes="180px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Center column — padded so it doesn't clash with photos on xl */}
          <div className="relative z-10 text-center xl:px-56 2xl:px-64">

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-xs font-medium mb-6 border border-white/20"
            >
              <MapPin className="w-3 h-3 text-[#f5c800]" />
              Uruguay 373, Carmelo
            </motion.div>

            {/* Giant wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-none tracking-tighter mb-5"
            >
              <span className="block text-[clamp(4.5rem,12vw,130px)] text-[#f5c800] drop-shadow-[0_4px_24px_rgba(245,200,0,0.3)]">
                MUNDO
              </span>
              <span className="block text-[clamp(4.5rem,12vw,130px)] text-white -mt-3">
                MANÍA
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-7 max-w-xs mx-auto"
            >
              Tu comercio de confianza en Carmelo.
              <br />Todo lo que necesitás, en un solo lugar.
            </motion.p>

            {/* Category pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="flex flex-wrap justify-center gap-2 mb-7"
            >
              {categorias.map((cat) => (
                <span key={cat} className="bg-white/10 border border-white/20 text-white/70 text-xs px-3 py-1.5 rounded-full">
                  {cat}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 bg-[#f5c800] hover:bg-[#e6b800] text-neutral-900 font-bold px-8 py-3.5 rounded-full transition-all text-sm shadow-xl shadow-black/20 hover:-translate-y-0.5 active:scale-95"
              >
                Ver catálogo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium px-8 py-3.5 rounded-full transition-all text-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex justify-center gap-10"
            >
              {[
                { val: "5.6K", label: "seguidores FB" },
                { val: "3.2K", label: "seguidores IG" },
                { val: "+8",   label: "categorías"   },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black text-white">{val}</p>
                  <p className="text-xs text-white/40 mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile photo collage — shows below text on smaller screens */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="xl:hidden grid grid-cols-4 gap-2 mt-10"
          >
            {poolImagenes.slice(0, 8).map((src, i) => (
              <motion.div
                key={i}
                style={{ rotate: i % 2 === 0 ? -3 : 3 }}
                className={`relative rounded-xl overflow-hidden shadow-lg shadow-black/30 ${i % 3 === 0 ? "h-28" : "h-20"}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="relative border-t border-white/10 py-3.5 overflow-hidden bg-black/20">
        <div className="flex gap-3 animate-marquee w-max">
          {[...poolImagenes, ...poolImagenes].map((src, i) => (
            <div key={i} className="relative w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0">
              <Image src={src} alt="" fill className="object-cover" sizes="80px" />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
