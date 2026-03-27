import type { Metadata } from 'next'
import Client from '../../retirement-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/retirement-calculator'),
  title: 'Calculadora de Aposentadoria — Planeje sua Aposentadoria Grátis',
  description: 'Planeje sua aposentadoria. Quanto poupar por mês, projeção de renda, duração do capital. Grátis.',
  keywords: 'calculadora aposentadoria, planejar aposentadoria, poupança aposentadoria, quanto poupar para aposentar, simulador aposentadoria',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Aposentadoria&description=Planeje%20sua%20aposentadoria.%20Quanto%20poupar%20por%20m%C3%AAs%2C%20proje%C3%A7%C3%A3o%20de%20renda%2C%20dura%C3%A7%C3%A3o%20do%20capital.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Aposentadoria',
  url: 'https://tools4free.site/pt/calculadora-aposentadoria',
  description: 'Planeje sua aposentadoria. Quanto poupar por mês, projeção de renda, duração do capital. Grátis.',
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
