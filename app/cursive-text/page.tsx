import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Cursive Text Generator — Free Fancy Cursive Font',
  description: 'Convert your text to beautiful cursive and script fonts. Copy & paste anywhere. Free online cursive text generator.',
  keywords: 'cursive text, cursive font, script text',
  openGraph: { images: ['/api/og?title=Cursive%20Text%20Generator&description=Convert%20your%20text%20to%20beautiful%20cursive%20and%20script%20fonts.%20Copy%20%26%20paste%20anywhere.%20Free%20online%20cursive%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Cursive Text Generator',
  url: 'https://tools4free.site/cursive-text',
  description: 'Convert your text to beautiful cursive and script fonts. Copy & paste anywhere. Free online cursive text generator.',
  category: 'UtilityApplication',
})

export default function CursiveTextPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FancyTextClient />
    </>
  )
}
