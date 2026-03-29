import type { Metadata } from 'next'
import Client from '../../sales-tax-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de Impuesto de Venta Gratis',
  alternates: getAlternates('/sales-tax-calculator'),
  description: 'Calcula el impuesto de venta sobre tus compras. Obtén el monto del impuesto y el precio total con impuestos incluidos. Gratis.',
  keywords: 'calculadora impuesto venta, calcular impuesto, IVA, precio con impuesto, tasa impositiva, impuesto sobre ventas',
  openGraph: { images: ['/api/og?title=Calculadora%20Impuesto%20Venta&description=Calcula%20el%20impuesto%20de%20venta%20sobre%20tus%20compras.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de Impuesto de Venta',
  url: 'https://tools4free.site/es/calculadora-impuesto-venta',
  description: 'Calcula el impuesto de venta sobre tus compras. Obtén el monto del impuesto y el precio total con impuestos incluidos. Gratis.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
