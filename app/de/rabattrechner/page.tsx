import type { Metadata } from 'next'
import Client from '../../percentage-calculator/client'

export const metadata: Metadata = {
  title: 'Rabattrechner — Rabatt und Ersparnis Berechnen',
  description: 'Berechne den Rabatt und die Ersparnis schnell. Wie viel spart man bei 20% Rabatt? Kostenloser Rechner.',
  keywords: 'Rabattrechner, Rabatt berechnen, Ersparnis berechnen, Prozent Rabatt, Sale Rechner, Rabatt ausrechnen',
}

export default function Page() {
  return <Client />
}
