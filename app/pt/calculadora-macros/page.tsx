import type { Metadata } from 'next'
import Client from '../../macro-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculadora de Macros — Proteínas, Carboidratos, Gorduras Grátis',
  description: 'Calculadora de macros grátis. Calcule sua ingestão diária de proteínas, carboidratos e gorduras. Presets equilibrado, low carb, hiperproteico, keto.',
  keywords: 'calculadora macros, macronutrientes, proteínas por dia, carboidratos, gorduras, dieta keto, dieta hiperproteica',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Macros&description=Calcule%20sua%20ingest%C3%A3o%20di%C3%A1ria%20de%20prote%C3%ADnas%2C%20carboidratos%20e%20gorduras'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Macros',
  url: 'https://tools4free.site/pt/calculadora-macros',
  description: 'Calculadora de macros grátis. Calcule sua ingestão diária de proteínas, carboidratos e gorduras. Presets equilibrado, low carb, hiperproteico, keto.',
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
