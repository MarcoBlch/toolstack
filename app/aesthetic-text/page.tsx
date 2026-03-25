import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Aesthetic Text Generator — Vaporwave & Spaced Fonts',
  description: 'Create aesthetic vaporwave text with wide spacing. Copy & paste stylish spaced-out text for social media. Free generator.',
  keywords: 'aesthetic text, vaporwave text, spaced text',
  openGraph: { images: ['/api/og?title=Aesthetic%20Text%20Generator&description=Create%20aesthetic%20vaporwave%20text%20with%20wide%20spacing.%20Copy%20%26%20paste%20stylish%20spaced-out%20text%20for%20social%20m'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Aesthetic Text Generator',
  url: 'https://tools4free.site/aesthetic-text',
  description: 'Create aesthetic vaporwave text with wide spacing. Copy & paste stylish spaced-out text for social media. Free generator.',
  category: 'UtilityApplication',
})

export default function AestheticTextPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FancyTextClient />
    </>
  )
}
