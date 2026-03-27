import type { Metadata } from 'next'
import Client from '../../gradient-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/gradient-generator'),
  title: 'Gerador de Gradiente CSS Grátis',
  description: 'Crie lindos gradientes CSS de forma visual. Escolha cores, ajuste ângulos, copie o código CSS. Grátis.',
  keywords: 'gerador gradiente css, degradê css, gradient css, criar gradiente',
  openGraph: { images: ['/api/og?title=Gerador%20de%20Gradiente%20CSS%20Gr%C3%A1tis&description=Crie%20lindos%20gradientes%20CSS%20de%20forma%20visual.%20Escolha%20cores%2C%20ajuste%20%C3%A2ngulos%2C%20copie%20o%20c%C3%B3digo%20CSS.%20Gr%C3%A1ti'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gerador de Gradiente CSS Grátis',
  url: 'https://tools4free.site/pt/gerador-gradiente-css',
  description: 'Crie lindos gradientes CSS de forma visual. Escolha cores, ajuste ângulos, copie o código CSS. Grátis.',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
