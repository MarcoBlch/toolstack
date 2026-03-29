import type { Metadata } from 'next'
import Client from '../../days-until/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Quantos Dias Faltam para o Natal? Calculadora Grátis',
  description: 'Quantos dias faltam para o Natal, Ano Novo, Halloween, Páscoa ou qualquer data? Calculadora de dias grátis com dias úteis incluídos.',
  keywords: 'quantos dias faltam para o Natal, dias até Ano Novo, calculadora dias, dias até uma data',
  alternates: getAlternates('/days-until'),
  openGraph: { images: ['/api/og?title=Quantos%20Dias%20Faltam&description=Dias%20at%C3%A9%20o%20Natal%2C%20Ano%20Novo%20e%20mais.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Quantos Dias Faltam',
  url: 'https://tools4free.site/pt/quantos-dias-faltam',
  description: 'Quantos dias faltam para o Natal, Ano Novo, Halloween ou qualquer data personalizada?',
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
