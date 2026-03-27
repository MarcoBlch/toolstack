import type { Metadata } from 'next'
import CalorieClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Calorie Calculator — Daily Calorie Needs, BMR & TDEE',
  description: 'Free calorie calculator. Calculate your daily calorie needs based on age, weight, height, and activity level. BMR and TDEE using the Mifflin-St Jeor equation.',
  keywords: 'calorie calculator, daily calorie needs, BMR calculator, TDEE calculator, mifflin st jeor, calories to lose weight, maintenance calories, calorie intake',
  openGraph: { images: ['/api/og?title=Free%20Calorie%20Calculator&description=Calculate%20your%20daily%20calorie%20needs.%20BMR%20and%20TDEE%20using%20Mifflin-St%20Jeor'] },
  alternates: getAlternates('/calorie-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Free Calorie Calculator',
  url: 'https://tools4free.site/calorie-calculator',
  description: 'Free calorie calculator. Calculate your daily calorie needs based on age, weight, height, and activity level. BMR and TDEE using the Mifflin-St Jeor equation.',
  category: 'HealthApplication',
})

export default function CalorieCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalorieClient />
    </>
  )
}
