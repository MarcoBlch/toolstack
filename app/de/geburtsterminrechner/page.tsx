import type { Metadata } from 'next'
import Client from '../../due-date-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/due-date-calculator'),
  title: 'Geburtsterminrechner — Entbindungstermin Berechnen Kostenlos',
  description: 'Kostenloser Geburtsterminrechner. Berechne deinen voraussichtlichen Entbindungstermin nach letzter Periode, Empfängnisdatum oder IVF. Trimester und Schwangerschaftswoche.',
  keywords: 'Geburtsterminrechner, Entbindungstermin, Geburtstermin berechnen, Schwangerschaftswoche, Schwangerschaftsrechner',
  openGraph: { images: ['/api/og?title=Geburtsterminrechner&description=Berechne%20deinen%20voraussichtlichen%20Entbindungstermin%20nach%20letzter%20Periode%2C%20Empf%C3%A4ngnisdatum%20oder%20IVF'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Geburtsterminrechner',
  url: 'https://tools4free.site/de/geburtsterminrechner',
  description: 'Kostenloser Geburtsterminrechner. Berechne deinen voraussichtlichen Entbindungstermin nach letzter Periode, Empfängnisdatum oder IVF. Trimester und Schwangerschaftswoche.',
  category: 'HealthApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
