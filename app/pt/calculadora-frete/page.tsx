import type { Metadata } from 'next'
import Client from '../../shipping-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Frete Grátis',
  alternates: getAlternates('/shipping-calculator'),
  description: 'Estime os custos de frete e envio. Compare tarifas de envio por peso, dimensões e destino. Grátis.',
  keywords: 'calculadora frete, custo de envio, tarifa frete, calcular frete, preço entrega, estimativa frete',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Frete&description=Estime%20os%20custos%20de%20frete%20e%20envio.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Frete',
  url: 'https://tools4free.site/pt/calculadora-frete',
  description: 'Estime os custos de frete e envio. Compare tarifas de envio por peso, dimensões e destino. Grátis.',
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
