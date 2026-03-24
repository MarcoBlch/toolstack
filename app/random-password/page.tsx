import type { Metadata } from 'next'
import PasswordGeneratorClient from '../password-generator/client'

export const metadata: Metadata = {
  title: 'Random Password Generator',
  description: 'Generate random passwords with custom length and character types. Cryptographically secure. Free random password generator.',
  keywords: 'random password, generate password',
}

export default function RandomPasswordPage() {
  return <PasswordGeneratorClient />
}
