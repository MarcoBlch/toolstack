import type { Metadata } from 'next'
import CalorieClient from '../calorie-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'TDEE Calculator — Total Daily Energy Expenditure Free',
  description: 'Free TDEE calculator. Calculate your Total Daily Energy Expenditure based on BMR and activity level. Mifflin-St Jeor formula.',
  keywords: 'tdee calculator, total daily energy expenditure, maintenance calories, tdee formula, how many calories do I burn',
  openGraph: { images: ['/api/og?title=TDEE%20Calculator&description=Calculate%20your%20Total%20Daily%20Energy%20Expenditure'] },
}

const jsonLd = generateToolJsonLd({
  name: 'TDEE Calculator',
  url: 'https://tools4free.site/tdee-calculator',
  description: 'Free TDEE calculator. Calculate your Total Daily Energy Expenditure based on BMR and activity level.',
  category: 'HealthApplication',
})

export default function TDEEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalorieClient />
    </>
  )
}
