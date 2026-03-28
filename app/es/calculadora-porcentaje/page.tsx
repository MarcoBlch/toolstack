import type { Metadata } from 'next'
import PercentageClient from '../../percentage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Porcentaje — ¿Cuánto es X% de Y? Gratis',
  description: 'Calcula porcentajes fácilmente. ¿Cuánto es X% de Y? Cambio porcentual, descuento. Calculadora gratis.',
  keywords: 'calculadora porcentaje, calcular porcentaje, cuánto es el 20 de 500, porcentaje de descuento, variación porcentual',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Porcentaje&description=Calcula%20porcentajes%20f%C3%A1cilmente.%20%C2%BFCu%C3%A1nto%20es%20X%25%20de%20Y%3F%20Cambio%20porcentual%2C%20descuento.%20Calculadora%20gratis'] },
  alternates: getAlternates('/percentage-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Porcentaje',
  url: 'https://tools4free.site/es/calculadora-porcentaje',
  description: 'Calcula porcentajes fácilmente. ¿Cuánto es X% de Y? Cambio porcentual, descuento. Calculadora gratis.',
  category: 'FinanceApplication',
})

export default function CalculadoraPorcentajePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PercentageClient locale="es" />
    </>
  )
}
