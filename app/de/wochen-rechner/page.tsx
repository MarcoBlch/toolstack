import type { Metadata } from 'next'
import Client from '../../weeks-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Wochen Rechner Zwischen Daten Kostenlos',
  description: 'Wochen zwischen zwei Daten berechnen oder Datum X Wochen in der Zukunft finden. Kostenlos, sofortiges Ergebnis.',
  keywords: 'wochen rechner, wochen zwischen daten, wie viele wochen, wochen berechnen, datum plus wochen',
  alternates: getAlternates('/weeks-calculator'),
  openGraph: { images: ['/api/og?title=Wochen%20Rechner&description=Wochen%20zwischen%20zwei%20Daten%20oder%20Wochen%20addieren.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Wochen Rechner',
  url: 'https://tools4free.site/de/wochen-rechner',
  description: 'Wochen zwischen zwei Daten berechnen oder ein Datum X Wochen in der Zukunft finden.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
