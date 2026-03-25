import type { Metadata } from 'next'
import Client from '../../password-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Sicheres Passwort Generator — Unknackbare Passwörter Erstellen',
  description: 'Generiere unknackbare sichere Passwörter mit einem Klick. Kryptographisch sicher, wird nie gespeichert. Kostenlos.',
  keywords: 'sicheres Passwort, sicheres Passwort erstellen, Passwort Generator sicher, starkes Passwort, unknackbares Passwort',
  openGraph: { images: ['/api/og?title=Sicheres%20Passwort%20Generator&description=Generiere%20unknackbare%20sichere%20Passw%C3%B6rter%20mit%20einem%20Klick.%20Kryptographisch%20sicher%2C%20wird%20nie%20gespeiche'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Sicheres Passwort Generator',
  url: 'https://tools4free.site/de/sicheres-passwort',
  description: 'Generiere unknackbare sichere Passwörter mit einem Klick. Kryptographisch sicher, wird nie gespeichert. Kostenlos.',
  category: 'SecurityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
