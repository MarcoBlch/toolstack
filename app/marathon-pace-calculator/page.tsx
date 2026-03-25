import type { Metadata } from 'next'
import PaceClient from '../pace-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Marathon Pace Calculator — 42.2K Race Pace Planner Free',
  description: 'Free marathon pace calculator. Plan your marathon pace with split times. Calculate pace for any target finish time.',
  keywords: 'marathon pace, marathon pace calculator, marathon splits, 42k pace, marathon time, marathon race plan',
  openGraph: { images: ['/api/og?title=Marathon%20Pace%20Calculator&description=Plan%20your%20marathon%20pace%20with%20split%20times'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Marathon Pace Calculator',
  url: 'https://tools4free.site/marathon-pace-calculator',
  description: 'Free marathon pace calculator. Plan your marathon pace with split times. Calculate pace for any target finish time.',
  category: 'HealthApplication',
})

export default function MarathonPacePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PaceClient />
    </>
  )
}
