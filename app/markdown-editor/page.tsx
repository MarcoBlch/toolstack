import type { Metadata } from 'next'
import MarkdownClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Markdown Editor — Free Online Markdown Preview & Editor',
  description: 'Write Markdown, see live HTML preview. Export as HTML. Syntax guide included. Free, instant, no signup.',
  keywords: 'markdown editor, markdown preview, markdown to html, online markdown editor, markdown converter',
  openGraph: { images: ['/api/og?title=Markdown%20Editor&description=Write%20Markdown%2C%20see%20live%20HTML%20preview.%20Export%20as%20HTML.%20Syntax%20guide%20included.%20Free%2C%20instant%2C%20no%20sign'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Markdown Editor',
  url: 'https://tools4free.site/markdown-editor',
  description: 'Write Markdown, see live HTML preview. Export as HTML. Syntax guide included. Free, instant, no signup.',
  category: 'UtilityApplication',
})

export default function MarkdownPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarkdownClient />
    </>
  )
}
