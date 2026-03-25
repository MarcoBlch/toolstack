import type { Metadata } from 'next'
import ColorClient from './client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Color Picker — Free HEX, RGB, HSL Color Converter & Palette',
  description: 'Pick any color. Get HEX, RGB, HSL values. Generate shades, tints, and complementary palettes. Free, instant.',
  keywords: 'color picker, hex color picker, rgb to hex, hsl color, color converter, color palette generator',
  openGraph: { images: ['/api/og?title=Color%20Picker&description=Pick%20any%20color.%20Get%20HEX%2C%20RGB%2C%20HSL%20values.%20Generate%20shades%2C%20tints%2C%20and%20complementary%20palettes.%20Free%2C%20'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Color Picker',
  url: 'https://tools4free.site/color-picker',
  description: 'Pick any color. Get HEX, RGB, HSL values. Generate shades, tints, and complementary palettes. Free, instant.',
  category: 'DesignApplication',
})

export default function ColorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ColorClient />
    </>
  )
}
