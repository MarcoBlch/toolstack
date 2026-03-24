import type { Metadata } from 'next'
import Client from '../../image-compressor/client'

export const metadata: Metadata = {
  title: 'Bild Komprimieren — PNG & JPEG Bilder Verkleinern Kostenlos',
  description: 'Komprimiere Bilder um bis zu 80% ohne Qualitätsverlust. JPEG, PNG, WebP. Alles bleibt im Browser. Kostenlos.',
  keywords: 'Bild komprimieren, Bilder verkleinern, PNG komprimieren, JPEG komprimieren, Bildgröße reduzieren, Bild Komprimierung online',
}

export default function Page() {
  return <Client />
}
