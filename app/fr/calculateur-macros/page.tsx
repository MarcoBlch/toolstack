import type { Metadata } from 'next'
import Client from '../../macro-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur de Macros — Protéines, Glucides, Lipides Gratuit',
  alternates: getAlternates('/macro-calculator'),
  description: 'Calculateur de macros gratuit. Calculez votre apport quotidien en protéines, glucides et lipides. Préréglages équilibré, low carb, hyperprotéiné, keto.',
  keywords: 'calculateur macros, macronutriments, protéines par jour, glucides, lipides, régime keto, régime hyperprotéiné',
  openGraph: { images: ['/api/og?title=Calculateur%20de%20Macros&description=Calculez%20votre%20apport%20quotidien%20en%20prot%C3%A9ines%2C%20glucides%20et%20lipides'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur de Macros',
  url: 'https://tools4free.site/fr/calculateur-macros',
  description: 'Calculateur de macros gratuit. Calculez votre apport quotidien en protéines, glucides et lipides. Préréglages équilibré, low carb, hyperprotéiné, keto.',
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
