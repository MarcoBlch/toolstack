import type { Metadata } from 'next'
import Client from '../../json-formatter/client'

export const metadata: Metadata = {
  title: 'Formateur JSON en Ligne Gratuit',
  description: 'Formatez, validez et minifiez du JSON instantanément. Coloration syntaxique et détection des erreurs. Gratuit, sans inscription.',
  keywords: 'formateur json, formatter json, validateur json, json en ligne, beautifier json',
}

export default function Page() {
  return <Client />
}
