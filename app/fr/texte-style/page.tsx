import type { Metadata } from 'next'
import Client from '../../fancy-text/client'

export const metadata: Metadata = {
  title: 'Générateur de Texte Stylé — Polices Instagram Gratuit',
  description: 'Transformez votre texte en 20+ styles Unicode — gras, italique, cursif, bulles et plus. Copiez-collez partout. Gratuit, sans inscription.',
  keywords: 'texte stylé, générateur texte, polices instagram, texte fantaisie, convertisseur police',
}

export default function Page() {
  return <Client />
}
