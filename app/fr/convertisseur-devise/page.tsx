import type { Metadata } from 'next'
import Client from '../../currency-converter/client'

export const metadata: Metadata = {
  title: 'Convertisseur de Devises — Taux de Change Gratuit en Ligne',
  description: 'Convertissez entre 30+ devises mondiales. EUR, USD, GBP, CHF, MAD, XOF. Taux approximatifs. Gratuit.',
  keywords: 'convertisseur devise, taux de change, euro dollar, conversion monnaie, convertisseur monnaie, change euro livre',
}

export default function Page() {
  return <Client />
}
