import type { Metadata } from 'next'
import Client from '../../loan-calculator/client'

export const metadata: Metadata = {
  title: 'Autokredit Rechner — Kfz Finanzierung Berechnen',
  description: 'Berechne die monatliche Rate für deinen Autokredit. Laufzeit, Zinsen, Gesamtkosten. Kostenloser Rechner.',
  keywords: 'Autokredit Rechner, Kfz Finanzierung, Autofinanzierung berechnen, Autokredit monatliche Rate, Auto Ratenrechner',
}

export default function Page() {
  return <Client />
}
