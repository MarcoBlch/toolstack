import type { Metadata } from 'next'
import Client from '../../word-counter/client'

export const metadata: Metadata = {
  title: 'Contador de Palavras e Caracteres Grátis',
  description: 'Conte palavras, caracteres, frases e parágrafos do seu texto. Tempo de leitura e densidade de palavras-chave. Grátis.',
  keywords: 'contador palavras, contador caracteres, contar palavras, número de palavras',
}

export default function Page() {
  return <Client />
}
