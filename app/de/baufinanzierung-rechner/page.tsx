import type { Metadata } from 'next'
import Client from '../../mortgage-calculator/client'

export const metadata: Metadata = {
  title: 'Baufinanzierung Rechner — Kreditrate Berechnen Kostenlos',
  description: 'Berechne deine monatliche Kreditrate, Gesamtzinsen und Tilgungsplan für deine Baufinanzierung. Kostenloser Rechner.',
  keywords: 'Baufinanzierung Rechner, Kreditrechner Immobilie, Hypothekenrechner, Baufinanzierung berechnen, Tilgungsrechner, monatliche Rate berechnen',
}

export default function Page() {
  return <Client />
}
