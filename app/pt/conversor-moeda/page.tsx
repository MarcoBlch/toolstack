import type { Metadata } from 'next'
import Client from '../../currency-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/currency-converter'),
  title: 'Conversor de Moeda — Taxa de Câmbio Grátis Online',
  description: 'Converta entre 30+ moedas do mundo. EUR, USD, BRL, GBP, JPY. Taxas aproximadas. Grátis.',
  keywords: 'conversor moeda, taxa de câmbio, dólar para real, euro para real, conversão moeda, câmbio hoje',
  openGraph: { images: ['/api/og?title=Conversor%20de%20Moeda&description=Converta%20entre%2030%2B%20moedas%20do%20mundo.%20EUR%2C%20USD%2C%20BRL%2C%20GBP%2C%20JPY.%20Taxas%20aproximadas.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Conversor de Moeda',
  url: 'https://tools4free.site/pt/conversor-moeda',
  description: 'Converta entre 30+ moedas do mundo. EUR, USD, BRL, GBP, JPY. Taxas aproximadas. Grátis.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
