import type { Metadata } from 'next'
import MortgageClient from '../../mortgage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Hipoteca — Simulador de Préstamo Hipotecario Gratis',
  description: 'Calcula tu cuota mensual de hipoteca, intereses totales y tabla de amortización. Simulador gratuito, sin registro.',
  keywords: 'calculadora hipoteca, simulador hipoteca, calcular cuota hipoteca, simulador préstamo hipotecario, tabla amortización',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Hipoteca&description=Calcula%20tu%20cuota%20mensual%20de%20hipoteca%2C%20intereses%20totales%20y%20tabla%20de%20amortizaci%C3%B3n.%20Simulador%20gratuito%2C'] },
  alternates: getAlternates('/mortgage-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Hipoteca',
  url: 'https://tools4free.site/es/calculadora-hipoteca',
  description: 'Calcula tu cuota mensual de hipoteca, intereses totales y tabla de amortización. Simulador gratuito, sin registro.',
  category: 'FinanceApplication',
})

export default function CalculadoraHipotecaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MortgageClient locale="es" />
    </>
  )
}
