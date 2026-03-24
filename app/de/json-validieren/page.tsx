import type { Metadata } from 'next'
import Client from '../../json-formatter/client'

export const metadata: Metadata = {
  title: 'JSON Validieren — JSON Syntax Online Prüfen Kostenlos',
  description: 'Prüfe ob dein JSON gültig ist. Detaillierte Fehlermeldungen. Auch formatieren und minifizieren. Kostenlos.',
  keywords: 'JSON validieren, JSON prüfen, JSON Validator, ist mein JSON gültig, JSON Syntax prüfen, JSON check online',
}

export default function Page() {
  return <Client />
}
