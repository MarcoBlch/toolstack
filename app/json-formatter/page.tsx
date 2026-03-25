import type { Metadata } from 'next'
import JSONFormatterClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator — Free Online JSON Beautifier',
  description: 'Format, validate, and minify JSON instantly. Syntax highlighting, error detection, tree view. Free, no signup.',
  keywords: 'json formatter, json validator, json beautifier, json minifier, json pretty print, json viewer',
  openGraph: { images: ['/api/og?title=JSON%20Formatter%20%26%20Validator&description=Format%2C%20validate%2C%20and%20minify%20JSON%20instantly.%20Syntax%20highlighting%2C%20error%20detection%2C%20tree%20view.%20Free%2C%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'JSON Formatter & Validator',
  url: 'https://tools4free.site/json-formatter',
  description: 'Format, validate, and minify JSON instantly. Syntax highlighting, error detection, tree view. Free, no signup.',
  category: 'DeveloperApplication',
})

export default function JSONFormatterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JSONFormatterClient />
    </>
  )
}
