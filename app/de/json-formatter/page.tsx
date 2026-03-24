import type { Metadata } from 'next'
import Client from '../../json-formatter/client'

export const metadata: Metadata = {
  title: 'JSON Formatter — JSON Formatieren, Validieren & Minifizieren',
  description: 'Formatiere, validiere und minifiziere JSON sofort. Syntaxhervorhebung, Fehlererkennung. Kostenlos, ohne Anmeldung.',
  keywords: 'JSON Formatter, JSON formatieren, JSON validieren, JSON Beautifier, JSON online, JSON prüfen, JSON minifizieren',
}

export default function Page() {
  return <Client />
}
