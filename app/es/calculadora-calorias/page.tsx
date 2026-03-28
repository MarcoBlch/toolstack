import type { Metadata } from 'next'
import Client from '../../calorie-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Calorías — Necesidades Diarias Gratis',
  description: 'Calculadora de calorías gratis. Calcula tus necesidades calóricas diarias según edad, peso, altura y nivel de actividad. TMB y TDEE con fórmula Mifflin-St Jeor.',
  keywords: 'calculadora calorías, necesidades calóricas, metabolismo basal, TDEE, calorías diarias, calcular calorías gratis',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Calor%C3%ADas&description=Calcula%20tus%20necesidades%20cal%C3%B3ricas%20diarias%20seg%C3%BAn%20edad%2C%20peso%2C%20altura%20y%20nivel%20de%20actividad'] },
  alternates: getAlternates('/calorie-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Calorías',
  url: 'https://tools4free.site/es/calculadora-calorias',
  description: 'Calculadora de calorías gratis. Calcula tus necesidades calóricas diarias según edad, peso, altura y nivel de actividad. TMB y TDEE con fórmula Mifflin-St Jeor.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
