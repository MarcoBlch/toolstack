import type { Metadata } from 'next'
import Client from '../../password-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Générateur de Mot de Passe Sécurisé Gratuit',
  description: 'Générez des mots de passe sécurisés et aléatoires. Chiffrement cryptographique. Jamais stockés. Gratuit, sans inscription.',
  keywords: 'générateur mot de passe, mot de passe sécurisé, mot de passe aléatoire, créer mot de passe',
  openGraph: { images: ['/api/og?title=G%C3%A9n%C3%A9rateur%20de%20Mot%20de%20Passe%20S%C3%A9curis%C3%A9%20Gratuit&description=G%C3%A9n%C3%A9rez%20des%20mots%20de%20passe%20s%C3%A9curis%C3%A9s%20et%20al%C3%A9atoires.%20Chiffrement%20cryptographique.%20Jamais%20stock%C3%A9s.%20Grat'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Générateur de Mot de Passe Sécurisé Gratuit',
  url: 'https://tools4free.site/fr/generateur-mot-de-passe',
  description: 'Générez des mots de passe sécurisés et aléatoires. Chiffrement cryptographique. Jamais stockés. Gratuit, sans inscription.',
  category: 'SecurityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
