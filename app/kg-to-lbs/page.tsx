import type { Metadata } from 'next'
import UnitConverterClient from '../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Kg to Lbs Converter',
  description: 'Convert kilograms to pounds instantly. Free kg to lbs calculator. No signup, works offline.',
  keywords: 'kg to lbs, kilograms to pounds',
  openGraph: { images: ['/api/og?title=Kg%20to%20Lbs%20Converter&description=Convert%20kilograms%20to%20pounds%20instantly.%20Free%20kg%20to%20lbs%20calculator.%20No%20signup%2C%20works%20offline.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Kg to Lbs Converter',
  url: 'https://tools4free.site/kg-to-lbs',
  description: 'Convert kilograms to pounds instantly. Free kg to lbs calculator. No signup, works offline.',
  category: 'UtilityApplication',
})

export default function KgToLbsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UnitConverterClient />
    </>
  )
}
