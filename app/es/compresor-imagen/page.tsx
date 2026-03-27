import type { Metadata } from 'next'
import Client from '../../image-compressor/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Compresor de Imágenes Gratis Online',
  description: 'Reduce el tamaño de tus imágenes hasta un 80%. JPEG, PNG, WebP. Todo ocurre en tu navegador. Gratis, sin registro.',
  keywords: 'compresor imagen, reducir tamaño imagen, comprimir imagen, optimizar imagen',
  openGraph: { images: ['/api/og?title=Compresor%20de%20Im%C3%A1genes%20Gratis%20Online&description=Reduce%20el%20tama%C3%B1o%20de%20tus%20im%C3%A1genes%20hasta%20un%2080%25.%20JPEG%2C%20PNG%2C%20WebP.%20Todo%20ocurre%20en%20tu%20navegador.%20Gratis%2C'] },
  alternates: getAlternates('/image-compressor'),
}

const jsonLd = generateToolJsonLd({
  name: 'Compresor de Imágenes Gratis Online',
  url: 'https://tools4free.site/es/compresor-imagen',
  description: 'Reduce el tamaño de tus imágenes hasta un 80%. JPEG, PNG, WebP. Todo ocurre en tu navegador. Gratis, sin registro.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
