import type { Metadata } from 'next'
import Client from '../../vat-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/vat-calculator'),
  title: 'Calculadora de Imposto — Calcular ICMS e IVA Online Grátis',
  description: 'Calcule impostos facilmente. Preço com e sem imposto. ICMS, IVA, ISS. Alíquotas por estado. Grátis.',
  keywords: 'calculadora imposto, calcular icms, calculadora iva, preço sem imposto, alíquota icms, calcular imposto',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Imposto&description=Calcule%20impostos%20facilmente.%20Pre%C3%A7o%20com%20e%20sem%20imposto.%20ICMS%2C%20IVA%2C%20ISS.%20Al%C3%ADquotas%20por%20estado.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Imposto',
  url: 'https://tools4free.site/pt/calculadora-imposto',
  description: 'Calcule impostos facilmente. Preço com e sem imposto. ICMS, IVA, ISS. Alíquotas por estado. Grátis.',
  category: 'FinanceApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
