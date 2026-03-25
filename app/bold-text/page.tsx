import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Bold Text Generator — Unicode Bold Letters',
  description: 'Generate bold Unicode text you can copy & paste anywhere. Works on Instagram, Twitter, Facebook & more. Free bold font generator.',
  keywords: 'bold text, bold letters, bold font',
  openGraph: { images: ['/api/og?title=Bold%20Text%20Generator&description=Generate%20bold%20Unicode%20text%20you%20can%20copy%20%26%20paste%20anywhere.%20Works%20on%20Instagram%2C%20Twitter%2C%20Facebook%20%26%20mo'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Bold Text Generator',
  url: 'https://tools4free.site/bold-text',
  description: 'Generate bold Unicode text you can copy & paste anywhere. Works on Instagram, Twitter, Facebook & more. Free bold font generator.',
  category: 'UtilityApplication',
})

export default function BoldTextPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FancyTextClient />
    </>
  )
}
