import type { Metadata } from 'next'
import PassClient from '../../password-generator/client'

const PASSWORDS = [
  { slug: '8-character-password', length: 8, title: '8 Character Password Generator' },
  { slug: '10-character-password', length: 10, title: '10 Character Password Generator' },
  { slug: '12-character-password', length: 12, title: '12 Character Password Generator' },
  { slug: '16-character-password', length: 16, title: '16 Character Password Generator' },
  { slug: '20-character-password', length: 20, title: '20 Character Password Generator' },
  { slug: '32-character-password', length: 32, title: '32 Character Password Generator' },
  { slug: '64-character-password', length: 64, title: '64 Character Password Generator' },
  { slug: '4-digit-pin', length: 4, title: '4 Digit PIN Generator' },
  { slug: '6-digit-pin', length: 6, title: '6 Digit PIN Generator' },
  { slug: '8-digit-pin', length: 8, title: '8 Digit PIN Generator' },
]

export function generateStaticParams() {
  return PASSWORDS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const pw = PASSWORDS.find(p => p.slug === slug)
  if (!pw) return { title: 'Password Generator' }

  return {
    title: `${pw.title} — Free Secure Random Password`,
    description: `Generate a random ${pw.length}-character secure password. Cryptographically random. Never stored. 100% local.`,
    keywords: `${pw.slug.replace(/-/g, ' ')}, ${pw.length} character password, random password ${pw.length} characters`,
  }
}

export default async function PasswordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pw = PASSWORDS.find(p => p.slug === slug)
  if (!pw) return <PassClient />

  return <PassClient defaultLength={pw.length} />
}
