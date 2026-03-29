import type { Metadata } from 'next'
import Client from '../../roi-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'ROI Rechner — Kapitalrendite Berechnen Kostenlos',
  alternates: getAlternates('/roi-calculator'),
  description: 'Berechnen Sie Ihre Kapitalrendite (ROI). Analysieren Sie die Rentabilität Ihrer Investitionen und vergleichen Sie verschiedene Möglichkeiten. Kostenlos.',
  keywords: 'roi rechner, kapitalrendite, return on investment, roi berechnen, investitionsrendite, rendite berechnen',
  openGraph: { images: ['/api/og?title=ROI%20Rechner&description=Berechnen%20Sie%20Ihre%20Kapitalrendite%20(ROI).%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'ROI Rechner',
  url: 'https://tools4free.site/de/roi-rechner',
  description: 'Berechnen Sie Ihre Kapitalrendite (ROI). Analysieren Sie die Rentabilität Ihrer Investitionen und vergleichen Sie verschiedene Möglichkeiten. Kostenlos.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
