import type { Metadata } from 'next'
import Client from '../../favicon-generator/client'

export const metadata: Metadata = {
  title: 'Favicon Generator — Favicon aus Text oder Emoji Erstellen',
  description: 'Generiere Favicons aus Buchstaben oder Emojis. Alle Größen (16, 32, 48, 180, 512). PNG Download. Kostenlos.',
  keywords: 'Favicon Generator, Favicon erstellen, ICO Generator, Favicon aus Text, App Icon erstellen, Favicon kostenlos',
}

export default function Page() {
  return <Client />
}
