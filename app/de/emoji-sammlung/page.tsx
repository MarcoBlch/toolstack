import type { Metadata } from 'next'
import Client from '../../emoji-picker/client'

export const metadata: Metadata = {
  title: 'Emoji Zum Kopieren — Alle Emojis Suchen & Einfügen',
  description: 'Durchsuche und kopiere alle Emojis. Suche nach Name, 9 Kategorien. Ein Klick zum Kopieren. Kostenlos.',
  keywords: 'Emoji kopieren, Emoji zum Kopieren, Emoji Sammlung, Emojis, Smiley kopieren, Emoji einfügen, alle Emojis',
}

export default function Page() {
  return <Client />
}
