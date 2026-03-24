import type { Metadata } from 'next'
import Client from '../../image-compressor/client'

export const metadata: Metadata = {
  title: 'PNG Komprimieren — PNG Bilder Verkleinern Online Kostenlos',
  description: 'Komprimiere PNG-Dateien online ohne Qualitätsverlust. Drag & Drop, bis zu 80% kleiner. Kostenlos, im Browser.',
  keywords: 'PNG komprimieren, PNG verkleinern, PNG Dateigröße reduzieren, Bild komprimieren PNG, PNG optimieren',
}

export default function Page() {
  return <Client />
}
