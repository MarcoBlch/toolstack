import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'World Clock — Current Time in Cities Worldwide',
  description: 'Free world clock showing live current time in New York, London, Tokyo, Paris, Sydney, and 50+ cities worldwide. Add and remove cities. Day/night indicator.',
  keywords: 'world clock, current time in New York, current time in London, current time in Tokyo, world time zones, international clock',
  alternates: getAlternates('/world-clock'),
  openGraph: { images: ['/api/og?title=World%20Clock&description=Live%20current%20time%20in%20New%20York%2C%20London%2C%20Tokyo%2C%20Paris%2C%20Sydney%20%26%20more.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'World Clock',
  url: 'https://tools4free.site/world-clock',
  description: 'Free world clock showing live current time in 50+ cities worldwide. Add and remove cities.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
