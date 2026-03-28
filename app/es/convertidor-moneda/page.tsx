import type { Metadata } from 'next'
import Client from '../../currency-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Convertidor de Moneda — Tipo de Cambio Gratis Online',
  description: 'Convierte entre 30+ monedas del mundo. EUR, USD, GBP, MXN, ARS, COP. Tasas aproximadas. Gratis.',
  keywords: 'convertidor moneda, tipo de cambio, euro dolar, conversión moneda, cambio de divisas, dolar a euro',
  openGraph: { images: ['/api/og?title=Convertidor%20de%20Moneda&description=Convierte%20entre%2030%2B%20monedas%20del%20mundo.%20EUR%2C%20USD%2C%20GBP%2C%20MXN%2C%20ARS%2C%20COP.%20Tasas%20aproximadas.%20Gratis.'] },
  alternates: getAlternates('/currency-converter'),
}

const jsonLd = generateToolJsonLd({
  name: 'Convertidor de Moneda',
  url: 'https://tools4free.site/es/convertidor-moneda',
  description: 'Convierte entre 30+ monedas del mundo. EUR, USD, GBP, MXN, ARS, COP. Tasas aproximadas. Gratis.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
