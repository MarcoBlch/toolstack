import type { Metadata } from 'next'
import Client from '../../heart-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Calcul Zones de Fréquence Cardiaque Gratuit',
  description: 'Calculateur de zones de fréquence cardiaque gratuit. Zones de brûlage de graisse, cardio et VO2 max. Méthodes Karvonen et simple.',
  keywords: 'fréquence cardiaque, zones cardiaques, zone brûlage graisse, zone cardio, VO2 max, méthode Karvonen, FCmax',
  openGraph: { images: ['/api/og?title=Zones%20de%20Fr%C3%A9quence%20Cardiaque&description=Zones%20de%20br%C3%BBlage%20de%20graisse%2C%20cardio%20et%20VO2%20max'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calcul Zones de Fréquence Cardiaque',
  url: 'https://tools4free.site/fr/frequence-cardiaque',
  description: 'Calculateur de zones de fréquence cardiaque gratuit. Zones de brûlage de graisse, cardio et VO2 max. Méthodes Karvonen et simple.',
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
