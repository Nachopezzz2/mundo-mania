import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, MessageCircle } from "lucide-react"
import { CONFIG } from "@/lib/config"

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 opacity-90">
            <Image src="/images/logo.png" alt="Mundo Manía" fill className="object-contain" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">{CONFIG.nombreNegocio}</p>
            <p className="text-xs mt-0.5">{CONFIG.direccion}, Carmelo</p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-6 text-sm">
          <Link href="/#categorias" className="hover:text-white transition-colors">Categorías</Link>
          <Link href="/catalogo" className="hover:text-white transition-colors">Catálogo</Link>
          <Link href="/#sobre-nosotros" className="hover:text-white transition-colors">Nosotros</Link>
          <Link href="/#contacto" className="hover:text-white transition-colors">Contacto</Link>
        </nav>

        {/* Redes */}
        <div className="flex items-center gap-4">
          <a href={CONFIG.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className="hover:text-white transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href={CONFIG.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="hover:text-white transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href={`https://wa.me/${CONFIG.whatsappNumero}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="hover:text-white transition-colors">
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-4 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} Mundo Manía
      </div>
    </footer>
  )
}
