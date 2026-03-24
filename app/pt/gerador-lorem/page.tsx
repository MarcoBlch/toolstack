import type { Metadata } from 'next'
import Client from '../../lorem-generator/client'

export const metadata: Metadata = {
  title: 'Gerador Lorem Ipsum Grátis',
  description: 'Gere texto Lorem Ipsum. Parágrafos, frases ou número exato de palavras. Copie com um clique. Grátis, sem cadastro.',
  keywords: 'gerador lorem ipsum, lorem ipsum, texto de preenchimento, texto fictício',
}

export default function Page() {
  return <Client />
}
