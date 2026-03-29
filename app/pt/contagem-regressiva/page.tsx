import type { Metadata } from 'next'
import Client from '../../countdown/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Contagem Regressiva — Natal, Ano Novo & Qualquer Data Grátis',
  description: 'Contagem regressiva ao vivo até o Natal, Ano Novo, Halloween ou qualquer data personalizada. Dias, horas, minutos e segundos. Grátis.',
  keywords: 'contagem regressiva, contagem regressiva Natal, contagem regressiva Ano Novo, cronômetro regressivo',
  alternates: getAlternates('/countdown'),
  openGraph: { images: ['/api/og?title=Contagem%20Regressiva&description=Ao%20vivo%20at%C3%A9%20o%20Natal%2C%20Ano%20Novo%20e%20mais.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Contagem Regressiva',
  url: 'https://tools4free.site/pt/contagem-regressiva',
  description: 'Contagem regressiva ao vivo até o Natal, Ano Novo ou qualquer data personalizada.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
