import type { Metadata } from 'next'
import Client from '../../json-formatter/client'

export const metadata: Metadata = {
  title: 'Formatador JSON Grátis Online',
  description: 'Formate, valide e minifique JSON instantaneamente. Destaque de sintaxe e detecção de erros. Grátis, sem cadastro.',
  keywords: 'formatador json, formatter json, validador json, json online, beautifier json',
}

export default function Page() {
  return <Client />
}
