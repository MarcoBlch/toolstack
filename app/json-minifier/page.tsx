import type { Metadata } from 'next'
import JSONFormatterClient from '../json-formatter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'JSON Minifier — Compress JSON',
  description: 'Minify and compress JSON online. Remove whitespace and reduce file size. Free JSON minifier, no signup.',
  keywords: 'json minifier, minify json',
  openGraph: { images: ['/api/og?title=JSON%20Minifier&description=Minify%20and%20compress%20JSON%20online.%20Remove%20whitespace%20and%20reduce%20file%20size.%20Free%20JSON%20minifier%2C%20no%20sign'] },
}

const jsonLd = generateToolJsonLd({
  name: 'JSON Minifier',
  url: 'https://tools4free.site/json-minifier',
  description: 'Minify and compress JSON online. Remove whitespace and reduce file size. Free JSON minifier, no signup.',
  category: 'DeveloperApplication',
})

export default function JsonMinifierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JSONFormatterClient />
    </>
  )
}
