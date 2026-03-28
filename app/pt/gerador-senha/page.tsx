import type { Metadata } from 'next'
import Client from '../../password-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  alternates: getAlternates('/password-generator'),
  title: 'Gerador de Senhas Seguras Grátis',
  description: 'Gere senhas seguras e aleatórias instantaneamente. Criptografia forte. Nunca armazenadas. Grátis, sem cadastro.',
  keywords: 'gerador senha, senha segura, senha aleatória, criar senha',
  openGraph: { images: ['/api/og?title=Gerador%20de%20Senhas%20Seguras%20Gr%C3%A1tis&description=Gere%20senhas%20seguras%20e%20aleat%C3%B3rias%20instantaneamente.%20Criptografia%20forte.%20Nunca%20armazenadas.%20Gr%C3%A1tis%2C%20se'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Gerador de Senhas Seguras Grátis',
  url: 'https://tools4free.site/pt/gerador-senha',
  description: 'Gere senhas seguras e aleatórias instantaneamente. Criptografia forte. Nunca armazenadas. Grátis, sem cadastro.',
  category: 'SecurityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
