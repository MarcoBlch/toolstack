import type { Metadata } from 'next'
import Client from '../../currency-converter/client'

export const metadata: Metadata = {
  title: 'Währungsrechner — Kostenloser Wechselkurs Umrechner Online',
  description: 'Rechne zwischen 30+ Weltwährungen um. EUR, USD, GBP, CHF, JPY. Tagesaktuelle Näherungswerte. Kostenlos.',
  keywords: 'Währungsrechner, Wechselkurs, Euro Dollar, Währung umrechnen, Devisenrechner, EUR USD Kurs, Geld umrechnen',
}

export default function Page() {
  return <Client />
}
