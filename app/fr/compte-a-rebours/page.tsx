import type { Metadata } from 'next'
import Client from '../../countdown/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Compte à Rebours — Noël, Nouvel An & Toute Date Gratuit',
  description: 'Compte à rebours en direct jusqu\'à Noël, Nouvel An, Halloween ou toute date personnalisée. Jours, heures, minutes et secondes. Gratuit.',
  keywords: 'compte à rebours, compte à rebours Noël, compte à rebours Nouvel An, countdown, chrono',
  alternates: getAlternates('/countdown'),
  openGraph: { images: ['/api/og?title=Compte%20%C3%A0%20Rebours&description=Compte%20%C3%A0%20rebours%20en%20direct.%20No%C3%ABl%2C%20Nouvel%20An%20et%20plus.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Compte à Rebours',
  url: 'https://tools4free.site/fr/compte-a-rebours',
  description: 'Compte à rebours en direct jusqu\'à Noël, Nouvel An ou toute date personnalisée.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
