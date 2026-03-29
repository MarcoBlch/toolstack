import type { Metadata } from 'next'
import Client from '../../business-name-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Firmennamen Generator — Geschäftsnamen Kostenlos',
  alternates: getAlternates('/business-name-generator'),
  description: 'Generieren Sie kreative und einzigartige Firmennamen. Finden Sie den perfekten Namen für Ihr Unternehmen, Startup oder Ihre Marke. Kostenlos.',
  keywords: 'firmennamen generator, geschäftsnamen, unternehmensname finden, startup name, markenname, firmenname ideen',
  openGraph: { images: ['/api/og?title=Firmennamen%20Generator&description=Generieren%20Sie%20kreative%20und%20einzigartige%20Firmennamen.%20Kostenlos.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Firmennamen Generator',
  url: 'https://tools4free.site/de/firmenname-generator',
  description: 'Generieren Sie kreative und einzigartige Firmennamen. Finden Sie den perfekten Namen für Ihr Unternehmen, Startup oder Ihre Marke. Kostenlos.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="de" />
    </>
  )
}
