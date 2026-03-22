"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, MessageCircle } from "lucide-react"
import { CONFIG } from "@/lib/config"

export default function Contacto() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappMensaje)}`

  return (
    <section id="contacto" className="py-24 md:py-36 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs text-neutral-500 tracking-widest uppercase mb-4">Hablemos</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
            ¿Tenés una<br />consulta?
          </h2>
          <p className="text-neutral-400 text-lg mb-12">
            Escribinos por WhatsApp o seguinos en nuestras redes. Estamos en{" "}
            <span className="text-white">{CONFIG.direccion}, Carmelo.</span>
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fb859] text-white font-medium px-6 py-3.5 rounded-full transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={CONFIG.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-full transition-colors text-sm"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
            <a
              href={CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-full transition-colors text-sm"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
