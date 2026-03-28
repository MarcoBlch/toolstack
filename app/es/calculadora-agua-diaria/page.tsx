import type { Metadata } from 'next'
import Client from '../../water-intake/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Agua Diaria Gratis',
  description: 'Calculadora de agua diaria gratis. ¿Cuánta agua debes beber al día? Basado en peso, nivel de actividad y clima.',
  keywords: 'cuánta agua beber, calculadora agua diaria, hidratación, agua por día, necesidad de agua, ingesta de agua',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Agua%20Diaria&description=%C2%BFCu%C3%A1nta%20agua%20debes%20beber%20al%20d%C3%ADa%3F%20Basado%20en%20peso%2C%20nivel%20de%20actividad%20y%20clima'] },
  alternates: getAlternates('/water-intake'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Agua Diaria',
  url: 'https://tools4free.site/es/calculadora-agua-diaria',
  description: 'Calculadora de agua diaria gratis. ¿Cuánta agua debes beber al día? Basado en peso, nivel de actividad y clima.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
