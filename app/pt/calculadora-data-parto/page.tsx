import type { Metadata } from 'next'
import Client from '../../due-date-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/due-date-calculator'),
  title: 'Calculadora de Data Provável do Parto Grátis',
  description: 'Calculadora de data provável do parto grátis. Calcule sua data estimada de parto com base na última menstruação, data de concepção ou FIV. Trimestres e idade gestacional.',
  keywords: 'data do parto, calculadora data parto, data provável parto, semanas de gravidez, idade gestacional, calculadora gravidez',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Data%20do%20Parto&description=Calcule%20sua%20data%20estimada%20de%20parto%20com%20base%20na%20%C3%BAltima%20menstrua%C3%A7%C3%A3o%2C%20data%20de%20concep%C3%A7%C3%A3o%20ou%20FIV'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Data Provável do Parto',
  url: 'https://tools4free.site/pt/calculadora-data-parto',
  description: 'Calculadora de data provável do parto grátis. Calcule sua data estimada de parto com base na última menstruação, data de concepção ou FIV. Trimestres e idade gestacional.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
