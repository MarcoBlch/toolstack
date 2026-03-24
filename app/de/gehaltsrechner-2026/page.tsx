import type { Metadata } from 'next'
import Client from '../../salary-calculator/client'

export const metadata: Metadata = {
  title: 'Gehaltsrechner 2026 — Nettolohn Berechnen Deutschland',
  description: 'Berechne dein Nettoeinkommen 2026 in Deutschland. Steuerklasse, Sozialversicherung, Kirchensteuer. Kostenlos.',
  keywords: 'Gehaltsrechner 2026, Nettolohn 2026, Gehaltsrechner Deutschland, Steuerklasse Rechner, Lohnsteuer 2026',
}

export default function Page() {
  return <Client />
}
