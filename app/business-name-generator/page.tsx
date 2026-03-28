import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Business Name Generator — Company Name Ideas with Domain Check',
  description: 'Generate creative business name ideas for your startup or company. Filter by industry and style. Check domain availability instantly. 100% free, no signup.',
  keywords: 'business name generator, company name ideas, startup name generator, brand name generator, domain name check, business name ideas',
  alternates: getAlternates('/business-name-generator'),
  openGraph: { images: ['/api/og?title=Free%20Business%20Name%20Generator&description=Generate%20creative%20business%20name%20ideas%20with%20instant%20domain%20availability%20check.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Free Business Name Generator',
  url: 'https://tools4free.site/business-name-generator',
  description: 'Generate creative business name ideas for your startup or company. Filter by industry and style, then check domain availability instantly.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
