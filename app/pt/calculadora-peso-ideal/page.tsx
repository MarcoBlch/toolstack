import type { Metadata } from 'next'
import Client from '../../ideal-weight/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculadora de Peso Ideal — 4 Fórmulas Grátis',
  description: 'Calculadora de peso ideal grátis. Encontre seu peso ideal com as fórmulas Devine, Robinson, Miller, Hamwi. Faixa de peso saudável para sua altura.',
  keywords: 'peso ideal, calculadora peso ideal, peso saudável, fórmula Devine, peso para minha altura, IMC normal',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Peso%20Ideal&description=Encontre%20seu%20peso%20ideal%20com%20as%20f%C3%B3rmulas%20Devine%2C%20Robinson%2C%20Miller%2C%20Hamwi'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Peso Ideal',
  url: 'https://tools4free.site/pt/calculadora-peso-ideal',
  description: 'Calculadora de peso ideal grátis. Encontre seu peso ideal com as fórmulas Devine, Robinson, Miller, Hamwi. Faixa de peso saudável para sua altura.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
