import type { Metadata } from 'next'
import Client from '../../fancy-text/client'
import { generateToolJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Instagram Schriften — Schriftarten für Instagram Bio Kostenlos',
  description: 'Generiere coole Schriftarten für deine Instagram Bio und Storys. 20+ Stile. Kopieren und einfügen. Kostenlos.',
  keywords: 'Instagram Schriften, Schriftarten Instagram, coole Schrift Instagram, Instagram Bio Schriftart, Schrift Instagram ändern',
  openGraph: { images: ['/api/og?title=Instagram%20Schriften&description=Generiere%20coole%20Schriftarten%20f%C3%BCr%20deine%20Instagram%20Bio%20und%20Storys.%2020%2B%20Stile.%20Kopieren%20und%20einf%C3%BCgen.%20K'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Instagram Schriften',
  url: 'https://tools4free.site/de/instagram-schriften',
  description: 'Generiere coole Schriftarten für deine Instagram Bio und Storys. 20+ Stile. Kopieren und einfügen. Kostenlos.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
