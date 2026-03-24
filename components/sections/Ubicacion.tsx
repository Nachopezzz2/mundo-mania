"use client"

import { motion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"
import { CONFIG } from "@/lib/config"

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="py-24 md:py-36 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs text-amber-600 tracking-widest uppercase mb-3 font-semibold">Dónde encontrarnos</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900">
            Visitanos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <div className="mt-0.5 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{CONFIG.direccion}</p>
                <p className="text-neutral-400 text-sm mt-0.5">{CONFIG.localidad} {CONFIG.codigoPostal}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-0.5 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-amber-700" />
              </div>
              <div className="space-y-2">
                {CONFIG.horarios.map((h) => (
                  <div key={h.dia} className="flex justify-between gap-8 text-sm">
                    <span className="text-neutral-400">{h.dia}</span>
                    <span className="text-neutral-900 font-medium">{h.horario}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden h-72 md:h-80 bg-neutral-100"
          >
            {CONFIG.googleMapsEmbedUrl ? (
              <iframe
                src={CONFIG.googleMapsEmbedUrl}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Mundo Manía"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-300">
                <MapPin className="w-8 h-8" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
