"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { CONFIG } from "@/lib/config"

const navLinks = [
  { href: "/#categorias", label: "Categorías" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#sobre-nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
        style={{ backdropFilter: scrolled ? "none" : "none" }}
      >
        {/* Barra superior amarilla — solo visible al hacer scroll */}
        <div
          className={`bg-[#f5c800] text-center text-xs font-semibold text-neutral-900 tracking-wide overflow-hidden transition-all duration-500 ${
            scrolled ? "py-1.5 max-h-8" : "py-0 max-h-0"
          }`}
        >
          📍 Uruguay 373, Carmelo · Lun–Vie 8–12 / 14–19 · Sáb 8–12:30 / 15–19
        </div>

        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#f5c800] flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Mundo Manía"
                fill
                className="object-contain scale-90"
              />
            </div>
            <span className={`font-black text-base tracking-tight transition-colors ${scrolled ? "text-neutral-900 group-hover:text-[#1a4bc4]" : "text-white group-hover:text-white/80"}`}>
              Mundo Manía
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm transition-colors px-3 py-2 rounded-lg group ${
                scrolled
                  ? "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={`https://wa.me/${CONFIG.whatsappNumero}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-bold px-5 py-2 rounded-full transition-all hover:-translate-y-0.5 ${scrolled ? "bg-[#1a4bc4] hover:bg-[#1640a8] text-white hover:shadow-lg hover:shadow-[#1a4bc4]/25" : "bg-white text-[#1a4bc4] hover:bg-white/90"}`}
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div
            className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
              <span className="font-black text-neutral-900">Mundo Manía</span>
              <button onClick={() => setOpen(false)} className="p-1 text-neutral-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-neutral-700 hover:text-[#1a4bc4] py-3 border-b border-neutral-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="px-6 pb-8">
              <a
                href={`https://wa.me/${CONFIG.whatsappNumero}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-[#1a4bc4] text-white font-bold py-3.5 rounded-full text-sm"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
