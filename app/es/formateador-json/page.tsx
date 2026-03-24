import type { Metadata } from 'next'
import Client from '../../json-formatter/client'

export const metadata: Metadata = {
  title: 'Formateador JSON Gratis Online',
  description: 'Formatea, valida y minifica JSON al instante. Resaltado de sintaxis y detección de errores. Gratis, sin registro.',
  keywords: 'formateador json, formatter json, validador json, json online, beautifier json',
}

export default function Page() {
  return <Client />
}
