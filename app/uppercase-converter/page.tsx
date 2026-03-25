import type { Metadata } from 'next'
import CaseConverterClient from '../case-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Uppercase Converter — Text to ALL CAPS',
  description: 'Convert any text to UPPERCASE instantly. Free online caps converter. Copy & paste, no signup.',
  keywords: 'uppercase converter, caps converter',
  openGraph: { images: ['/api/og?title=Uppercase%20Converter&description=Convert%20any%20text%20to%20UPPERCASE%20instantly.%20Free%20online%20caps%20converter.%20Copy%20%26%20paste%2C%20no%20signup.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Uppercase Converter',
  url: 'https://tools4free.site/uppercase-converter',
  description: 'Convert any text to UPPERCASE instantly. Free online caps converter. Copy & paste, no signup.',
  category: 'UtilityApplication',
})

export default function UppercaseConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseConverterClient />
    </>
  )
}
