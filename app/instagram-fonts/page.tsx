import type { Metadata } from 'next'
import FancyTextClient from '../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Instagram Fonts Generator — Cool Bio Fonts & Stylish Text',
  description: 'Generate cool fonts for your Instagram bio, captions & stories. Copy & paste stylish text instantly. Free, no signup.',
  keywords: 'instagram fonts, instagram bio fonts, ig fonts',
  openGraph: { images: ['/api/og?title=Instagram%20Fonts%20Generator&description=Generate%20cool%20fonts%20for%20your%20Instagram%20bio%2C%20captions%20%26%20stories.%20Copy%20%26%20paste%20stylish%20text%20instantly.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Instagram Fonts Generator',
  url: 'https://tools4free.site/instagram-fonts',
  description: 'Generate cool fonts for your Instagram bio, captions & stories. Copy & paste stylish text instantly. Free, no signup.',
  category: 'UtilityApplication',
})

export default function InstagramFontsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FancyTextClient />
    </>
  )
}
