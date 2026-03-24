import type { Metadata } from 'next'
import Client from '../../diff-checker/client'

export const metadata: Metadata = {
  title: 'Text Vergleichen — Unterschiede Zwischen Texten Finden',
  description: 'Vergleiche zwei Texte nebeneinander. Hinzufügungen in grün, Löschungen in rot. Kostenlos, sofort.',
  keywords: 'Text vergleichen, Textvergleich, Diff Checker, Unterschiede finden, Text Unterschied, Texte vergleichen online',
}

export default function Page() {
  return <Client />
}
