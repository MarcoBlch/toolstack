import type { Metadata } from 'next'
import Client from '../../fancy-text/client'

export const metadata: Metadata = {
  title: 'Instagram Schriften — Schriftarten für Instagram Bio Kostenlos',
  description: 'Generiere coole Schriftarten für deine Instagram Bio und Storys. 20+ Stile. Kopieren und einfügen. Kostenlos.',
  keywords: 'Instagram Schriften, Schriftarten Instagram, coole Schrift Instagram, Instagram Bio Schriftart, Schrift Instagram ändern',
}

export default function Page() {
  return <Client />
}
