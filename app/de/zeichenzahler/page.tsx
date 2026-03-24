import type { Metadata } from 'next'
import Client from '../../word-counter/client'

export const metadata: Metadata = {
  title: 'Zeichenzähler — Zeichen und Buchstaben Zählen Online',
  description: 'Zähle Zeichen, Buchstaben, Wörter, Sätze sofort. Mit und ohne Leerzeichen. Lesezeit inklusive. Kostenlos.',
  keywords: 'Zeichenzähler, Zeichen zählen, Buchstaben zählen, Zeichenanzahl, Text Zeichen zählen online, Wörter und Zeichen',
}

export default function Page() {
  return <Client />
}
