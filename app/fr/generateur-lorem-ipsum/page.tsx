import type { Metadata } from 'next'
import Client from '../../lorem-generator/client'

export const metadata: Metadata = {
  title: 'Générateur Lorem Ipsum Gratuit',
  description: 'Générez du texte Lorem Ipsum. Paragraphes, phrases ou nombre de mots exact. Copie en un clic. Gratuit, sans inscription.',
  keywords: 'générateur lorem ipsum, lorem ipsum, texte de remplissage, faux texte',
}

export default function Page() {
  return <Client />
}
