import type { Metadata } from 'next'
import Client from '../../password-generator/client'

export const metadata: Metadata = {
  title: 'Passwort Generator — Sichere Passwörter Kostenlos Erstellen',
  description: 'Generiere kryptographisch sichere Passwörter sofort. Stärkeanzeige, anpassbare Länge und Zeichen. Wird nie gespeichert. 100% lokal.',
  keywords: 'Passwort Generator, sicheres Passwort, Passwort erstellen, zufälliges Passwort, Passwort Generator kostenlos, starkes Passwort',
}

export default function Page() {
  return <Client />
}
