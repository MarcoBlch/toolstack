import type { Metadata } from 'next'
import Client from '../../word-counter/client'

export const metadata: Metadata = {
  title: 'Wörter Zählen — Kostenloser Wort und Zeichen Zähler',
  description: 'Zähle Wörter, Zeichen, Sätze, Absätze. Lesezeit und Sprechzeit. Keyword-Dichte. Kostenlos, ohne Anmeldung.',
  keywords: 'Wörter zählen, Zeichen zählen, Wortzähler, Zeichenzähler, Wörter zählen online, Text Zeichen zählen',
}

export default function Page() {
  return <Client />
}
