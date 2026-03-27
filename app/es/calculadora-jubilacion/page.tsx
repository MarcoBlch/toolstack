import type { Metadata } from 'next'
import Client from '../../retirement-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Jubilación — Planifica tu Retiro Gratis',
  description: 'Planifica tu jubilación. Cuánto ahorrar por mes, proyección de ingresos, duración del capital. Gratis.',
  keywords: 'calculadora jubilación, plan de retiro, ahorro jubilación, planificar jubilación, cuánto ahorrar para jubilarme',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Jubilaci%C3%B3n&description=Planifica%20tu%20jubilaci%C3%B3n.%20Cu%C3%A1nto%20ahorrar%20por%20mes%2C%20proyecci%C3%B3n%20de%20ingresos%2C%20duraci%C3%B3n%20del%20capital.%20Grati'] },
  alternates: getAlternates('/retirement-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Jubilación',
  url: 'https://tools4free.site/es/calculadora-jubilacion',
  description: 'Planifica tu jubilación. Cuánto ahorrar por mes, proyección de ingresos, duración del capital. Gratis.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
