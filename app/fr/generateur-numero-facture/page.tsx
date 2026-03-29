import type { Metadata } from 'next'
import Client from '../../invoice-number-generator/client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Générateur de Numéro de Facture Gratuit',
  alternates: getAlternates('/invoice-number-generator'),
  description: 'Générez des numéros de facture uniques et professionnels. Personnalisez le format et la séquence pour votre entreprise. Gratuit.',
  keywords: 'générateur numéro facture, numéro de facture, numérotation facture, créer numéro facture, facture séquentielle, format facture',
  openGraph: { images: ['/api/og?title=G%C3%A9n%C3%A9rateur%20Num%C3%A9ro%20Facture&description=G%C3%A9n%C3%A9rez%20des%20num%C3%A9ros%20de%20facture%20uniques%20et%20professionnels.%20Gratuit.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Générateur de Numéro de Facture',
  url: 'https://tools4free.site/fr/generateur-numero-facture',
  description: 'Générez des numéros de facture uniques et professionnels. Personnalisez le format et la séquence pour votre entreprise. Gratuit.',
  category: 'BusinessApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client locale="fr" />
    </>
  )
}
