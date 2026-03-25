import type { Metadata } from 'next'
import MacroClient from '../macro-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Keto Macro Calculator — Keto Diet Macros Free',
  description: 'Free keto macro calculator. Calculate your ideal macros for a ketogenic diet. Protein, fat, and carb ratios for keto.',
  keywords: 'keto macro calculator, keto macros, keto diet calculator, ketogenic diet macros, keto carb limit, keto fat intake',
  openGraph: { images: ['/api/og?title=Keto%20Macro%20Calculator&description=Calculate%20your%20ideal%20macros%20for%20a%20ketogenic%20diet'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Keto Macro Calculator',
  url: 'https://tools4free.site/keto-macro-calculator',
  description: 'Free keto macro calculator. Calculate your ideal macros for a ketogenic diet. Protein, fat, and carb ratios for keto.',
  category: 'HealthApplication',
})

export default function KetoMacroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MacroClient />
    </>
  )
}
