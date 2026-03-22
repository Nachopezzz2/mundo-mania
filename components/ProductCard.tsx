"use client"

import Image from "next/image"
import { MessageCircle, Package } from "lucide-react"
import { CONFIG } from "@/lib/config"
import type { Producto } from "@/lib/types"

interface ProductCardProps {
  producto: Producto
}

export default function ProductCard({ producto }: ProductCardProps) {
  const whatsappMsg = `Hola! Me interesa "${producto.nombre}" que vi en la web de Mundo Manía. ¿Me podés dar más info?`
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-neutral-200 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Imagen */}
      <div className="relative aspect-square bg-neutral-50 overflow-hidden">
        {producto.imagen ? (
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-200">
            <Package className="w-10 h-10" />
          </div>
        )}
        {producto.destacado && (
          <span className="absolute top-3 left-3 bg-[#f5c800] text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-full">
            Nuevo
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-neutral-900 text-sm leading-tight">{producto.nombre}</h3>
          <p className="text-neutral-400 text-xs mt-1 leading-relaxed line-clamp-2">{producto.descripcion}</p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full bg-neutral-900 hover:bg-neutral-700 text-white text-xs font-medium py-2.5 rounded-xl transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Consultar
        </a>
      </div>
    </div>
  )
}
