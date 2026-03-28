import type { Metadata } from 'next'
import Client from '../../profit-margin-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Gewinnmargenrechner — Gewinnmarge Berechnen Kostenlos',
  alternates: getAlternates('/profit-margin-calculator'),
  description: 'Berechnen Sie Ihre Gewinnmarge, Bruttomarge und Nettomarge. Bestimmen Sie den optimalen Verkaufspreis zur Gewinnmaximierung. Kostenlos.',
  keywords: 'gewinnmargenrechner, gewinnmarge berechnen, bruttomarge, nettomarge, rentabilität, verkaufspreis berechnen',
  openGraph: { images: ['/api/og?title=Gewinnmargenrechner&description=Berechnen%20Sie%20Ihre%20Gewinnmarge%2C%20Brutto-%20und%20Nettomarge.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gewinnmargenrechner',
  url: 'https://tools4free.site/de/gewinnmargenrechner',
  description: 'Berechnen Sie Ihre Gewinnmarge, Bruttomarge und Nettomarge. Bestimmen Sie den optimalen Verkaufspreis zur Gewinnmaximierung. Kostenlos.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
