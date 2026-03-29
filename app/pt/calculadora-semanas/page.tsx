import type { Metadata } from 'next'
import Client from '../../weeks-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Semanas entre Datas Grátis',
  description: 'Calcule quantas semanas há entre duas datas ou encontre uma data X semanas no futuro. Grátis, resultado instantâneo.',
  keywords: 'calculadora semanas, semanas entre datas, quantas semanas, somar semanas a uma data',
  alternates: getAlternates('/weeks-calculator'),
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Semanas&description=Semanas%20entre%20duas%20datas%20ou%20somar%20semanas.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Semanas',
  url: 'https://tools4free.site/pt/calculadora-semanas',
  description: 'Calcule quantas semanas há entre duas datas ou encontre uma data X semanas no futuro.',
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
