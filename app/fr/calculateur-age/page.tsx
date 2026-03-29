import type { Metadata } from 'next'
import Client from '../../age-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculateur d\'Âge — Quel Âge Ai-Je ? Gratuit',
  description: 'Calculateur d\'âge gratuit. Calculez votre âge exact en années, mois, jours et heures. Signe astrologique, zodiaque chinois et compte à rebours jusqu\'à votre prochain anniversaire.',
  keywords: 'calculateur âge, quel âge ai-je, calcul âge, anniversaire, zodiaque, âge en jours',
  alternates: getAlternates('/age-calculator'),
  openGraph: { images: ['/api/og?title=Calculateur%20d%27%C3%82ge&description=Calculez%20votre%20%C3%A2ge%20exact%20en%20ann%C3%A9es%2C%20mois%2C%20jours.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculateur d\'Âge',
  url: 'https://tools4free.site/fr/calculateur-age',
  description: 'Calculateur d\'âge gratuit. Calculez votre âge exact en années, mois, jours et heures.',
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
