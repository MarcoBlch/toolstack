'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#059669'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A',
  textTransform: 'uppercase', letterSpacing: '.8px',
  display: 'block', marginBottom: 4,
}
const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const LABELS: Record<string, Record<Locale, string>> = {
  navTitle:       { en: 'Invoice Number Generator',          fr: 'Générateur de numéros de facture', es: 'Generador de números de factura',    pt: 'Gerador de números de fatura',       de: 'Rechnungsnummer-Generator' },
  titleA:         { en: 'Invoice',                           fr: 'Numéros de',                        es: 'Números de',                         pt: 'Números de',                         de: 'Rechnungs-' },
  titleB:         { en: 'Number Generator',                  fr: 'facture',                           es: 'factura',                            pt: 'fatura',                             de: 'Nummern Generator' },
  subtitle:       { en: 'Generate professional invoice numbers in any format. Copy with one click.', fr: 'Générez des numéros de facture professionnels dans n\'importe quel format.', es: 'Genere números de factura profesionales en cualquier formato. Copie con un clic.', pt: 'Gere números de fatura profissionais em qualquer formato. Copie com um clique.', de: 'Professionelle Rechnungsnummern in beliebigem Format generieren. Mit einem Klick kopieren.' },
  format:         { en: 'Format',                            fr: 'Format',                            es: 'Formato',                            pt: 'Formato',                            de: 'Format' },
  prefix:         { en: 'Prefix',                            fr: 'Préfixe',                           es: 'Prefijo',                            pt: 'Prefixo',                            de: 'Präfix' },
  startingNumber: { en: 'Starting Number',                   fr: 'Numéro de départ',                  es: 'Número inicial',                     pt: 'Número inicial',                     de: 'Startnummer' },
  padding:        { en: 'Padding (digits)',                   fr: 'Zéros (chiffres)',                  es: 'Relleno (dígitos)',                  pt: 'Preenchimento (dígitos)',             de: 'Auffüllung (Stellen)' },
  includeDate:    { en: 'Include date in number',            fr: 'Inclure la date dans le numéro',    es: 'Incluir fecha en el número',          pt: 'Incluir data no número',              de: 'Datum in Nummer einschließen' },
  regenerate:     { en: 'Regenerate Random Numbers',         fr: 'Régénérer les numéros aléatoires',  es: 'Regenerar números aleatorios',        pt: 'Regenerar números aleatórios',        de: 'Zufallsnummern neu generieren' },
  preview:        { en: 'Preview — Next 10 Invoice Numbers', fr: 'Aperçu — 10 prochains numéros',     es: 'Vista previa — Próximos 10 números',  pt: 'Prévia — Próximos 10 números',        de: 'Vorschau — Nächste 10 Rechnungsnummern' },
  copy:           { en: 'Copy',                              fr: 'Copier',                            es: 'Copiar',                             pt: 'Copiar',                             de: 'Kopieren' },
  copied:         { en: 'Copied!',                           fr: 'Copié !',                           es: '¡Copiado!',                          pt: 'Copiado!',                           de: 'Kopiert!' },
  useWithInvoice: { en: 'Use with our Invoice Generator →',  fr: 'Utiliser avec notre générateur de factures →', es: 'Usar con nuestro generador de facturas →', pt: 'Usar com nosso gerador de faturas →', de: 'Mit unserem Rechnungsgenerator verwenden →' },
  sequential:     { en: 'Sequential',                        fr: 'Séquentiel',                        es: 'Secuencial',                         pt: 'Sequencial',                         de: 'Sequenziell' },
  dateBased:      { en: 'Date-based',                        fr: 'Basé sur la date',                  es: 'Basado en fecha',                    pt: 'Baseado em data',                    de: 'Datumsbasiert' },
  random:         { en: 'Random',                            fr: 'Aléatoire',                         es: 'Aleatorio',                          pt: 'Aleatório',                          de: 'Zufällig' },
  customPrefix:   { en: 'Custom prefix',                     fr: 'Préfixe personnalisé',              es: 'Prefijo personalizado',              pt: 'Prefixo personalizado',              de: 'Benutzerdefiniertes Präfix' },
}

function generateRandomAlphanumeric(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

export default function InvoiceNumberClient({
  defaultFormat,
  defaultPrefix,
  locale = 'en' as Locale,
}: {
  defaultFormat?: string
  defaultPrefix?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [format, setFormat] = useState(defaultFormat || 'sequential')
  const [prefix, setPrefix] = useState(defaultPrefix || 'INV')
  const [startNumber, setStartNumber] = useState('1')
  const [padding, setPadding] = useState('3')
  const [includeDate, setIncludeDate] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)
  const [randomSeed, setRandomSeed] = useState(0)

  const numbers = useMemo(() => {
    const start = parseInt(startNumber) || 1
    const pad = parseInt(padding) || 3
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const dateStr = `${year}-${month}`

    const result: string[] = []

    for (let i = 0; i < 10; i++) {
      const num = start + i
      const paddedNum = String(num).padStart(pad, '0')

      switch (format) {
        case 'sequential':
          if (includeDate) {
            result.push(`${prefix}-${dateStr}-${paddedNum}`)
          } else {
            result.push(`${prefix}-${paddedNum}`)
          }
          break
        case 'date-based':
          result.push(`${prefix}-${year}-${month}-${paddedNum}`)
          break
        case 'random':
          void randomSeed
          result.push(`${prefix}-${generateRandomAlphanumeric(6)}`)
          break
        case 'custom':
          if (includeDate) {
            result.push(`${prefix}-${dateStr}-${paddedNum}`)
          } else {
            result.push(`${prefix}-${paddedNum}`)
          }
          break
        default:
          result.push(`${prefix}-${paddedNum}`)
      }
    }

    return result
  }, [format, prefix, startNumber, padding, includeDate, randomSeed])

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <ToolShell name={lt('navTitle')} icon="#️⃣" currentPath="/invoice-number-generator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>#️⃣</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleA')} <span style={{ color: accent }}>{lt('titleB')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Settings card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* Format */}
              <div>
                <label style={labelStyle}>{lt('format')}</label>
                <select
                  value={format}
                  onChange={e => setFormat(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="sequential">{lt('sequential')}</option>
                  <option value="date-based">{lt('dateBased')}</option>
                  <option value="random">{lt('random')}</option>
                  <option value="custom">{lt('customPrefix')}</option>
                </select>
              </div>

              {/* Prefix */}
              <div>
                <label style={labelStyle}>{lt('prefix')}</label>
                <input
                  type="text"
                  value={prefix}
                  onChange={e => setPrefix(e.target.value.toUpperCase())}
                  placeholder="INV"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {/* Starting number */}
              <div>
                <label style={labelStyle}>{lt('startingNumber')}</label>
                <input
                  type="number"
                  value={startNumber}
                  onChange={e => setStartNumber(e.target.value)}
                  min="1"
                  placeholder="1"
                  style={{ ...inputStyle, fontFamily: fm, fontWeight: 600 }}
                />
              </div>

              {/* Padding */}
              <div>
                <label style={labelStyle}>{lt('padding')}</label>
                <select
                  value={padding}
                  onChange={e => setPadding(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="3">3 digits (001)</option>
                  <option value="4">4 digits (0001)</option>
                  <option value="5">5 digits (00001)</option>
                </select>
              </div>
            </div>

            {/* Include date toggle */}
            {(format === 'sequential' || format === 'custom') && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => setIncludeDate(!includeDate)}
                  style={{
                    width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                    background: includeDate ? accent : '#E8E4DB',
                    position: 'relative', transition: 'background .2s',
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 3,
                    left: includeDate ? 23 : 3,
                    transition: 'left .2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,.15)',
                  }} />
                </button>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#6B6560' }}>{lt('includeDate')}</span>
              </div>
            )}

            {/* Regenerate random */}
            {format === 'random' && (
              <button
                onClick={() => setRandomSeed(s => s + 1)}
                style={{
                  fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 18px',
                  borderRadius: 8, border: '1.5px solid ' + accent, background: 'transparent',
                  color: accent, cursor: 'pointer', marginTop: 8,
                }}
              >
                {lt('regenerate')}
              </button>
            )}
          </div>
        </section>

        {/* Generated numbers */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ ...labelStyle, marginBottom: 14 }}>{lt('preview')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {numbers.map((num, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', borderRadius: 10, background: '#FAFAF8',
                  border: '1px solid #E8E4DB',
                }}>
                  <span style={{ fontFamily: fm, fontSize: 15, fontWeight: 600, color: '#1C1B18', letterSpacing: '.5px' }}>
                    {num}
                  </span>
                  <button
                    onClick={() => handleCopy(num, i)}
                    style={{
                      fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '5px 12px',
                      borderRadius: 6, border: 'none', cursor: 'pointer',
                      background: copied === i ? accent : '#F5F3EE',
                      color: copied === i ? '#fff' : '#6B6560',
                      transition: 'all .15s', minWidth: 60,
                    }}
                  >
                    {copied === i ? lt('copied') : lt('copy')}
                  </button>
                </div>
              ))}
            </div>

            {/* Link to invoice generator */}
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <a
                href="/invoice-generator"
                style={{
                  fontSize: 14, fontWeight: 600, color: accent, textDecoration: 'none',
                  padding: '10px 20px', borderRadius: 10,
                  border: '1.5px solid ' + accent, display: 'inline-block',
                  transition: 'all .15s',
                }}
              >
                {lt('useWithInvoice')}
              </a>
            </div>
          </div>
        </section>

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Invoice Number Generator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This invoice number generator creates professional, consistent invoice numbers for your business. Choose from four formats: sequential numbering for straightforward auto-increment systems, date-based numbering that embeds the year and month into each invoice for easy chronological sorting, random alphanumeric codes for added security and uniqueness, or custom prefix numbering that lets you use your own brand abbreviation or department code.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Why Invoice Numbering Matters</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            A consistent invoice numbering system is essential for accounting, tax compliance, and audit readiness. Most tax authorities require unique, sequential invoice numbers. This tool generates zero-padded numbers with configurable digit lengths (3, 4, or 5 digits) so your numbering stays clean and sortable even as your business scales from hundreds to tens of thousands of invoices.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Ready to create a full invoice? Use our <a href="/invoice-generator" style={{ color: accent, textDecoration: 'underline' }}>free invoice generator</a> to build and download professional PDF invoices. Need to calculate sales tax? Try the <a href="/sales-tax-calculator" style={{ color: accent, textDecoration: 'underline' }}>sales tax calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
