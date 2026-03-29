import type { Metadata } from 'next'
import Client from '../../shipping-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Costos de Envío Gratis',
  alternates: getAlternates('/shipping-calculator'),
  description: 'Estima los costos de envío y transporte. Compara tarifas de envío según peso, dimensiones y destino. Gratis.',
  keywords: 'calculadora envío, costos de envío, tarifa envío, gastos de envío, calcular flete, precio transporte',
  openGraph: { images: ['/api/og?title=Calculadora%20Costos%20Env%C3%ADo&description=Estima%20los%20costos%20de%20env%C3%ADo%20y%20transporte.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Costos de Envío',
  url: 'https://tools4free.site/es/calculadora-envio',
  description: 'Estima los costos de envío y transporte. Compara tarifas de envío según peso, dimensiones y destino. Gratis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
