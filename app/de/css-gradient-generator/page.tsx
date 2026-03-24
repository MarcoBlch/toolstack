import type { Metadata } from 'next'
import Client from '../../gradient-generator/client'

export const metadata: Metadata = {
  title: 'CSS Gradient Generator — Farbverlauf Erstellen Kostenlos',
  description: 'Erstelle schöne CSS-Farbverläufe visuell. Farben wählen, Winkel einstellen, CSS-Code kopieren. Kostenlos.',
  keywords: 'CSS Gradient Generator, Farbverlauf erstellen, CSS Farbverlauf, Gradient Maker, Farbverlauf Generator, CSS linear-gradient',
}

export default function Page() {
  return <Client />
}
