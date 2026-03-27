import type { Metadata } from 'next'
import Client from '../../word-counter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/word-counter'),
  title: 'Contador de Palavras e Caracteres Grátis',
  description: 'Conte palavras, caracteres, frases e parágrafos do seu texto. Tempo de leitura e densidade de palavras-chave. Grátis.',
  keywords: 'contador palavras, contador caracteres, contar palavras, número de palavras',
  openGraph: { images: ['/api/og?title=Contador%20de%20Palavras%20e%20Caracteres%20Gr%C3%A1tis&description=Conte%20palavras%2C%20caracteres%2C%20frases%20e%20par%C3%A1grafos%20do%20seu%20texto.%20Tempo%20de%20leitura%20e%20densidade%20de%20palavr'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Contador de Palavras e Caracteres Grátis',
  url: 'https://tools4free.site/pt/contador-palavras',
  description: 'Conte palavras, caracteres, frases e parágrafos do seu texto. Tempo de leitura e densidade de palavras-chave. Grátis.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
