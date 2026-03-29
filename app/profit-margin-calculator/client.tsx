'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#059669'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A',
  textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 4,
}
const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const LABELS: Record<string, Record<Locale, string>> = {
  navTitle:     { en: 'Profit Margin Calculator', fr: 'Calculatrice de marge',          es: 'Calculadora de margen',        pt: 'Calculadora de margem',         de: 'Gewinnmargenrechner' },
  titleA:       { en: 'Profit',                   fr: 'Calculatrice de',                es: 'Calculadora de',               pt: 'Calculadora de',                de: 'Gewinn' },
  titleB:       { en: 'Margin',                   fr: 'marge bénéficiaire',             es: 'margen de beneficio',          pt: 'margem de lucro',               de: 'Marge' },
  subtitle:     { en: 'Calculate profit margin, markup, and selling price from cost and revenue.', fr: 'Calculez la marge bénéficiaire, la majoration et le prix de vente.', es: 'Calcula el margen de beneficio, el markup y el precio de venta.', pt: 'Calcule a margem de lucro, o markup e o preço de venda.', de: 'Gewinnmarge, Aufschlag und Verkaufspreis berechnen.' },
  inputMode:    { en: 'Input Mode',               fr: 'Mode de saisie',                 es: 'Modo de entrada',              pt: 'Modo de entrada',               de: 'Eingabemodus' },
  fromCostSell: { en: 'From Cost & Selling Price',fr: 'Coût & prix de vente',           es: 'Coste & precio de venta',      pt: 'Custo & preço de venda',        de: 'Kosten & Verkaufspreis' },
  fromCostMargin:{ en: 'From Cost & Target Margin',fr:'Coût & marge cible',             es: 'Coste & margen objetivo',      pt: 'Custo & margem alvo',           de: 'Kosten & Zielmarge' },
  cost:         { en: 'Cost ($)',                  fr: 'Coût ($)',                       es: 'Coste ($)',                    pt: 'Custo ($)',                      de: 'Kosten ($)' },
  sellingPrice: { en: 'Selling Price ($)',         fr: 'Prix de vente ($)',              es: 'Precio de venta ($)',          pt: 'Preço de venda ($)',             de: 'Verkaufspreis ($)' },
  targetMargin: { en: 'Target Margin (%)',         fr: 'Marge cible (%)',                es: 'Margen objetivo (%)',          pt: 'Margem alvo (%)',                de: 'Zielmarge (%)' },
  sellingPriceR:{ en: 'Selling Price',             fr: 'Prix de vente',                  es: 'Precio de venta',              pt: 'Preço de venda',                de: 'Verkaufspreis' },
  profit:       { en: 'Profit',                    fr: 'Bénéfice',                       es: 'Beneficio',                    pt: 'Lucro',                         de: 'Gewinn' },
  profitMargin: { en: 'Profit Margin',             fr: 'Marge bénéficiaire',             es: 'Margen de beneficio',          pt: 'Margem de lucro',               de: 'Gewinnmarge' },
  ofSellPrice:  { en: 'of selling price',          fr: 'du prix de vente',               es: 'del precio de venta',          pt: 'do preço de venda',             de: 'des Verkaufspreises' },
  markup:       { en: 'Markup',                    fr: 'Majoration',                     es: 'Markup',                       pt: 'Markup',                        de: 'Aufschlag' },
  ofCost:       { en: 'of cost',                   fr: 'du coût',                        es: 'del coste',                    pt: 'do custo',                      de: 'der Kosten' },
  costVsProfit: { en: 'Cost vs Profit Breakdown',  fr: 'Décomposition coût / bénéfice', es: 'Desglose coste / beneficio',   pt: 'Divisão custo / lucro',         de: 'Kosten vs. Gewinn' },
  marginExplained:{ en: 'Margin vs Markup Explained', fr: 'Marge vs Majoration — explication', es: 'Margen vs Markup — explicación', pt: 'Margem vs Markup — explicação', de: 'Marge vs. Aufschlag erklärt' },
  keyTakeaway:  { en: 'Key takeaway:',             fr: 'À retenir :',                    es: 'Conclusión clave:',            pt: 'Conclusão chave:',              de: 'Wichtige Erkenntnis:' },
  enterCost:    { en: 'Enter cost',                fr: 'Entrer le coût',                 es: 'Ingrese el coste',             pt: 'Digite o custo',                de: 'Kosten eingeben' },
  enterSelling: { en: 'Enter selling price',       fr: 'Entrer le prix de vente',        es: 'Ingrese el precio de venta',   pt: 'Digite o preço de venda',       de: 'Verkaufspreis eingeben' },
  enterMargin:  { en: 'Enter desired margin %',    fr: 'Entrer la marge souhaitée %',    es: 'Ingrese el margen deseado %',  pt: 'Digite a margem desejada %',    de: 'Gewünschte Marge % eingeben' },
}

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function ProfitMarginClient({
  defaultCost,
  defaultSelling,
  defaultMargin,
  locale = 'en' as Locale,
}: {
  defaultCost?: number
  defaultSelling?: number
  defaultMargin?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [inputMode, setInputMode] = useState<'price' | 'margin'>('price')
  const [cost, setCost] = useState(defaultCost?.toString() || '60')
  const [selling, setSelling] = useState(defaultSelling?.toString() || '100')
  const [targetMargin, setTargetMargin] = useState(defaultMargin?.toString() || '40')

  const result = useMemo(() => {
    const c = parseFloat(cost)
    if (isNaN(c) || c < 0) return null
    if (inputMode === 'price') {
      const s = parseFloat(selling)
      if (isNaN(s) || s < 0) return null
      const profit = s - c
      const margin = s > 0 ? (profit / s) * 100 : 0
      const markup = c > 0 ? (profit / c) * 100 : 0
      return { sellingPrice: s, profit, margin, markup }
    } else {
      const m = parseFloat(targetMargin)
      if (isNaN(m) || m >= 100) return null
      const s = c / (1 - m / 100)
      const profit = s - c
      const markup = c > 0 ? (profit / c) * 100 : 0
      return { sellingPrice: s, profit, margin: m, markup }
    }
  }, [cost, selling, targetMargin, inputMode])

  const costVal = parseFloat(cost) || 0
  const profitVal = result?.profit || 0
  const sellingVal = result?.sellingPrice || 0
  const costPercent = sellingVal > 0 ? (costVal / sellingVal) * 100 : 50
  const profitPercent = sellingVal > 0 ? (profitVal / sellingVal) * 100 : 50

  return (
    <ToolShell name={lt('navTitle')} icon="📊" currentPath="/profit-margin-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📊</div>
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
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{lt('inputMode')}</label>
              <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                <button onClick={() => setInputMode('price')} style={{ flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '12px 16px', cursor: 'pointer', border: 'none', background: inputMode === 'price' ? accent : '#F5F3EE', color: inputMode === 'price' ? '#fff' : '#6B6560', transition: 'all .15s' }}>{lt('fromCostSell')}</button>
                <button onClick={() => setInputMode('margin')} style={{ flex: 1, fontFamily: fb, fontSize: 13, fontWeight: 700, padding: '12px 16px', cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB', background: inputMode === 'margin' ? accent : '#F5F3EE', color: inputMode === 'margin' ? '#fff' : '#6B6560', transition: 'all .15s' }}>{lt('fromCostMargin')}</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{lt('cost')}</label>
                <input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder={lt('enterCost')} style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }} />
              </div>
              {inputMode === 'price' ? (
                <div>
                  <label style={labelStyle}>{lt('sellingPrice')}</label>
                  <input type="number" value={selling} onChange={e => setSelling(e.target.value)} placeholder={lt('enterSelling')} style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }} />
                </div>
              ) : (
                <div>
                  <label style={labelStyle}>{lt('targetMargin')}</label>
                  <input type="number" value={targetMargin} onChange={e => setTargetMargin(e.target.value)} placeholder={lt('enterMargin')} style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }} />
                </div>
              )}
            </div>
          </div>
        </section>

        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: inputMode === 'margin' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)', gap: 12 }}>
              {inputMode === 'margin' && (
                <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 12px', textAlign: 'center' }}>
                  <div style={labelStyle}>{lt('sellingPriceR')}</div>
                  <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: accent }}>${fmt(result.sellingPrice, locale)}</div>
                </div>
              )}
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 12px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('profit')}</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: result.profit >= 0 ? '#16A34A' : '#DC2626' }}>${fmt(result.profit, locale)}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 12px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('profitMargin')}</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(result.margin, locale)}%</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('ofSellPrice')}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 12px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('markup')}</div>
                <div style={{ fontSize: 20, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>{fmt(result.markup, locale)}%</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('ofCost')}</div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 24, marginTop: 16 }}>
              <div style={{ ...labelStyle, marginBottom: 14 }}>{lt('costVsProfit')}</div>
              <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', height: 40 }}>
                <div style={{ width: `${Math.max(costPercent, 2)}%`, background: '#6B6560', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: fm, transition: 'width .3s', minWidth: 60 }}>${fmt(costVal, locale)}</div>
                <div style={{ width: `${Math.max(profitPercent, 2)}%`, background: profitVal >= 0 ? accent : '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: fm, transition: 'width .3s', minWidth: 60 }}>${fmt(profitVal, locale)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 11, color: '#6B6560', fontWeight: 600 }}>{lt('cost')} ({fmt(costPercent, locale)}%)</span>
                <span style={{ fontSize: 11, color: accent, fontWeight: 600 }}>{lt('profit')} ({fmt(profitPercent, locale)}%)</span>
              </div>
            </div>
          </section>
        )}

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ ...labelStyle, marginBottom: 12 }}>{lt('marginExplained')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 13, color: '#6B6560', lineHeight: 1.7 }}>
              <div>
                <div style={{ fontWeight: 700, color: accent, marginBottom: 4, fontSize: 14 }}>{lt('profitMargin')}</div>
                <p>Profit as a percentage of the <strong>selling price</strong>.</p>
                <div style={{ background: '#F5F3EE', borderRadius: 8, padding: '8px 12px', marginTop: 8, fontFamily: fm, fontSize: 12 }}>Margin = (Profit / Selling Price) x 100</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#D97706', marginBottom: 4, fontSize: 14 }}>{lt('markup')}</div>
                <p>Profit as a percentage of the <strong>cost</strong>.</p>
                <div style={{ background: '#F5F3EE', borderRadius: 8, padding: '8px 12px', marginTop: 8, fontFamily: fm, fontSize: 12 }}>Markup = (Profit / Cost) x 100</div>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: '12px 16px', background: accent + '08', borderRadius: 10, border: `1px solid ${accent}20`, fontSize: 13, color: '#6B6560', lineHeight: 1.7 }}>
              <strong style={{ color: '#1C1B18' }}>{lt('keyTakeaway')}</strong> A 50% margin = 100% markup. A 40% margin = 66.67% markup.
            </div>
          </div>
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Profit Margin Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Calculate margin, markup, and profit. Enter cost and selling price, or enter cost and target margin to find the required selling price.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Want to focus on markup? Try the <a href="/markup-calculator" style={{ color: accent, textDecoration: 'underline' }}>markup calculator</a>. Need ROI? Use the <a href="/roi-calculator" style={{ color: accent, textDecoration: 'underline' }}>ROI calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
