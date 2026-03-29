import type { Metadata } from 'next'
import Client from '../../date-difference/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora Diferença entre Datas Grátis',
  description: 'Calcule a diferença exata entre duas datas em dias, semanas, meses e anos. Inclui dias úteis. Grátis, sem cadastro.',
  keywords: 'diferença entre datas, calculadora datas, dias entre datas, semanas entre datas, dias úteis',
  alternates: getAlternates('/date-difference'),
  openGraph: { images: ['/api/og?title=Diferen%C3%A7a%20de%20Datas&description=Dias%2C%20semanas%2C%20meses%20entre%20duas%20datas.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora Diferença de Datas',
  url: 'https://tools4free.site/pt/diferenca-datas',
  description: 'Calcule a diferença exata entre duas datas em dias, semanas, meses e anos.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
