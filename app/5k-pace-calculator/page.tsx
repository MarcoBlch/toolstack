import type { Metadata } from 'next'
import PaceClient from '../pace-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: '5K Pace Calculator — Running Pace for 5K Free',
  description: 'Free 5K pace calculator. Calculate your ideal pace for a 5K run. Split times, target pace, and training zones.',
  keywords: '5k pace, 5k pace calculator, 5k running pace, couch to 5k pace, 5k time, 5k splits',
  openGraph: { images: ['/api/og?title=5K%20Pace%20Calculator&description=Calculate%20your%20ideal%20pace%20for%20a%205K%20run'] },
}

const jsonLd = generateToolJsonLd({
  name: '5K Pace Calculator',
  url: 'https://tools4free.site/5k-pace-calculator',
  description: 'Free 5K pace calculator. Calculate your ideal pace for a 5K run. Split times, target pace, and training zones.',
  category: 'HealthApplication',
})

export default function FiveKPacePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PaceClient />
    </>
  )
}
