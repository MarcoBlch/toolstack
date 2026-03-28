import type { Metadata } from 'next'
import Client from '../../due-date-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora Fecha Probable de Parto Gratis',
  description: 'Calculadora de fecha probable de parto gratis. Calcula tu fecha estimada de parto según última regla, fecha de concepción o FIV. Trimestres y edad gestacional.',
  keywords: 'fecha de parto, calculadora fecha parto, fecha probable parto, semanas de embarazo, edad gestacional, calculadora embarazo',
  openGraph: { images: ['/api/og?title=Calculadora%20Fecha%20de%20Parto&description=Calcula%20tu%20fecha%20estimada%20de%20parto%20seg%C3%BAn%20%C3%BAltima%20regla%2C%20fecha%20de%20concepci%C3%B3n%20o%20FIV'] },
  alternates: getAlternates('/due-date-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora Fecha Probable de Parto',
  url: 'https://tools4free.site/es/calculadora-fecha-parto',
  description: 'Calculadora de fecha probable de parto gratis. Calcula tu fecha estimada de parto según última regla, fecha de concepción o FIV. Trimestres y edad gestacional.',
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
