import type { Metadata } from 'next'
import Client from '../../unix-timestamp/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Convertisseur Timestamp Unix Gratuit',
  description: 'Convertissez un timestamp Unix en date lisible ou une date en timestamp Unix. Affichez le timestamp actuel en direct. UTC, heure locale, ISO 8601. Gratuit.',
  keywords: 'convertisseur timestamp, timestamp unix, epoch en date, date en timestamp, unix time, timestamp actuel',
  alternates: getAlternates('/unix-timestamp'),
  openGraph: { images: ['/api/og?title=Convertisseur%20Timestamp%20Unix&description=Epoch%20vers%20date%20et%20date%20vers%20timestamp.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Convertisseur Timestamp Unix',
  url: 'https://tools4free.site/fr/convertisseur-timestamp',
  description: 'Convertissez un timestamp Unix en date lisible ou une date en timestamp Unix.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
