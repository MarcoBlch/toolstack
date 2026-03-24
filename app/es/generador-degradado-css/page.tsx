import type { Metadata } from 'next'
import Client from '../../gradient-generator/client'

export const metadata: Metadata = {
  title: 'Generador de Degradado CSS Gratis',
  description: 'Crea hermosos degradados CSS de forma visual. Elige colores, ajusta ángulos, copia el código CSS. Gratis.',
  keywords: 'generador degradado css, degradado css, gradient css, crear degradado',
}

export default function Page() {
  return <Client />
}
