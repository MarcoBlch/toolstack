import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Strikethrough Text Generator — Free S\u0336t\u0336r\u0336i\u0336k\u0336e\u0336 Maker',
  description: 'Cross out text with strikethrough Unicode characters. Copy & paste strikethrough text anywhere. Free online generator.',
  keywords: 'strikethrough text, cross out text',
  openGraph: { images: ['/api/og?title=Strikethrough%20Text%20Generator&description=Cross%20out%20text%20with%20strikethrough%20Unicode%20characters.%20Copy%20%26%20paste%20strikethrough%20text%20anywhere.%20Free'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Strikethrough Text Generator',
  url: 'https://tools4free.site/strikethrough-text',
  description: 'Cross out text with strikethrough Unicode characters. Copy & paste strikethrough text anywhere. Free online generator.',
  category: 'UtilityApplication',
})

export default function StrikethroughTextPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FancyTextClient />
    </>
  )
}
