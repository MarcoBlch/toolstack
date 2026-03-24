import type { Metadata } from 'next'
import Client from '../../bmi-calculator/client'

export const metadata: Metadata = {
  title: 'BMI Rechner — Body Mass Index Berechnen Kostenlos',
  description: 'Berechne deinen BMI (Body Mass Index). Metrisch und imperial. Gewichtskategorie und gesunder Bereich. Kostenlos.',
  keywords: 'BMI Rechner, BMI berechnen, Body Mass Index, BMI Frau, BMI Mann, BMI Rechner kostenlos, Idealgewicht berechnen, Übergewicht',
}

export default function Page() {
  return <Client />
}
