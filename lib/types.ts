export interface Categoria {
  id: string
  nombre: string
  descripcion: string
  emoji: string
  color: string
}

export interface Producto {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  imagen: string | null
  destacado: boolean
  disponible: boolean
}
