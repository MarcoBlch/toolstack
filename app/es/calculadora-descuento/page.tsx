import type { Metadata } from 'next'
import Client from '../../discount-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Descuento — Calcular Rebajas y Promociones Gratis',
  alternates: getAlternates('/discount-calculator'),
  description: 'Calcula descuentos, rebajas y promociones fácilmente. Obtén el precio final con descuento, el ahorro y el porcentaje de descuento. Gratis.',
  keywords: 'calculadora descuento, calcular rebaja, descuento porcentaje, precio con descuento, calcular promoción, ofertas',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Descuento&description=Calcula%20descuentos%2C%20rebajas%20y%20promociones%20f%C3%A1cilmente.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Descuento',
  url: 'https://tools4free.site/es/calculadora-descuento',
  description: 'Calcula descuentos, rebajas y promociones fácilmente. Obtén el precio final con descuento, el ahorro y el porcentaje de descuento. Gratis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
