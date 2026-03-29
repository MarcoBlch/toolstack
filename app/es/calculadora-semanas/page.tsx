import type { Metadata } from 'next'
import Client from '../../weeks-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Semanas entre Fechas Gratis',
  description: 'Calcula cuántas semanas hay entre dos fechas o encuentra una fecha X semanas en el futuro. Gratis, resultado instantáneo.',
  keywords: 'calculadora semanas, semanas entre fechas, cuántas semanas, sumar semanas a una fecha',
  alternates: getAlternates('/weeks-calculator'),
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Semanas&description=Semanas%20entre%20dos%20fechas%20o%20sumar%20semanas.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Semanas',
  url: 'https://tools4free.site/es/calculadora-semanas',
  description: 'Calcula cuántas semanas hay entre dos fechas o encuentra una fecha X semanas en el futuro.',
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
