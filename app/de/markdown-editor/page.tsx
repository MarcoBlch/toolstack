import type { Metadata } from 'next'
import Client from '../../markdown-editor/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Markdown Editor — Online Markdown Vorschau Kostenlos',
  description: 'Schreibe Markdown, sieh live die HTML-Vorschau. HTML exportieren. Split-Pane Editor. Kostenlos.',
  keywords: 'Markdown Editor, Markdown online, Markdown Vorschau, Markdown zu HTML, Markdown Editor kostenlos, Markdown schreiben',
  openGraph: { images: ['/api/og?title=Markdown%20Editor&description=Schreibe%20Markdown%2C%20sieh%20live%20die%20HTML-Vorschau.%20HTML%20exportieren.%20Split-Pane%20Editor.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Markdown Editor',
  url: 'https://tools4free.site/de/markdown-editor',
  description: 'Schreibe Markdown, sieh live die HTML-Vorschau. HTML exportieren. Split-Pane Editor. Kostenlos.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
