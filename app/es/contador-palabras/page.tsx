import type { Metadata } from 'next'
import Client from '../../word-counter/client'

export const metadata: Metadata = {
  title: 'Contador de Palabras y Caracteres Gratis',
  description: 'Cuenta palabras, caracteres, frases y párrafos de tu texto. Tiempo de lectura y densidad de palabras clave. Gratis.',
  keywords: 'contador palabras, contador caracteres, contar palabras, número de palabras',
}

export default function Page() {
  return <Client />
}
