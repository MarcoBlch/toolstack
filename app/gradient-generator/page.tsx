import type { Metadata } from 'next'
import GradientClient from './client'

export const metadata: Metadata = {
  title: 'CSS Gradient Generator — Free Linear & Radial Gradient Maker',
  description: 'Create beautiful CSS gradients visually. Pick colors, adjust angle, copy CSS code. Linear and radial gradients. Free, instant.',
  keywords: 'css gradient generator, gradient maker, linear gradient, radial gradient, css background gradient, gradient colors, tailwind gradient',
}

export default function GradientPage() {
  return <GradientClient />
}
