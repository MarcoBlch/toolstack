import type { Metadata } from 'next'
import Client from '../../gradient-generator/client'

export const metadata: Metadata = {
  title: 'Gerador de Gradiente CSS Grátis',
  description: 'Crie lindos gradientes CSS de forma visual. Escolha cores, ajuste ângulos, copie o código CSS. Grátis.',
  keywords: 'gerador gradiente css, degradê css, gradient css, criar gradiente',
}

export default function Page() {
  return <Client />
}
