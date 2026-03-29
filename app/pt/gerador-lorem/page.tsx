import type { Metadata } from 'next'
import Client from '../../lorem-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/lorem-generator'),
  title: 'Gerador Lorem Ipsum Grátis',
  description: 'Gere texto Lorem Ipsum. Parágrafos, frases ou número exato de palavras. Copie com um clique. Grátis, sem cadastro.',
  keywords: 'gerador lorem ipsum, lorem ipsum, texto de preenchimento, texto fictício',
  openGraph: { images: ['/api/og?title=Gerador%20Lorem%20Ipsum%20Gr%C3%A1tis&description=Gere%20texto%20Lorem%20Ipsum.%20Par%C3%A1grafos%2C%20frases%20ou%20n%C3%BAmero%20exato%20de%20palavras.%20Copie%20com%20um%20clique.%20Gr%C3%A1tis%2C'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gerador Lorem Ipsum Grátis',
  url: 'https://tools4free.site/pt/gerador-lorem',
  description: 'Gere texto Lorem Ipsum. Parágrafos, frases ou número exato de palavras. Copie com um clique. Grátis, sem cadastro.',
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
