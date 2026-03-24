import type { Metadata } from 'next'
import Client from '../../gradient-generator/client'

export const metadata: Metadata = {
  title: 'Générateur de Dégradé CSS Gratuit',
  description: 'Créez de magnifiques dégradés CSS visuellement. Choisissez les couleurs, ajustez les angles, copiez le code CSS. Gratuit.',
  keywords: 'générateur dégradé css, dégradé css, gradient css, créer dégradé',
}

export default function Page() {
  return <Client />
}
