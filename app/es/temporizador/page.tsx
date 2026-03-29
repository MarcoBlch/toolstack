import type { Metadata } from 'next'
import Client from '../../timer/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Temporizador Online Gratis — Alarma Sonora',
  description: 'Temporizador online gratuito hasta 99 horas. Preajustes rápidos: 1, 2, 3, 5, 10, 15, 30 minutos. Alarma sonora al terminar. Sin aplicación necesaria.',
  keywords: 'temporizador online, temporizador gratis, timer online, cronómetro regresivo, alarma minutos',
  alternates: getAlternates('/timer'),
  openGraph: { images: ['/api/og?title=Temporizador%20Online&description=Hasta%2099%20horas.%20Alarma%20sonora.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Temporizador Online',
  url: 'https://tools4free.site/es/temporizador',
  description: 'Temporizador online gratuito hasta 99 horas con alarma sonora.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
