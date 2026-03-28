import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/loan-calculator'),
  title: 'Calculadora de Empréstimo — Simulador de Crédito Grátis',
  description: 'Calcule suas parcelas, juros totais e tabela de amortização. Empréstimo pessoal, auto, estudantil. Grátis.',
  keywords: 'calculadora empréstimo, simulador empréstimo, calcular parcela empréstimo, simulador crédito pessoal',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Empr%C3%A9stimo&description=Calcule%20suas%20parcelas%2C%20juros%20totais%20e%20tabela%20de%20amortiza%C3%A7%C3%A3o.%20Empr%C3%A9stimo%20pessoal%2C%20auto%2C%20estudantil.%20G'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Empréstimo',
  url: 'https://tools4free.site/pt/calculadora-emprestimo',
  description: 'Calcule suas parcelas, juros totais e tabela de amortização. Empréstimo pessoal, auto, estudantil. Grátis.',
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
