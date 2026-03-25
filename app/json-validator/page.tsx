import type { Metadata } from 'next'
import JSONFormatterClient from '../json-formatter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'JSON Validator — Check JSON Online',
  description: 'Validate your JSON online instantly. Find syntax errors with clear error messages. Free JSON validator, no signup.',
  keywords: 'json validator, validate json',
  openGraph: { images: ['/api/og?title=JSON%20Validator&description=Validate%20your%20JSON%20online%20instantly.%20Find%20syntax%20errors%20with%20clear%20error%20messages.%20Free%20JSON%20validat'] },
}

const jsonLd = generateToolJsonLd({
  name: 'JSON Validator',
  url: 'https://tools4free.site/json-validator',
  description: 'Validate your JSON online instantly. Find syntax errors with clear error messages. Free JSON validator, no signup.',
  category: 'DeveloperApplication',
})

export default function JsonValidatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <JSONFormatterClient />
    </>
  )
}
