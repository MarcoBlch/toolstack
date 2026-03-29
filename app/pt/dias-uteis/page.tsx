import type { Metadata } from 'next'
import Client from '../../work-days-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Dias Úteis Grátis',
  description: 'Calcule os dias úteis entre duas datas excluindo fins de semana e feriados. Adicione dias úteis a uma data. Feriados do Brasil e outros países incluídos.',
  keywords: 'calculadora dias úteis, dias úteis entre datas, dias úteis, feriados trabalho',
  alternates: getAlternates('/work-days-calculator'),
  openGraph: { images: ['/api/og?title=Dias%20%C3%9Ateis&description=Dias%20%C3%BAteis%20entre%20datas.%20Feriados%20inclu%C3%ADdos.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Dias Úteis',
  url: 'https://tools4free.site/pt/dias-uteis',
  description: 'Calcule os dias úteis entre duas datas excluindo fins de semana e feriados.',
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
