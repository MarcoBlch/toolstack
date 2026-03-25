import type { Metadata } from 'next'
import PassClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Password Generator — Free Secure Random Password Maker',
  description: 'Generate cryptographically secure passwords instantly. Customize length, characters, strength meter. Never stored. 100% local.',
  keywords: 'password generator, random password, secure password, strong password generator, password maker',
  openGraph: { images: ['/api/og?title=Password%20Generator&description=Generate%20cryptographically%20secure%20passwords%20instantly.%20Customize%20length%2C%20characters%2C%20strength%20meter.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Password Generator',
  url: 'https://tools4free.site/password-generator',
  description: 'Generate cryptographically secure passwords instantly. Customize length, characters, strength meter. Never stored. 100% local.',
  category: 'SecurityApplication',
})

export default function PassPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PassClient />
    </>
  )
}
