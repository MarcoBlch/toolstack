import type { Metadata } from 'next'
import Client from '../../image-compressor/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Compressor de Imagem Grátis Online',
  description: 'Reduza o tamanho das suas imagens em até 80%. JPEG, PNG, WebP. Tudo acontece no seu navegador. Grátis, sem cadastro.',
  keywords: 'compressor imagem, reduzir tamanho imagem, comprimir imagem, otimizar imagem',
  openGraph: { images: ['/api/og?title=Compressor%20de%20Imagem%20Gr%C3%A1tis%20Online&description=Reduza%20o%20tamanho%20das%20suas%20imagens%20em%20at%C3%A9%2080%25.%20JPEG%2C%20PNG%2C%20WebP.%20Tudo%20acontece%20no%20seu%20navegador.%20Gr%C3%A1ti'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Compressor de Imagem Grátis Online',
  url: 'https://tools4free.site/pt/compressor-imagem',
  description: 'Reduza o tamanho das suas imagens em até 80%. JPEG, PNG, WebP. Tudo acontece no seu navegador. Grátis, sem cadastro.',
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
