"use client"

import { motion } from "framer-motion"
import { CONFIG } from "@/lib/config"

export default function SobreNosotros() {
  return (
    <section id="sobre-nosotros" className="py-24 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-xs text-neutral-400 tracking-widest uppercase">Quiénes somos</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 leading-tight">
              Un negocio de familia,<br />
              <span className="text-[#1a4bc4]">para toda la familia.</span>
            </h2>
            <p className="text-neutral-500 leading-relaxed text-lg">
              Somos un comercio familiar en el corazón de Carmelo, Uruguay.
              Nacimos con mucha ilusión y hoy somos el lugar de confianza al que
              acuden nuestros vecinos para encontrar de todo.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Nos enorgullece conocer a nuestros clientes por su nombre y
              asesorarlos con atención personalizada. Para nosotros, cada venta
              es una relación que se construye de a poco.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { valor: "5.6K", label: "Seguidores en\nFacebook" },
              { valor: "3.2K", label: "Seguidores en\nInstagram" },
              { valor: "2179", label: "Publicaciones\nen Instagram" },
              { valor: "100%", label: "Dedicación\nfamiliar" },
            ].map(({ valor, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50"
              >
                <p className="text-4xl font-black text-neutral-900 tracking-tighter">{valor}</p>
                <p className="text-neutral-400 text-xs mt-2 leading-relaxed whitespace-pre-line">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
