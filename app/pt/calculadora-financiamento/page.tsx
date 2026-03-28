import type { Metadata } from 'next'
import Client from '../../mortgage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/mortgage-calculator'),
  title: 'Calculadora de Financiamento Imobiliário — Simulador Grátis',
  description: 'Calcule suas parcelas de financiamento imobiliário, juros totais e tabela de amortização. Simulador gratuito, sem cadastro.',
  keywords: 'calculadora financiamento, simulador financiamento imobiliário, calcular parcela, simulador de crédito, tabela amortização',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Financiamento%20Imobili%C3%A1rio&description=Calcule%20suas%20parcelas%20de%20financiamento%20imobili%C3%A1rio%2C%20juros%20totais%20e%20tabela%20de%20amortiza%C3%A7%C3%A3o.%20Simulador%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Financiamento Imobiliário',
  url: 'https://tools4free.site/pt/calculadora-financiamento',
  description: 'Calcule suas parcelas de financiamento imobiliário, juros totais e tabela de amortização. Simulador gratuito, sem cadastro.',
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
