import type { Metadata } from 'next'
import Client from '../../timezone-converter/client'

export const metadata: Metadata = {
  title: 'Zeitzonen Umrechner — Weltzeituhr und Zeitzonenrechner',
  description: 'Rechne Uhrzeiten zwischen Zeitzonen um. Weltzeituhr, MEZ zu EST, Zeitverschiebung. Kostenlos, ohne Anmeldung.',
  keywords: 'Zeitzonen Umrechner, Zeitzonenrechner, Weltzeituhr, Zeitverschiebung, MEZ EST umrechnen, Uhrzeit weltweit',
}

export default function Page() {
  return <Client />
}
