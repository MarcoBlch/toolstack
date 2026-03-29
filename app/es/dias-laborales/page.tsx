import type { Metadata } from 'next'
import Client from '../../work-days-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Días Laborales Gratis',
  description: 'Calcula los días laborales entre dos fechas excluyendo fines de semana y festivos. Suma días hábiles a una fecha. Festivos de EE.UU., España, México incluidos.',
  keywords: 'calculadora días laborales, días hábiles entre fechas, días laborables, festivos laborales',
  alternates: getAlternates('/work-days-calculator'),
  openGraph: { images: ['/api/og?title=D%C3%ADas%20Laborales&description=D%C3%ADas%20h%C3%A1biles%20entre%20fechas.%20Festivos%20incluidos.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Días Laborales',
  url: 'https://tools4free.site/es/dias-laborales',
  description: 'Calcula los días laborales entre dos fechas excluyendo fines de semana y festivos.',
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
