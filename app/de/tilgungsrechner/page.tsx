import type { Metadata } from 'next'
import Client from '../../mortgage-calculator/client'

export const metadata: Metadata = {
  title: 'Tilgungsrechner — Tilgungsplan Erstellen Kostenlos',
  description: 'Erstelle einen detaillierten Tilgungsplan für deinen Kredit oder deine Baufinanzierung. Kostenlos, ohne Anmeldung.',
  keywords: 'Tilgungsrechner, Tilgungsplan, Tilgungsplan erstellen, Annuitätenrechner, Sondertilgung berechnen',
}

export default function Page() {
  return <Client />
}
