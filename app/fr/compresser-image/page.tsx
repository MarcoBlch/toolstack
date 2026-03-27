import type { Metadata } from 'next'
import Client from '../../image-compressor/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Compresser une Image en Ligne Gratuit',
  alternates: getAlternates('/image-compressor'),
  description: "Réduisez la taille de vos images jusqu'à 80%. JPEG, PNG, WebP. Tout se passe dans votre navigateur. Gratuit, sans inscription.",
  keywords: 'compresser image, réduire taille image, compresseur image, optimiser image',
  openGraph: { images: ['/api/og?title=Compresser%20une%20Image%20en%20Ligne%20Gratuit&description=R%C3%A9duisez%20la%20taille%20de%20vos%20images%20jusqu'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Compresser une Image en Ligne Gratuit',
  url: 'https://tools4free.site/fr/compresser-image',
  description: 'Réduisez la taille de vos images jusqu',
  category: 'DesignApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
