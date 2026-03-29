import type { Metadata } from 'next'
import Client from '../../world-clock/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Relógio Mundial — Hora Atual no Mundo Grátis',
  description: 'Relógio mundial gratuito com a hora atual ao vivo em Nova York, Londres, Tóquio, Paris, Sydney e mais de 50 cidades. Indicador de dia/noite.',
  keywords: 'relógio mundial, hora atual, fuso horário, hora em São Paulo, hora em Lisboa, relógio internacional',
  alternates: getAlternates('/world-clock'),
  openGraph: { images: ['/api/og?title=Rel%C3%B3gio%20Mundial&description=Hora%20ao%20vivo%20em%20mais%20de%2050%20cidades.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Relógio Mundial',
  url: 'https://tools4free.site/pt/relogio-mundial',
  description: 'Relógio mundial gratuito com a hora atual ao vivo em mais de 50 cidades.',
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
