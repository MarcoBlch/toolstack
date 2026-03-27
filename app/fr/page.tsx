import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'
import { HOME_DATA } from '@/lib/homeData'

export const metadata: Metadata = {
  title: 'Tools4Free — Outils en Ligne Gratuits | Sans Inscription',
  description: 'Outils gratuits en ligne : générateur de texte, QR codes, mots de passe, compteur de mots, formateur JSON, calculatrices et plus. Sans inscription, sans tracking.',
  alternates: {
    canonical: 'https://tools4free.site/fr',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — Outils en Ligne Gratuits',
    description: 'Outils gratuits en ligne. QR codes, mots de passe, JSON, calculatrices et plus. Sans inscription.',
    url: 'https://tools4free.site/fr',
  },
}

export default function FrenchHomePage() {
  return <HomeContent lang="fr" {...HOME_DATA.fr} />
}
