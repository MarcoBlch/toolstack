import type { Metadata } from 'next'
import Client from '../../stopwatch/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Cronómetro Online Gratis — Precisión de Milisegundos',
  description: 'Cronómetro online gratuito con precisión de milisegundos. Registra tiempos de vuelta, ve la mejor y peor vuelta, y el tiempo promedio. Sin descarga.',
  keywords: 'cronómetro online, cronómetro gratis, cronómetro milisegundos, tiempos de vuelta, cronómetro digital',
  alternates: getAlternates('/stopwatch'),
  openGraph: { images: ['/api/og?title=Cron%C3%B3metro%20Online&description=Precisi%C3%B3n%20de%20milisegundos%20con%20tiempos%20de%20vuelta.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Cronómetro Online',
  url: 'https://tools4free.site/es/cronometro',
  description: 'Cronómetro online gratuito con precisión de milisegundos y tiempos de vuelta.',
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
