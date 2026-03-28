import type { Metadata } from 'next'
import Client from '../../heart-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Frecuencia Cardíaca Gratis',
  description: 'Calculadora de zonas de frecuencia cardíaca gratis. Zonas de quema de grasa, cardio y VO2 máx. Métodos Karvonen y simple.',
  keywords: 'frecuencia cardíaca, zonas cardíacas, zona quema grasa, zona cardio, VO2 máx, método Karvonen, FC máxima',
  openGraph: { images: ['/api/og?title=Calculadora%20Frecuencia%20Card%C3%ADaca&description=Zonas%20de%20quema%20de%20grasa%2C%20cardio%20y%20VO2%20m%C3%A1x'] },
  alternates: getAlternates('/heart-rate-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Frecuencia Cardíaca',
  url: 'https://tools4free.site/es/calculadora-frecuencia-cardiaca',
  description: 'Calculadora de zonas de frecuencia cardíaca gratis. Zonas de quema de grasa, cardio y VO2 máx. Métodos Karvonen y simple.',
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
