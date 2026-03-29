'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#4338CA'

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
  navTitle:    { en: 'Sales Tax Calculator',       fr: 'Calculateur de taxe de vente',  es: 'Calculadora de impuesto sobre ventas', pt: 'Calculadora de imposto sobre vendas', de: 'Mehrwertsteuer-Rechner' },
  titleA:      { en: 'US Sales',                   fr: 'Taxe de',                        es: 'Impuesto sobre',                       pt: 'Imposto sobre',                        de: 'Steuer-' },
  titleB:      { en: 'Tax Calculator',             fr: 'vente US',                       es: 'ventas EE.UU.',                        pt: 'vendas EUA',                           de: 'Rechner' },
  subtitle:    { en: 'Add or remove sales tax from any price. Pre-set rates for all major US states.', fr: 'Ajoutez ou supprimez la taxe de vente. Taux préréglés pour les principaux États américains.', es: 'Agregue o elimine el impuesto sobre ventas. Tasas preestablecidas para los principales estados de EE.UU.', pt: 'Adicione ou remova o imposto sobre vendas. Taxas pré-definidas para os principais estados dos EUA.', de: 'Steuer zu jedem Preis hinzufügen oder entfernen. Voreingestellte Sätze für US-Bundesstaaten.' },
  mode:        { en: 'Mode',                       fr: 'Mode',                           es: 'Modo',                                 pt: 'Modo',                                 de: 'Modus' },
  addTax:      { en: '+ Add Tax',                  fr: '+ Ajouter la taxe',              es: '+ Agregar impuesto',                   pt: '+ Adicionar imposto',                  de: '+ Steuer hinzufügen' },
  removeTax:   { en: '− Remove Tax',               fr: '− Supprimer la taxe',            es: '− Quitar impuesto',                    pt: '− Remover imposto',                    de: '− Steuer entfernen' },
  priceBeforeTax: { en: 'Price (before tax)',       fr: 'Prix (hors taxe)',               es: 'Precio (antes de impuestos)',          pt: 'Preço (antes do imposto)',             de: 'Preis (vor Steuer)' },
  priceInclTax: { en: 'Price (including tax)',      fr: 'Prix (taxe incluse)',            es: 'Precio (impuesto incluido)',           pt: 'Preço (imposto incluído)',             de: 'Preis (inkl. Steuer)' },
  taxRate:     { en: 'Tax Rate',                   fr: 'Taux de taxe',                   es: 'Tasa de impuesto',                     pt: 'Taxa de imposto',                      de: 'Steuersatz' },
  custom:      { en: 'Custom',                     fr: 'Personnalisé',                   es: 'Personalizado',                        pt: 'Personalizado',                        de: 'Benutzerdefiniert' },
  netPrice:    { en: 'Net Price',                  fr: 'Prix net',                       es: 'Precio neto',                          pt: 'Preço líquido',                        de: 'Nettopreis' },
  beforeTax:   { en: 'before tax',                 fr: 'hors taxe',                      es: 'antes de impuestos',                   pt: 'antes do imposto',                     de: 'vor Steuer' },
  taxAmount:   { en: 'Tax Amount',                 fr: 'Montant de la taxe',             es: 'Monto del impuesto',                   pt: 'Valor do imposto',                     de: 'Steuerbetrag' },
  total:       { en: 'Total',                      fr: 'Total',                          es: 'Total',                                pt: 'Total',                                de: 'Gesamt' },
  afterTax:    { en: 'after tax',                  fr: 'taxe incluse',                   es: 'después de impuestos',                 pt: 'após o imposto',                       de: 'nach Steuer' },
  net:         { en: 'Net',                        fr: 'Net',                            es: 'Neto',                                 pt: 'Líquido',                              de: 'Netto' },
}

type StatePreset = { label: string; rate: number; abbr: string }

const STATE_PRESETS: StatePreset[] = [
  { label: 'California 7.25%', rate: 7.25, abbr: 'CA' },
  { label: 'Texas 6.25%', rate: 6.25, abbr: 'TX' },
  { label: 'New York 8%', rate: 8, abbr: 'NY' },
  { label: 'Florida 6%', rate: 6, abbr: 'FL' },
  { label: 'Illinois 6.25%', rate: 6.25, abbr: 'IL' },
  { label: 'Pennsylvania 6%', rate: 6, abbr: 'PA' },
  { label: 'Ohio 5.75%', rate: 5.75, abbr: 'OH' },
  { label: 'Washington 6.5%', rate: 6.5, abbr: 'WA' },
  { label: 'Arizona 5.6%', rate: 5.6, abbr: 'AZ' },
  { label: 'Colorado 2.9%', rate: 2.9, abbr: 'CO' },
]

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function SalesTaxClient({
  defaultPrice,
  defaultRate,
  defaultState,
  locale = 'en' as Locale,
}: {
  defaultPrice?: number
  defaultRate?: number
  defaultState?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const [price, setPrice] = useState(defaultPrice?.toString() || '100')
  const [rate, setRate] = useState(defaultRate?.toString() || '7.25')
  const [customRate, setCustomRate] = useState(false)

  const result = useMemo(() => {
    const p = parseFloat(price)
    const r = parseFloat(rate)
    if (isNaN(p) || isNaN(r) || p < 0 || r < 0) return null
    const taxMultiplier = r / 100

    if (mode === 'add') {
      const netPrice = p
      const taxAmount = netPrice * taxMultiplier
      const totalPrice = netPrice + taxAmount
      return { netPrice, taxAmount, totalPrice }
    } else {
      const totalPrice = p
      const netPrice = totalPrice / (1 + taxMultiplier)
      const taxAmount = totalPrice - netPrice
      return { netPrice, taxAmount, totalPrice }
    }
  }, [price, rate, mode])

  const selectPreset = (preset: StatePreset) => {
    setRate(preset.rate.toString())
    setCustomRate(false)
  }

  const enableCustom = () => {
    setCustomRate(true)
  }

  return (
    <ToolShell name={lt('navTitle')} icon="🧾" currentPath="/sales-tax-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🧾</div>
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

        {/* Calculator card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Mode tabs */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{lt('mode')}</label>
              <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                <button onClick={() => setMode('add')} style={{
                  flex: 1, fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px 16px',
                  cursor: 'pointer', border: 'none',
                  background: mode === 'add' ? accent : '#F5F3EE',
                  color: mode === 'add' ? '#fff' : '#6B6560',
                  transition: 'all .15s',
                }}>{lt('addTax')}</button>
                <button onClick={() => setMode('remove')} style={{
                  flex: 1, fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px 16px',
                  cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB',
                  background: mode === 'remove' ? accent : '#F5F3EE',
                  color: mode === 'remove' ? '#fff' : '#6B6560',
                  transition: 'all .15s',
                }}>{lt('removeTax')}</button>
              </div>
            </div>

            {/* Price input */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{mode === 'add' ? lt('priceBeforeTax') : lt('priceInclTax')}</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Enter amount"
                style={{ ...inputStyle, fontSize: 22, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }}
              />
            </div>

            {/* State presets */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{lt('taxRate')}</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                {STATE_PRESETS.map((p, i) => {
                  const isActive = !customRate && rate === p.rate.toString()
                  return (
                    <button key={i} onClick={() => selectPreset(p)} style={{
                      fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 12px',
                      borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                      border: isActive ? `1.5px solid ${accent}` : '1.5px solid #E8E4DB',
                      background: isActive ? accent + '10' : '#fff',
                      color: isActive ? accent : '#6B6560',
                      transition: 'all .15s',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: '#F5F3EE', borderRadius: 3, padding: '1px 4px' }}>{p.abbr}</span> {p.rate}%
                    </button>
                  )
                })}
                <button onClick={enableCustom} style={{
                  fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 12px',
                  borderRadius: 8, cursor: 'pointer',
                  border: customRate ? `1.5px solid ${accent}` : '1.5px dashed #E8E4DB',
                  background: customRate ? accent + '10' : '#fff',
                  color: customRate ? accent : '#9A958A',
                  transition: 'all .15s',
                }}>
                  {lt('custom')}
                </button>
              </div>

              {/* Custom rate input */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="number"
                  value={rate}
                  onChange={e => { setRate(e.target.value); setCustomRate(true) }}
                  onFocus={() => setCustomRate(true)}
                  placeholder="e.g. 7.25"
                  style={{ ...inputStyle, width: 120, textAlign: 'center', fontFamily: fm, fontWeight: 600 }}
                />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#9A958A' }}>%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {/* Net price */}
              <div style={{
                background: mode === 'add' ? '#F5F3EE' : '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('netPrice')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: mode === 'remove' ? accent : '#1C1B18' }}>
                  ${fmt(result.netPrice, locale)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('beforeTax')}</div>
              </div>

              {/* Tax amount */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('taxAmount')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>
                  ${fmt(result.taxAmount, locale)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{rate}% {lt('taxRate').toLowerCase()}</div>
              </div>

              {/* Total */}
              <div style={{
                background: mode === 'remove' ? '#F5F3EE' : '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('total')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: mode === 'add' ? accent : '#1C1B18' }}>
                  ${fmt(result.totalPrice, locale)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('afterTax')}</div>
              </div>
            </div>

            {/* Visual formula */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginTop: 16, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: accent + '10', border: `1px solid ${accent}30` }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>{lt('net')}</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: accent }}>${fmt(result.netPrice, locale)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>+</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#FEF3C7', border: '1px solid #F5E6B8' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>{lt('taxAmount')} ({rate}%)</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>${fmt(result.taxAmount, locale)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>=</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>{lt('total')}</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#16A34A' }}>${fmt(result.totalPrice, locale)}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free US Sales Tax Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This sales tax calculator lets you instantly add or remove sales tax from any price. Choose from pre-set rates for the ten most-populated US states or enter a custom rate for your specific city or county. The tool shows the net amount, tax amount, and total side by side, along with a clear visual formula so you can verify the math at a glance.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>US State Sales Tax Rates</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Sales tax in the United States varies significantly by state. California has the highest base state rate at 7.25 percent, while Colorado charges just 2.9 percent. Keep in mind that many cities and counties add their own local taxes on top of the state rate. For example, the combined rate in Los Angeles can exceed 10 percent, and New York City residents pay 8.875 percent in total. Always check your local jurisdiction for the most accurate combined rate.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Need to calculate VAT instead? Try the <a href="/vat-calculator" style={{ color: accent, textDecoration: 'underline' }}>VAT calculator</a>. Looking at profit on your sales? Check the <a href="/profit-margin-calculator" style={{ color: accent, textDecoration: 'underline' }}>profit margin calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
