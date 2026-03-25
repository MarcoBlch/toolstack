import type { Metadata } from 'next'
import Client from '../../json-formatter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'JSON Validieren — JSON Syntax Online Prüfen Kostenlos',
  description: 'Prüfe ob dein JSON gültig ist. Detaillierte Fehlermeldungen. Auch formatieren und minifizieren. Kostenlos.',
  keywords: 'JSON validieren, JSON prüfen, JSON Validator, ist mein JSON gültig, JSON Syntax prüfen, JSON check online',
  openGraph: { images: ['/api/og?title=JSON%20Validieren&description=Pr%C3%BCfe%20ob%20dein%20JSON%20g%C3%BCltig%20ist.%20Detaillierte%20Fehlermeldungen.%20Auch%20formatieren%20und%20minifizieren.%20Kost'] },
}

const jsonLd = generateToolJsonLd({
  name: 'JSON Validieren',
  url: 'https://tools4free.site/de/json-validieren',
  description: 'Prüfe ob dein JSON gültig ist. Detaillierte Fehlermeldungen. Auch formatieren und minifizieren. Kostenlos.',
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
