import type { Metadata } from 'next'
import MacroClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Macro Calculator — Protein, Carbs & Fat Daily Intake',
  description: 'Free macro calculator. Calculate your daily protein, carbs, and fat intake. Balanced, low carb, high protein, keto presets.',
  keywords: 'macro calculator, macronutrient calculator, protein calculator, carbs calculator, fat calculator, keto macros, iifym, flexible dieting',
  openGraph: { images: ['/api/og?title=Free%20Macro%20Calculator&description=Calculate%20your%20daily%20protein%2C%20carbs%2C%20and%20fat%20intake'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Macro Calculator',
  url: 'https://tools4free.site/macro-calculator',
  description: 'Free macro calculator. Calculate your daily protein, carbs, and fat intake. Balanced, low carb, high protein, keto presets.',
  category: 'HealthApplication',
})

export default function MacroCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MacroClient />
    </>
  )
}
