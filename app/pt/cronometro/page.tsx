import type { Metadata } from 'next'
import Client from '../../stopwatch/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Cronômetro Online Grátis — Precisão de Milissegundos',
  description: 'Cronômetro online gratuito com precisão de milissegundos. Registre tempos de volta, veja a melhor e pior volta, e o tempo médio. Sem download.',
  keywords: 'cronômetro online, cronômetro grátis, cronômetro milissegundos, tempos de volta, cronômetro digital',
  alternates: getAlternates('/stopwatch'),
  openGraph: { images: ['/api/og?title=Cron%C3%B4metro%20Online&description=Precis%C3%A3o%20de%20milissegundos%20com%20tempos%20de%20volta.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Cronômetro Online',
  url: 'https://tools4free.site/pt/cronometro',
  description: 'Cronômetro online gratuito com precisão de milissegundos e tempos de volta.',
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
