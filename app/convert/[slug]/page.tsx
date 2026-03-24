import type { Metadata } from 'next'
import UnitConverterClient from '../../unit-converter/client'

const CONVERSIONS = [
  // Weight: kg ↔ lbs
  ...[1,2,3,5,10,15,20,25,30,40,50,60,70,75,80,90,100,150,200,250].map(v => ({
    slug: `${v}-kg-to-lbs`, value: String(v), from: 'kg', to: 'lb', cat: 'weight', title: `${v} kg to lbs`, fromName: 'Kilograms', toName: 'Pounds',
  })),
  ...[1,5,10,20,50,100,120,130,140,150,160,170,180,200,250].map(v => ({
    slug: `${v}-lbs-to-kg`, value: String(v), from: 'lb', to: 'kg', cat: 'weight', title: `${v} lbs to kg`, fromName: 'Pounds', toName: 'Kilograms',
  })),
  // Weight: grams ↔ ounces
  ...[1,5,10,25,50,100,200,250,500,1000].map(v => ({
    slug: `${v}-grams-to-oz`, value: String(v), from: 'g', to: 'oz', cat: 'weight', title: `${v} grams to ounces`, fromName: 'Grams', toName: 'Ounces',
  })),
  // Length: cm ↔ inches
  ...[1,2,3,5,10,15,20,25,30,40,50,60,70,80,90,100,120,150,180,200].map(v => ({
    slug: `${v}-cm-to-inches`, value: String(v), from: 'cm', to: 'in', cat: 'length', title: `${v} cm to inches`, fromName: 'Centimeters', toName: 'Inches',
  })),
  ...[1,2,3,4,5,6,7,8,10,12,18,24,36,48,72].map(v => ({
    slug: `${v}-inches-to-cm`, value: String(v), from: 'in', to: 'cm', cat: 'length', title: `${v} inches to cm`, fromName: 'Inches', toName: 'Centimeters',
  })),
  // Length: feet ↔ meters
  ...[1,2,3,4,5,6,7,8,9,10,15,20,50,100,1000].map(v => ({
    slug: `${v}-feet-to-meters`, value: String(v), from: 'ft', to: 'm', cat: 'length', title: `${v} feet to meters`, fromName: 'Feet', toName: 'Meters',
  })),
  ...[1,2,3,5,10,20,50,100,500,1000].map(v => ({
    slug: `${v}-meters-to-feet`, value: String(v), from: 'm', to: 'ft', cat: 'length', title: `${v} meters to feet`, fromName: 'Meters', toName: 'Feet',
  })),
  // Length: miles ↔ km
  ...[1,2,3,5,10,15,20,25,30,50,100,200,500,1000,5000].map(v => ({
    slug: `${v}-miles-to-km`, value: String(v), from: 'mi', to: 'km', cat: 'length', title: `${v} miles to km`, fromName: 'Miles', toName: 'Kilometers',
  })),
  ...[1,2,3,5,10,15,20,25,30,50,100,200,500,1000,5000].map(v => ({
    slug: `${v}-km-to-miles`, value: String(v), from: 'km', to: 'mi', cat: 'length', title: `${v} km to miles`, fromName: 'Kilometers', toName: 'Miles',
  })),
  // Length: mm ↔ inches
  ...[1,2,3,5,10,15,20,25,50,100].map(v => ({
    slug: `${v}-mm-to-inches`, value: String(v), from: 'mm', to: 'in', cat: 'length', title: `${v} mm to inches`, fromName: 'Millimeters', toName: 'Inches',
  })),
  // Temperature: C ↔ F
  ...[0,10,15,20,21,22,23,24,25,30,35,36,37,38,39,40,50,60,70,80,90,100,120,150,175,180,190,200,220,250,300,350,375,400,425,450].map(v => ({
    slug: `${v}-celsius-to-fahrenheit`, value: String(v), from: 'c', to: 'f', cat: 'temp', title: `${v}°C to °F`, fromName: 'Celsius', toName: 'Fahrenheit',
  })),
  ...[0,32,50,60,68,70,72,75,80,90,98,100,120,140,150,160,170,180,200,212,250,300,325,350,375,400,425,450,475,500].map(v => ({
    slug: `${v}-fahrenheit-to-celsius`, value: String(v), from: 'f', to: 'c', cat: 'temp', title: `${v}°F to °C`, fromName: 'Fahrenheit', toName: 'Celsius',
  })),
  // Volume: liters ↔ gallons
  ...[1,2,3,5,10,20,50,100,500,1000].map(v => ({
    slug: `${v}-liters-to-gallons`, value: String(v), from: 'l', to: 'gal_us', cat: 'volume', title: `${v} liters to gallons`, fromName: 'Liters', toName: 'US Gallons',
  })),
  ...[1,2,3,5,10,20,50,100,500,1000].map(v => ({
    slug: `${v}-gallons-to-liters`, value: String(v), from: 'gal_us', to: 'l', cat: 'volume', title: `${v} gallons to liters`, fromName: 'US Gallons', toName: 'Liters',
  })),
  // Volume: ml ↔ oz
  ...[1,5,10,25,50,100,200,250,500,1000].map(v => ({
    slug: `${v}-ml-to-oz`, value: String(v), from: 'ml', to: 'fl_oz', cat: 'volume', title: `${v} ml to oz`, fromName: 'Milliliters', toName: 'Fluid Ounces',
  })),
  // Volume: cups ↔ ml
  ...[0.25,0.5,1,1.5,2,3,4,5].map(v => ({
    slug: `${v}-cups-to-ml`, value: String(v), from: 'cup', to: 'ml', cat: 'volume', title: `${v} cups to ml`, fromName: 'Cups', toName: 'Milliliters',
  })),
  // Speed: mph ↔ km/h
  ...[10,20,30,40,50,60,70,80,100,120].map(v => ({
    slug: `${v}-mph-to-kmh`, value: String(v), from: 'mph', to: 'kmh', cat: 'speed', title: `${v} mph to km/h`, fromName: 'Miles/hour', toName: 'Km/hour',
  })),
  ...[10,20,30,50,60,80,100,120,150,200].map(v => ({
    slug: `${v}-kmh-to-mph`, value: String(v), from: 'kmh', to: 'mph', cat: 'speed', title: `${v} km/h to mph`, fromName: 'Km/hour', toName: 'Miles/hour',
  })),
  // Data: MB ↔ GB
  ...[1,10,50,100,256,500,512,1024].map(v => ({
    slug: `${v}-mb-to-gb`, value: String(v), from: 'mb', to: 'gb', cat: 'data', title: `${v} MB to GB`, fromName: 'Megabytes', toName: 'Gigabytes',
  })),
  ...[1,2,4,5,8,10,16,32].map(v => ({
    slug: `${v}-gb-to-mb`, value: String(v), from: 'gb', to: 'mb', cat: 'data', title: `${v} GB to MB`, fromName: 'Gigabytes', toName: 'Megabytes',
  })),
]

export function generateStaticParams() {
  return CONVERSIONS.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const conv = CONVERSIONS.find(c => c.slug === slug)
  if (!conv) return { title: 'Unit Converter' }

  return {
    title: `${conv.title} — Free ${conv.fromName} to ${conv.toName} Converter`,
    description: `Convert ${conv.value} ${conv.fromName} to ${conv.toName} instantly. Free unit conversion calculator. No signup needed.`,
    keywords: `${conv.slug.replace(/-/g, ' ')}, ${conv.fromName.toLowerCase()} to ${conv.toName.toLowerCase()}, unit converter`,
  }
}

export default async function ConvertPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const conv = CONVERSIONS.find(c => c.slug === slug)
  if (!conv) return <UnitConverterClient />

  return <UnitConverterClient
    defaultCategory={conv.cat}
    defaultFrom={conv.from}
    defaultTo={conv.to}
    defaultValue={conv.value}
  />
}
