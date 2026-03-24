import type { Metadata } from 'next'
import HashClient from './client'

export const metadata: Metadata = {
  title: 'Hash Generator — Free MD5, SHA-1, SHA-256, SHA-512 Online',
  description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text or files instantly. Uses Web Crypto API. Free, secure, 100% local.',
  keywords: 'hash generator, md5 generator, sha256 hash, sha1 hash, sha512, checksum calculator, file hash',
}

export default function HashPage() {
  return <HashClient />
}
