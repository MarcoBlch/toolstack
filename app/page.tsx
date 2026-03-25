'use client'
import Link from 'next/link'

const TOOLS = [
  { href: '/fancy-text', name: 'Fancy Text Generator', desc: 'Convert text to 20+ Unicode font styles for Instagram, TikTok & more', icon: '✦', color: '#FF6B35', searches: '4M+', tag: 'LIVE' },
  { href: '/qr-generator', name: 'QR Code Generator', desc: 'Create QR codes for URLs, WiFi, email, phone. Color themes. Free PNG download.', icon: '◫', color: '#1A6B4E', searches: '5.2M+', tag: 'LIVE' },
  { href: '/password-generator', name: 'Password Generator', desc: 'Cryptographically secure passwords. Strength meter. Never stored.', icon: '⬡', color: '#22D97A', searches: '3.1M+', tag: 'LIVE' },
  { href: '/unit-converter', name: 'Unit Converter', desc: 'Convert length, weight, temperature, volume, area, speed, data & time.', icon: '⇄', color: '#3B82F6', searches: '3.2M+', tag: 'LIVE' },
  { href: '/word-counter', name: 'Word & Character Counter', desc: 'Count words, characters, sentences, paragraphs. Reading time & keyword density.', icon: '¶', color: '#0EA5E9', searches: '2.8M+', tag: 'LIVE' },
  { href: '/timezone-converter', name: 'Timezone Converter', desc: 'Convert time between 24 zones. Live world clock. Meeting planner.', icon: '🕐', color: '#0891B2', searches: '2.1M+', tag: 'NEW' },
  { href: '/image-compressor', name: 'Image Compressor', desc: 'Reduce image size by up to 80%. JPEG, PNG, WebP. Nothing leaves your browser.', icon: '🗜', color: '#D85A30', searches: '2M+', tag: 'LIVE' },
  { href: '/json-formatter', name: 'JSON Formatter & Validator', desc: 'Format, validate, minify JSON. Syntax highlighting. Error detection.', icon: '{ }', color: '#8B5CF6', searches: '1.5M+', tag: 'LIVE' },
  { href: '/lorem-generator', name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text. Paragraphs, sentences, or exact word count.', icon: 'L', color: '#7C3AED', searches: '1.5M+', tag: 'LIVE' },
  { href: '/case-converter', name: 'Text Case Converter', desc: 'UPPER, lower, Title, camelCase, snake_case, kebab-case & 6 more.', icon: 'Aa', color: '#E8457A', searches: '1.2M+', tag: 'LIVE' },
  { href: '/hash-generator', name: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes. Web Crypto API powered.', icon: '#', color: '#059669', searches: '800K+', tag: 'NEW' },
  { href: '/gradient-generator', name: 'CSS Gradient Generator', desc: 'Create beautiful CSS gradients visually. Pick colors, angle, copy CSS.', icon: '◆', color: '#6366F1', searches: '800K+', tag: 'LIVE' },
  { href: '/base64', name: 'Base64 Encoder/Decoder', desc: 'Encode text to Base64 or decode Base64 back. Image to data URI.', icon: '↔', color: '#CA8A04', searches: '700K+', tag: 'NEW' },
  { href: '/diff-checker', name: 'Text Diff Checker', desc: 'Compare two texts side by side. Additions in green, deletions in red.', icon: '≠', color: '#DC2626', searches: '600K+', tag: 'NEW' },
  { href: '/regex-tester', name: 'Regex Tester', desc: 'Write regex, test against text, see matches highlighted in real time.', icon: '.*', color: '#9333EA', searches: '600K+', tag: 'NEW' },
  { href: '/emoji-picker', name: 'Emoji Picker', desc: 'Browse and copy all emojis. Search by name. 9 categories. One-click copy.', icon: '😀', color: '#F59E0B', searches: '900K+', tag: 'NEW' },
  { href: '/color-picker', name: 'Color Picker', desc: 'Pick colors. Get HEX, RGB, HSL. Generate shades, tints, complementary.', icon: '🎨', color: '#E11D48', searches: '500K+', tag: 'NEW' },
  { href: '/markdown-editor', name: 'Markdown Editor', desc: 'Write Markdown, see live HTML preview. Copy HTML. Split-pane editor.', icon: 'M↓', color: '#1C1B18', searches: '500K+', tag: 'NEW' },
  { href: '/favicon-generator', name: 'Favicon Generator', desc: 'Generate favicons from a letter or emoji. All sizes. Download PNG pack.', icon: '◨', color: '#2563EB', searches: '400K+', tag: 'NEW' },
  { href: '/screenshot-mockup', name: 'Screenshot Mockup', desc: 'Frame screenshots in browser or device mockups. Gradient backgrounds.', icon: '🖼', color: '#7C3AED', searches: '300K+', tag: 'NEW' },
  { href: '/invoice-generator', name: 'Invoice Generator', desc: 'Create professional invoices. Line items, tax, discounts. Download PDF. Free.', icon: '📄', color: '#059669', searches: '2.4M+', tag: 'NEW' },
  { href: '/mortgage-calculator', name: 'Mortgage Calculator', desc: 'Calculate monthly payments, total interest, amortization.', icon: '🏠', color: '#059669', searches: '5M+', tag: 'FINANCE' },
  { href: '/bmi-calculator', name: 'BMI Calculator', desc: 'Calculate Body Mass Index. Metric and imperial.', icon: '⚖️', color: '#0891B2', searches: '6M+', tag: 'FINANCE' },
  { href: '/currency-converter', name: 'Currency Converter', desc: 'Convert between 30+ world currencies instantly.', icon: '💱', color: '#059669', searches: '5M+', tag: 'FINANCE' },
  { href: '/loan-calculator', name: 'Loan Calculator', desc: 'Monthly payments for any loan. Amortization schedule.', icon: '🏦', color: '#DC2626', searches: '4M+', tag: 'FINANCE' },
  { href: '/percentage-calculator', name: 'Percentage Calculator', desc: 'What is X% of Y? Percentage change, difference.', icon: '%', color: '#D97706', searches: '3.5M+', tag: 'FINANCE' },
  { href: '/salary-calculator', name: 'Salary Calculator', desc: 'Gross to net salary. Tax breakdown by country.', icon: '💰', color: '#7C3AED', searches: '3M+', tag: 'FINANCE' },
  { href: '/tip-calculator', name: 'Tip Calculator', desc: 'Calculate tip and split the bill. Quick and easy.', icon: '🍽️', color: '#EA580C', searches: '2.5M+', tag: 'FINANCE' },
  { href: '/investment-calculator', name: 'Investment Calculator', desc: 'Compound interest. See your money grow over time.', icon: '📈', color: '#2563EB', searches: '2M+', tag: 'FINANCE' },
  { href: '/vat-calculator', name: 'VAT Calculator', desc: 'Add or remove VAT/sales tax. Pre-set country rates.', icon: '🧾', color: '#4338CA', searches: '1.5M+', tag: 'FINANCE' },
  { href: '/retirement-calculator', name: 'Retirement Calculator', desc: 'Plan retirement savings. Monthly income projection.', icon: '🏖️', color: '#7C3AED', searches: '1.5M+', tag: 'FINANCE' },
]

const COMING: { name: string; searches: string }[] = []

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

export default function Home() {
  return (
    <div style={{ fontFamily: fb, background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 28px', maxWidth: 960, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: '#1C1B18', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800,
          }}>T</div>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-.3px' }}>Tools4Free</span>
        </div>
        <span style={{ fontSize: 12, color: '#9A958A' }}>30+ free tools · Zero cost · Zero signup</span>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '64px 28px 24px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800,
          lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: 12,
        }}>
          Every tool you Google,<br />
          <span style={{ color: '#FF6B35' }}>in one place.</span>
        </h1>
        <p style={{
          fontSize: 17, color: '#5C5850', maxWidth: 480,
          margin: '0 auto 48px', lineHeight: 1.6,
        }}>
          Free. Fast. No signup. No tracking. All tools run locally in your browser — your data never leaves your device.
        </p>
      </section>

      {/* Tools Grid */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px 48px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 16,
        }}>
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                background: '#fff', borderRadius: 16, padding: '24px',
                border: '1.5px solid #E8E4DB', transition: 'all .2s',
                cursor: 'pointer', height: '100%',
              }}
                onMouseEnter={(e: any) => { e.currentTarget.style.borderColor = tool.color; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }}
                onMouseLeave={(e: any) => { e.currentTarget.style.borderColor = '#E8E4DB'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <span style={{
                    fontSize: 22, width: 42, height: 42, borderRadius: 10,
                    background: tool.color + '0D', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: tool.color, fontWeight: 700,
                  }}>{tool.icon}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 600, fontFamily: fm,
                      color: '#22A065', background: '#22A06510',
                      padding: '3px 8px', borderRadius: 100,
                    }}>{tool.tag}</span>
                  </div>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, letterSpacing: '-.2px' }}>
                  {tool.name}
                </h3>
                <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.6, margin: 0 }}>
                  {tool.desc}
                </p>
                <div style={{
                  marginTop: 14, fontSize: 11, fontFamily: fm, color: '#9A958A',
                }}>
                  {tool.searches} monthly searches
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px 48px' }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: '#9A958A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
          Coming soon
        </h2>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
        }}>
          {COMING.map((t) => (
            <span key={t.name} style={{
              fontSize: 13, padding: '8px 16px', borderRadius: 10,
              border: '1.5px solid #E8E4DB', color: '#6B6560', background: '#fff',
            }}>
              {t.name} <span style={{ fontFamily: fm, fontSize: 10, color: '#9A958A' }}>({t.searches})</span>
            </span>
          ))}
        </div>
      </section>

      {/* SEO Content */}
      <section style={{
        maxWidth: 640, margin: '0 auto', padding: '32px 28px 48px',
        borderTop: '1px solid #E8E4DB',
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
          Free online tools — no signup, no tracking
        </h2>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8, marginBottom: 12 }}>
          Tools4Free is a collection of free browser-based utilities for developers, designers, writers, and everyone else. Every tool runs 100% locally in your browser — your data never touches a server. No accounts, no cookies, no tracking.
        </p>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8 }}>
          From fancy text generators and QR codes to JSON formatters and password generators, Tools4Free has the everyday tools you need, with a clean interface and zero friction. Bookmark it, use it, forget it exists until you need it again.
        </p>
      </section>

      {/* Footer */}
      <footer style={{
        maxWidth: 960, margin: '0 auto', padding: '20px 28px',
        borderTop: '1px solid #E8E4DB',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12, color: '#9A958A', flexWrap: 'wrap', gap: 8,
      }}>
        <span>© 2026 Tools4Free — Free forever</span>
        <span style={{ fontSize: 11 }}>
          Deployed on{' '}
          <a href="https://vercel.com/?utm_source=tools4free&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ color: '#9A958A', textDecoration: 'underline' }}>Vercel</a>
          {' · Domain from '}
          <a href="https://www.namecheap.com/?utm_source=tools4free&utm_medium=referral" target="_blank" rel="noopener noreferrer" style={{ color: '#9A958A', textDecoration: 'underline' }}>Namecheap</a>
        </span>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="#" style={{ color: '#9A958A', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: '#9A958A', textDecoration: 'none' }}>Terms</a>
        </div>
      </footer>
    </div>
  )
}
