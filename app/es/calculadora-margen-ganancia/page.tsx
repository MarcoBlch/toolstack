import type { Metadata } from 'next'
import Client from '../../markup-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Margen de Ganancia Gratis',
  alternates: getAlternates('/markup-calculator'),
  description: 'Calcula el margen de ganancia y el precio de venta a partir del costo. Determina el porcentaje de markup óptimo para tu negocio. Gratis.',
  keywords: 'calculadora margen ganancia, calcular precio de venta, markup, porcentaje ganancia, margen comercial, costo más margen',
  openGraph: { images: ['/api/og?title=Calculadora%20Margen%20Ganancia&description=Calcula%20el%20margen%20de%20ganancia%20y%20precio%20de%20venta.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Margen de Ganancia',
  url: 'https://tools4free.site/es/calculadora-margen-ganancia',
  description: 'Calcula el margen de ganancia y el precio de venta a partir del costo. Determina el porcentaje de markup óptimo para tu negocio. Gratis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
