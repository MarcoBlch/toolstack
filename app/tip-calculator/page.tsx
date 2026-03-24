import type { Metadata } from 'next'
import TipClient from './client'

export const metadata: Metadata = {
  title: 'Free Tip Calculator — Calculate Tip & Split the Bill',
  description: 'Calculate tip and split the bill instantly. See tip amounts at 10%, 15%, 18%, 20%, 25%. Perfect for restaurants. Free, no signup.',
  keywords: 'tip calculator, split the bill, restaurant tip, gratuity calculator, tip percentage, bill splitter',
}

export default function TipPage() {
  return <TipClient />
}
