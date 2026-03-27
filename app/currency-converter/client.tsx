'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#059669'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

const RATES: Record<string, number> = {
  EUR: 1, USD: 1.08, GBP: 0.86, JPY: 163, CHF: 0.97, CAD: 1.47,
  AUD: 1.65, CNY: 7.80, INR: 90.5, BRL: 5.45, MXN: 18.5,
  KRW: 1430, SEK: 11.2, NOK: 11.5, DKK: 7.46, PLN: 4.32,
  CZK: 25.2, HUF: 395, RON: 4.97, TRY: 35.0, ZAR: 19.8,
  AED: 3.97, SGD: 1.45, HKD: 8.45, NZD: 1.78, THB: 37.5,
  MAD: 10.8, TND: 3.35, XOF: 655.96, XAF: 655.96, RUB: 97.0,
}

const CURRENCY_NAMES: Record<string, string> = {
  EUR: 'Euro', USD: 'US Dollar', GBP: 'British Pound', JPY: 'Japanese Yen',
  CHF: 'Swiss Franc', CAD: 'Canadian Dollar', AUD: 'Australian Dollar',
  CNY: 'Chinese Yuan', INR: 'Indian Rupee', BRL: 'Brazilian Real',
  MXN: 'Mexican Peso', KRW: 'South Korean Won', SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone', DKK: 'Danish Krone', PLN: 'Polish Zloty',
  CZK: 'Czech Koruna', HUF: 'Hungarian Forint', RON: 'Romanian Leu',
  TRY: 'Turkish Lira', ZAR: 'South African Rand', AED: 'UAE Dirham',
  SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar', NZD: 'New Zealand Dollar',
  THB: 'Thai Baht', MAD: 'Moroccan Dirham', TND: 'Tunisian Dinar',
  XOF: 'West African CFA', XAF: 'Central African CFA', RUB: 'Russian Ruble',
}

const currencies = Object.keys(RATES)

function fmtResult(n: number): string {
  if (Math.abs(n) >= 1) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })
}

function fmtRate(n: number): string {
  if (n >= 100) return n.toFixed(2)
  if (n >= 1) return n.toFixed(4)
  return n.toFixed(6)
}

export default function CurrencyClient({
  defaultAmount,
  defaultFrom,
  defaultTo,
}: {
  defaultAmount?: number
  defaultFrom?: string
  defaultTo?: string
} = {}) {
  const [amount, setAmount] = useState(defaultAmount ?? 100)
  const [from, setFrom] = useState(defaultFrom ?? 'EUR')
  const [to, setTo] = useState(defaultTo ?? 'USD')

  const results = useMemo(() => {
    if (!RATES[from] || !RATES[to] || amount <= 0) return null

    const converted = amount / RATES[from] * RATES[to]
    const rate = RATES[to] / RATES[from]
    const inverseRate = RATES[from] / RATES[to]

    return { converted, rate, inverseRate }
  }, [amount, from, to])

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <ToolShell name="Currency Converter" icon="💱" currentPath="/currency-converter">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💱</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Currency Converter</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Currency <span style={{ color: accent }}>converter</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Convert between 30+ world currencies instantly.</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Amount */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Amount</label>
              <input
                type="number" value={amount} min={0} step={0.01}
                onChange={e => setAmount(Number(e.target.value))}
                style={{ ...inputStyle, fontSize: 22, fontFamily: fm, fontWeight: 700, padding: '14px 16px' }}
              />
            </div>

            {/* From / Swap / To */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'end' }}>
              <div>
                <label style={labelStyle}>From</label>
                <select value={from} onChange={e => setFrom(e.target.value)} style={selectStyle}>
                  {currencies.map(c => (
                    <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>
                  ))}
                </select>
              </div>

              {/* Swap button */}
              <button
                onClick={handleSwap}
                style={{
                  width: 42, height: 42, borderRadius: 12, border: `1.5px solid ${accent}30`,
                  background: accent + '0A', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  color: accent, fontWeight: 700, transition: 'all .2s',
                  marginBottom: 1,
                }}
                title="Swap currencies"
              >
                ⇄
              </button>

              <div>
                <label style={labelStyle}>To</label>
                <select value={to} onChange={e => setTo(e.target.value)} style={selectStyle}>
                  {currencies.map(c => (
                    <option key={c} value={c}>{c} — {CURRENCY_NAMES[c]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Converted amount */}
            <div style={{
              background: accent + '0A', border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 28, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, color: '#6B6560', marginBottom: 8 }}>
                {fmtResult(amount)} {from} =
              </div>
              <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1 }}>
                {fmtResult(results.converted)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: accent, marginTop: 4 }}>
                {to}
              </div>
            </div>

            {/* Rates */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Rate</div>
                <div style={{ fontSize: 16, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  1 {from} = {fmtRate(results.rate)} {to}
                </div>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>Inverse Rate</div>
                <div style={{ fontSize: 16, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  1 {to} = {fmtRate(results.inverseRate)} {from}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              Exchange rates are approximate. Last updated: March 2026. For real-time rates, check your bank.
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free currency converter</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Our currency converter lets you quickly convert between more than 30 world currencies including EUR, USD, GBP, JPY, CHF, CAD, AUD, and many others. Enter an amount, select the source and target currencies, and see the converted value along with both the direct and inverse exchange rates. The swap button makes it easy to reverse the conversion direction with a single click.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Supported currencies and exchange rates</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The converter covers major currencies from every continent, from the US Dollar and Euro to the South African Rand, Thai Baht, and West African CFA Franc. Exchange rates are approximate and updated periodically. For large transactions or time-sensitive conversions, always confirm the live rate with your bank or financial institution before proceeding.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>When to use a currency converter</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Whether you are planning travel, shopping from an international website, sending money abroad, or comparing prices across markets, a quick currency conversion saves time and prevents costly mistakes. This tool runs entirely in your browser with no signup required, making it ideal for fast estimates whenever you need them.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Dealing with international invoices? Our <a href="/vat-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>VAT calculator</a> handles sales tax across countries. For general number crunching, the <a href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>percentage calculator</a> is always useful.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
