import type { Metadata } from 'next'
import Client from '../../percentage-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/percentage-calculator'),
  title: 'Calculadora de Porcentagem — Quanto é X% de Y? Grátis',
  description: 'Calcule porcentagens facilmente. Quanto é X% de Y? Variação percentual, desconto. Calculadora grátis.',
  keywords: 'calculadora porcentagem, calcular porcentagem, quanto é 20 de 500, porcentagem de desconto, variação percentual',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Porcentagem&description=Calcule%20porcentagens%20facilmente.%20Quanto%20%C3%A9%20X%25%20de%20Y%3F%20Varia%C3%A7%C3%A3o%20percentual%2C%20desconto.%20Calculadora%20gr%C3%A1tis'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Porcentagem',
  url: 'https://tools4free.site/pt/calculadora-porcentagem',
  description: 'Calcule porcentagens facilmente. Quanto é X% de Y? Variação percentual, desconto. Calculadora grátis.',
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
