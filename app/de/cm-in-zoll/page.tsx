import type { Metadata } from 'next'
import Client from '../../unit-converter/client'

export const metadata: Metadata = {
  title: 'CM in Zoll Umrechnen — Zentimeter zu Zoll Rechner',
  description: 'Rechne Zentimeter in Zoll (Inches) um und umgekehrt. Auch mm, Meter, Fuß, Yards. Kostenloser Umrechner.',
  keywords: 'cm in Zoll, Zentimeter in Zoll, cm Zoll umrechnen, Länge umrechnen, cm to inches',
}

export default function Page() {
  return <Client />
}
