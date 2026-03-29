import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Online Stopwatch — Millisecond Precision with Lap Times',
  description: 'Free online stopwatch with millisecond precision. Record lap times, see best and worst laps, average lap time. No app needed. Works in any browser.',
  keywords: 'online stopwatch, stopwatch with lap times, free stopwatch, millisecond stopwatch, split times, digital stopwatch',
  alternates: getAlternates('/stopwatch'),
  openGraph: { images: ['/api/og?title=Free%20Online%20Stopwatch&description=Millisecond%20precision%20with%20lap%20times%2C%20best%20lap%2C%20and%20average.%20No%20app%20needed.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Online Stopwatch',
  url: 'https://tools4free.site/stopwatch',
  description: 'Free online stopwatch with millisecond precision. Record lap times, see best and worst laps, average lap time.',
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
