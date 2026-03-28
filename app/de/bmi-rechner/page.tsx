import type { Metadata } from 'next'
import Client from '../../bmi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/bmi-calculator'),
  title: 'BMI Rechner — Body Mass Index Berechnen Kostenlos',
  description: 'Berechne deinen BMI (Body Mass Index). Metrisch und imperial. Gewichtskategorie und gesunder Bereich. Kostenlos.',
  keywords: 'BMI Rechner, BMI berechnen, Body Mass Index, BMI Frau, BMI Mann, BMI Rechner kostenlos, Idealgewicht berechnen, Übergewicht',
  openGraph: { images: ['/api/og?title=BMI%20Rechner&description=Berechne%20deinen%20BMI%20(Body%20Mass%20Index).%20Metrisch%20und%20imperial.%20Gewichtskategorie%20und%20gesunder%20Bereich'] },
}

const jsonLd = generateToolJsonLd({
  name: 'BMI Rechner',
  url: 'https://tools4free.site/de/bmi-rechner',
  description: 'Berechne deinen BMI (Body Mass Index). Metrisch und imperial. Gewichtskategorie und gesunder Bereich. Kostenlos.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
