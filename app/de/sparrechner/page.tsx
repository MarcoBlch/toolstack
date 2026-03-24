import type { Metadata } from 'next'
import Client from '../../investment-calculator/client'

export const metadata: Metadata = {
  title: 'Sparrechner — Sparplan Berechnen mit Zinseszins',
  description: 'Berechne wie dein Sparplan wächst. Monatliche Einzahlung, Zinseszins, Laufzeit. Kostenloser Sparrechner.',
  keywords: 'Sparrechner, Sparplan Rechner, Sparplan berechnen, Zinseszins Sparplan, ETF Sparplan Rechner, Vermögensaufbau',
}

export default function Page() {
  return <Client />
}
