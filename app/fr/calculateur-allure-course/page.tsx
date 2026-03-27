import type { Metadata } from 'next'
import Client from '../../pace-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: "Calculateur d'Allure Course à Pied Gratuit",
  alternates: getAlternates('/pace-calculator'),
  description: "Calculateur d'allure de course gratuit. Calculez votre allure, temps ou distance. Temps de passage pour 5K, 10K, semi-marathon, marathon.",
  keywords: 'allure course, calculateur allure, pace running, temps de passage, 5K, 10K, semi-marathon, marathon, course à pied',
  openGraph: { images: ["/api/og?title=Calculateur%20d'Allure%20Course&description=Calculez%20votre%20allure%2C%20temps%20ou%20distance.%20Temps%20de%20passage%20pour%205K%2C%2010K%2C%20semi-marathon%2C%20marathon"] },
}

const jsonLd = generateToolJsonLd({
  name: "Calculateur d'Allure Course à Pied",
  url: 'https://tools4free.site/fr/calculateur-allure-course',
  description: "Calculateur d'allure de course gratuit. Calculez votre allure, temps ou distance. Temps de passage pour 5K, 10K, semi-marathon, marathon.",
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
