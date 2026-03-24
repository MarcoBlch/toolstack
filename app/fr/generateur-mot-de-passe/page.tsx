import type { Metadata } from 'next'
import Client from '../../password-generator/client'

export const metadata: Metadata = {
  title: 'Générateur de Mot de Passe Sécurisé Gratuit',
  description: 'Générez des mots de passe sécurisés et aléatoires. Chiffrement cryptographique. Jamais stockés. Gratuit, sans inscription.',
  keywords: 'générateur mot de passe, mot de passe sécurisé, mot de passe aléatoire, créer mot de passe',
}

export default function Page() {
  return <Client />
}
