import type { Metadata } from 'next'
import Client from '../../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/fancy-text'),
  title: 'Gerador de Texto Estilizado — Fontes Instagram Grátis',
  description: 'Transforme seu texto em 20+ estilos Unicode — negrito, itálico, cursivo, bolhas e mais. Copie e cole em qualquer lugar. Grátis, sem cadastro.',
  keywords: 'texto estilizado, gerador texto, fontes instagram, letras diferentes, conversor fontes',
  openGraph: { images: ['/api/og?title=Gerador%20de%20Texto%20Estilizado&description=Transforme%20seu%20texto%20em%2020%2B%20estilos%20Unicode%20%E2%80%94%20negrito%2C%20it%C3%A1lico%2C%20cursivo%2C%20bolhas%20e%20mais.%20Copie%20e%20cole'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gerador de Texto Estilizado',
  url: 'https://tools4free.site/pt/texto-estilizado',
  description: 'Transforme seu texto em 20+ estilos Unicode — negrito, itálico, cursivo, bolhas e mais. Copie e cole em qualquer lugar. Grátis, sem cadastro.',
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
