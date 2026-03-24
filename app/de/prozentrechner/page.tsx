import type { Metadata } from 'next'
import Client from '../../percentage-calculator/client'

export const metadata: Metadata = {
  title: 'Prozentrechner — Prozent Berechnen Online Kostenlos',
  description: 'Berechne Prozente einfach. Wie viel ist X% von Y? Prozentuale Veränderung, Rabatt berechnen. Kostenlos.',
  keywords: 'Prozentrechner, Prozent berechnen, wieviel Prozent, Prozentrechnung, Rabatt berechnen, prozentuale Veränderung, Dreisatz',
}

export default function Page() {
  return <Client />
}
