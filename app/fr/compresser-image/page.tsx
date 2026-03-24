import type { Metadata } from 'next'
import Client from '../../image-compressor/client'

export const metadata: Metadata = {
  title: 'Compresser une Image en Ligne Gratuit',
  description: "Réduisez la taille de vos images jusqu'à 80%. JPEG, PNG, WebP. Tout se passe dans votre navigateur. Gratuit, sans inscription.",
  keywords: 'compresser image, réduire taille image, compresseur image, optimiser image',
}

export default function Page() {
  return <Client />
}
