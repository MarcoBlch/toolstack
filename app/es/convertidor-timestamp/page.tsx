import type { Metadata } from 'next'
import Client from '../../unix-timestamp/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Convertidor de Timestamp Unix Gratis',
  description: 'Convierte un timestamp Unix a fecha legible o una fecha a timestamp Unix. Muestra el timestamp actual en vivo. UTC, hora local, ISO 8601. Gratis.',
  keywords: 'convertidor timestamp, timestamp unix, epoch a fecha, fecha a timestamp, unix time, timestamp actual',
  alternates: getAlternates('/unix-timestamp'),
  openGraph: { images: ['/api/og?title=Convertidor%20Timestamp%20Unix&description=Epoch%20a%20fecha%20y%20fecha%20a%20timestamp.%20Gratis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Convertidor de Timestamp Unix',
  url: 'https://tools4free.site/es/convertidor-timestamp',
  description: 'Convierte un timestamp Unix a fecha legible o una fecha a timestamp Unix.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="es" />
    </>
  )
}
