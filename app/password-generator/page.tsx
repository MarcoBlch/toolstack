import type { Metadata } from 'next'
import PassClient from './client'

export const metadata: Metadata = {
  title: 'Password Generator — Free Secure Random Password Maker',
  description: 'Generate cryptographically secure passwords instantly. Customize length, characters, strength meter. Never stored. 100% local.',
  keywords: 'password generator, random password, secure password, strong password generator, password maker',
}

export default function PassPage() {
  return <PassClient />
}
