import type { Metadata } from 'next'
import Client from '../../investment-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/investment-calculator'),
  title: 'Calculadora de Investimento — Juros Compostos Grátis',
  description: 'Simule o crescimento dos seus investimentos com juros compostos. Aportes mensais, rendimento anual. Grátis.',
  keywords: 'calculadora investimento, juros compostos, simulador investimento, calculadora poupança, rendimento investimento',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Investimento&description=Simule%20o%20crescimento%20dos%20seus%20investimentos%20com%20juros%20compostos.%20Aportes%20mensais%2C%20rendimento%20anual.%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Investimento',
  url: 'https://tools4free.site/pt/calculadora-investimento',
  description: 'Simule o crescimento dos seus investimentos com juros compostos. Aportes mensais, rendimento anual. Grátis.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
