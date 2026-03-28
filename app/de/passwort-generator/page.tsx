import type { Metadata } from 'next'
import Client from '../../password-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/password-generator'),
  title: 'Passwort Generator — Sichere Passwörter Kostenlos Erstellen',
  description: 'Generiere kryptographisch sichere Passwörter sofort. Stärkeanzeige, anpassbare Länge und Zeichen. Wird nie gespeichert. 100% lokal.',
  keywords: 'Passwort Generator, sicheres Passwort, Passwort erstellen, zufälliges Passwort, Passwort Generator kostenlos, starkes Passwort',
  openGraph: { images: ['/api/og?title=Passwort%20Generator&description=Generiere%20kryptographisch%20sichere%20Passw%C3%B6rter%20sofort.%20St%C3%A4rkeanzeige%2C%20anpassbare%20L%C3%A4nge%20und%20Zeichen.%20Wi'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Passwort Generator',
  url: 'https://tools4free.site/de/passwort-generator',
  description: 'Generiere kryptographisch sichere Passwörter sofort. Stärkeanzeige, anpassbare Länge und Zeichen. Wird nie gespeichert. 100% lokal.',
  category: 'SecurityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
