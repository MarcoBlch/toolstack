import type { Metadata } from 'next'
import Client from '../../water-intake/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calcul Besoin en Eau — Hydratation Journalière Gratuit',
  description: "Calculateur d'hydratation gratuit. Combien d'eau devez-vous boire par jour ? Basé sur le poids, l'activité physique et le climat.",
  keywords: "besoin en eau, hydratation, combien d'eau boire, eau par jour, calculateur hydratation, apport hydrique",
  openGraph: { images: ["/api/og?title=Calcul%20Besoin%20en%20Eau&description=Combien%20d'eau%20devez-vous%20boire%20par%20jour"] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul Besoin en Eau',
  url: 'https://tools4free.site/fr/calcul-hydratation',
  description: "Calculateur d'hydratation gratuit. Combien d'eau devez-vous boire par jour ? Basé sur le poids, l'activité physique et le climat.",
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
