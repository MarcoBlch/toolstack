import type { Metadata } from 'next'
import Client from '../../calorie-deficit/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/calorie-deficit'),
  title: 'Calculadora de Déficit Calórico Grátis',
  description: 'Calculadora de déficit calórico grátis. Quanto tempo para atingir seu peso objetivo. Ingestão calórica diária segura e taxa de perda de peso semanal.',
  keywords: 'déficit calórico, calculadora déficit, perda de peso, calorias para emagrecer, quanto tempo para perder peso',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20D%C3%A9ficit%20Cal%C3%B3rico&description=Quanto%20tempo%20para%20atingir%20seu%20peso%20objetivo.%20Ingest%C3%A3o%20cal%C3%B3rica%20di%C3%A1ria%20segura'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Déficit Calórico',
  url: 'https://tools4free.site/pt/calculadora-deficit-calorico',
  description: 'Calculadora de déficit calórico grátis. Quanto tempo para atingir seu peso objetivo. Ingestão calórica diária segura e taxa de perda de peso semanal.',
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
