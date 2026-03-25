import type { Metadata } from 'next'
import FaviconClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Favicon Generator — Free Icon Maker from Text or Image',
  description: 'Generate favicons from a letter, emoji, or uploaded image. Download all sizes (16, 32, 48, 180, 512). Free, instant.',
  keywords: 'favicon generator, favicon maker, ico generator, favicon from text, app icon generator, favicon creator',
  openGraph: { images: ['/api/og?title=Favicon%20Generator&description=Generate%20favicons%20from%20a%20letter%2C%20emoji%2C%20or%20uploaded%20image.%20Download%20all%20sizes%20(16%2C%2032%2C%2048%2C%20180%2C%20512)'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Favicon Generator',
  url: 'https://tools4free.site/favicon-generator',
  description: 'Generate favicons from a letter, emoji, or uploaded image. Download all sizes (16, 32, 48, 180, 512). Free, instant.',
  category: 'DesignApplication',
})

export default function FaviconPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaviconClient />
    </>
  )
}
