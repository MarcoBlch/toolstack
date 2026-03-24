import type { Metadata } from 'next'
import Client from '../../vat-calculator/client'

export const metadata: Metadata = {
  title: 'Mehrwertsteuer Rechner — MwSt Berechnen Netto Brutto',
  description: 'Berechne die Mehrwertsteuer einfach. Netto zu Brutto oder Brutto zu Netto. MwSt 19%, 7%. Kostenloser Rechner.',
  keywords: 'Mehrwertsteuer Rechner, MwSt Rechner, Netto Brutto Rechner, MwSt berechnen, 19% MwSt, Mehrwertsteuer berechnen, Umsatzsteuer Rechner',
}

export default function Page() {
  return <Client />
}
