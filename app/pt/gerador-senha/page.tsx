import type { Metadata } from 'next'
import Client from '../../password-generator/client'

export const metadata: Metadata = {
  title: 'Gerador de Senhas Seguras Grátis',
  description: 'Gere senhas seguras e aleatórias instantaneamente. Criptografia forte. Nunca armazenadas. Grátis, sem cadastro.',
  keywords: 'gerador senha, senha segura, senha aleatória, criar senha',
}

export default function Page() {
  return <Client />
}
