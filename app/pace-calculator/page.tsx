import type { Metadata } from 'next'
import PaceClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Running Pace Calculator — 5K, 10K, Half Marathon & Marathon',
  description: 'Free running pace calculator. Calculate pace, time, or distance for any run. Split times for 5K, 10K, half marathon, marathon.',
  keywords: 'pace calculator, running pace, 5k pace, 10k pace, half marathon pace, marathon pace, split times, running calculator, race pace',
  openGraph: { images: ['/api/og?title=Free%20Running%20Pace%20Calculator&description=Calculate%20pace%2C%20time%2C%20or%20distance.%20Split%20times%20for%205K%2C%2010K%2C%20marathon'] },
  alternates: getAlternates('/pace-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Free Running Pace Calculator',
  url: 'https://tools4free.site/pace-calculator',
  description: 'Free running pace calculator. Calculate pace, time, or distance for any run. Split times for 5K, 10K, half marathon, marathon.',
  category: 'HealthApplication',
})

export default function PaceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PaceClient />
    </>
  )
}
