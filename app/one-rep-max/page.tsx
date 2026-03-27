import type { Metadata } from 'next'
import OneRepMaxClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free 1RM Calculator — One Rep Max Estimate & Training Percentages',
  description: 'Free one rep max calculator. Estimate your 1RM using Epley, Brzycki, and other formulas. Training percentage chart.',
  keywords: '1rm calculator, one rep max calculator, one rep max, epley formula, brzycki formula, max weight calculator, strength calculator, training percentages',
  openGraph: { images: ['/api/og?title=Free%201RM%20Calculator&description=Estimate%20your%201RM%20using%20Epley%2C%20Brzycki%2C%20and%20other%20formulas'] },
  alternates: getAlternates('/one-rep-max'),
}

const jsonLd = generateToolJsonLd({
  name: 'Free 1RM Calculator',
  url: 'https://tools4free.site/one-rep-max',
  description: 'Free one rep max calculator. Estimate your 1RM using Epley, Brzycki, and other formulas. Training percentage chart.',
  category: 'HealthApplication',
})

export default function OneRepMaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <OneRepMaxClient />
    </>
  )
}
