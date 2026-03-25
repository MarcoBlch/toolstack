import type { Metadata } from 'next'
import MockupClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Screenshot Mockup — Free Browser & Device Frame Generator',
  description: 'Drop a screenshot, frame it in a beautiful browser or device mockup. Download as PNG. Free, instant, no signup.',
  keywords: 'screenshot mockup, browser mockup, device frame, mockup generator, screenshot beautifier, browser frame',
  openGraph: { images: ['/api/og?title=Screenshot%20Mockup&description=Drop%20a%20screenshot%2C%20frame%20it%20in%20a%20beautiful%20browser%20or%20device%20mockup.%20Download%20as%20PNG.%20Free%2C%20instant%2C'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Screenshot Mockup',
  url: 'https://tools4free.site/screenshot-mockup',
  description: 'Drop a screenshot, frame it in a beautiful browser or device mockup. Download as PNG. Free, instant, no signup.',
  category: 'DesignApplication',
})

export default function MockupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MockupClient />
    </>
  )
}
