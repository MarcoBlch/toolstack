import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculadora de Préstamo — Simulador de Crédito Gratis',
  description: 'Calcula tus cuotas mensuales, intereses totales y tabla de amortización. Préstamo personal, auto, estudiantil. Gratis.',
  keywords: 'calculadora préstamo, simulador crédito, calcular cuota préstamo, simulador préstamo personal, tabla amortización',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Pr%C3%A9stamo&description=Calcula%20tus%20cuotas%20mensuales%2C%20intereses%20totales%20y%20tabla%20de%20amortizaci%C3%B3n.%20Pr%C3%A9stamo%20personal%2C%20auto%2C%20es'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Préstamo',
  url: 'https://tools4free.site/es/calculadora-prestamo',
  description: 'Calcula tus cuotas mensuales, intereses totales y tabla de amortización. Préstamo personal, auto, estudiantil. Gratis.',
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
