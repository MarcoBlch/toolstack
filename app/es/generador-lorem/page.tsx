import type { Metadata } from 'next'
import Client from '../../lorem-generator/client'

export const metadata: Metadata = {
  title: 'Generador Lorem Ipsum Gratis',
  description: 'Genera texto Lorem Ipsum. Párrafos, frases o número exacto de palabras. Copia con un clic. Gratis, sin registro.',
  keywords: 'generador lorem ipsum, lorem ipsum, texto de relleno, texto ficticio',
}

export default function Page() {
  return <Client />
}
