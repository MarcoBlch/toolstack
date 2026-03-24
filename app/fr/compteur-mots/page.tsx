import type { Metadata } from 'next'
import Client from '../../word-counter/client'

export const metadata: Metadata = {
  title: 'Compteur de Mots et Caractères Gratuit',
  description: 'Comptez les mots, caractères, phrases et paragraphes de votre texte. Temps de lecture et densité de mots-clés. Gratuit.',
  keywords: 'compteur mots, compteur caractères, compter mots, nombre de mots',
}

export default function Page() {
  return <Client />
}
