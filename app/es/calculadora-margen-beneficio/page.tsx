import type { Metadata } from 'next'
import Client from '../../profit-margin-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Margen de Beneficio Gratis',
  alternates: getAlternates('/profit-margin-calculator'),
  description: 'Calcula tu margen de beneficio, margen bruto y margen neto. Determina el precio de venta óptimo para maximizar tus ganancias. Gratis.',
  keywords: 'calculadora margen beneficio, margen de ganancia, margen bruto, margen neto, calcular rentabilidad, precio de venta',
  openGraph: { images: ['/api/og?title=Calculadora%20Margen%20Beneficio&description=Calcula%20tu%20margen%20de%20beneficio%2C%20margen%20bruto%20y%20neto.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Margen de Beneficio',
  url: 'https://tools4free.site/es/calculadora-margen-beneficio',
  description: 'Calcula tu margen de beneficio, margen bruto y margen neto. Determina el precio de venta óptimo para maximizar tus ganancias. Gratis.',
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
