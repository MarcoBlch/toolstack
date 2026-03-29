import type { Metadata } from 'next'
import Client from '../../days-until/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: '¿Cuántos Días Faltan para Navidad? Calculadora Gratis',
  description: '¿Cuántos días faltan para Navidad, Año Nuevo, Halloween, Semana Santa o cualquier fecha? Calculadora de días gratis con días laborales incluidos.',
  keywords: 'cuántos días faltan para Navidad, días hasta Año Nuevo, calculadora días, días hasta una fecha',
  alternates: getAlternates('/days-until'),
  openGraph: { images: ['/api/og?title=Cu%C3%A1ntos%20D%C3%ADas%20Faltan&description=D%C3%ADas%20hasta%20Navidad%2C%20A%C3%B1o%20Nuevo%20y%20m%C3%A1s.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Cuántos Días Faltan',
  url: 'https://tools4free.site/es/cuantos-dias-faltan',
  description: '¿Cuántos días faltan para Navidad, Año Nuevo, Halloween o cualquier fecha personalizada?',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
