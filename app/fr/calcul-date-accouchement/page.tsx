import type { Metadata } from 'next'
import Client from '../../due-date-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: "Calcul Date d'Accouchement — Date Prévue Gratuit",
  alternates: getAlternates('/due-date-calculator'),
  description: "Calcul de date d'accouchement gratuit. Estimez votre date prévue d'accouchement selon vos dernières règles, date de conception ou FIV. Trimestres et âge gestationnel.",
  keywords: 'date accouchement, calcul date prévue, date prévue accouchement, âge gestationnel, semaines de grossesse, calculateur grossesse',
  openGraph: { images: ["/api/og?title=Calcul%20Date%20d'Accouchement&description=Estimez%20votre%20date%20pr%C3%A9vue%20d'accouchement%20selon%20vos%20derni%C3%A8res%20r%C3%A8gles"] },
}

const jsonLd = generateToolJsonLd({
  name: "Calcul Date d'Accouchement",
  url: 'https://tools4free.site/fr/calcul-date-accouchement',
  description: "Calcul de date d'accouchement gratuit. Estimez votre date prévue d'accouchement selon vos dernières règles, date de conception ou FIV. Trimestres et âge gestationnel.",
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
