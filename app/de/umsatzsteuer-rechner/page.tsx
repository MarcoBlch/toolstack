import type { Metadata } from 'next'
import Client from '../../sales-tax-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Umsatzsteuer Rechner — Mehrwertsteuer Berechnen Kostenlos',
  alternates: getAlternates('/sales-tax-calculator'),
  description: 'Berechnen Sie die Umsatzsteuer und Mehrwertsteuer auf Ihre Einkäufe. Erhalten Sie den Steuerbetrag und den Bruttopreis. Kostenlos.',
  keywords: 'umsatzsteuer rechner, mehrwertsteuer berechnen, mwst rechner, brutto netto, steuer berechnen, umsatzsteuer',
  openGraph: { images: ['/api/og?title=Umsatzsteuer%20Rechner&description=Berechnen%20Sie%20Umsatzsteuer%20und%20Mehrwertsteuer.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Umsatzsteuer Rechner',
  url: 'https://tools4free.site/de/umsatzsteuer-rechner',
  description: 'Berechnen Sie die Umsatzsteuer und Mehrwertsteuer auf Ihre Einkäufe. Erhalten Sie den Steuerbetrag und den Bruttopreis. Kostenlos.',
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
