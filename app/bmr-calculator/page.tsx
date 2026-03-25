import type { Metadata } from 'next'
import CalorieClient from '../calorie-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'BMR Calculator — Basal Metabolic Rate Calculator Free',
  description: 'Free BMR calculator. Calculate your Basal Metabolic Rate using the Mifflin-St Jeor equation. Find your resting metabolic rate.',
  keywords: 'bmr calculator, basal metabolic rate, resting metabolic rate, bmr formula, mifflin st jeor',
  openGraph: { images: ['/api/og?title=BMR%20Calculator&description=Calculate%20your%20Basal%20Metabolic%20Rate%20using%20the%20Mifflin-St%20Jeor%20equation'] },
}

const jsonLd = generateToolJsonLd({
  name: 'BMR Calculator',
  url: 'https://tools4free.site/bmr-calculator',
  description: 'Free BMR calculator. Calculate your Basal Metabolic Rate using the Mifflin-St Jeor equation. Find your resting metabolic rate.',
  category: 'HealthApplication',
})

export default function BMRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalorieClient />
    </>
  )
}
