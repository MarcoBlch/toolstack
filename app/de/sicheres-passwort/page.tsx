import type { Metadata } from 'next'
import Client from '../../password-generator/client'

export const metadata: Metadata = {
  title: 'Sicheres Passwort Generator — Unknackbare Passwörter Erstellen',
  description: 'Generiere unknackbare sichere Passwörter mit einem Klick. Kryptographisch sicher, wird nie gespeichert. Kostenlos.',
  keywords: 'sicheres Passwort, sicheres Passwort erstellen, Passwort Generator sicher, starkes Passwort, unknackbares Passwort',
}

export default function Page() {
  return <Client />
}
