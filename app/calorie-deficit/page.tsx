import type { Metadata } from 'next'
import CalorieDeficitClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Calorie Deficit Calculator — How Long to Reach Goal Weight',
  description: 'Free calorie deficit calculator. Calculate how long to reach your goal weight. Safe daily calorie targets and weekly weight loss rate.',
  keywords: 'calorie deficit calculator, weight loss calculator, how long to lose weight, calorie deficit for weight loss, safe calorie deficit, weekly weight loss',
  openGraph: { images: ['/api/og?title=Free%20Calorie%20Deficit%20Calculator&description=Calculate%20how%20long%20to%20reach%20your%20goal%20weight.%20Safe%20daily%20calorie%20targets'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Calorie Deficit Calculator',
  url: 'https://tools4free.site/calorie-deficit',
  description: 'Free calorie deficit calculator. Calculate how long to reach your goal weight. Safe daily calorie targets and weekly weight loss rate.',
  category: 'HealthApplication',
})

export default function CalorieDeficitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalorieDeficitClient />
    </>
  )
}
