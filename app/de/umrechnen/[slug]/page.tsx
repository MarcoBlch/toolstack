import type { Metadata } from 'next'
import UnitConverterClient from '../../../unit-converter/client'
import { generateToolJsonLd } from '@/lib/jsonld'

const CONVERSIONS_DE = [
  // Gewicht
  ...[1,2,3,5,10,20,30,40,50,60,70,75,80,90,100].map(v => ({
    slug: `${v}-kg-in-pfund`, value: String(v), from: 'kg', to: 'lb', cat: 'weight',
    title: `${v} kg in Pfund (lbs)`, fromName: 'Kilogramm', toName: 'Pfund'
  })),
  ...[1,5,10,50,100,150,200,250].map(v => ({
    slug: `${v}-pfund-in-kg`, value: String(v), from: 'lb', to: 'kg', cat: 'weight',
    title: `${v} Pfund in kg`, fromName: 'Pfund', toName: 'Kilogramm'
  })),
  // Länge
  ...[1,2,3,5,10,15,20,25,30,40,50,60,70,80,90,100,120,150,170,175,180,185,190,200].map(v => ({
    slug: `${v}-cm-in-zoll`, value: String(v), from: 'cm', to: 'in', cat: 'length',
    title: `${v} cm in Zoll`, fromName: 'Zentimeter', toName: 'Zoll'
  })),
  ...[1,2,3,4,5,6,7,8,10,12,24,36,48].map(v => ({
    slug: `${v}-zoll-in-cm`, value: String(v), from: 'in', to: 'cm', cat: 'length',
    title: `${v} Zoll in cm`, fromName: 'Zoll', toName: 'Zentimeter'
  })),
  // Meilen / Kilometer
  ...[1,2,3,5,10,20,50,100,200,500].map(v => ({
    slug: `${v}-meilen-in-km`, value: String(v), from: 'mi', to: 'km', cat: 'length',
    title: `${v} Meilen in km`, fromName: 'Meilen', toName: 'Kilometer'
  })),
  ...[1,2,3,5,10,20,50,100,200,500].map(v => ({
    slug: `${v}-km-in-meilen`, value: String(v), from: 'km', to: 'mi', cat: 'length',
    title: `${v} km in Meilen`, fromName: 'Kilometer', toName: 'Meilen'
  })),
  // Temperatur
  ...[0,10,15,20,25,30,35,37,38,40,50,60,80,100,150,180,200,220,250].map(v => ({
    slug: `${v}-celsius-in-fahrenheit`, value: String(v), from: 'c', to: 'f', cat: 'temp',
    title: `${v}°C in Fahrenheit`, fromName: 'Celsius', toName: 'Fahrenheit'
  })),
  ...[0,32,50,68,70,72,80,100,150,200,250,300,350,400,450].map(v => ({
    slug: `${v}-fahrenheit-in-celsius`, value: String(v), from: 'f', to: 'c', cat: 'temp',
    title: `${v}°F in Celsius`, fromName: 'Fahrenheit', toName: 'Celsius'
  })),
  // Volumen
  ...[1,2,5,10,20,50,100].map(v => ({
    slug: `${v}-liter-in-gallonen`, value: String(v), from: 'l', to: 'gal_us', cat: 'volume',
    title: `${v} Liter in Gallonen`, fromName: 'Liter', toName: 'Gallonen'
  })),
]

export function generateStaticParams() {
  return CONVERSIONS_DE.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const conv = CONVERSIONS_DE.find(c => c.slug === slug)
  if (!conv) return { title: 'Einheiten Umrechner' }
  return {
    title: `${conv.title} — Kostenloser ${conv.fromName} zu ${conv.toName} Umrechner`,
    description: `${conv.value} ${conv.fromName} in ${conv.toName} umrechnen. Kostenloser Einheiten-Umrechner online.`,
    keywords: `${conv.slug.replace(/-/g, ' ')}, ${conv.fromName} in ${conv.toName}, Umrechner`,
    openGraph: { images: [`/api/og?title=${encodeURIComponent(conv.title)}&description=${encodeURIComponent(conv.value + ' ' + conv.fromName + ' in ' + conv.toName + ' umrechnen.')}`] },
  }
}

export default async function ConvertDEPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const conv = CONVERSIONS_DE.find(c => c.slug === slug)
  if (!conv) return <UnitConverterClient />
  return <UnitConverterClient defaultCategory={conv.cat} defaultFrom={conv.from} defaultTo={conv.to} defaultValue={conv.value} />
}
