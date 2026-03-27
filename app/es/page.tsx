import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'
import { HOME_DATA } from '@/lib/homeData'

export const metadata: Metadata = {
  title: 'Tools4Free — Herramientas Online Gratis | Sin Registro',
  description: 'Herramientas online gratuitas: generador de texto, códigos QR, contraseñas, contador de palabras, formateador JSON, calculadoras y más. Sin registro, sin rastreo.',
  alternates: {
    canonical: 'https://tools4free.site/es',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — Herramientas Online Gratis',
    description: 'Herramientas online gratuitas. QR codes, contraseñas, JSON, calculadoras y más. Sin registro.',
    url: 'https://tools4free.site/es',
  },
}

export default function SpanishHomePage() {
  return <HomeContent lang="es" {...HOME_DATA.es} />
}
