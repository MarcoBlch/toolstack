import type { Metadata } from 'next'
import Client from '../../hourly-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Tarifa por Hora Gratis',
  alternates: getAlternates('/hourly-rate-calculator'),
  description: 'Calcula tu tarifa por hora ideal como freelancer o consultor. Determina la tarifa que cubra tus gastos y objetivos de ingresos. Gratis.',
  keywords: 'calculadora tarifa hora, tarifa freelancer, precio por hora, tarifa consultor, calcular cobro por hora, sueldo por hora',
  openGraph: { images: ['/api/og?title=Calculadora%20Tarifa%20Hora&description=Calcula%20tu%20tarifa%20por%20hora%20ideal%20como%20freelancer.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Tarifa por Hora',
  url: 'https://tools4free.site/es/calculadora-tarifa-hora',
  description: 'Calcula tu tarifa por hora ideal como freelancer o consultor. Determina la tarifa que cubra tus gastos y objetivos de ingresos. Gratis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
