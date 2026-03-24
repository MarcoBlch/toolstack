import type { Metadata } from 'next'
import Client from '../../case-converter/client'

export const metadata: Metadata = {
  title: 'Conversor Maiúsculas Minúsculas Grátis',
  description: 'Converta entre MAIÚSCULAS, minúsculas, Título, camelCase, snake_case e mais. Grátis, sem cadastro.',
  keywords: 'conversor maiúsculas, maiúsculas minúsculas, converter caixa, alternar caixa texto',
}

export default function Page() {
  return <Client />
}
