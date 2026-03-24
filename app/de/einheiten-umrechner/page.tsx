import type { Metadata } from 'next'
import Client from '../../unit-converter/client'

export const metadata: Metadata = {
  title: 'Einheiten Umrechner — Kostenlos Einheiten Umrechnen Online',
  description: 'Rechne zwischen allen Einheiten um: Länge, Gewicht, Temperatur, Volumen, Fläche, Geschwindigkeit, Daten, Zeit. Kostenlos, sofort.',
  keywords: 'Einheiten umrechnen, Einheiten Umrechner, kg in Pfund, cm in Zoll, Celsius Fahrenheit, Meilen in km, Umrechner online',
}

export default function Page() {
  return <Client />
}
