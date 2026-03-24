import type { Metadata } from 'next'
import Client from '../../investment-calculator/client'

export const metadata: Metadata = {
  title: 'Zinsrechner — Zinseszins Berechnen Kostenlos',
  description: 'Berechne Zinseszins und Vermögenswachstum. Monatliche Einzahlung, Rendite, Laufzeit. Kostenloser Zinsrechner.',
  keywords: 'Zinsrechner, Zinseszinsrechner, Zinseszins berechnen, Sparrechner, Renditerechner, Vermögensaufbau Rechner, Geldanlage Rechner',
}

export default function Page() {
  return <Client />
}
