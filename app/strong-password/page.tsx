import type { Metadata } from 'next'
import PasswordGeneratorClient from '../password-generator/client'

export const metadata: Metadata = {
  title: 'Strong Password Generator',
  description: 'Generate strong, secure passwords instantly. Cryptographically random. Never stored. Free strong password generator.',
  keywords: 'strong password, secure password',
}

export default function StrongPasswordPage() {
  return <PasswordGeneratorClient />
}
