import type { Metadata } from 'next'
import Client from '../../json-formatter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/json-formatter'),
  title: 'Formatador JSON Grátis Online',
  description: 'Formate, valide e minifique JSON instantaneamente. Destaque de sintaxe e detecção de erros. Grátis, sem cadastro.',
  keywords: 'formatador json, formatter json, validador json, json online, beautifier json',
  openGraph: { images: ['/api/og?title=Formatador%20JSON%20Gr%C3%A1tis%20Online&description=Formate%2C%20valide%20e%20minifique%20JSON%20instantaneamente.%20Destaque%20de%20sintaxe%20e%20detec%C3%A7%C3%A3o%20de%20erros.%20Gr%C3%A1tis%2C%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Formatador JSON Grátis Online',
  url: 'https://tools4free.site/pt/formatador-json',
  description: 'Formate, valide e minifique JSON instantaneamente. Destaque de sintaxe e detecção de erros. Grátis, sem cadastro.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
