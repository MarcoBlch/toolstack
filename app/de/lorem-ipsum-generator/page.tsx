import type { Metadata } from 'next'
import Client from '../../lorem-generator/client'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator — Platzhaltertext Kostenlos Generieren',
  description: 'Generiere Lorem Ipsum Platzhaltertext. Absätze, Sätze oder Wortanzahl wählen. Ein Klick zum Kopieren. Kostenlos.',
  keywords: 'Lorem Ipsum Generator, Platzhaltertext, Blindtext Generator, Fülltext, Lorem Ipsum Deutsch, Dummy Text',
}

export default function Page() {
  return <Client />
}
