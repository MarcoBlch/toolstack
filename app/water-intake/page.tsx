import type { Metadata } from 'next'
import WaterIntakeClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Water Intake Calculator — How Much Water Should You Drink Daily',
  description: 'Free water intake calculator. How much water should you drink daily? Based on weight, activity level, and climate.',
  keywords: 'water intake calculator, daily water intake, how much water to drink, hydration calculator, water consumption, water needs',
  openGraph: { images: ['/api/og?title=Free%20Water%20Intake%20Calculator&description=How%20much%20water%20should%20you%20drink%20daily%3F%20Based%20on%20weight%2C%20activity%2C%20climate'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Water Intake Calculator',
  url: 'https://tools4free.site/water-intake',
  description: 'Free water intake calculator. How much water should you drink daily? Based on weight, activity level, and climate.',
  category: 'HealthApplication',
})

export default function WaterIntakePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WaterIntakeClient />
    </>
  )
}
