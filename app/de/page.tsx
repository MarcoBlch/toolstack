import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'
import { HOME_DATA } from '@/lib/homeData'

export const metadata: Metadata = {
  title: 'Tools4Free — Kostenlose Online-Tools | Ohne Anmeldung',
  description: 'Kostenlose Online-Tools: Textgenerator, QR-Codes, Passwörter, Wortzähler, JSON-Formatter, Rechner und mehr. Ohne Anmeldung, ohne Tracking.',
  alternates: {
    canonical: 'https://tools4free.site/de',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — Kostenlose Online-Tools',
    description: 'Kostenlose Online-Tools. QR-Codes, Passwörter, JSON, Rechner und mehr. Ohne Anmeldung.',
    url: 'https://tools4free.site/de',
  },
}

export default function GermanHomePage() {
  return <HomeContent lang="de" {...HOME_DATA.de} />
}
