import type { Metadata } from 'next'
import VATClient from '../../vat-calculator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Calculadora de IVA — Calcular IVA Online Gratis',
  description: 'Calcula el IVA fácilmente. Precio sin IVA a precio con IVA y viceversa. IVA España 21%, Alemania 19%. Gratis.',
  keywords: 'calculadora iva, calcular iva, iva 21, precio sin iva, precio con iva, calcular iva españa, iva incluido',
  openGraph: { images: ['/api/og?title=Calculadora%20de%20IVA&description=Calcula%20el%20IVA%20f%C3%A1cilmente.%20Precio%20sin%20IVA%20a%20precio%20con%20IVA%20y%20viceversa.%20IVA%20Espa%C3%B1a%2021%25%2C%20Alemania%2019%25'] },
  alternates: getAlternates('/vat-calculator'),
}

const jsonLd = generateToolJsonLd({
  name: 'Calculadora de IVA',
  url: 'https://tools4free.site/es/calculadora-iva',
  description: 'Calcula el IVA fácilmente. Precio sin IVA a precio con IVA y viceversa. IVA España 21%, Alemania 19%. Gratis.',
  category: 'FinanceApplication',
})

export default function CalculadoraIVAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VATClient />
    </>
  )
}
