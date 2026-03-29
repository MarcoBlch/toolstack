import type { Metadata } from 'next'
import Client from '../../date-difference/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora Diferencia entre Fechas Gratis',
  description: 'Calcula la diferencia exacta entre dos fechas en días, semanas, meses y años. Incluye días laborales. Gratis, sin registro.',
  keywords: 'diferencia entre fechas, calculadora fechas, días entre fechas, semanas entre fechas, días laborales',
  alternates: getAlternates('/date-difference'),
  openGraph: { images: ['/api/og?title=Diferencia%20de%20Fechas&description=D%C3%ADas%2C%20semanas%2C%20meses%20entre%20dos%20fechas.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora Diferencia de Fechas',
  url: 'https://tools4free.site/es/diferencia-fechas',
  description: 'Calcula la diferencia exacta entre dos fechas en días, semanas, meses y años.',
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
