import type { Metadata } from 'next'
import Client from '../../salary-calculator/client'

export const metadata: Metadata = {
  title: 'Brutto Netto Rechner — Gehaltsrechner 2026 Kostenlos',
  description: 'Berechne dein Nettogehalt aus dem Bruttogehalt. Steuern, Sozialabgaben, Effektivsteuersatz. Gehaltsrechner Deutschland.',
  keywords: 'Brutto Netto Rechner, Gehaltsrechner, Brutto Netto, Nettolohn berechnen, Gehaltsrechner 2026, Lohnrechner, Nettogehalt berechnen',
}

export default function Page() {
  return <Client />
}
