import type { Metadata } from 'next'
import Client from '../../calorie-deficit/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Déficit Calórico Gratis',
  description: 'Calculadora de déficit calórico gratis. Cuánto tiempo para alcanzar tu peso objetivo. Ingesta calórica diaria segura y tasa de pérdida de peso semanal.',
  keywords: 'déficit calórico, calculadora déficit, pérdida de peso, calorías para adelgazar, cuánto tiempo para perder peso',
  openGraph: { images: ['/api/og?title=Calculadora%20D%C3%A9ficit%20Cal%C3%B3rico&description=Cu%C3%A1nto%20tiempo%20para%20alcanzar%20tu%20peso%20objetivo'] },
  alternates: getAlternates('/calorie-deficit'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Déficit Calórico',
  url: 'https://tools4free.site/es/calculadora-deficit-calorico',
  description: 'Calculadora de déficit calórico gratis. Cuánto tiempo para alcanzar tu peso objetivo. Ingesta calórica diaria segura y tasa de pérdida de peso semanal.',
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
