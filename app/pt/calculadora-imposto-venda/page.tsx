import type { Metadata } from 'next'
import Client from '../../sales-tax-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Imposto sobre Venda Grátis',
  alternates: getAlternates('/sales-tax-calculator'),
  description: 'Calcule o imposto sobre venda nas suas compras. Obtenha o valor do imposto e o preço total com impostos incluídos. Grátis.',
  keywords: 'calculadora imposto venda, calcular imposto, ICMS, preço com imposto, taxa imposto, imposto sobre vendas',
  openGraph: { images: ['/api/og?title=Calculadora%20Imposto%20Venda&description=Calcule%20o%20imposto%20sobre%20venda%20nas%20suas%20compras.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Imposto sobre Venda',
  url: 'https://tools4free.site/pt/calculadora-imposto-venda',
  description: 'Calcule o imposto sobre venda nas suas compras. Obtenha o valor do imposto e o preço total com impostos incluídos. Grátis.',
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
