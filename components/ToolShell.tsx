'use client'
import Link from 'next/link'

const TOOLS_NAV = [
  { href: '/fancy-text', name: 'Fancy Text' },
  { href: '/qr-generator', name: 'QR Codes' },
  { href: '/password-generator', name: 'Passwords' },
  { href: '/word-counter', name: 'Word Counter' },
  { href: '/json-formatter', name: 'JSON Formatter' },
  { href: '/case-converter', name: 'Case Converter' },
  { href: '/unit-converter', name: 'Unit Converter' },
  { href: '/image-compressor', name: 'Image Compressor' },
  { href: '/lorem-generator', name: 'Lorem Ipsum' },
  { href: '/gradient-generator', name: 'CSS Gradients' },
]

export default function ToolShell({
  name,
  icon,
  currentPath,
  children,
}: {
  name: string
  icon: string
  currentPath: string
  children: React.ReactNode
}) {
  const fb = "'Outfit', -apple-system, sans-serif"

  return (
    <div style={{ fontFamily: fb }}>
      {children}

      {/* Cross-promotion footer — THE MONEY MULTIPLIER */}
      <footer style={{
        maxWidth: 800, margin: '0 auto', padding: '24px 28px 32px',
        borderTop: '1px solid #E8E4DB',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, color: '#9A958A',
          textTransform: 'uppercase', letterSpacing: '.8px',
          marginBottom: 12,
        }}>
          More free tools
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {TOOLS_NAV.filter(t => t.href !== currentPath).map(t => (
            <Link key={t.href} href={t.href} style={{
              fontSize: 13, fontWeight: 500, color: '#5C5850',
              padding: '6px 14px', borderRadius: 8,
              border: '1px solid #E8E4DB', textDecoration: 'none',
              background: '#fff', transition: 'all .15s',
            }}>
              {t.name}
            </Link>
          ))}
          <Link href="/" style={{
            fontSize: 13, fontWeight: 500, color: '#9A958A',
            padding: '6px 14px', borderRadius: 8,
            border: '1px dashed #E8E4DB', textDecoration: 'none',
            transition: 'all .15s',
          }}>
            All tools →
          </Link>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontSize: 12, color: '#B0AAA0',
        }}>
          <span>© 2026 Tools4Free — Free forever</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#" style={{ color: '#B0AAA0', textDecoration: 'none' }}>Privacy</a>
            <a href="#" style={{ color: '#B0AAA0', textDecoration: 'none' }}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
