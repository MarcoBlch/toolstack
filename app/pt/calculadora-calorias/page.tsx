import type { Metadata } from 'next'
import Client from '../../calorie-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/calorie-calculator'),
  title: 'Calculadora de Calorias — Necessidades Diárias Grátis',
  description: 'Calculadora de calorias grátis. Calcule suas necessidades calóricas diárias com base em idade, peso, altura e nível de atividade. TMB e TDEE com fórmula Mifflin-St Jeor.',
  keywords: 'calculadora calorias, necessidades calóricas, metabolismo basal, TDEE, calorias diárias, calcular calorias grátis',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Calorias&description=Calcule%20suas%20necessidades%20cal%C3%B3ricas%20di%C3%A1rias%20com%20base%20em%20idade%2C%20peso%2C%20altura%20e%20n%C3%ADvel%20de%20atividade'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Calorias',
  url: 'https://tools4free.site/pt/calculadora-calorias',
  description: 'Calculadora de calorias grátis. Calcule suas necessidades calóricas diárias com base em idade, peso, altura e nível de atividade. TMB e TDEE com fórmula Mifflin-St Jeor.',
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
