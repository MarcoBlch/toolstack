import type { Metadata } from 'next'
import Client from '../../hash-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Hash Generator — MD5, SHA-256, SHA-512 Online Kostenlos',
  description: 'Generiere MD5, SHA-1, SHA-256, SHA-512 Hashes aus jedem Text. Web Crypto API. Kostenlos, privat, lokal.',
  keywords: 'Hash Generator, MD5 Generator, SHA256 Hash, SHA1 Generator, Hash berechnen, Prüfsumme berechnen',
  openGraph: { images: ['/api/og?title=Hash%20Generator&description=Generiere%20MD5%2C%20SHA-1%2C%20SHA-256%2C%20SHA-512%20Hashes%20aus%20jedem%20Text.%20Web%20Crypto%20API.%20Kostenlos%2C%20privat%2C%20lok'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Hash Generator',
  url: 'https://tools4free.site/de/hash-generator',
  description: 'Generiere MD5, SHA-1, SHA-256, SHA-512 Hashes aus jedem Text. Web Crypto API. Kostenlos, privat, lokal.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
