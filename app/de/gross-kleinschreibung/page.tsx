import type { Metadata } from 'next'
import Client from '../../case-converter/client'

export const metadata: Metadata = {
  title: 'Groß- und Kleinschreibung Umwandeln — Text Konverter',
  description: 'Wandle Text um: GROSSBUCHSTABEN, kleinbuchstaben, Titel, camelCase, snake_case und mehr. Kostenlos, ein Klick Kopieren.',
  keywords: 'Groß Kleinschreibung umwandeln, Text Konverter, Großbuchstaben, Kleinbuchstaben, Text umwandeln, Schreibweise ändern',
}

export default function Page() {
  return <Client />
}
