import type { Metadata } from 'next'
import Client from '../../invoice-generator/client'

export const metadata: Metadata = {
  title: 'Rechnungsgenerator Kostenlos — Rechnung Online Erstellen PDF',
  description: 'Erstelle professionelle Rechnungen sofort. Positionen, Steuern, Rabatte. PDF Download. Ohne Anmeldung, ohne Wasserzeichen.',
  keywords: 'Rechnungsgenerator, Rechnung erstellen kostenlos, Rechnung online, Rechnung Vorlage, Rechnung PDF, kostenlose Rechnung erstellen, Rechnungsvorlage',
}

export default function Page() {
  return <Client />
}
