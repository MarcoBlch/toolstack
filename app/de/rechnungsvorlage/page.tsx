import type { Metadata } from 'next'
import Client from '../../invoice-generator/client'

export const metadata: Metadata = {
  title: 'Rechnungsvorlage Kostenlos — Rechnung Vorlage PDF Download',
  description: 'Nutze unsere kostenlose Rechnungsvorlage. Daten eingeben, PDF herunterladen. Professionell, ohne Anmeldung.',
  keywords: 'Rechnungsvorlage, Rechnung Vorlage, kostenlose Rechnungsvorlage, Rechnung Muster, Rechnungsvorlage PDF, Rechnung schreiben',
}

export default function Page() {
  return <Client />
}
