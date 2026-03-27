import type { Metadata } from 'next'
import CaseConverterClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Text Case Converter — UPPER, lower, Title, camelCase & More',
  description: 'Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, PascalCase and more. Free, instant.',
  keywords: 'case converter, uppercase converter, lowercase converter, title case, camelcase converter, snake case, text case changer',
  openGraph: { images: ['/api/og?title=Text%20Case%20Converter&description=Convert%20text%20between%20uppercase%2C%20lowercase%2C%20title%20case%2C%20sentence%20case%2C%20camelCase%2C%20snake_case%2C%20kebab-c'] },
  alternates: getAlternates('/case-converter'),
}

const jsonLd = generateToolJsonLd({
  name: 'Text Case Converter',
  url: 'https://tools4free.site/case-converter',
  description: 'Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, PascalCase and more. Free, instant.',
  category: 'UtilityApplication',
})

export default function CaseConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseConverterClient />
    </>
  )
}
