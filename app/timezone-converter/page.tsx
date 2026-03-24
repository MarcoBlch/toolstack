import type { Metadata } from 'next'
import TimezoneClient from './client'

export const metadata: Metadata = {
  title: 'Timezone Converter — Free World Clock & Time Zone Calculator',
  description: 'Convert time between any timezones instantly. World clock, meeting planner, EST to GMT, PST to IST. Free, no signup.',
  keywords: 'timezone converter, time zone converter, est to gmt, pst to ist, world clock, time difference calculator',
}

export default function TimezonePage() {
  return <TimezoneClient />
}
