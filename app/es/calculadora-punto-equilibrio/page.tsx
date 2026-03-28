import type { Metadata } from 'next'
import Client from '../../break-even-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Punto de Equilibrio Gratis',
  alternates: getAlternates('/break-even-calculator'),
  description: 'Calcula tu punto de equilibrio. Determina el volumen de ventas necesario para cubrir tus costos fijos y variables. Gratis.',
  keywords: 'calculadora punto equilibrio, break even, punto de equilibrio, costos fijos, costos variables, umbral de rentabilidad',
  openGraph: { images: ['/api/og?title=Calculadora%20Punto%20Equilibrio&description=Calcula%20tu%20punto%20de%20equilibrio%20empresarial.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Punto de Equilibrio',
  url: 'https://tools4free.site/es/calculadora-punto-equilibrio',
  description: 'Calcula tu punto de equilibrio. Determina el volumen de ventas necesario para cubrir tus costos fijos y variables. Gratis.',
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
