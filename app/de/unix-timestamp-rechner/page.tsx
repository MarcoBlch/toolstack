import type { Metadata } from 'next'
import Client from '../../unix-timestamp/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Unix Timestamp Rechner Kostenlos',
  description: 'Unix Timestamp in lesbares Datum umrechnen oder Datum in Unix Timestamp. Aktueller Timestamp live. UTC, Ortszeit, ISO 8601. Kostenlos.',
  keywords: 'unix timestamp rechner, timestamp umrechnen, epoch zu datum, datum zu timestamp, unix time, aktueller timestamp',
  alternates: getAlternates('/unix-timestamp'),
  openGraph: { images: ['/api/og?title=Unix%20Timestamp%20Rechner&description=Epoch%20zu%20Datum%20und%20Datum%20zu%20Timestamp.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Unix Timestamp Rechner',
  url: 'https://tools4free.site/de/unix-timestamp-rechner',
  description: 'Unix Timestamp in lesbares Datum umrechnen oder Datum in Unix Timestamp.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
