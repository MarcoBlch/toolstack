import type { Metadata } from 'next'
import UnitConverterClient from '../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Celsius to Fahrenheit Converter',
  description: 'Convert Celsius to Fahrenheit instantly. Free temperature converter. No signup, works offline.',
  keywords: 'celsius to fahrenheit, c to f',
  openGraph: { images: ['/api/og?title=Celsius%20to%20Fahrenheit%20Converter&description=Convert%20Celsius%20to%20Fahrenheit%20instantly.%20Free%20temperature%20converter.%20No%20signup%2C%20works%20offline.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Celsius to Fahrenheit Converter',
  url: 'https://tools4free.site/celsius-to-fahrenheit',
  description: 'Convert Celsius to Fahrenheit instantly. Free temperature converter. No signup, works offline.',
  category: 'UtilityApplication',
})

export default function CelsiusToFahrenheitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UnitConverterClient />
    </>
  )
}
