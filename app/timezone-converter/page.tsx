import type { Metadata } from 'next'
import TimezoneClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Timezone Converter — Free World Clock & Time Zone Calculator',
  description: 'Convert time between any timezones instantly. World clock, meeting planner, EST to GMT, PST to IST. Free, no signup.',
  keywords: 'timezone converter, time zone converter, est to gmt, pst to ist, world clock, time difference calculator',
  openGraph: { images: ['/api/og?title=Timezone%20Converter&description=Convert%20time%20between%20any%20timezones%20instantly.%20World%20clock%2C%20meeting%20planner%2C%20EST%20to%20GMT%2C%20PST%20to%20IST.%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Timezone Converter',
  url: 'https://tools4free.site/timezone-converter',
  description: 'Convert time between any timezones instantly. World clock, meeting planner, EST to GMT, PST to IST. Free, no signup.',
  category: 'UtilityApplication',
})

export default function TimezonePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TimezoneClient />
    </>
  )
}
