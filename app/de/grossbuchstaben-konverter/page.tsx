import type { Metadata } from 'next'
import Client from '../../case-converter/client'

export const metadata: Metadata = {
  title: 'Großbuchstaben Konverter — Text in GROSSBUCHSTABEN Umwandeln',
  description: 'Wandle jeden Text in GROSSBUCHSTABEN um. Auch Kleinbuchstaben, Titel, camelCase verfügbar. Kostenlos.',
  keywords: 'Großbuchstaben umwandeln, Text Großbuchstaben, CAPS Konverter, Großschreibung, Text umwandeln, Kleinbuchstaben',
}

export default function Page() {
  return <Client />
}
