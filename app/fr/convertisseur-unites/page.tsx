import type { Metadata } from 'next'
import Client from '../../unit-converter/client'

export const metadata: Metadata = {
  title: "Convertisseur d'Unités Gratuit en Ligne",
  description: 'Convertissez longueur, poids, température, volume et plus. 8 catégories de conversion. Gratuit, sans inscription.',
  keywords: 'convertisseur unités, conversion unités, kg en lbs, cm en pouces, celsius fahrenheit',
}

export default function Page() {
  return <Client />
}
