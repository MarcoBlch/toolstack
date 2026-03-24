import type { Metadata } from 'next'
import Client from '../../image-compressor/client'

export const metadata: Metadata = {
  title: 'Compressor de Imagem Grátis Online',
  description: 'Reduza o tamanho das suas imagens em até 80%. JPEG, PNG, WebP. Tudo acontece no seu navegador. Grátis, sem cadastro.',
  keywords: 'compressor imagem, reduzir tamanho imagem, comprimir imagem, otimizar imagem',
}

export default function Page() {
  return <Client />
}
