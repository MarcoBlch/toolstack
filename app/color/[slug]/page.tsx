import type { Metadata } from 'next'
import ColorClient from '../../color-picker/client'

const COLORS = [
  { slug: 'red', hex: '#FF0000', name: 'Red' },
  { slug: 'blue', hex: '#0000FF', name: 'Blue' },
  { slug: 'green', hex: '#008000', name: 'Green' },
  { slug: 'yellow', hex: '#FFFF00', name: 'Yellow' },
  { slug: 'orange', hex: '#FFA500', name: 'Orange' },
  { slug: 'purple', hex: '#800080', name: 'Purple' },
  { slug: 'pink', hex: '#FFC0CB', name: 'Pink' },
  { slug: 'black', hex: '#000000', name: 'Black' },
  { slug: 'white', hex: '#FFFFFF', name: 'White' },
  { slug: 'gray', hex: '#808080', name: 'Gray' },
  { slug: 'navy', hex: '#000080', name: 'Navy' },
  { slug: 'teal', hex: '#008080', name: 'Teal' },
  { slug: 'coral', hex: '#FF7F50', name: 'Coral' },
  { slug: 'salmon', hex: '#FA8072', name: 'Salmon' },
  { slug: 'gold', hex: '#FFD700', name: 'Gold' },
  { slug: 'indigo', hex: '#4B0082', name: 'Indigo' },
  { slug: 'turquoise', hex: '#40E0D0', name: 'Turquoise' },
  { slug: 'magenta', hex: '#FF00FF', name: 'Magenta' },
  { slug: 'lime', hex: '#00FF00', name: 'Lime' },
  { slug: 'cyan', hex: '#00FFFF', name: 'Cyan' },
  { slug: 'maroon', hex: '#800000', name: 'Maroon' },
  { slug: 'olive', hex: '#808000', name: 'Olive' },
  { slug: 'beige', hex: '#F5F5DC', name: 'Beige' },
  { slug: 'ivory', hex: '#FFFFF0', name: 'Ivory' },
  { slug: 'lavender', hex: '#E6E6FA', name: 'Lavender' },
  { slug: 'crimson', hex: '#DC143C', name: 'Crimson' },
  { slug: 'khaki', hex: '#F0E68C', name: 'Khaki' },
  { slug: 'plum', hex: '#DDA0DD', name: 'Plum' },
  { slug: 'sienna', hex: '#A0522D', name: 'Sienna' },
  { slug: 'tomato', hex: '#FF6347', name: 'Tomato' },
  { slug: 'FF5733', hex: '#FF5733', name: '#FF5733' },
  { slug: '333333', hex: '#333333', name: '#333333' },
  { slug: '000000', hex: '#000000', name: '#000000' },
  { slug: 'FFFFFF', hex: '#FFFFFF', name: '#FFFFFF' },
  { slug: '0066CC', hex: '#0066CC', name: '#0066CC' },
  { slug: '3498DB', hex: '#3498DB', name: '#3498DB' },
  { slug: 'E74C3C', hex: '#E74C3C', name: '#E74C3C' },
  { slug: '2ECC71', hex: '#2ECC71', name: '#2ECC71' },
  { slug: 'F39C12', hex: '#F39C12', name: '#F39C12' },
  { slug: '9B59B6', hex: '#9B59B6', name: '#9B59B6' },
]

export function generateStaticParams() {
  return COLORS.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const color = COLORS.find(c => c.slug === slug)
  if (!color) return { title: 'Color Picker' }

  const isHex = color.slug.match(/^[0-9A-F]{6}$/i)
  return {
    title: isHex
      ? `#${color.slug} Color — RGB, HSL Values & Shades`
      : `${color.name} Color Code — HEX, RGB, HSL & Shades`,
    description: `${color.name} color (${color.hex}): get HEX, RGB, HSL values. View shades, tints, and complementary colors. Copy any value instantly.`,
    keywords: `${color.name.toLowerCase()} color code, ${color.hex} rgb, ${color.name.toLowerCase()} hex, ${color.name.toLowerCase()} color`,
  }
}

export default async function ColorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const color = COLORS.find(c => c.slug === slug)
  if (!color) return <ColorClient />

  return <ColorClient defaultColor={color.hex} />
}
