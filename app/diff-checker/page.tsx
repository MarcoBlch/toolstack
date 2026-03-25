import type { Metadata } from 'next'
import DiffClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Text Diff Checker — Free Online Text Compare Tool',
  description: 'Compare two texts and see differences highlighted. Additions in green, deletions in red. Side-by-side or inline. Free, no signup.',
  keywords: 'diff checker, text compare, text diff, compare two texts, find differences, code diff online',
  openGraph: { images: ['/api/og?title=Text%20Diff%20Checker&description=Compare%20two%20texts%20and%20see%20differences%20highlighted.%20Additions%20in%20green%2C%20deletions%20in%20red.%20Side-by-sid'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Text Diff Checker',
  url: 'https://tools4free.site/diff-checker',
  description: 'Compare two texts and see differences highlighted. Additions in green, deletions in red. Side-by-side or inline. Free, no signup.',
  category: 'DeveloperApplication',
})

export default function DiffPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DiffClient />
    </>
  )
}
