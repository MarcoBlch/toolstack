import type { Metadata } from 'next'
import Client from '../../hash-generator/client'

export const metadata: Metadata = {
  title: 'Hash Generator — MD5, SHA-256, SHA-512 Online Kostenlos',
  description: 'Generiere MD5, SHA-1, SHA-256, SHA-512 Hashes aus jedem Text. Web Crypto API. Kostenlos, privat, lokal.',
  keywords: 'Hash Generator, MD5 Generator, SHA256 Hash, SHA1 Generator, Hash berechnen, Prüfsumme berechnen',
}

export default function Page() {
  return <Client />
}
