import type { Metadata } from 'next'
import Client from '../../timer/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Temporizador Online Grátis — Alarme Sonoro',
  description: 'Temporizador online gratuito até 99 horas. Atalhos rápidos: 1, 2, 3, 5, 10, 15, 30 minutos. Alarme sonoro ao terminar. Sem aplicativo necessário.',
  keywords: 'temporizador online, temporizador grátis, timer online, cronômetro regressivo, alarme minutos',
  alternates: getAlternates('/timer'),
  openGraph: { images: ['/api/og?title=Temporizador%20Online&description=At%C3%A9%2099%20horas.%20Alarme%20sonoro.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Temporizador Online',
  url: 'https://tools4free.site/pt/temporizador',
  description: 'Temporizador online gratuito até 99 horas com alarme sonoro.',
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
