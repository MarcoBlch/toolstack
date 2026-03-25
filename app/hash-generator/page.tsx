import type { Metadata } from 'next'
import HashClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Hash Generator — Free MD5, SHA-1, SHA-256, SHA-512 Online',
  description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text or files instantly. Uses Web Crypto API. Free, secure, 100% local.',
  keywords: 'hash generator, md5 generator, sha256 hash, sha1 hash, sha512, checksum calculator, file hash',
  openGraph: { images: ['/api/og?title=Hash%20Generator&description=Generate%20MD5%2C%20SHA-1%2C%20SHA-256%2C%20SHA-512%20hashes%20from%20text%20or%20files%20instantly.%20Uses%20Web%20Crypto%20API.%20Free'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Hash Generator',
  url: 'https://tools4free.site/hash-generator',
  description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text or files instantly. Uses Web Crypto API. Free, secure, 100% local.',
  category: 'DeveloperApplication',
})

export default function HashPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HashClient />
    </>
  )
}
