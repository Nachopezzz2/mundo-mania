"use client"

import { MessageCircle } from "lucide-react"
import { CONFIG } from "@/lib/config"

export default function WhatsAppButton() {
  const url = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappMensaje)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-[#25D366] hover:bg-[#1fb859] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-5 h-5" fill="currentColor" />
    </a>
  )
}
