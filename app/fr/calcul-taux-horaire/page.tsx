import type { Metadata } from 'next'
import Client from '../../hourly-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calcul Taux Horaire — Tarif Freelance Gratuit',
  alternates: getAlternates('/hourly-rate-calculator'),
  description: 'Calculez votre taux horaire idéal en tant que freelance ou consultant. Déterminez le tarif qui couvre vos charges et objectifs de revenus. Gratuit.',
  keywords: 'calcul taux horaire, tarif freelance, taux horaire consultant, prix heure, tarif indépendant, calculer tarif journalier',
  openGraph: { images: ['/api/og?title=Calcul%20Taux%20Horaire&description=Calculez%20votre%20taux%20horaire%20id%C3%A9al%20en%20freelance.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul Taux Horaire',
  url: 'https://tools4free.site/fr/calcul-taux-horaire',
  description: 'Calculez votre taux horaire idéal en tant que freelance ou consultant. Déterminez le tarif qui couvre vos charges et objectifs de revenus. Gratuit.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
