import type { Metadata } from 'next'
import Client from '../../case-converter/client'

export const metadata: Metadata = {
  title: 'Conversor Mayúsculas Minúsculas Gratis',
  description: 'Convierte entre MAYÚSCULAS, minúsculas, Título, camelCase, snake_case y más. Gratis, sin registro.',
  keywords: 'conversor mayúsculas, mayúsculas minúsculas, convertir mayúsculas, cambiar caja texto',
}

export default function Page() {
  return <Client />
}
