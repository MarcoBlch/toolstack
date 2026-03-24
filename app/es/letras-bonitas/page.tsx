import type { Metadata } from 'next'
import Client from '../../fancy-text/client'

export const metadata: Metadata = {
  title: 'Generador de Letras Bonitas — Fuentes Instagram Gratis',
  description: 'Convierte tu texto en 20+ estilos Unicode — negrita, cursiva, burbujas y más. Copia y pega en cualquier lugar. Gratis, sin registro.',
  keywords: 'letras bonitas, generador letras, fuentes instagram, letras elegantes, conversor fuentes',
}

export default function Page() {
  return <Client />
}
