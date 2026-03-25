import type { Metadata } from 'next'
import UnitConverterClient from '../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Miles to Km Converter',
  description: 'Convert miles to kilometers instantly. Free miles to km calculator. No signup, works offline.',
  keywords: 'miles to km, miles to kilometers',
  openGraph: { images: ['/api/og?title=Miles%20to%20Km%20Converter&description=Convert%20miles%20to%20kilometers%20instantly.%20Free%20miles%20to%20km%20calculator.%20No%20signup%2C%20works%20offline.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Miles to Km Converter',
  url: 'https://tools4free.site/miles-to-km',
  description: 'Convert miles to kilometers instantly. Free miles to km calculator. No signup, works offline.',
  category: 'UtilityApplication',
})

export default function MilesToKmPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UnitConverterClient />
    </>
  )
}
