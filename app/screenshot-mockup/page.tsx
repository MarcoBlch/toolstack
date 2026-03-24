import type { Metadata } from 'next'
import MockupClient from './client'

export const metadata: Metadata = {
  title: 'Screenshot Mockup — Free Browser & Device Frame Generator',
  description: 'Drop a screenshot, frame it in a beautiful browser or device mockup. Download as PNG. Free, instant, no signup.',
  keywords: 'screenshot mockup, browser mockup, device frame, mockup generator, screenshot beautifier, browser frame',
}

export default function MockupPage() {
  return <MockupClient />
}
