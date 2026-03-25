import type { Metadata } from 'next'
import Client from '../../emoji-picker/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Emoji Zum Kopieren — Alle Emojis Suchen & Einfügen',
  description: 'Durchsuche und kopiere alle Emojis. Suche nach Name, 9 Kategorien. Ein Klick zum Kopieren. Kostenlos.',
  keywords: 'Emoji kopieren, Emoji zum Kopieren, Emoji Sammlung, Emojis, Smiley kopieren, Emoji einfügen, alle Emojis',
  openGraph: { images: ['/api/og?title=Emoji%20Zum%20Kopieren&description=Durchsuche%20und%20kopiere%20alle%20Emojis.%20Suche%20nach%20Name%2C%209%20Kategorien.%20Ein%20Klick%20zum%20Kopieren.%20Kostenlos'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Emoji Zum Kopieren',
  url: 'https://tools4free.site/de/emoji-sammlung',
  description: 'Durchsuche und kopiere alle Emojis. Suche nach Name, 9 Kategorien. Ein Klick zum Kopieren. Kostenlos.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
