import type { Metadata } from 'next'
import UnitConverterClient from '../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'CM to Inches Converter',
  description: 'Convert centimeters to inches instantly. Free cm to inches calculator. No signup, works offline.',
  keywords: 'cm to inches, centimeters to inches',
  openGraph: { images: ['/api/og?title=CM%20to%20Inches%20Converter&description=Convert%20centimeters%20to%20inches%20instantly.%20Free%20cm%20to%20inches%20calculator.%20No%20signup%2C%20works%20offline.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'CM to Inches Converter',
  url: 'https://tools4free.site/cm-to-inches',
  description: 'Convert centimeters to inches instantly. Free cm to inches calculator. No signup, works offline.',
  category: 'UtilityApplication',
})

export default function CmToInchesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UnitConverterClient />
    </>
  )
}
