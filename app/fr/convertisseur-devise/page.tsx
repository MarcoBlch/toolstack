import type { Metadata } from 'next'
import Client from '../../currency-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'
import { getRates } from '@/lib/getRates'

export const metadata: Metadata = {
  title: 'Convertisseur de Devises — Taux de Change Gratuit en Ligne',
  alternates: getAlternates('/currency-converter'),
  description: 'Convertissez entre 30+ devises mondiales. EUR, USD, GBP, CHF, MAD, XOF. Taux approximatifs. Gratuit.',
  keywords: 'convertisseur devise, taux de change, euro dollar, conversion monnaie, convertisseur monnaie, change euro livre',
  openGraph: { images: ['/api/og?title=Convertisseur%20de%20Devises&description=Convertissez%20entre%2030%2B%20devises%20mondiales.%20EUR%2C%20USD%2C%20GBP%2C%20CHF%2C%20MAD%2C%20XOF.%20Taux%20approximatifs.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Convertisseur de Devises',
  url: 'https://tools4free.site/fr/convertisseur-devise',
  description: 'Convertissez entre 30+ devises mondiales. EUR, USD, GBP, CHF, MAD, XOF. Taux approximatifs. Gratuit.',
  category: 'FinanceApplication',
})

export default async function Page() {
  const { rates, date } = await getRates()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" rates={rates} rateDate={date} />
    </>
  )
}
