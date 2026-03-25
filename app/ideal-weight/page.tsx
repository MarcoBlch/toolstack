import type { Metadata } from 'next'
import IdealWeightClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Ideal Weight Calculator — Devine, Robinson, Miller & Hamwi Formulas',
  description: 'Free ideal weight calculator. Find your ideal weight using Devine, Robinson, Miller, Hamwi formulas. Healthy BMI weight range for your height.',
  keywords: 'ideal weight calculator, ideal body weight, healthy weight, devine formula, robinson formula, miller formula, hamwi formula, ideal weight for height',
  openGraph: { images: ['/api/og?title=Free%20Ideal%20Weight%20Calculator&description=Find%20your%20ideal%20weight%20using%20Devine%2C%20Robinson%2C%20Miller%2C%20Hamwi%20formulas'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Ideal Weight Calculator',
  url: 'https://tools4free.site/ideal-weight',
  description: 'Free ideal weight calculator. Find your ideal weight using Devine, Robinson, Miller, Hamwi formulas. Healthy BMI weight range for your height.',
  category: 'HealthApplication',
})

export default function IdealWeightPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <IdealWeightClient />
    </>
  )
}
