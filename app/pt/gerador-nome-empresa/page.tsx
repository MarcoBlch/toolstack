import type { Metadata } from 'next'
import Client from '../../business-name-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Gerador de Nome de Empresa Grátis',
  alternates: getAlternates('/business-name-generator'),
  description: 'Gere nomes de empresa criativos e únicos. Encontre o nome perfeito para o seu negócio, startup ou marca. Grátis.',
  keywords: 'gerador nome empresa, nome de empresa, nome para negócio, nome startup, nome marca, ideias nome empresa',
  openGraph: { images: ['/api/og?title=Gerador%20Nome%20Empresa&description=Gere%20nomes%20de%20empresa%20criativos%20e%20%C3%BAnicos.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gerador de Nome de Empresa',
  url: 'https://tools4free.site/pt/gerador-nome-empresa',
  description: 'Gere nomes de empresa criativos e únicos. Encontre o nome perfeito para o seu negócio, startup ou marca. Grátis.',
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
