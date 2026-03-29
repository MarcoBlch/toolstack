'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#D97706'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const LABELS: Record<string, Record<Locale, string>> = {
  navTitle:      { en: 'Break Even Calculator',            fr: 'Calculateur de seuil de rentabilité', es: 'Calculadora de punto de equilibrio', pt: 'Calculadora de ponto de equilíbrio', de: 'Gewinnschwellen-Rechner' },
  titleA:        { en: 'Break Even',                       fr: 'Seuil de',                            es: 'Punto de',                           pt: 'Ponto de',                           de: 'Gewinnschwellen-' },
  titleB:        { en: 'Calculator',                       fr: 'rentabilité',                         es: 'equilibrio',                         pt: 'equilíbrio',                         de: 'Rechner' },
  subtitle:      { en: 'Find out exactly when your business starts making a profit.', fr: 'Découvrez exactement quand votre entreprise commence à faire du profit.', es: 'Descubra exactamente cuándo su negocio comienza a generar ganancias.', pt: 'Descubra exatamente quando seu negócio começa a lucrar.', de: 'Finden Sie heraus, ab wann Ihr Unternehmen Gewinn macht.' },
  fixedCosts:    { en: 'Fixed Costs / Month ($)',           fr: 'Charges fixes / mois ($)',             es: 'Costos fijos / mes ($)',              pt: 'Custos fixos / mês ($)',              de: 'Fixkosten / Monat ($)' },
  variableCost:  { en: 'Variable Cost / Unit ($)',          fr: 'Coût variable / unité ($)',            es: 'Costo variable / unidad ($)',         pt: 'Custo variável / unidade ($)',        de: 'Variable Kosten / Einheit ($)' },
  sellingPrice:  { en: 'Selling Price / Unit ($)',          fr: 'Prix de vente / unité ($)',            es: 'Precio de venta / unidad ($)',        pt: 'Preço de venda / unidade ($)',        de: 'Verkaufspreis / Einheit ($)' },
  errorMsg:      { en: 'Selling price must be greater than variable cost to break even.', fr: 'Le prix de vente doit être supérieur au coût variable.', es: 'El precio de venta debe ser mayor que el costo variable.', pt: 'O preço de venda deve ser maior que o custo variável.', de: 'Verkaufspreis muss die variablen Kosten übersteigen.' },
  breakEvenUnits:{ en: 'Break Even Units',                 fr: 'Unités au seuil',                      es: 'Unidades de equilibrio',              pt: 'Unidades de equilíbrio',              de: 'Gewinnschwellen-Einheiten' },
  breakEvenRev:  { en: 'Break Even Revenue',               fr: 'CA au seuil',                          es: 'Ingresos de equilibrio',              pt: 'Receita de equilíbrio',               de: 'Gewinnschwellen-Umsatz' },
  contribMargin: { en: 'Contribution Margin / Unit',       fr: 'Marge / unité',                        es: 'Margen de contribución / unidad',     pt: 'Margem de contribuição / unidade',    de: 'Deckungsbeitrag / Einheit' },
  contribRatio:  { en: 'Contribution Margin Ratio',        fr: 'Taux de marge',                        es: 'Ratio de margen de contribución',     pt: 'Índice de margem de contribuição',    de: 'Deckungsbeitragsquote' },
  chartTitle:    { en: 'Cost vs Revenue Chart',            fr: 'Coûts vs Revenus',                     es: 'Costos vs Ingresos',                  pt: 'Custos vs Receitas',                  de: 'Kosten vs. Umsatz' },
  chartDesc:     { en: 'Lines cross at the break even point', fr: 'Les courbes se croisent au seuil de rentabilité', es: 'Las líneas se cruzan en el punto de equilibrio', pt: 'As linhas se cruzam no ponto de equilíbrio', de: 'Linien kreuzen sich an der Gewinnschwelle' },
  units:         { en: 'units',                            fr: 'unités',                               es: 'unidades',                            pt: 'unidades',                            de: 'Einheiten' },
  revenue:       { en: 'Revenue',                          fr: 'Revenus',                              es: 'Ingresos',                            pt: 'Receitas',                            de: 'Umsatz' },
  totalCost:     { en: 'Total Cost',                       fr: 'Coût total',                           es: 'Costo total',                         pt: 'Custo total',                         de: 'Gesamtkosten' },
  breakEven:     { en: 'Break Even',                       fr: 'Seuil',                                es: 'Equilibrio',                          pt: 'Equilíbrio',                          de: 'Gewinnschwelle' },
  formula:       { en: 'Formula',                          fr: 'Formule',                              es: 'Fórmula',                             pt: 'Fórmula',                             de: 'Formel' },
}

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Client({
  defaultFixed,
  defaultVariable,
  defaultPrice,
  locale = 'en' as Locale,
}: {
  defaultFixed?: number
  defaultVariable?: number
  defaultPrice?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [fixedCosts, setFixedCosts] = useState(defaultFixed ?? 5000)
  const [variableCost, setVariableCost] = useState(defaultVariable ?? 15)
  const [sellingPrice, setSellingPrice] = useState(defaultPrice ?? 40)

  const results = useMemo(() => {
    const contributionMargin = sellingPrice - variableCost
    const contributionMarginRatio = sellingPrice > 0 ? contributionMargin / sellingPrice : 0
    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0
    const breakEvenRevenue = breakEvenUnits * sellingPrice
    const isValid = contributionMargin > 0

    return {
      contributionMargin,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenRevenue,
      isValid,
    }
  }, [fixedCosts, variableCost, sellingPrice])

  // Chart data points
  const chartData = useMemo(() => {
    if (!results.isValid) return null
    const maxUnits = Math.max(results.breakEvenUnits * 2, 10)
    const steps = 6
    const points: { units: number; revenue: number; totalCost: number }[] = []
    for (let i = 0; i <= steps; i++) {
      const units = Math.round((maxUnits / steps) * i)
      points.push({
        units,
        revenue: units * sellingPrice,
        totalCost: fixedCosts + units * variableCost,
      })
    }
    return { points, maxUnits, maxValue: Math.max(points[steps].revenue, points[steps].totalCost) }
  }, [results, fixedCosts, variableCost, sellingPrice])

  return (
    <ToolShell name={lt('navTitle')} icon="⚖️" currentPath="/break-even-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⚖️</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleA')} <span style={{ color: accent }}>{lt('titleB')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{lt('fixedCosts')}</label>
                <input
                  type="number"
                  value={fixedCosts}
                  min={0}
                  step={100}
                  onChange={e => setFixedCosts(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{lt('variableCost')}</label>
                <input
                  type="number"
                  value={variableCost}
                  min={0}
                  step={0.5}
                  onChange={e => setVariableCost(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{lt('sellingPrice')}</label>
                <input
                  type="number"
                  value={sellingPrice}
                  min={0}
                  step={0.5}
                  onChange={e => setSellingPrice(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            {!results.isValid && sellingPrice <= variableCost && (
              <div style={{ marginTop: 16, padding: '12px 16px', background: '#FEF2F2', borderRadius: 10, fontSize: 13, color: '#DC2626' }}>
                {lt('errorMsg')}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        {results.isValid && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{
                background: accent + '0A',
                border: `1.5px solid ${accent}25`,
                borderRadius: 16,
                padding: 22,
                textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('breakEvenUnits')}</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                  {results.breakEvenUnits.toLocaleString(LOCALE_CODES[locale])}
                </div>
              </div>

              <div style={{
                background: accent + '0A',
                border: `1.5px solid ${accent}25`,
                borderRadius: 16,
                padding: 22,
                textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('breakEvenRev')}</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                  ${fmt(results.breakEvenRevenue, locale)}
                </div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('contribMargin')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  ${fmt(results.contributionMargin, locale)}
                </div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('contribRatio')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  {(results.contributionMarginRatio * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Visual chart */}
        {results.isValid && chartData && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lt('chartTitle')}</h2>
              <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>
                {lt('chartDesc')} ({results.breakEvenUnits.toLocaleString(LOCALE_CODES[locale])} {lt('units')})
              </p>

              {/* CSS chart */}
              <div style={{ position: 'relative', height: 240, borderLeft: '2px solid #E8E4DB', borderBottom: '2px solid #E8E4DB', marginBottom: 16 }}>
                {/* Y-axis label */}
                <div style={{ position: 'absolute', top: -8, left: -4, fontSize: 10, color: '#9A958A' }}>$</div>

                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map(frac => (
                  <div key={frac} style={{
                    position: 'absolute',
                    bottom: `${frac * 100}%`,
                    left: 0,
                    right: 0,
                    borderTop: '1px dashed #F0EDE6',
                  }}>
                    <span style={{ position: 'absolute', left: -4, top: -8, fontSize: 9, color: '#B0AAA0', transform: 'translateX(-100%)', whiteSpace: 'nowrap' }}>
                      ${Math.round(chartData.maxValue * frac).toLocaleString(LOCALE_CODES[locale])}
                    </span>
                  </div>
                ))}

                {/* Data points and lines - Revenue (green) */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="0.8"
                    points={chartData.points.map(p => {
                      const x = (p.units / chartData.maxUnits) * 100
                      const y = 100 - (p.revenue / chartData.maxValue) * 100
                      return `${x},${y}`
                    }).join(' ')}
                  />
                  <polyline
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="0.8"
                    points={chartData.points.map(p => {
                      const x = (p.units / chartData.maxUnits) * 100
                      const y = 100 - (p.totalCost / chartData.maxValue) * 100
                      return `${x},${y}`
                    }).join(' ')}
                  />
                  {/* Break even point marker */}
                  {(() => {
                    const beX = (results.breakEvenUnits / chartData.maxUnits) * 100
                    const beY = 100 - (results.breakEvenRevenue / chartData.maxValue) * 100
                    return (
                      <circle cx={beX} cy={beY} r="1.5" fill={accent} stroke="#fff" strokeWidth="0.5" />
                    )
                  })()}
                </svg>

                {/* Break even vertical line */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: `${(results.breakEvenUnits / chartData.maxUnits) * 100}%`,
                  height: '100%',
                  borderLeft: `1.5px dashed ${accent}`,
                  opacity: 0.6,
                }}>
                  <span style={{
                    position: 'absolute',
                    top: -16,
                    left: 4,
                    fontSize: 9,
                    color: accent,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}>
                    BE: {results.breakEvenUnits}
                  </span>
                </div>

                {/* X-axis labels */}
                {chartData.points.filter((_, i) => i % 2 === 0).map(p => (
                  <div key={p.units} style={{
                    position: 'absolute',
                    bottom: -18,
                    left: `${(p.units / chartData.maxUnits) * 100}%`,
                    transform: 'translateX(-50%)',
                    fontSize: 9,
                    color: '#B0AAA0',
                  }}>
                    {p.units}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 16, height: 3, borderRadius: 2, background: '#10B981' }} />
                  <span style={{ color: '#6B6560' }}>{lt('revenue')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 16, height: 3, borderRadius: 2, background: '#EF4444' }} />
                  <span style={{ color: '#6B6560' }}>{lt('totalCost')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />
                  <span style={{ color: '#6B6560' }}>{lt('breakEven')}</span>
                </div>
              </div>

              <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5F3EE', borderRadius: 10, fontSize: 13, color: '#6B6560' }}>
                <strong>{lt('formula')}:</strong> {lt('breakEvenUnits')} = {lt('fixedCosts')} / ({lt('sellingPrice')} - {lt('variableCost')}) = $<span style={{ fontFamily: fm }}>{fmt(fixedCosts, locale)}</span> / $<span style={{ fontFamily: fm }}>{fmt(results.contributionMargin, locale)}</span> = <strong style={{ color: accent }}>{results.breakEvenUnits} {lt('units')}</strong>
              </div>
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free break even analysis calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Every business needs to know its break even point, the exact moment when revenue equals costs and you stop losing money. This break even calculator makes it simple. Enter your monthly fixed costs such as rent, salaries, insurance, and software subscriptions. Add the variable cost you pay for each unit you sell, like materials, packaging, and shipping. Then set your selling price. The calculator instantly shows how many units you must sell and how much revenue you need to cover all your costs.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Understanding contribution margin</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The contribution margin is the difference between your selling price and your variable cost per unit. It tells you how much each sale contributes toward covering your fixed costs. A higher contribution margin means you reach profitability faster. The contribution margin ratio, expressed as a percentage, shows what fraction of every revenue dollar goes toward covering fixed costs and generating profit. Use these numbers to evaluate pricing strategies and compare products.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Want to understand your profit margins? Try our <a href="/profit-margin-calculator" style={{ color: accent, textDecoration: 'underline' }}>profit margin calculator</a>. Need to figure out the right markup? Use the <a href="/markup-calculator" style={{ color: accent, textDecoration: 'underline' }}>markup calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
