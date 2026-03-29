'use client'
import Link from 'next/link'
import { TRANSLATIONS, REVERSE_TRANSLATIONS } from '@/lib/translations'
import { t, type Locale } from '@/lib/i18n'

const TOOLS_NAV = [
  { href: '/fancy-text', name: 'Fancy Text' },
  { href: '/qr-generator', name: 'QR Codes' },
  { href: '/password-generator', name: 'Passwords' },
  { href: '/word-counter', name: 'Word Counter' },
  { href: '/json-formatter', name: 'JSON Formatter' },
  { href: '/case-converter', name: 'Case Converter' },
  { href: '/unit-converter', name: 'Unit Converter' },
  { href: '/timezone-converter', name: 'Timezones' },
  { href: '/image-compressor', name: 'Image Compressor' },
  { href: '/lorem-generator', name: 'Lorem Ipsum' },
  { href: '/gradient-generator', name: 'CSS Gradients' },
  { href: '/base64', name: 'Base64' },
  { href: '/diff-checker', name: 'Diff Checker' },
  { href: '/hash-generator', name: 'Hash Generator' },
  { href: '/regex-tester', name: 'Regex Tester' },
  { href: '/emoji-picker', name: 'Emoji Picker' },
  { href: '/color-picker', name: 'Color Picker' },
  { href: '/markdown-editor', name: 'Markdown' },
  { href: '/favicon-generator', name: 'Favicons' },
  { href: '/screenshot-mockup', name: 'Mockups' },
  { href: '/invoice-generator', name: 'Invoices' },
  { href: '/mortgage-calculator', name: 'Mortgage' },
  { href: '/investment-calculator', name: 'Investments' },
  { href: '/salary-calculator', name: 'Salary' },
  { href: '/loan-calculator', name: 'Loans' },
  { href: '/percentage-calculator', name: 'Percentage' },
  { href: '/bmi-calculator', name: 'BMI' },
  { href: '/tip-calculator', name: 'Tips' },
  { href: '/vat-calculator', name: 'VAT' },
  { href: '/currency-converter', name: 'Currency' },
  { href: '/retirement-calculator', name: 'Retirement' },
  { href: '/calorie-calculator', name: 'Calories' },
  { href: '/due-date-calculator', name: 'Due Date' },
  { href: '/macro-calculator', name: 'Macros' },
  { href: '/ideal-weight', name: 'Ideal Weight' },
  { href: '/body-fat-calculator', name: 'Body Fat' },
  { href: '/calorie-deficit', name: 'Calorie Deficit' },
  { href: '/water-intake', name: 'Water Intake' },
  { href: '/heart-rate-calculator', name: 'Heart Rate' },
  { href: '/pace-calculator', name: 'Running Pace' },
  { href: '/one-rep-max', name: '1RM Calculator' },
  // Business & E-Commerce
  { href: '/discount-calculator', name: 'Discounts' },
  { href: '/profit-margin-calculator', name: 'Profit Margin' },
  { href: '/roi-calculator', name: 'ROI' },
  { href: '/business-name-generator', name: 'Name Generator' },
  { href: '/markup-calculator', name: 'Markup' },
  { href: '/shipping-calculator', name: 'Shipping' },
  { href: '/break-even-calculator', name: 'Break Even' },
  { href: '/sales-tax-calculator', name: 'Sales Tax' },
  { href: '/hourly-rate-calculator', name: 'Hourly Rate' },
  { href: '/invoice-number-generator', name: 'Invoice Numbers' },
]

const LANG_FLAGS = [
  { key: 'en', flag: '🇬🇧', code: 'EN' },
  { key: 'fr', flag: '🇫🇷', code: 'FR' },
  { key: 'es', flag: '🇪🇸', code: 'ES' },
  { key: 'pt', flag: '🇧🇷', code: 'PT' },
  { key: 'de', flag: '🇩🇪', code: 'DE' },
]

function detectLang(path: string): string {
  if (path.startsWith('/fr')) return 'fr'
  if (path.startsWith('/es')) return 'es'
  if (path.startsWith('/pt')) return 'pt'
  if (path.startsWith('/de')) return 'de'
  return 'en'
}

export default function ToolShell({
  name,
  icon,
  currentPath,
  locale,
  children,
}: {
  name: string
  icon: string
  currentPath: string
  locale?: Locale
  children: React.ReactNode
}) {
  const fb = "'Outfit', -apple-system, sans-serif"
  const lang = (locale || detectLang(currentPath)) as Locale

  // For translated pages, resolve back to English path first
  const englishPath = REVERSE_TRANSLATIONS[currentPath] || currentPath
  const tr = TRANSLATIONS[englishPath] || {}
  const langLinks = LANG_FLAGS.map(l => ({
    ...l,
    href: l.key === 'en' ? englishPath :
      (tr as any)[l.key] || `/${l.key}`,
  }))

  return (
    <div style={{ fontFamily: fb }}>
      {/* Top bar with back link + language switcher */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        maxWidth: 800, margin: '0 auto', padding: '10px 28px 0',
      }}>
        <Link href="/" style={{ fontSize: 13, color: '#9A958A', textDecoration: 'none' }}>
          {t('backAllTools', lang)}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {langLinks.map(l => {
            const isActive = l.key === lang
            if (isActive) {
              return (
                <span key={l.key} style={{
                  padding: '4px 8px', borderRadius: 6, fontSize: 12,
                  fontWeight: 600, color: '#6B6560', background: '#E8E4DB',
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                }}>
                  {l.flag} {l.code}
                </span>
              )
            }
            return (
              <Link key={l.key} href={l.href} style={{
                padding: '4px 8px', borderRadius: 6, fontSize: 12,
                fontWeight: 400, color: '#9A958A', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 3,
              }}>
                {l.flag} {l.code}
              </Link>
            )
          })}
        </div>
      </div>
      {/* Trust badges */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 28px', borderBottom: '1px solid #E8E4DB' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 16, padding: '8px 0', fontSize: 11, color: '#9A958A',
        }}>
          <span>🔒 {t('trustLocal', lang)} — {t('trustNoData', lang)}</span>
          <span>⚡ {t('trustInstant', lang)}</span>
          <span>🛡️ {t('trustPrivate', lang)}</span>
        </div>
      </div>
      {children}

      {/* Cross-promotion footer */}
      <footer style={{
        maxWidth: 800, margin: '0 auto', padding: '24px 28px 32px',
        borderTop: '1px solid #E8E4DB',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 600, color: '#9A958A',
          textTransform: 'uppercase', letterSpacing: '.8px',
          marginBottom: 12,
        }}>
          {t('moreTools', lang)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {TOOLS_NAV.filter(n => n.href !== currentPath).map(n => (
            <Link key={n.href} href={n.href} style={{
              fontSize: 13, fontWeight: 500, color: '#5C5850',
              padding: '6px 14px', borderRadius: 8,
              border: '1px solid #E8E4DB', textDecoration: 'none',
              background: '#fff', transition: 'all .15s',
            }}>
              {n.name}
            </Link>
          ))}
          <Link href="/" style={{
            fontSize: 13, fontWeight: 500, color: '#9A958A',
            padding: '6px 14px', borderRadius: 8,
            border: '1px dashed #E8E4DB', textDecoration: 'none',
            transition: 'all .15s',
          }}>
            {t('allToolsArrow', lang)}
          </Link>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, color: '#B0AAA0', flexWrap: 'wrap', gap: 8,
        }}>
          <span>{t('copyright', lang)}</span>
          <span style={{ fontSize: 11 }}>
            {t('deployedOn', lang)}{' '}
            <a href="https://vercel.com/?utm_source=tools4free&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ color: '#B0AAA0', textDecoration: 'underline' }}>Vercel</a>
            {' · '}{t('domainFrom', lang)}{' '}
            <a href="https://www.namecheap.com/?utm_source=tools4free&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ color: '#B0AAA0', textDecoration: 'underline' }}>Namecheap</a>
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#" style={{ color: '#B0AAA0', textDecoration: 'none' }}>{t('privacy', lang)}</a>
            <a href="#" style={{ color: '#B0AAA0', textDecoration: 'none' }}>{t('terms', lang)}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
