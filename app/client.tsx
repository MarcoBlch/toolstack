'use client'
import Link from 'next/link'
import { TRANSLATIONS } from '@/lib/translations'

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
  { href: '/calorie-calculator', name: 'Calorie Calculator', desc: 'Daily calorie needs. BMR, TDEE. Lose, maintain, gain.', icon: '🔥', color: '#EF4444', searches: '4.5M+', tag: 'HEALTH' },
  { href: '/due-date-calculator', name: 'Due Date Calculator', desc: 'Pregnancy due date, trimester, gestational age.', icon: '🤰', color: '#EC4899', searches: '3M+', tag: 'HEALTH' },
  { href: '/macro-calculator', name: 'Macro Calculator', desc: 'Protein, carbs, fat. Balanced, keto, high protein.', icon: '🥗', color: '#16A34A', searches: '2M+', tag: 'HEALTH' },
  { href: '/ideal-weight', name: 'Ideal Weight Calculator', desc: '4 formulas. Healthy BMI range for your height.', icon: '⚖️', color: '#8B5CF6', searches: '2M+', tag: 'HEALTH' },
  { href: '/body-fat-calculator', name: 'Body Fat Calculator', desc: 'US Navy method. Fat mass, lean mass, category.', icon: '📊', color: '#D97706', searches: '1.5M+', tag: 'HEALTH' },
  { href: '/calorie-deficit', name: 'Calorie Deficit Calculator', desc: 'Time to goal weight. Safe daily calorie targets.', icon: '📉', color: '#0EA5E9', searches: '1.2M+', tag: 'HEALTH' },
  { href: '/water-intake', name: 'Water Intake Calculator', desc: 'How much water per day. By weight and activity.', icon: '💧', color: '#0891B2', searches: '1M+', tag: 'HEALTH' },
  { href: '/heart-rate-calculator', name: 'Heart Rate Zones', desc: 'Fat burn, cardio, VO2 max zones. Karvonen method.', icon: '❤️', color: '#DC2626', searches: '800K+', tag: 'HEALTH' },
  { href: '/pace-calculator', name: 'Running Pace Calculator', desc: '5K, 10K, half, marathon. Splits, pace, time.', icon: '🏃', color: '#EA580C', searches: '800K+', tag: 'HEALTH' },
  { href: '/one-rep-max', name: '1RM Calculator', desc: 'Estimate one rep max. Epley, Brzycki. % chart.', icon: '🏋️', color: '#1D4ED8', searches: '600K+', tag: 'HEALTH' },
]

const COMING: { name: string; searches: string }[] = []

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

export default function HomeClient() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          {[
            { code: 'EN', href: '/' },
            { code: 'FR', href: '/fr' },
            { code: 'ES', href: '/es' },
            { code: 'PT', href: '/pt' },
            { code: 'DE', href: '/de' },
          ].map((l, i) => (
            <span key={l.code}>
              {i > 0 && <span style={{ color: '#D5D0C7' }}> · </span>}
              <Link href={l.href} style={{
                color: l.code === 'EN' ? '#1C1B18' : '#9A958A',
                textDecoration: 'none', fontWeight: l.code === 'EN' ? 600 : 400,
              }}>{l.code}</Link>
            </span>
          ))}
        </div>
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
          Free Online Tools for Developers, Designers & Everyone
        </h2>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8, marginBottom: 12 }}>
          Tools4Free is a growing collection of over 40 free browser-based utilities built for developers, designers, writers, marketers, students, and anyone who needs quick, reliable tools without the hassle of signing up or installing software. Every single tool on this site runs 100% locally in your browser using modern Web APIs. Your data never leaves your device — nothing is uploaded, stored, or tracked. There are no accounts to create, no cookies to accept, and no premium tiers to unlock. Everything is completely free, forever.
        </p>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8, marginBottom: 24 }}>
          Whether you need to generate a QR code for a business card, format a messy JSON payload before a code review, calculate your monthly mortgage payment, or figure out your daily calorie intake, Tools4Free has you covered. The interface is clean, fast, and distraction-free — no pop-ups, no ads, no dark patterns. Just open the tool, do what you need, and move on with your day.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
          Text & Content Tools
        </h2>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8, marginBottom: 24 }}>
          Create eye-catching social media posts with the <a href="/fancy-text" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Fancy Text Generator</a>, which converts plain text into over 20 Unicode font styles compatible with Instagram, TikTok, Twitter, and more. Count words, characters, and sentences with the <a href="/word-counter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Word Counter</a>, or switch between UPPER, lower, Title Case, camelCase, and snake_case using the <a href="/case-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Text Case Converter</a>. Need placeholder text? The <a href="/lorem-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Lorem Ipsum Generator</a> creates paragraphs, sentences, or exact word counts instantly. Write and preview markup in the <a href="/markdown-editor" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Markdown Editor</a>, or spot differences between two texts with the <a href="/diff-checker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Diff Checker</a>.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
          Developer & Code Tools
        </h2>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8, marginBottom: 24 }}>
          Developers rely on Tools4Free for everyday coding tasks. The <a href="/json-formatter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>JSON Formatter</a> validates, beautifies, and minifies JSON with syntax highlighting and error detection. Generate MD5, SHA-1, SHA-256, and SHA-512 hashes with the <a href="/hash-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Hash Generator</a>, encode and decode strings with the <a href="/base64" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Base64 tool</a>, or write and test regular expressions with live match highlighting using the <a href="/regex-tester" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Regex Tester</a>. For design work, pick exact colors and get HEX, RGB, and HSL values with the <a href="/color-picker" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Color Picker</a>, or create beautiful CSS backgrounds with the <a href="/gradient-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Gradient Generator</a>.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
          Image & Design Tools
        </h2>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8, marginBottom: 24 }}>
          Reduce file sizes by up to 80% with the <a href="/image-compressor" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Image Compressor</a>, which handles JPEG, PNG, and WebP formats entirely in your browser. Create custom QR codes with color themes using the <a href="/qr-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>QR Code Generator</a>, generate favicons from letters or emojis with the <a href="/favicon-generator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Favicon Generator</a>, or frame your screenshots in sleek browser and device mockups using the <a href="/screenshot-mockup" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Screenshot Mockup</a> tool.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
          Finance Calculators
        </h2>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8, marginBottom: 24 }}>
          Plan your finances with precision. The <a href="/mortgage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Mortgage Calculator</a> breaks down monthly payments, total interest, and full amortization schedules. Compare loan options with the <a href="/loan-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Loan Calculator</a>, project compound growth with the <a href="/investment-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Investment Calculator</a>, or convert gross to net pay with the <a href="/salary-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Salary Calculator</a>. Quickly solve any <a href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>percentage calculation</a>, convert between 30+ currencies with the <a href="/currency-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Currency Converter</a>, split bills with the <a href="/tip-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Tip Calculator</a>, or plan long-term with the <a href="/retirement-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Retirement Calculator</a>.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
          Health & Fitness Calculators
        </h2>
        <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8, marginBottom: 24 }}>
          Take control of your health goals with science-backed calculators. Estimate your daily energy needs with the <a href="/calorie-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Calorie Calculator</a> using the Mifflin-St Jeor equation, check your <a href="/bmi-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>BMI</a>, or dial in your protein, carbs, and fat targets with the <a href="/macro-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Macro Calculator</a>. Measure body composition with the <a href="/body-fat-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Body Fat Calculator</a>, find your healthy range with the <a href="/ideal-weight" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Ideal Weight Calculator</a>, or plan sustainable weight loss with the <a href="/calorie-deficit" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Calorie Deficit Calculator</a>. Runners can plan race splits with the <a href="/pace-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Pace Calculator</a>, lifters can estimate max strength with the <a href="/one-rep-max" style={{ color: '#FF6B35', textDecoration: 'underline' }}>1RM Calculator</a>, and expecting parents can track milestones with the <a href="/due-date-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Due Date Calculator</a>.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Are these tools really free?</h3>
          <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8 }}>
            Yes, all 40+ tools on Tools4Free are completely free to use. There is no premium version, no signup wall, no usage limit, and no hidden fees. Every feature you see is available to everyone, immediately, without restrictions.
          </p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Is my data safe when using Tools4Free?</h3>
          <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8 }}>
            Absolutely. Every tool runs entirely in your browser using client-side JavaScript and Web APIs. Your text, images, calculations, and personal information never leave your device. Nothing is sent to a server, nothing is stored in a database, and nothing is shared with third parties. Your data stays on your machine.
          </p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>What types of tools does Tools4Free offer?</h3>
          <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8 }}>
            Tools4Free offers over 40 tools across five main categories: text and content tools such as fancy text generators, word counters, and case converters; developer tools like JSON formatters, hash generators, and regex testers; image and design tools including an image compressor and QR code generator; finance calculators for mortgages, loans, investments, and salaries; and health calculators covering calories, BMI, macros, body fat, and running pace.
          </p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Do I need to create an account to use these tools?</h3>
          <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8 }}>
            No. Every tool on Tools4Free works instantly without any account, login, or registration. There are no cookies to accept and no email addresses to provide. Just open the page and start using the tool right away.
          </p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Can I use Tools4Free on my phone or tablet?</h3>
          <p style={{ fontSize: 14, color: '#5C5850', lineHeight: 1.8 }}>
            Yes. All tools are fully responsive and work on any device with a modern web browser, including smartphones, tablets, laptops, and desktops. The interface adapts to your screen size so you get the same experience on mobile as you do on a computer.
          </p>
        </div>
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
