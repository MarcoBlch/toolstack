import type { Metadata } from 'next'
import Client from '../../world-clock/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Weltzeituhr — Aktuelle Uhrzeit Weltweit Kostenlos',
  description: 'Weltzeituhr kostenlos mit der aktuellen Uhrzeit live in New York, London, Tokio, Paris, Sydney und über 50 Städten. Tag/Nacht-Anzeige.',
  keywords: 'weltzeituhr, aktuelle uhrzeit, zeitzone, uhrzeit new york, uhrzeit london, internationale uhrzeit',
  alternates: getAlternates('/world-clock'),
  openGraph: { images: ['/api/og?title=Weltzeituhr&description=Aktuelle%20Uhrzeit%20live%20in%20%C3%BCber%2050%20St%C3%A4dten.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Weltzeituhr',
  url: 'https://tools4free.site/de/weltzeituhr',
  description: 'Weltzeituhr kostenlos mit der aktuellen Uhrzeit live in über 50 Städten weltweit.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
