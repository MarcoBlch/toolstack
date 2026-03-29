import type { Metadata } from 'next'
import Client from '../../unix-timestamp/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Conversor de Timestamp Unix Grátis',
  description: 'Converta um timestamp Unix em data legível ou uma data em timestamp Unix. Exibe o timestamp atual ao vivo. UTC, hora local, ISO 8601. Grátis.',
  keywords: 'conversor timestamp, timestamp unix, epoch para data, data para timestamp, unix time, timestamp atual',
  alternates: getAlternates('/unix-timestamp'),
  openGraph: { images: ['/api/og?title=Conversor%20Timestamp%20Unix&description=Epoch%20para%20data%20e%20data%20para%20timestamp.%20Gr%C3%A1tis.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Conversor de Timestamp Unix',
  url: 'https://tools4free.site/pt/conversor-timestamp',
  description: 'Converta um timestamp Unix em data legível ou uma data em timestamp Unix.',
  category: 'DeveloperApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="pt" />
    </>
  )
}
