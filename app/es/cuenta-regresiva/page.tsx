import type { Metadata } from 'next'
import Client from '../../countdown/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Cuenta Regresiva — Navidad, Año Nuevo & Cualquier Fecha Gratis',
  description: 'Cuenta regresiva en vivo hasta Navidad, Año Nuevo, Halloween o cualquier fecha personalizada. Días, horas, minutos y segundos. Gratis.',
  keywords: 'cuenta regresiva, cuenta regresiva Navidad, cuenta regresiva Año Nuevo, temporizador cuenta regresiva',
  alternates: getAlternates('/countdown'),
  openGraph: { images: ['/api/og?title=Cuenta%20Regresiva&description=En%20vivo%20hasta%20Navidad%2C%20A%C3%B1o%20Nuevo%20y%20m%C3%A1s.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Cuenta Regresiva',
  url: 'https://tools4free.site/es/cuenta-regresiva',
  description: 'Cuenta regresiva en vivo hasta Navidad, Año Nuevo o cualquier fecha personalizada.',
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
