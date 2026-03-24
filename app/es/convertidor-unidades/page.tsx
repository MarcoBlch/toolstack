import type { Metadata } from 'next'
import Client from '../../unit-converter/client'

export const metadata: Metadata = {
  title: 'Convertidor de Unidades Gratis Online',
  description: 'Convierte longitud, peso, temperatura, volumen y más. 8 categorías de conversión. Gratis, sin registro.',
  keywords: 'convertidor unidades, conversión unidades, kg a libras, cm a pulgadas, celsius fahrenheit',
}

export default function Page() {
  return <Client />
}
