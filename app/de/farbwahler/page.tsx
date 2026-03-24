import type { Metadata } from 'next'
import Client from '../../color-picker/client'

export const metadata: Metadata = {
  title: 'Farbwähler — HEX, RGB, HSL Farbcode Kostenlos',
  description: 'Wähle eine Farbe. Erhalte HEX, RGB, HSL Werte. Generiere Schattierungen, Tönungen und Komplementärfarben.',
  keywords: 'Farbwähler, Color Picker, HEX Farbcode, RGB zu HEX, Farbcode ermitteln, Farben umrechnen, Farbpalette',
}

export default function Page() {
  return <Client />
}
