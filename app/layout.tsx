import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import SiteLayout from "@/components/SiteLayout"
import { CONFIG } from "@/lib/config"

const geist = Geist({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: CONFIG.nombreNegocio,
  description: CONFIG.seoDescripcion,
  openGraph: {
    title: CONFIG.nombreNegocio,
    description: CONFIG.seoDescripcion,
    url: CONFIG.siteUrl,
    siteName: CONFIG.nombreNegocio,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: CONFIG.nombreNegocio,
    description: CONFIG.seoDescripcion,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={geist.className}>
      <body className="min-h-screen flex flex-col">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
