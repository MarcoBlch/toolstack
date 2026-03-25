import type { Metadata } from 'next'
import GradientClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'CSS Gradient Generator — Free Linear & Radial Gradient Maker',
  description: 'Create beautiful CSS gradients visually. Pick colors, adjust angle, copy CSS code. Linear and radial gradients. Free, instant.',
  keywords: 'css gradient generator, gradient maker, linear gradient, radial gradient, css background gradient, gradient colors, tailwind gradient',
  openGraph: { images: ['/api/og?title=CSS%20Gradient%20Generator&description=Create%20beautiful%20CSS%20gradients%20visually.%20Pick%20colors%2C%20adjust%20angle%2C%20copy%20CSS%20code.%20Linear%20and%20radial'] },
}

const jsonLd = generateToolJsonLd({
  name: 'CSS Gradient Generator',
  url: 'https://tools4free.site/gradient-generator',
  description: 'Create beautiful CSS gradients visually. Pick colors, adjust angle, copy CSS code. Linear and radial gradients. Free, instant.',
  category: 'DesignApplication',
})

export default function GradientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GradientClient />
    </>
  )
}
