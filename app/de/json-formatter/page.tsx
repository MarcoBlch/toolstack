import type { Metadata } from 'next'
import Client from '../../json-formatter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'JSON Formatter — JSON Formatieren, Validieren & Minifizieren',
  description: 'Formatiere, validiere und minifiziere JSON sofort. Syntaxhervorhebung, Fehlererkennung. Kostenlos, ohne Anmeldung.',
  keywords: 'JSON Formatter, JSON formatieren, JSON validieren, JSON Beautifier, JSON online, JSON prüfen, JSON minifizieren',
  openGraph: { images: ['/api/og?title=JSON%20Formatter&description=Formatiere%2C%20validiere%20und%20minifiziere%20JSON%20sofort.%20Syntaxhervorhebung%2C%20Fehlererkennung.%20Kostenlos%2C%20o'] },
}

const jsonLd = generateToolJsonLd({
  name: 'JSON Formatter',
  url: 'https://tools4free.site/de/json-formatter',
  description: 'Formatiere, validiere und minifiziere JSON sofort. Syntaxhervorhebung, Fehlererkennung. Kostenlos, ohne Anmeldung.',
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
