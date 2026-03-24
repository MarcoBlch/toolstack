import type { Metadata } from 'next'
import Client from '../../case-converter/client'

export const metadata: Metadata = {
  title: 'Convertisseur Majuscules Minuscules Gratuit',
  description: 'Convertissez entre MAJUSCULES, minuscules, Titre, camelCase, snake_case et plus. Gratuit, sans inscription.',
  keywords: 'convertisseur majuscules, majuscules minuscules, convertir casse, changeur casse',
}

export default function Page() {
  return <Client />
}
