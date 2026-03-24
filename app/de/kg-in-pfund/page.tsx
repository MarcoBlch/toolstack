import type { Metadata } from 'next'
import Client from '../../unit-converter/client'

export const metadata: Metadata = {
  title: 'Kg in Pfund Umrechnen — Kilogramm zu Pfund Rechner',
  description: 'Rechne Kilogramm in Pfund (lbs) um und umgekehrt. Auch Gramm, Unzen, Stones. Kostenloser Umrechner.',
  keywords: 'kg in Pfund, Kilogramm in Pfund, kg lbs umrechnen, Gewicht umrechnen, kg zu lbs',
}

export default function Page() {
  return <Client />
}
