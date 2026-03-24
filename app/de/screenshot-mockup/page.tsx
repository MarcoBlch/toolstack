import type { Metadata } from 'next'
import Client from '../../screenshot-mockup/client'

export const metadata: Metadata = {
  title: 'Screenshot Mockup — Browser Rahmen Generator Kostenlos',
  description: 'Rahme deine Screenshots in Browser- oder Geräte-Mockups. Farbverläufe als Hintergrund. PNG Download. Kostenlos.',
  keywords: 'Screenshot Mockup, Browser Mockup, Geräte Rahmen, Mockup Generator, Screenshot verschönern, Browser Frame',
}

export default function Page() {
  return <Client />
}
