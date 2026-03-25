import type { Metadata } from 'next'
import Client from '../../regex-tester/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Regex Tester — Reguläre Ausdrücke Online Testen',
  description: 'Schreibe Regex, teste gegen Text, sieh Treffer in Echtzeit hervorgehoben. Kostenlos, ohne Anmeldung.',
  keywords: 'Regex Tester, Regex online, reguläre Ausdrücke testen, Regex prüfen, Regex Editor, RegExp testen',
  openGraph: { images: ['/api/og?title=Regex%20Tester&description=Schreibe%20Regex%2C%20teste%20gegen%20Text%2C%20sieh%20Treffer%20in%20Echtzeit%20hervorgehoben.%20Kostenlos%2C%20ohne%20Anmeldung.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Regex Tester',
  url: 'https://tools4free.site/de/regex-tester',
  description: 'Schreibe Regex, teste gegen Text, sieh Treffer in Echtzeit hervorgehoben. Kostenlos, ohne Anmeldung.',
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
