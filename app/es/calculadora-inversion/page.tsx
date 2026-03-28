import type { Metadata } from 'next'
import Client from '../../investment-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Inversión — Interés Compuesto Gratis',
  description: 'Simula el crecimiento de tus inversiones con interés compuesto. Aportes mensuales, rendimiento anual. Gratis.',
  keywords: 'calculadora inversión, interés compuesto, simulador inversión, calculadora ahorro, rendimiento inversión',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Inversi%C3%B3n&description=Simula%20el%20crecimiento%20de%20tus%20inversiones%20con%20inter%C3%A9s%20compuesto.%20Aportes%20mensuales%2C%20rendimiento%20anual'] },
  alternates: getAlternates('/investment-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Inversión',
  url: 'https://tools4free.site/es/calculadora-inversion',
  description: 'Simula el crecimiento de tus inversiones con interés compuesto. Aportes mensuales, rendimiento anual. Gratis.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
