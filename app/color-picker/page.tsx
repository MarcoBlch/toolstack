import type { Metadata } from 'next'
import ColorClient from './client'

export const metadata: Metadata = {
  title: 'Color Picker — Free HEX, RGB, HSL Color Converter & Palette',
  description: 'Pick any color. Get HEX, RGB, HSL values. Generate shades, tints, and complementary palettes. Free, instant.',
  keywords: 'color picker, hex color picker, rgb to hex, hsl color, color converter, color palette generator',
}

export default function ColorPage() {
  return <ColorClient />
}
