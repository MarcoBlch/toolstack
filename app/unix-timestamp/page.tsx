import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter — Epoch to Date & Date to Timestamp',
  description: 'Free Unix timestamp converter. Convert epoch timestamp to human-readable date, or date to Unix timestamp. Live current timestamp display. ISO 8601, UTC, and local time.',
  keywords: 'unix timestamp converter, epoch to date, date to timestamp, epoch converter, unix time, epoch time, timestamp to date',
  alternates: getAlternates('/unix-timestamp'),
  openGraph: { images: ['/api/og?title=Unix%20Timestamp%20Converter&description=Convert%20epoch%20to%20date%20and%20date%20to%20Unix%20timestamp.%20Live%20current%20timestamp.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Unix Timestamp Converter',
  url: 'https://tools4free.site/unix-timestamp',
  description: 'Free Unix timestamp converter. Convert epoch timestamp to human-readable date or date to Unix timestamp.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
