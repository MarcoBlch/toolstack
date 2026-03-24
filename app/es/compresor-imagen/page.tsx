import type { Metadata } from 'next'
import Client from '../../image-compressor/client'

export const metadata: Metadata = {
  title: 'Compresor de Imágenes Gratis Online',
  description: 'Reduce el tamaño de tus imágenes hasta un 80%. JPEG, PNG, WebP. Todo ocurre en tu navegador. Gratis, sin registro.',
  keywords: 'compresor imagen, reducir tamaño imagen, comprimir imagen, optimizar imagen',
}

export default function Page() {
  return <Client />
}
