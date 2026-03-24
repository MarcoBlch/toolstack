import type { Metadata } from 'next'
import Client from '../../tip-calculator/client'

export const metadata: Metadata = {
  title: 'Trinkgeld Rechner — Trinkgeld Berechnen und Rechnung Teilen',
  description: 'Berechne das Trinkgeld und teile die Rechnung einfach. Schnelle Prozentsätze, Aufteilung zwischen Personen. Kostenlos.',
  keywords: 'Trinkgeld Rechner, Trinkgeld berechnen, Rechnung teilen, Restaurant Trinkgeld, wie viel Trinkgeld, Trinkgeld Prozent',
}

export default function Page() {
  return <Client />
}
