import type { Metadata } from 'next'
import Client from '../../pace-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Ritmo de Carrera Gratis',
  description: 'Calculadora de ritmo de carrera gratis. Calcula tu ritmo, tiempo o distancia para cualquier carrera. Tiempos de paso para 5K, 10K, media maratón, maratón.',
  keywords: 'ritmo carrera, calculadora ritmo, pace running, tiempos de paso, 5K, 10K, media maratón, maratón, running',
  openGraph: { images: ['/api/og?title=Calculadora%20Ritmo%20de%20Carrera&description=Calcula%20tu%20ritmo%2C%20tiempo%20o%20distancia.%20Tiempos%20de%20paso%20para%205K%2C%2010K%2C%20media%20marat%C3%B3n%2C%20marat%C3%B3n'] },
  alternates: getAlternates('/pace-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Ritmo de Carrera',
  url: 'https://tools4free.site/es/calculadora-ritmo-carrera',
  description: 'Calculadora de ritmo de carrera gratis. Calcula tu ritmo, tiempo o distancia para cualquier carrera. Tiempos de paso para 5K, 10K, media maratón, maratón.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
