import type { Metadata } from 'next'
import FancyTextClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Fancy Text Generator ✦ Cool Fonts for Instagram, TikTok & Bio',
  description: 'Free fancy text generator. Convert text into 20+ Unicode font styles — bold, italic, cursive, bubble, aesthetic & more. Copy & paste anywhere. No signup.',
  keywords: 'fancy text generator, instagram fonts, cool text, font changer, unicode text, aesthetic text, cursive text generator',
  openGraph: { images: ['/api/og?title=Fancy%20Text%20Generator%20%E2%9C%A6%20Cool%20Fonts%20for%20Instagram%2C%20TikTok%20%26%20Bio&description=Free%20fancy%20text%20generator.%20Convert%20text%20into%2020%2B%20Unicode%20font%20styles%20%E2%80%94%20bold%2C%20italic%2C%20cursive%2C%20bubble'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Fancy Text Generator ✦ Cool Fonts for Instagram, TikTok & Bio',
  url: 'https://tools4free.site/fancy-text',
  description: 'Free fancy text generator. Convert text into 20+ Unicode font styles — bold, italic, cursive, bubble, aesthetic & more. Copy & paste anywhere. No sign',
  category: 'UtilityApplication',
})

export default function FancyTextPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FancyTextClient />
    </>
  )
}
