import type { Metadata } from 'next'
import Client from '../../fancy-text/client'

export const metadata: Metadata = {
  title: 'Schriftarten Generator — Coole Schriften für Instagram & TikTok',
  description: 'Verwandle deinen Text in 20+ Unicode-Schriftarten: fett, kursiv, Schreibschrift, ästhetisch. Kopieren und überall einfügen. Kostenlos.',
  keywords: 'Schriftarten Generator, Instagram Schriftarten, coole Schriften, Schrift ändern, Text Generator, Unicode Schrift, ausgefallene Schriften',
}

export default function Page() {
  return <Client />
}
