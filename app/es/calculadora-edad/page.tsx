import type { Metadata } from 'next'
import Client from '../../age-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Edad — ¿Cuántos Años Tengo? Gratis',
  description: 'Calculadora de edad gratuita. Calcula tu edad exacta en años, meses, días y horas. Signo zodiacal, zodiaco chino y cuenta regresiva hasta tu próximo cumpleaños.',
  keywords: 'calculadora de edad, cuántos años tengo, calcular edad, signo zodiacal, edad en días, cumpleaños',
  alternates: getAlternates('/age-calculator'),
  openGraph: { images: ['/api/og?title=Calculadora%20de%20Edad&description=Edad%20exacta%20en%20a%C3%B1os%2C%20meses%2C%20d%C3%ADas.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Edad',
  url: 'https://tools4free.site/es/calculadora-edad',
  description: 'Calculadora de edad gratuita. Calcula tu edad exacta en años, meses, días y horas.',
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
