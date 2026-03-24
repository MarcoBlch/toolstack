import type { Metadata } from 'next'
import Client from '../../unit-converter/client'

export const metadata: Metadata = {
  title: 'Conversor de Unidades Grátis Online',
  description: 'Converta comprimento, peso, temperatura, volume e mais. 8 categorias de conversão. Grátis, sem cadastro.',
  keywords: 'conversor unidades, conversão unidades, kg para libras, cm para polegadas, celsius fahrenheit',
}

export default function Page() {
  return <Client />
}
