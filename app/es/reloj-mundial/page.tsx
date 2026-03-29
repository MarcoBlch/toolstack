import type { Metadata } from 'next'
import Client from '../../world-clock/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Reloj Mundial — Hora Actual en Todo el Mundo Gratis',
  description: 'Reloj mundial gratuito con la hora actual en vivo en Nueva York, Londres, Tokio, París, Sídney y más de 50 ciudades. Indicador de día/noche.',
  keywords: 'reloj mundial, hora actual, zona horaria, hora en Madrid, hora en Nueva York, reloj internacional',
  alternates: getAlternates('/world-clock'),
  openGraph: { images: ['/api/og?title=Reloj%20Mundial&description=Hora%20en%20vivo%20en%20m%C3%A1s%20de%2050%20ciudades.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Reloj Mundial',
  url: 'https://tools4free.site/es/reloj-mundial',
  description: 'Reloj mundial gratuito con la hora actual en vivo en más de 50 ciudades.',
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
