import type { Metadata } from 'next'
import Client from '../../diff-checker/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Text Vergleichen — Unterschiede Zwischen Texten Finden',
  description: 'Vergleiche zwei Texte nebeneinander. Hinzufügungen in grün, Löschungen in rot. Kostenlos, sofort.',
  keywords: 'Text vergleichen, Textvergleich, Diff Checker, Unterschiede finden, Text Unterschied, Texte vergleichen online',
  openGraph: { images: ['/api/og?title=Text%20Vergleichen&description=Vergleiche%20zwei%20Texte%20nebeneinander.%20Hinzuf%C3%BCgungen%20in%20gr%C3%BCn%2C%20L%C3%B6schungen%20in%20rot.%20Kostenlos%2C%20sofort.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Text Vergleichen',
  url: 'https://tools4free.site/de/text-vergleichen',
  description: 'Vergleiche zwei Texte nebeneinander. Hinzufügungen in grün, Löschungen in rot. Kostenlos, sofort.',
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
