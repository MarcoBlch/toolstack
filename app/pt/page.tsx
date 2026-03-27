import type { Metadata } from 'next'
import HomeContent from '@/components/HomeContent'
import { HOME_DATA } from '@/lib/homeData'

export const metadata: Metadata = {
  title: 'Tools4Free — Ferramentas Online Grátis | Sem Cadastro',
  description: 'Ferramentas online gratuitas: gerador de texto, QR codes, senhas, contador de palavras, formatador JSON, calculadoras e mais. Sem cadastro, sem rastreamento.',
  alternates: {
    canonical: 'https://tools4free.site/pt',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — Ferramentas Online Grátis',
    description: 'Ferramentas online gratuitas. QR codes, senhas, JSON, calculadoras e mais. Sem cadastro.',
    url: 'https://tools4free.site/pt',
  },
}

export default function PortugueseHomePage() {
  return <HomeContent lang="pt" {...HOME_DATA.pt} />
}
