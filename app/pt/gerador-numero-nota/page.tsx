import type { Metadata } from 'next'
import Client from '../../invoice-number-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Gerador de Número de Nota Fiscal Grátis',
  alternates: getAlternates('/invoice-number-generator'),
  description: 'Gere números de nota fiscal únicos e profissionais. Personalize o formato e a sequência para sua empresa. Grátis.',
  keywords: 'gerador número nota fiscal, número de nota, numeração nota fiscal, criar número nota, nota sequencial, formato nota fiscal',
  openGraph: { images: ['/api/og?title=Gerador%20N%C3%BAmero%20Nota&description=Gere%20n%C3%BAmeros%20de%20nota%20fiscal%20%C3%BAnicos%20e%20profissionais.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gerador de Número de Nota Fiscal',
  url: 'https://tools4free.site/pt/gerador-numero-nota',
  description: 'Gere números de nota fiscal únicos e profissionais. Personalize o formato e a sequência para sua empresa. Grátis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
