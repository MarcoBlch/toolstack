import type { Metadata } from 'next'
import Client from '../../ideal-weight/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Peso Ideal — 4 Fórmulas Gratis',
  description: 'Calculadora de peso ideal gratis. Encuentra tu peso ideal con las fórmulas Devine, Robinson, Miller, Hamwi. Rango de peso saludable según tu estatura.',
  keywords: 'peso ideal, calculadora peso ideal, peso saludable, fórmula Devine, peso según estatura, IMC normal',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Peso%20Ideal&description=Encuentra%20tu%20peso%20ideal%20con%20las%20f%C3%B3rmulas%20Devine%2C%20Robinson%2C%20Miller%2C%20Hamwi'] },
  alternates: getAlternates('/ideal-weight'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Peso Ideal',
  url: 'https://tools4free.site/es/calculadora-peso-ideal',
  description: 'Calculadora de peso ideal gratis. Encuentra tu peso ideal con las fórmulas Devine, Robinson, Miller, Hamwi. Rango de peso saludable según tu estatura.',
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
