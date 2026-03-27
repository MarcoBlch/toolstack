import type { Metadata } from 'next'
import HeartRateClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Heart Rate Zone Calculator — Fat Burn, Cardio & VO2 Max Zones',
  description: 'Free heart rate zone calculator. Find your fat burn, cardio, and VO2 max zones. Karvonen and simple methods.',
  keywords: 'heart rate zone calculator, heart rate zones, fat burning zone, cardio zone, VO2 max zone, karvonen formula, target heart rate, max heart rate',
  openGraph: { images: ['/api/og?title=Free%20Heart%20Rate%20Zone%20Calculator&description=Find%20your%20fat%20burn%2C%20cardio%2C%20and%20VO2%20max%20zones'] },
  alternates: getAlternates('/heart-rate-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Free Heart Rate Zone Calculator',
  url: 'https://tools4free.site/heart-rate-calculator',
  description: 'Free heart rate zone calculator. Find your fat burn, cardio, and VO2 max zones. Karvonen and simple methods.',
  category: 'HealthApplication',
})

export default function HeartRatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeartRateClient />
    </>
  )
}
