import type { Metadata } from 'next'
import PasswordGeneratorClient from '../password-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Random Password Generator',
  description: 'Generate random passwords with custom length and character types. Cryptographically secure. Free random password generator.',
  keywords: 'random password, generate password',
  openGraph: { images: ['/api/og?title=Random%20Password%20Generator&description=Generate%20random%20passwords%20with%20custom%20length%20and%20character%20types.%20Cryptographically%20secure.%20Free%20ran'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Random Password Generator',
  url: 'https://tools4free.site/random-password',
  description: 'Generate random passwords with custom length and character types. Cryptographically secure. Free random password generator.',
  category: 'SecurityApplication',
})

export default function RandomPasswordPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PasswordGeneratorClient />
    </>
  )
}
