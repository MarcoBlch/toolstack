import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Countdown Timer — Countdown to Christmas, New Year & Any Date',
  description: 'Free live countdown timer. Countdown to Christmas, New Year, Halloween, and any custom date. Live days, hours, minutes, and seconds display.',
  keywords: 'countdown timer, countdown to Christmas, countdown to New Year, days until Christmas, countdown clock, live countdown',
  alternates: getAlternates('/countdown'),
  openGraph: { images: ['/api/og?title=Countdown%20Timer&description=Live%20countdown%20to%20Christmas%2C%20New%20Year%2C%20or%20any%20date.%20Days%2C%20hours%2C%20minutes%2C%20seconds.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Countdown Timer',
  url: 'https://tools4free.site/countdown',
  description: 'Free live countdown timer. Countdown to Christmas, New Year, Halloween, and any custom date.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
