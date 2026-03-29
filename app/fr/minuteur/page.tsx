import type { Metadata } from 'next'
import Client from '../../timer/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Minuteur en Ligne Gratuit — Alarme Sonore',
  description: 'Minuteur en ligne gratuit jusqu\'à 99 heures. Préréglages rapides : 1, 2, 3, 5, 10, 15, 30 minutes. Alarme sonore à la fin. Aucune application nécessaire.',
  keywords: 'minuteur en ligne, minuteur gratuit, timer online, compte à rebours minuteur, alarme minute',
  alternates: getAlternates('/timer'),
  openGraph: { images: ['/api/og?title=Minuteur%20en%20Ligne&description=Minuteur%20jusqu%27%C3%A0%2099%20heures.%20Alarme%20sonore.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Minuteur en Ligne',
  url: 'https://tools4free.site/fr/minuteur',
  description: 'Minuteur en ligne gratuit jusqu\'à 99 heures avec alarme sonore.',
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
