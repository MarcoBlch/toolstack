import type { Metadata } from 'next'
import Client from '../../screenshot-mockup/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Screenshot Mockup — Browser Rahmen Generator Kostenlos',
  description: 'Rahme deine Screenshots in Browser- oder Geräte-Mockups. Farbverläufe als Hintergrund. PNG Download. Kostenlos.',
  keywords: 'Screenshot Mockup, Browser Mockup, Geräte Rahmen, Mockup Generator, Screenshot verschönern, Browser Frame',
  openGraph: { images: ['/api/og?title=Screenshot%20Mockup&description=Rahme%20deine%20Screenshots%20in%20Browser-%20oder%20Ger%C3%A4te-Mockups.%20Farbverl%C3%A4ufe%20als%20Hintergrund.%20PNG%20Download.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Screenshot Mockup',
  url: 'https://tools4free.site/de/screenshot-mockup',
  description: 'Rahme deine Screenshots in Browser- oder Geräte-Mockups. Farbverläufe als Hintergrund. PNG Download. Kostenlos.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
