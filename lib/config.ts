export const CONFIG = {
  // Nombre del negocio
  nombreNegocio: "Mundo Manía",
  tagline: "Juguetería · Bazar · Regalería · Cotillón · Tecnología",
  descripcionCorta: "Tu tienda de confianza en Carmelo. Encontrá todo lo que necesitás en un solo lugar.",

  // WhatsApp
  whatsappNumero: process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "59898225482",
  whatsappMensaje: "Hola! Te consulto desde la web de Mundo Manía 😊",

  // Redes sociales
  facebook: "https://www.facebook.com/profile.php?id=100063708781825",
  instagram: "https://www.instagram.com/mundo_mania_/",

  // Ubicación
  direccion: "Uruguay 373",
  localidad: "Carmelo, Uruguay",
  codigoPostal: "70100",
  googleMapsEmbedUrl: process.env.NEXT_PUBLIC_MAPS_URL || "",

  // Horarios
  horarios: [
    { dia: "Lunes a Viernes", horario: "8:00 – 12:00 / 14:00 – 19:00" },
    { dia: "Sábado", horario: "8:00 – 12:30 / 15:00 – 19:00" },
    { dia: "Domingo", horario: "Cerrado" },
  ],

  // SEO
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mundo-mania.vercel.app",
  seoDescripcion:
    "Juguetería, bazar, regalería, cotillón y tecnología en Carmelo, Uruguay. Mundo Manía — todo en un solo lugar.",
}
