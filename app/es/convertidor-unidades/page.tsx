import type { Metadata } from 'next'
import Client from '../../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Convertidor de Unidades Gratis Online',
  description: 'Convierte longitud, peso, temperatura, volumen y más. 8 categorías de conversión. Gratis, sin registro.',
  keywords: 'convertidor unidades, conversión unidades, kg a libras, cm a pulgadas, celsius fahrenheit',
  openGraph: { images: ['/api/og?title=Convertidor%20de%20Unidades%20Gratis%20Online&description=Convierte%20longitud%2C%20peso%2C%20temperatura%2C%20volumen%20y%20m%C3%A1s.%208%20categor%C3%ADas%20de%20conversi%C3%B3n.%20Gratis%2C%20sin%20regist'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Convertidor de Unidades Gratis Online',
  url: 'https://tools4free.site/es/convertidor-unidades',
  description: 'Convierte longitud, peso, temperatura, volumen y más. 8 categorías de conversión. Gratis, sin registro.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
