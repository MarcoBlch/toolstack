import type { Metadata } from 'next'
import Client from '../../hourly-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Valor por Hora Grátis',
  alternates: getAlternates('/hourly-rate-calculator'),
  description: 'Calcule seu valor por hora ideal como freelancer ou consultor. Determine a tarifa que cubra suas despesas e metas de renda. Grátis.',
  keywords: 'calculadora valor hora, tarifa freelancer, preço por hora, valor hora consultor, calcular cobrar por hora, salário por hora',
  openGraph: { images: ['/api/og?title=Calculadora%20Valor%20Hora&description=Calcule%20seu%20valor%20por%20hora%20ideal%20como%20freelancer.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Valor por Hora',
  url: 'https://tools4free.site/pt/calculadora-valor-hora',
  description: 'Calcule seu valor por hora ideal como freelancer ou consultor. Determine a tarifa que cubra suas despesas e metas de renda. Grátis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
