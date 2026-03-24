import type { Metadata } from 'next'
import Client from '../../image-compressor/client'

export const metadata: Metadata = {
  title: 'JPEG Komprimieren — JPG Bilder Verkleinern Online Kostenlos',
  description: 'Komprimiere JPEG/JPG-Bilder um bis zu 80%. Qualitätsregler, Drag & Drop. Alles im Browser. Kostenlos.',
  keywords: 'JPEG komprimieren, JPG komprimieren, JPG verkleinern, Foto komprimieren, JPEG Dateigröße reduzieren',
}

export default function Page() {
  return <Client />
}
