import type { Metadata } from 'next'
import Client from './client'
import { generateToolJsonLd } from '@/lib/jsonld'
import { getAlternates } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Free Online Timer — Set Minutes, Countdown, Audio Alert',
  description: 'Free online timer. Set a countdown timer up to 99 hours. Quick presets: 1, 2, 3, 5, 10, 15, 30 minutes. Audio beep alert when timer reaches zero. No app needed.',
  keywords: 'online timer, countdown timer, kitchen timer, 5 minute timer, 10 minute timer, free timer, egg timer, web timer',
  alternates: getAlternates('/timer'),
  openGraph: { images: ['/api/og?title=Free%20Online%20Timer&description=Set%20minutes%20and%20seconds.%20Audio%20alert%20when%20done.%20No%20app%20needed.'] },
}

const jsonLd = generateToolJsonLd({
  name: 'Online Timer',
  url: 'https://tools4free.site/timer',
  description: 'Free online timer. Set a countdown timer up to 99 hours with audio alert. Quick presets for common durations.',
  category: 'UtilityApplication',
})

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Client />
    </>
  )
}
