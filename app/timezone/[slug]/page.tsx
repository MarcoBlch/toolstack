import type { Metadata } from 'next'
import TimezoneClient from '../../timezone-converter/client'

const TIMEZONES = [
  { slug: 'new-york-to-london', from: 'America/New_York', to: 'Europe/London', fromCity: 'New York', toCity: 'London' },
  { slug: 'new-york-to-paris', from: 'America/New_York', to: 'Europe/Paris', fromCity: 'New York', toCity: 'Paris' },
  { slug: 'new-york-to-tokyo', from: 'America/New_York', to: 'Asia/Tokyo', fromCity: 'New York', toCity: 'Tokyo' },
  { slug: 'new-york-to-los-angeles', from: 'America/New_York', to: 'America/Los_Angeles', fromCity: 'New York', toCity: 'Los Angeles' },
  { slug: 'london-to-new-york', from: 'Europe/London', to: 'America/New_York', fromCity: 'London', toCity: 'New York' },
  { slug: 'london-to-tokyo', from: 'Europe/London', to: 'Asia/Tokyo', fromCity: 'London', toCity: 'Tokyo' },
  { slug: 'london-to-dubai', from: 'Europe/London', to: 'Asia/Dubai', fromCity: 'London', toCity: 'Dubai' },
  { slug: 'london-to-sydney', from: 'Europe/London', to: 'Australia/Sydney', fromCity: 'London', toCity: 'Sydney' },
  { slug: 'london-to-singapore', from: 'Europe/London', to: 'Asia/Singapore', fromCity: 'London', toCity: 'Singapore' },
  { slug: 'paris-to-new-york', from: 'Europe/Paris', to: 'America/New_York', fromCity: 'Paris', toCity: 'New York' },
  { slug: 'paris-to-tokyo', from: 'Europe/Paris', to: 'Asia/Tokyo', fromCity: 'Paris', toCity: 'Tokyo' },
  { slug: 'paris-to-london', from: 'Europe/Paris', to: 'Europe/London', fromCity: 'Paris', toCity: 'London' },
  { slug: 'paris-to-dubai', from: 'Europe/Paris', to: 'Asia/Dubai', fromCity: 'Paris', toCity: 'Dubai' },
  { slug: 'tokyo-to-new-york', from: 'Asia/Tokyo', to: 'America/New_York', fromCity: 'Tokyo', toCity: 'New York' },
  { slug: 'tokyo-to-london', from: 'Asia/Tokyo', to: 'Europe/London', fromCity: 'Tokyo', toCity: 'London' },
  { slug: 'tokyo-to-sydney', from: 'Asia/Tokyo', to: 'Australia/Sydney', fromCity: 'Tokyo', toCity: 'Sydney' },
  { slug: 'los-angeles-to-new-york', from: 'America/Los_Angeles', to: 'America/New_York', fromCity: 'Los Angeles', toCity: 'New York' },
  { slug: 'los-angeles-to-london', from: 'America/Los_Angeles', to: 'Europe/London', fromCity: 'Los Angeles', toCity: 'London' },
  { slug: 'los-angeles-to-tokyo', from: 'America/Los_Angeles', to: 'Asia/Tokyo', fromCity: 'Los Angeles', toCity: 'Tokyo' },
  { slug: 'dubai-to-london', from: 'Asia/Dubai', to: 'Europe/London', fromCity: 'Dubai', toCity: 'London' },
  { slug: 'dubai-to-new-york', from: 'Asia/Dubai', to: 'America/New_York', fromCity: 'Dubai', toCity: 'New York' },
  { slug: 'sydney-to-london', from: 'Australia/Sydney', to: 'Europe/London', fromCity: 'Sydney', toCity: 'London' },
  { slug: 'sydney-to-new-york', from: 'Australia/Sydney', to: 'America/New_York', fromCity: 'Sydney', toCity: 'New York' },
  { slug: 'singapore-to-london', from: 'Asia/Singapore', to: 'Europe/London', fromCity: 'Singapore', toCity: 'London' },
  { slug: 'singapore-to-new-york', from: 'Asia/Singapore', to: 'America/New_York', fromCity: 'Singapore', toCity: 'New York' },
  { slug: 'india-to-new-york', from: 'Asia/Kolkata', to: 'America/New_York', fromCity: 'India', toCity: 'New York' },
  { slug: 'india-to-london', from: 'Asia/Kolkata', to: 'Europe/London', fromCity: 'India', toCity: 'London' },
  { slug: 'india-to-dubai', from: 'Asia/Kolkata', to: 'Asia/Dubai', fromCity: 'India', toCity: 'Dubai' },
  { slug: 'india-to-singapore', from: 'Asia/Kolkata', to: 'Asia/Singapore', fromCity: 'India', toCity: 'Singapore' },
  { slug: 'est-to-gmt', from: 'America/New_York', to: 'Europe/London', fromCity: 'EST', toCity: 'GMT' },
  { slug: 'est-to-pst', from: 'America/New_York', to: 'America/Los_Angeles', fromCity: 'EST', toCity: 'PST' },
  { slug: 'est-to-cet', from: 'America/New_York', to: 'Europe/Paris', fromCity: 'EST', toCity: 'CET' },
  { slug: 'est-to-ist', from: 'America/New_York', to: 'Asia/Kolkata', fromCity: 'EST', toCity: 'IST' },
  { slug: 'est-to-jst', from: 'America/New_York', to: 'Asia/Tokyo', fromCity: 'EST', toCity: 'JST' },
  { slug: 'pst-to-est', from: 'America/Los_Angeles', to: 'America/New_York', fromCity: 'PST', toCity: 'EST' },
  { slug: 'pst-to-gmt', from: 'America/Los_Angeles', to: 'Europe/London', fromCity: 'PST', toCity: 'GMT' },
  { slug: 'pst-to-ist', from: 'America/Los_Angeles', to: 'Asia/Kolkata', fromCity: 'PST', toCity: 'IST' },
  { slug: 'gmt-to-est', from: 'Europe/London', to: 'America/New_York', fromCity: 'GMT', toCity: 'EST' },
  { slug: 'gmt-to-pst', from: 'Europe/London', to: 'America/Los_Angeles', fromCity: 'GMT', toCity: 'PST' },
  { slug: 'gmt-to-ist', from: 'Europe/London', to: 'Asia/Kolkata', fromCity: 'GMT', toCity: 'IST' },
  { slug: 'gmt-to-jst', from: 'Europe/London', to: 'Asia/Tokyo', fromCity: 'GMT', toCity: 'JST' },
  { slug: 'cet-to-est', from: 'Europe/Paris', to: 'America/New_York', fromCity: 'CET', toCity: 'EST' },
  { slug: 'ist-to-est', from: 'Asia/Kolkata', to: 'America/New_York', fromCity: 'IST', toCity: 'EST' },
  { slug: 'ist-to-gmt', from: 'Asia/Kolkata', to: 'Europe/London', fromCity: 'IST', toCity: 'GMT' },
  { slug: 'ist-to-pst', from: 'Asia/Kolkata', to: 'America/Los_Angeles', fromCity: 'IST', toCity: 'PST' },
  { slug: 'jst-to-est', from: 'Asia/Tokyo', to: 'America/New_York', fromCity: 'JST', toCity: 'EST' },
  { slug: 'jst-to-gmt', from: 'Asia/Tokyo', to: 'Europe/London', fromCity: 'JST', toCity: 'GMT' },
  { slug: 'jst-to-pst', from: 'Asia/Tokyo', to: 'America/Los_Angeles', fromCity: 'JST', toCity: 'PST' },
]

export function generateStaticParams() {
  return TIMEZONES.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tz = TIMEZONES.find(t => t.slug === slug)
  if (!tz) return { title: 'Timezone Converter' }

  return {
    title: `${tz.fromCity} to ${tz.toCity} Time — Current Time Difference`,
    description: `What time is it in ${tz.toCity} when it's noon in ${tz.fromCity}? Convert ${tz.fromCity} time to ${tz.toCity} time instantly. Live clock.`,
    keywords: `${tz.fromCity.toLowerCase()} to ${tz.toCity.toLowerCase()} time, ${tz.fromCity.toLowerCase()} ${tz.toCity.toLowerCase()} time difference, time zone converter`,
  }
}

export default async function TimezonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tz = TIMEZONES.find(t => t.slug === slug)
  if (!tz) return <TimezoneClient />

  return <TimezoneClient defaultFrom={tz.from} defaultTo={tz.to} />
}
