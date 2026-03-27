import type { Metadata } from 'next'
import UnitConverterClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Unit Converter — Free Online Conversion Calculator',
  description: 'Convert between any units instantly: length, weight, temperature, volume, area, speed, data, time. Free, fast, no signup.',
  keywords: 'unit converter, kg to lbs, cm to inches, celsius to fahrenheit, miles to km, oz to ml, unit conversion calculator',
  openGraph: { images: ['/api/og?title=Unit%20Converter&description=Convert%20between%20any%20units%20instantly%3A%20length%2C%20weight%2C%20temperature%2C%20volume%2C%20area%2C%20speed%2C%20data%2C%20time.%20F'] },
  alternates: getAlternates('/unit-converter'),
}

const jsonLd = generateToolJsonLd({
  name: 'Unit Converter',
  url: 'https://tools4free.site/unit-converter',
  description: 'Convert between any units instantly: length, weight, temperature, volume, area, speed, data, time. Free, fast, no signup.',
  category: 'UtilityApplication',
})

export default function UnitConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UnitConverterClient />
    </>
  )
}
