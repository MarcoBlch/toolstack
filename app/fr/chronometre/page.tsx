import type { Metadata } from 'next'
import Client from '../../stopwatch/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Chronomètre en Ligne Gratuit — Précision Milliseconde',
  description: 'Chronomètre en ligne gratuit avec précision à la milliseconde. Enregistrez des temps de tours, voyez le meilleur tour et la moyenne. Sans téléchargement.',
  keywords: 'chronomètre en ligne, chronomètre gratuit, chronomètre milliseconde, temps de tour, chrono',
  alternates: getAlternates('/stopwatch'),
  openGraph: { images: ['/api/og?title=Chronom%C3%A8tre%20en%20Ligne&description=Pr%C3%A9cision%20milliseconde%20avec%20temps%20de%20tours.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Chronomètre en Ligne',
  url: 'https://tools4free.site/fr/chronometre',
  description: 'Chronomètre en ligne gratuit avec précision à la milliseconde et temps de tours.',
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
