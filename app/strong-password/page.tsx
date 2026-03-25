import type { Metadata } from 'next'
import PasswordGeneratorClient from '../password-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Strong Password Generator',
  description: 'Generate strong, secure passwords instantly. Cryptographically random. Never stored. Free strong password generator.',
  keywords: 'strong password, secure password',
  openGraph: { images: ['/api/og?title=Strong%20Password%20Generator&description=Generate%20strong%2C%20secure%20passwords%20instantly.%20Cryptographically%20random.%20Never%20stored.%20Free%20strong%20pas'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Strong Password Generator',
  url: 'https://tools4free.site/strong-password',
  description: 'Generate strong, secure passwords instantly. Cryptographically random. Never stored. Free strong password generator.',
  category: 'SecurityApplication',
})

export default function StrongPasswordPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PasswordGeneratorClient />
    </>
  )
}
