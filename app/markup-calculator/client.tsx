'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#2563EB'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A',
  textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 4,
}
const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const REFERENCE_TABLE = [
  { markup: 10, margin: 9.09 }, { markup: 20, margin: 16.67 }, { markup: 25, margin: 20 },
  { markup: 33, margin: 24.81 }, { markup: 50, margin: 33.33 }, { markup: 100, margin: 50 },
  { markup: 200, margin: 66.67 }, { markup: 300, margin: 75 },
]

const LABELS: Record<string, Record<Locale, string>> = {
  navTitle:     { en: 'Markup Calculator',        fr: 'Calculatrice de majoration',   es: 'Calculadora de markup',        pt: 'Calculadora de markup',         de: 'Aufschlagrechner' },
  titleA:       { en: 'Markup',                   fr: 'Calculatrice de',              es: 'Calculadora de',               pt: 'Calculadora de',                de: 'Aufschlag' },
  titleB:       { en: 'Calculator',               fr: 'majoration',                   es: 'markup',                       pt: 'markup',                        de: 'Rechner' },
  subtitle:     { en: 'Calculate selling price, profit, and margin from your cost and markup percentage.', fr: 'Calculez le prix de vente, le bénéfice et la marge à partir du coût et du taux de majoration.', es: 'Calcula el precio de venta, el beneficio y el margen a partir del coste y el porcentaje de markup.', pt: 'Calcule o preço de venda, o lucro e a margem a partir do custo e da porcentagem de markup.', de: 'Verkaufspreis, Gewinn und Marge aus Kosten und Aufschlag berechnen.' },
  cost:         { en: 'Cost ($)',                  fr: 'Coût ($)',                      es: 'Coste ($)',                    pt: 'Custo ($)',                      de: 'Kosten ($)' },
  markupPct:    { en: 'Markup (%)',                fr: 'Majoration (%)',                es: 'Markup (%)',                   pt: 'Markup (%)',                     de: 'Aufschlag (%)' },
  sellingPrice: { en: 'Selling Price',             fr: 'Prix de vente',                 es: 'Precio de venta',              pt: 'Preço de venda',                de: 'Verkaufspreis' },
  profit:       { en: 'Profit',                    fr: 'Bénéfice',                      es: 'Beneficio',                    pt: 'Lucro',                         de: 'Gewinn' },
  marginEq:     { en: 'Margin Equivalent',         fr: 'Marge équivalente',             es: 'Margen equivalente',           pt: 'Margem equivalente',            de: 'Äquivalente Marge' },
  refTable:     { en: 'Markup vs Margin Quick Reference', fr: 'Majoration vs Marge — référence rapide', es: 'Markup vs Margen — referencia rápida', pt: 'Markup vs Margem — referência rápida', de: 'Aufschlag vs. Marge — Schnellreferenz' },
  exampleCost:  { en: 'Example ($100 cost)',       fr: 'Exemple (coût 100 $)',          es: 'Ejemplo (coste 100 $)',        pt: 'Exemplo (custo $100)',           de: 'Beispiel (100 $ Kosten)' },
  enterCost:    { en: 'Enter cost',                fr: 'Entrer le coût',               es: 'Ingrese el coste',             pt: 'Digite o custo',                de: 'Kosten eingeben' },
  enterMarkup:  { en: 'Enter markup %',            fr: 'Entrer la majoration %',        es: 'Ingrese el markup %',          pt: 'Digite o markup %',             de: 'Aufschlag % eingeben' },
}

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function MarkupClient({
  defaultCost,
  defaultMarkup,
  locale = 'en' as Locale,
}: {
  defaultCost?: number
  defaultMarkup?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [cost, setCost] = useState(defaultCost?.toString() || '50')
  const [markup, setMarkup] = useState(defaultMarkup?.toString() || '40')

  const result = useMemo(() => {
    const c = parseFloat(cost)
    const m = parseFloat(markup)
    if (isNaN(c) || isNaN(m) || c < 0 || m < 0) return null
    const sellingPrice = c * (1 + m / 100)
    const profit = sellingPrice - c
    const marginPercent = c > 0 ? (profit / sellingPrice) * 100 : 0
    return { sellingPrice, profit, marginPercent }
  }, [cost, markup])

  return (
    <ToolShell name={lt('navTitle')} icon="🔢" currentPath="/markup-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🔢</div>
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

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{lt('cost')}</label>
                <input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder={lt('enterCost')} style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }} />
              </div>
              <div>
                <label style={labelStyle}>{lt('markupPct')}</label>
                <input type="number" value={markup} onChange={e => setMarkup(e.target.value)} placeholder={lt('enterMarkup')} style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }} />
              </div>
            </div>
          </div>
        </section>

        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('sellingPrice')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>${fmt(result.sellingPrice, locale)}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('profit')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#16A34A' }}>${fmt(result.profit, locale)}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('marginEq')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>{fmt(result.marginPercent, locale)}%</div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginTop: 16, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#F5F3EE', border: '1px solid #E8E4DB' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>{lt('cost')}</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>${fmt(parseFloat(cost) || 0, locale)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>+</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: accent + '10', border: `1px solid ${accent}30` }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>{lt('markupPct')} ({markup}%)</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: accent }}>${fmt(result.profit, locale)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>=</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>{lt('sellingPrice')}</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#16A34A' }}>${fmt(result.sellingPrice, locale)}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ ...labelStyle, marginBottom: 14 }}>{lt('refTable')}</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: fb }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1.5px solid #E8E4DB', color: accent, fontWeight: 700, fontSize: 12 }}>{lt('markupPct')}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1.5px solid #E8E4DB', color: '#D97706', fontWeight: 700, fontSize: 12 }}>{lt('marginEq')}</th>
                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '1.5px solid #E8E4DB', color: '#6B6560', fontWeight: 700, fontSize: 12 }}>{lt('exampleCost')}</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_TABLE.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#FAFAF8' : '#fff' }}>
                      <td style={{ padding: '10px 12px', fontFamily: fm, fontWeight: 600, color: accent }}>{row.markup}%</td>
                      <td style={{ padding: '10px 12px', fontFamily: fm, fontWeight: 600, color: '#D97706' }}>{row.margin.toFixed(2)}%</td>
                      <td style={{ padding: '10px 12px', color: '#6B6560' }}>
                        {lt('sellingPrice')} ${fmt(100 * (1 + row.markup / 100), locale)}, {lt('profit')} ${fmt(100 * row.markup / 100, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Markup Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Determine the selling price, profit, and equivalent margin from cost and desired markup. Markup is calculated as (profit / cost) × 100 — always a larger number than the margin for the same transaction.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Want to calculate from the margin side? Try the <a href="/profit-margin-calculator" style={{ color: accent, textDecoration: 'underline' }}>profit margin calculator</a>. Need ROI? Check the <a href="/roi-calculator" style={{ color: accent, textDecoration: 'underline' }}>ROI calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
