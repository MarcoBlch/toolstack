import type { Metadata } from 'next'
import Client from '../../regex-tester/client'

export const metadata: Metadata = {
  title: 'Regex Tester — Reguläre Ausdrücke Online Testen',
  description: 'Schreibe Regex, teste gegen Text, sieh Treffer in Echtzeit hervorgehoben. Kostenlos, ohne Anmeldung.',
  keywords: 'Regex Tester, Regex online, reguläre Ausdrücke testen, Regex prüfen, Regex Editor, RegExp testen',
}

export default function Page() {
  return <Client />
}
