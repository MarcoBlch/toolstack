import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'

export const metadata: Metadata = {
  title: 'Kreditrechner — Monatliche Rate Berechnen Kostenlos',
  description: 'Berechne monatliche Raten, Gesamtzinsen und Tilgungsplan für jeden Kredit. Autokredit, Privatkredit, Studienkredit.',
  keywords: 'Kreditrechner, Kreditrate berechnen, Ratenrechner, Darlehensrechner, Autokredit Rechner, Tilgungsplan, monatliche Rate',
}

export default function Page() {
  return <Client />
}
