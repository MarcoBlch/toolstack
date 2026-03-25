import type { Metadata } from 'next'
import BodyFatClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Free Body Fat Calculator — US Navy Method, Fat & Lean Mass',
  description: 'Free body fat calculator. US Navy method. Calculate body fat percentage, fat mass, and lean mass.',
  keywords: 'body fat calculator, body fat percentage, US Navy body fat, fat mass, lean mass, body composition, body fat test',
  openGraph: { images: ['/api/og?title=Free%20Body%20Fat%20Calculator&description=US%20Navy%20method.%20Calculate%20body%20fat%20percentage%2C%20fat%20mass%2C%20lean%20mass'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Body Fat Calculator',
  url: 'https://tools4free.site/body-fat-calculator',
  description: 'Free body fat calculator. US Navy method. Calculate body fat percentage, fat mass, and lean mass.',
  category: 'HealthApplication',
})

export default function BodyFatPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BodyFatClient />
    </>
  )
}
