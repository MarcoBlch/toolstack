import type { Metadata } from 'next'
import Client from '../../tip-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/tip-calculator'),
  title: 'Calculadora de Gorjeta — Calcular Gorjeta e Dividir Conta',
  description: 'Calcule a gorjeta e divida a conta facilmente. Percentuais rápidos, divisão entre pessoas. Grátis.',
  keywords: 'calculadora gorjeta, calcular gorjeta, dividir conta, gorjeta restaurante, quanto dar de gorjeta',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Gorjeta&description=Calcule%20a%20gorjeta%20e%20divida%20a%20conta%20facilmente.%20Percentuais%20r%C3%A1pidos%2C%20divis%C3%A3o%20entre%20pessoas.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Gorjeta',
  url: 'https://tools4free.site/pt/calculadora-gorjeta',
  description: 'Calcule a gorjeta e divida a conta facilmente. Percentuais rápidos, divisão entre pessoas. Grátis.',
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
