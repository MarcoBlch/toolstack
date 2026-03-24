import type { Metadata } from 'next'
import Client from '../../retirement-calculator/client'

export const metadata: Metadata = {
  title: 'Rentenrechner — Altersvorsorge Planen Kostenlos',
  description: 'Plane deine Altersvorsorge. Wie viel monatlich sparen, Einkommensprojektion, Kapitaldauer. Kostenloser Rechner.',
  keywords: 'Rentenrechner, Altersvorsorge Rechner, Rente berechnen, Rentenvorsorge planen, Sparrechner Rente, Rentenlücke berechnen',
}

export default function Page() {
  return <Client />
}
