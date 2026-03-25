import type { Metadata } from 'next'
import Client from '../../heart-rate-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Herzfrequenzzonen Rechner Kostenlos',
  description: 'Kostenloser Herzfrequenzzonen Rechner. Fettverbrennungszone, Cardio und VO2max Zonen. Karvonen und einfache Methode.',
  keywords: 'Herzfrequenz, Herzfrequenzzonen, Fettverbrennungszone, Cardio Zone, VO2max, Karvonen Formel, maximale Herzfrequenz',
  openGraph: { images: ['/api/og?title=Herzfrequenzzonen%20Rechner&description=Fettverbrennungszone%2C%20Cardio%20und%20VO2max%20Zonen.%20Karvonen%20und%20einfache%20Methode'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Herzfrequenzzonen Rechner',
  url: 'https://tools4free.site/de/herzfrequenz-rechner',
  description: 'Kostenloser Herzfrequenzzonen Rechner. Fettverbrennungszone, Cardio und VO2max Zonen. Karvonen und einfache Methode.',
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
