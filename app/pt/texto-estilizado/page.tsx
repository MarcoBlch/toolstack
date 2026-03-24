import type { Metadata } from 'next'
import Client from '../../fancy-text/client'

export const metadata: Metadata = {
  title: 'Gerador de Texto Estilizado — Fontes Instagram Grátis',
  description: 'Transforme seu texto em 20+ estilos Unicode — negrito, itálico, cursivo, bolhas e mais. Copie e cole em qualquer lugar. Grátis, sem cadastro.',
  keywords: 'texto estilizado, gerador texto, fontes instagram, letras diferentes, conversor fontes',
}

export default function Page() {
  return <Client />
}
