import type { Metadata } from 'next'
import Client from '../../qr-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Generador de Código QR Gratis Online',
  description: 'Crea códigos QR para URLs, WiFi, email y teléfono. Temas de color. Descarga PNG gratis. Sin registro.',
  keywords: 'generador qr, crear código qr, qr gratis, generador código qr online',
  openGraph: { images: ['/api/og?title=Generador%20de%20C%C3%B3digo%20QR%20Gratis%20Online&description=Crea%20c%C3%B3digos%20QR%20para%20URLs%2C%20WiFi%2C%20email%20y%20tel%C3%A9fono.%20Temas%20de%20color.%20Descarga%20PNG%20gratis.%20Sin%20registro'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Generador de Código QR Gratis Online',
  url: 'https://tools4free.site/es/generador-qr',
  description: 'Crea códigos QR para URLs, WiFi, email y teléfono. Temas de color. Descarga PNG gratis. Sin registro.',
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
