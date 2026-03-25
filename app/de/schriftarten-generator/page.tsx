import type { Metadata } from 'next'
import Client from '../../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Schriftarten Generator — Coole Schriften für Instagram & TikTok',
  description: 'Verwandle deinen Text in 20+ Unicode-Schriftarten: fett, kursiv, Schreibschrift, ästhetisch. Kopieren und überall einfügen. Kostenlos.',
  keywords: 'Schriftarten Generator, Instagram Schriftarten, coole Schriften, Schrift ändern, Text Generator, Unicode Schrift, ausgefallene Schriften',
  openGraph: { images: ['/api/og?title=Schriftarten%20Generator&description=Verwandle%20deinen%20Text%20in%2020%2B%20Unicode-Schriftarten%3A%20fett%2C%20kursiv%2C%20Schreibschrift%2C%20%C3%A4sthetisch.%20Kopiere'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Schriftarten Generator',
  url: 'https://tools4free.site/de/schriftarten-generator',
  description: 'Verwandle deinen Text in 20+ Unicode-Schriftarten: fett, kursiv, Schreibschrift, ästhetisch. Kopieren und überall einfügen. Kostenlos.',
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
