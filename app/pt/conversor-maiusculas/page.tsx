import type { Metadata } from 'next'
import Client from '../../case-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Conversor Maiúsculas Minúsculas Grátis',
  description: 'Converta entre MAIÚSCULAS, minúsculas, Título, camelCase, snake_case e mais. Grátis, sem cadastro.',
  keywords: 'conversor maiúsculas, maiúsculas minúsculas, converter caixa, alternar caixa texto',
  openGraph: { images: ['/api/og?title=Conversor%20Mai%C3%BAsculas%20Min%C3%BAsculas%20Gr%C3%A1tis&description=Converta%20entre%20MAI%C3%9ASCULAS%2C%20min%C3%BAsculas%2C%20T%C3%ADtulo%2C%20camelCase%2C%20snake_case%20e%20mais.%20Gr%C3%A1tis%2C%20sem%20cadastro.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Conversor Maiúsculas Minúsculas Grátis',
  url: 'https://tools4free.site/pt/conversor-maiusculas',
  description: 'Converta entre MAIÚSCULAS, minúsculas, Título, camelCase, snake_case e mais. Grátis, sem cadastro.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
