import type { Metadata } from 'next'
import Client from '../../macro-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calculadora de Macros — Proteínas, Carbos, Grasas Gratis',
  description: 'Calculadora de macros gratis. Calcula tu ingesta diaria de proteínas, carbohidratos y grasas. Preajustes equilibrado, low carb, hiperproteico, keto.',
  keywords: 'calculadora macros, macronutrientes, proteínas por día, carbohidratos, grasas, dieta keto, dieta hiperproteica',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Macros&description=Calcula%20tu%20ingesta%20diaria%20de%20prote%C3%ADnas%2C%20carbohidratos%20y%20grasas'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Macros',
  url: 'https://tools4free.site/es/calculadora-macros',
  description: 'Calculadora de macros gratis. Calcula tu ingesta diaria de proteínas, carbohidratos y grasas. Preajustes equilibrado, low carb, hiperproteico, keto.',
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
