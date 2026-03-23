"use client"

import Image from "next/image"
import { Package } from "lucide-react"
import { CONFIG } from "@/lib/config"
import type { Producto } from "@/lib/types"
import categorias from "@/data/categorias.json"

interface ProductCardProps {
  producto: Producto
}

export default function ProductCard({ producto }: ProductCardProps) {
  const whatsappMsg = `Hola! Me interesa "${producto.nombre}" que vi en la web de Mundo Manía. ¿Me podés dar más info?`
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(whatsappMsg)}`
  const cat = categorias.find((c) => c.id === producto.categoria)

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Imagen */}
      <div className="relative aspect-[4/3] bg-neutral-50 overflow-hidden">
        {producto.imagen ? (
          <Image
            src={producto.imagen}
            alt={producto.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-neutral-200" />
          </div>
        )}
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Badge categoría */}
        {cat && (
          <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <span>{cat.emoji}</span>
            <span>{cat.nombre}</span>
          </span>
        )}
        {producto.destacado && (
          <span className="absolute top-2.5 right-2.5 bg-[#f5c800] text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-full">
            Nuevo
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-neutral-900 text-sm leading-snug">{producto.nombre}</h3>
          {producto.descripcion && (
            <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed line-clamp-2">{producto.descripcion}</p>
          )}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#1a4bc4] hover:bg-[#1640a8] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Consultar precio
        </a>
      </div>
    </div>
  )
}
