import type { Metadata } from 'next'
import Client from '../../password-generator/client'

export const metadata: Metadata = {
  title: 'Generador de Contraseñas Seguras Gratis',
  description: 'Genera contraseñas seguras y aleatorias al instante. Cifrado criptográfico. Nunca almacenadas. Gratis, sin registro.',
  keywords: 'generador contraseñas, contraseña segura, contraseña aleatoria, crear contraseña',
}

export default function Page() {
  return <Client />
}
