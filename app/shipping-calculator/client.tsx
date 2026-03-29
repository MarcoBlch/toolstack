'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#EA580C'

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
  navTitle:       { en: 'Shipping Calculator',              fr: 'Calculateur de frais de port',   es: 'Calculadora de envío',              pt: 'Calculadora de frete',               de: 'Versandkostenrechner' },
  titleA:         { en: 'Shipping',                         fr: 'Frais de',                        es: 'Costo de',                          pt: 'Custo de',                           de: 'Versand-' },
  titleB:         { en: 'Cost Calculator',                  fr: 'port',                            es: 'envío',                             pt: 'frete',                              de: 'Kostenrechner' },
  subtitle:       { en: 'Estimate shipping costs by weight and dimensions. Compare carriers and delivery speeds.', fr: 'Estimez les frais de port selon le poids et les dimensions. Comparez les transporteurs.', es: 'Estime los costos de envío por peso y dimensiones. Compare transportistas y velocidades de entrega.', pt: 'Estime os custos de frete por peso e dimensões. Compare transportadoras e velocidades de entrega.', de: 'Versandkosten nach Gewicht und Abmessungen schätzen. Zusteller und Lieferzeiten vergleichen.' },
  packageWeight:  { en: 'Package Weight',                   fr: 'Poids du colis',                  es: 'Peso del paquete',                  pt: 'Peso do pacote',                     de: 'Paketgewicht' },
  dimensions:     { en: 'Dimensions (L x W x H)',           fr: 'Dimensions (L x l x H)',          es: 'Dimensiones (L x A x H)',           pt: 'Dimensões (C x L x A)',              de: 'Abmessungen (L x B x H)' },
  fromCountry:    { en: 'From Country',                     fr: 'Pays d\'origine',                 es: 'País de origen',                    pt: 'País de origem',                     de: 'Herkunftsland' },
  toCountry:      { en: 'To Country',                       fr: 'Pays de destination',             es: 'País de destino',                   pt: 'País de destino',                    de: 'Zielland' },
  actualWeight:   { en: 'Actual Weight',                    fr: 'Poids réel',                      es: 'Peso real',                         pt: 'Peso real',                          de: 'Tatsächliches Gewicht' },
  dimWeight:      { en: 'Dimensional Weight',               fr: 'Poids volumétrique',              es: 'Peso dimensional',                  pt: 'Peso dimensional',                   de: 'Volumengewicht' },
  billableWeight: { en: 'Billable Weight',                  fr: 'Poids facturable',                es: 'Peso facturable',                   pt: 'Peso faturável',                     de: 'Abrechnungsgewicht' },
  maxOfBoth:      { en: 'kg (max of both)',                 fr: 'kg (le plus élevé)',              es: 'kg (el mayor)',                     pt: 'kg (o maior)',                       de: 'kg (Maximum beider)' },
  estCosts:       { en: 'Estimated Shipping Costs',         fr: 'Frais de port estimés',           es: 'Costos de envío estimados',         pt: 'Custos de frete estimados',          de: 'Geschätzte Versandkosten' },
  carrierComp:    { en: 'Carrier Comparison (Estimated)',   fr: 'Comparaison transporteurs (estimé)', es: 'Comparación de transportistas (estimado)', pt: 'Comparação de transportadoras (estimado)', de: 'Zusteller-Vergleich (Schätzung)' },
  carrier:        { en: 'Carrier',                          fr: 'Transporteur',                    es: 'Transportista',                     pt: 'Transportadora',                     de: 'Zusteller' },
  economy:        { en: 'Economy',                          fr: 'Économique',                      es: 'Económico',                         pt: 'Econômico',                          de: 'Günstig' },
  standard:       { en: 'Standard',                         fr: 'Standard',                        es: 'Estándar',                          pt: 'Padrão',                             de: 'Standard' },
  express:        { en: 'Express',                          fr: 'Express',                         es: 'Express',                           pt: 'Expresso',                           de: 'Express' },
  disclaimer:     { en: 'These are estimates only. Actual rates vary by carrier, route, fuel surcharges, and package type. Check carrier websites for exact rates.', fr: 'Ce sont des estimations uniquement. Les tarifs réels varient selon le transporteur, l\'itinéraire et le type de colis.', es: 'Estas son solo estimaciones. Las tarifas reales varían según el transportista, la ruta y el tipo de paquete.', pt: 'Estas são apenas estimativas. As tarifas reais variam conforme o transportador, rota e tipo de pacote.', de: 'Nur Schätzwerte. Tatsächliche Tarife variieren je nach Zusteller, Route und Paketart.' },
}

const COUNTRIES = [
  { code: 'US', name: 'United States', continent: 'NA' },
  { code: 'CA', name: 'Canada', continent: 'NA' },
  { code: 'MX', name: 'Mexico', continent: 'NA' },
  { code: 'BR', name: 'Brazil', continent: 'SA' },
  { code: 'GB', name: 'United Kingdom', continent: 'EU' },
  { code: 'DE', name: 'Germany', continent: 'EU' },
  { code: 'FR', name: 'France', continent: 'EU' },
  { code: 'ES', name: 'Spain', continent: 'EU' },
  { code: 'IT', name: 'Italy', continent: 'EU' },
  { code: 'NL', name: 'Netherlands', continent: 'EU' },
  { code: 'BE', name: 'Belgium', continent: 'EU' },
  { code: 'AT', name: 'Austria', continent: 'EU' },
  { code: 'SE', name: 'Sweden', continent: 'EU' },
  { code: 'CH', name: 'Switzerland', continent: 'EU' },
  { code: 'PL', name: 'Poland', continent: 'EU' },
  { code: 'AU', name: 'Australia', continent: 'OC' },
  { code: 'JP', name: 'Japan', continent: 'AS' },
  { code: 'CN', name: 'China', continent: 'AS' },
  { code: 'KR', name: 'South Korea', continent: 'AS' },
  { code: 'IN', name: 'India', continent: 'AS' },
]

function getZoneMultiplier(fromContinent: string, toContinent: string): number {
  if (fromContinent === toContinent) return 1
  const nearPairs: Record<string, string[]> = {
    NA: ['SA', 'EU'],
    SA: ['NA'],
    EU: ['NA', 'AS'],
    AS: ['EU', 'OC'],
    OC: ['AS'],
  }
  if (nearPairs[fromContinent]?.includes(toContinent)) return 1.5
  return 2
}

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function ShippingClient({
  defaultWeight,
  defaultFrom,
  defaultTo,
  locale = 'en' as Locale,
}: {
  defaultWeight?: number
  defaultFrom?: string
  defaultTo?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [weight, setWeight] = useState(defaultWeight?.toString() || '2')
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [length, setLength] = useState('30')
  const [width, setWidth] = useState('20')
  const [height, setHeight] = useState('15')
  const [dimUnit, setDimUnit] = useState<'cm' | 'in'>('cm')
  const [fromCountry, setFromCountry] = useState(defaultFrom || 'US')
  const [toCountry, setToCountry] = useState(defaultTo || 'GB')

  const result = useMemo(() => {
    const w = parseFloat(weight)
    const l = parseFloat(length)
    const wd = parseFloat(width)
    const h = parseFloat(height)
    if (isNaN(w) || isNaN(l) || isNaN(wd) || isNaN(h) || w <= 0 || l <= 0 || wd <= 0 || h <= 0) return null

    // Convert to kg
    const actualWeightKg = weightUnit === 'lbs' ? w * 0.453592 : w

    // Dimensional weight in kg
    let dimWeight: number
    if (dimUnit === 'cm') {
      dimWeight = (l * wd * h) / 5000
    } else {
      dimWeight = (l * wd * h) / 139
    }

    const billableWeight = Math.max(actualWeightKg, dimWeight)

    const fromC = COUNTRIES.find(c => c.code === fromCountry)
    const toC = COUNTRIES.find(c => c.code === toCountry)
    const isDomestic = fromCountry === toCountry

    const zoneMultiplier = fromC && toC ? getZoneMultiplier(fromC.continent, toC.continent) : 1.5

    let baseRate: number
    if (isDomestic) {
      baseRate = 5 + 1.5 * billableWeight
    } else {
      baseRate = (15 + 3 * billableWeight) * zoneMultiplier
    }

    const economy = baseRate
    const standard = baseRate * 1.5
    const express = baseRate * 2.5

    const carriers = [
      { name: 'PostAL', multiplier: 0.9, icon: '📬' },
      { name: 'Standard Carrier', multiplier: 1.0, icon: '📦' },
      { name: 'Express Carrier', multiplier: 1.2, icon: '🚀' },
    ]

    return {
      actualWeightKg,
      dimWeight,
      billableWeight,
      isDomestic,
      tiers: [
        { nameKey: 'economy', days: '14-30 days', cost: economy },
        { nameKey: 'standard', days: '7-14 days', cost: standard },
        { nameKey: 'express', days: '3-5 days', cost: express },
      ],
      carriers: carriers.map(c => ({
        ...c,
        economy: economy * c.multiplier,
        standard: standard * c.multiplier,
        express: express * c.multiplier,
      })),
    }
  }, [weight, weightUnit, length, width, height, dimUnit, fromCountry, toCountry])

  return (
    <ToolShell name={lt('navTitle')} icon="📦" currentPath="/shipping-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📦</div>
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

        {/* Input card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Weight */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{lt('packageWeight')}</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  placeholder="2"
                  min="0.01"
                  step="0.1"
                  style={{ ...inputStyle, width: 140, textAlign: 'center', fontFamily: fm, fontWeight: 600 }}
                />
                <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                  <button onClick={() => setWeightUnit('kg')} style={{
                    fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 14px',
                    cursor: 'pointer', border: 'none',
                    background: weightUnit === 'kg' ? accent : '#F5F3EE',
                    color: weightUnit === 'kg' ? '#fff' : '#6B6560',
                    transition: 'all .15s',
                  }}>kg</button>
                  <button onClick={() => setWeightUnit('lbs')} style={{
                    fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 14px',
                    cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB',
                    background: weightUnit === 'lbs' ? accent : '#F5F3EE',
                    color: weightUnit === 'lbs' ? '#fff' : '#6B6560',
                    transition: 'all .15s',
                  }}>lbs</button>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{lt('dimensions')}</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <input type="number" value={length} onChange={e => setLength(e.target.value)} placeholder="L" min="1" style={{ ...inputStyle, width: 80, textAlign: 'center', fontFamily: fm, fontWeight: 600 }} />
                <span style={{ color: '#9A958A', fontWeight: 600 }}>x</span>
                <input type="number" value={width} onChange={e => setWidth(e.target.value)} placeholder="W" min="1" style={{ ...inputStyle, width: 80, textAlign: 'center', fontFamily: fm, fontWeight: 600 }} />
                <span style={{ color: '#9A958A', fontWeight: 600 }}>x</span>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="H" min="1" style={{ ...inputStyle, width: 80, textAlign: 'center', fontFamily: fm, fontWeight: 600 }} />
                <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                  <button onClick={() => setDimUnit('cm')} style={{
                    fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 14px',
                    cursor: 'pointer', border: 'none',
                    background: dimUnit === 'cm' ? accent : '#F5F3EE',
                    color: dimUnit === 'cm' ? '#fff' : '#6B6560',
                    transition: 'all .15s',
                  }}>cm</button>
                  <button onClick={() => setDimUnit('in')} style={{
                    fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 14px',
                    cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB',
                    background: dimUnit === 'in' ? accent : '#F5F3EE',
                    color: dimUnit === 'in' ? '#fff' : '#6B6560',
                    transition: 'all .15s',
                  }}>in</button>
                </div>
              </div>
            </div>

            {/* Countries */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{lt('fromCountry')}</label>
                <select value={fromCountry} onChange={e => setFromCountry(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>{lt('toCountry')}</label>
                <select value={toCountry} onChange={e => setToCountry(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {result && (
          <>
            {/* Weight summary */}
            <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                  <div style={labelStyle}>{lt('actualWeight')}</div>
                  <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>{fmt(result.actualWeightKg, locale)}</div>
                  <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>kg</div>
                </div>
                <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                  <div style={labelStyle}>{lt('dimWeight')}</div>
                  <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>{fmt(result.dimWeight, locale)}</div>
                  <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>kg</div>
                </div>
                <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                  <div style={labelStyle}>{lt('billableWeight')}</div>
                  <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(result.billableWeight, locale)}</div>
                  <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('maxOfBoth')}</div>
                </div>
              </div>
            </section>

            {/* Shipping tiers */}
            <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
              <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
                <div style={{ ...labelStyle, marginBottom: 14 }}>{lt('estCosts')}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {result.tiers.map((tier, i) => (
                    <div key={tier.nameKey} style={{
                      padding: '18px 14px', borderRadius: 12, textAlign: 'center',
                      background: i === 2 ? accent + '10' : '#FAFAF8',
                      border: i === 2 ? '1.5px solid ' + accent + '40' : '1px solid #E8E4DB',
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: i === 2 ? accent : '#1C1B18', marginBottom: 4 }}>{lt(tier.nameKey)}</div>
                      <div style={{ fontSize: 11, color: '#9A958A', marginBottom: 8 }}>{tier.days}</div>
                      <div style={{ fontSize: 24, fontFamily: fm, fontWeight: 700, color: i === 2 ? accent : '#1C1B18' }}>
                        ${fmt(tier.cost, locale)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Carrier comparison */}
            <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
              <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
                <div style={{ ...labelStyle, marginBottom: 14 }}>{lt('carrierComp')}</div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', color: '#9A958A', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('carrier')}</th>
                        <th style={{ textAlign: 'center', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', color: '#9A958A', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('economy')}</th>
                        <th style={{ textAlign: 'center', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', color: '#9A958A', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('standard')}</th>
                        <th style={{ textAlign: 'center', padding: '8px 10px', borderBottom: '1.5px solid #E8E4DB', color: '#9A958A', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '.5px' }}>{lt('express')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.carriers.map(c => (
                        <tr key={c.name}>
                          <td style={{ padding: '10px', borderBottom: '1px solid #F5F3EE', fontWeight: 600 }}>
                            <span style={{ marginRight: 6 }}>{c.icon}</span>{c.name}
                          </td>
                          <td style={{ padding: '10px', borderBottom: '1px solid #F5F3EE', textAlign: 'center', fontFamily: fm, fontWeight: 600 }}>${fmt(c.economy, locale)}</td>
                          <td style={{ padding: '10px', borderBottom: '1px solid #F5F3EE', textAlign: 'center', fontFamily: fm, fontWeight: 600 }}>${fmt(c.standard, locale)}</td>
                          <td style={{ padding: '10px', borderBottom: '1px solid #F5F3EE', textAlign: 'center', fontFamily: fm, fontWeight: 600, color: accent }}>${fmt(c.express, locale)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Disclaimer */}
                <div style={{
                  marginTop: 16, padding: '10px 14px', borderRadius: 8,
                  background: '#FEF3C7', border: '1px solid #FDE68A',
                  fontSize: 12, color: '#92400E', lineHeight: 1.5,
                }}>
                  {lt('disclaimer')}
                </div>
              </div>
            </section>
          </>
        )}

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free Shipping Cost Estimator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            This shipping calculator helps you estimate the cost of sending packages domestically or internationally. Enter the package weight, dimensions, and origin and destination countries to see estimated costs across economy, standard, and express delivery tiers. The calculator also shows a side-by-side carrier comparison so you can quickly see which service level fits your budget and timeline.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Understanding Dimensional Weight</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Shipping carriers charge based on whichever is greater: actual weight or dimensional weight. Dimensional weight is calculated by multiplying length by width by height and dividing by 5000 for centimeters or 139 for inches. This means a large but lightweight package can cost more to ship than a small heavy one. Our calculator automatically determines the billable weight by comparing both values and using the higher number.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Running an online store? Use our <a href="/profit-margin-calculator" style={{ color: accent, textDecoration: 'underline' }}>profit margin calculator</a> to factor shipping into your pricing. Need to convert units? Try the <a href="/unit-converter" style={{ color: accent, textDecoration: 'underline' }}>unit converter</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
