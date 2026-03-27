import type { Metadata } from 'next'
import HomeClient from './client'
import { generateHomepageJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Tools4Free — 40+ Free Online Tools | No Signup, No Tracking',
  description: 'Free online tools for developers, designers & everyone. QR codes, password generators, unit converters, JSON formatters, mortgage calculators, calorie counters & more. 100% browser-based — your data never leaves your device.',
  alternates: {
    canonical: 'https://tools4free.site',
    languages: {
      en: 'https://tools4free.site',
      fr: 'https://tools4free.site/fr',
      es: 'https://tools4free.site/es',
      pt: 'https://tools4free.site/pt',
      de: 'https://tools4free.site/de',
    },
  },
  openGraph: {
    title: 'Tools4Free — 40+ Free Online Tools',
    description: 'Free online tools for developers, designers & everyone. QR codes, passwords, JSON formatters, calculators & more. No signup, no tracking.',
    url: 'https://tools4free.site',
    images: ['/api/og?title=Tools4Free&description=40%2B%20Free%20Online%20Tools%20%E2%80%94%20No%20Signup%2C%20No%20Tracking'],
  },
}

const jsonLd = generateHomepageJsonLd()

export default function HomePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <HomeClient />
    </>
  )
}
