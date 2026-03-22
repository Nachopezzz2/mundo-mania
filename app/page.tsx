import Hero from "@/components/sections/Hero"
import Categorias from "@/components/sections/Categorias"
import Destacados from "@/components/sections/Destacados"
import SobreNosotros from "@/components/sections/SobreNosotros"
import Ubicacion from "@/components/sections/Ubicacion"
import Contacto from "@/components/sections/Contacto"

export default function Home() {
  return (
    <>
      <Hero />
      <Categorias />
      <Destacados />
      <SobreNosotros />
      <Ubicacion />
      <Contacto />
    </>
  )
}
