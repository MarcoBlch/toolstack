'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#7C3AED'

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
  navTitle:     { en: 'ROI Calculator',           fr: 'Calculateur de ROI',           es: 'Calculadora de ROI',           pt: 'Calculadora de ROI',            de: 'ROI-Rechner' },
  titleA:       { en: 'Return on',                fr: 'Retour sur',                   es: 'Retorno sobre la',             pt: 'Retorno sobre o',               de: 'Return on' },
  titleB:       { en: 'Investment',               fr: 'investissement',               es: 'Inversión',                    pt: 'Investimento',                  de: 'Investment' },
  subtitle:     { en: 'Calculate ROI, net profit, and annualized returns for any investment.', fr: 'Calculez le ROI, le bénéfice net et les rendements annualisés.', es: 'Calcula el ROI, el beneficio neto y los rendimientos anualizados.', pt: 'Calcule o ROI, o lucro líquido e os retornos anualizados.', de: 'ROI, Nettogewinn und annualisierte Renditen berechnen.' },
  initInvest:   { en: 'Initial Investment ($)',   fr: 'Investissement initial ($)',    es: 'Inversión inicial ($)',         pt: 'Investimento inicial ($)',       de: 'Anfangsinvestition ($)' },
  finalValue:   { en: 'Final Value ($)',           fr: 'Valeur finale ($)',             es: 'Valor final ($)',              pt: 'Valor final ($)',                de: 'Endwert ($)' },
  timePeriod:   { en: 'Time Period (optional, for annualized ROI)', fr: 'Période (optionnel, pour ROI annualisé)', es: 'Período de tiempo (opcional)', pt: 'Período de tempo (opcional)', de: 'Zeitraum (optional, für ann. ROI)' },
  years:        { en: 'Years',                    fr: 'Années',                        es: 'Años',                        pt: 'Anos',                          de: 'Jahre' },
  months:       { en: 'Months',                   fr: 'Mois',                          es: 'Meses',                       pt: 'Meses',                         de: 'Monate' },
  roi:          { en: 'ROI',                      fr: 'ROI',                           es: 'ROI',                         pt: 'ROI',                           de: 'ROI' },
  totalReturn:  { en: 'total return',             fr: 'rendement total',               es: 'rendimiento total',           pt: 'retorno total',                 de: 'Gesamtrendite' },
  netProfit:    { en: 'Net Profit',               fr: 'Bénéfice net',                  es: 'Beneficio neto',              pt: 'Lucro líquido',                 de: 'Nettogewinn' },
  finalMinusInit:{ en: 'final - initial',         fr: 'final - initial',               es: 'final - inicial',             pt: 'final - inicial',               de: 'End - Anfang' },
  annualROI:    { en: 'Annualized ROI',           fr: 'ROI annualisé',                 es: 'ROI anualizado',              pt: 'ROI anualizado',                de: 'Ann. ROI' },
  perYear:      { en: 'per year',                 fr: 'par an',                        es: 'por año',                     pt: 'por ano',                       de: 'pro Jahr' },
  investVsReturn:{ en: 'Investment vs Return',    fr: 'Investissement vs Retour',      es: 'Inversión vs Retorno',        pt: 'Investimento vs Retorno',       de: 'Investition vs. Ertrag' },
  initialInvestment:{ en: 'Initial Investment',   fr: 'Investissement initial',        es: 'Inversión inicial',           pt: 'Investimento inicial',          de: 'Anfangsinvestition' },
}

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function ROIClient({
  defaultInvestment,
  defaultFinal,
  defaultYears,
  locale = 'en' as Locale,
}: {
  defaultInvestment?: number
  defaultFinal?: number
  defaultYears?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [investment, setInvestment] = useState(defaultInvestment?.toString() || '10000')
  const [finalValue, setFinalValue] = useState(defaultFinal?.toString() || '15000')
  const [timePeriod, setTimePeriod] = useState(defaultYears?.toString() || '')
  const [timeUnit, setTimeUnit] = useState<'years' | 'months'>('years')

  const result = useMemo(() => {
    const inv = parseFloat(investment)
    const fin = parseFloat(finalValue)
    if (isNaN(inv) || isNaN(fin) || inv <= 0) return null
    const netProfit = fin - inv
    const roi = (netProfit / inv) * 100
    let annualizedRoi: number | null = null
    const tp = parseFloat(timePeriod)
    if (!isNaN(tp) && tp > 0) {
      const years = timeUnit === 'months' ? tp / 12 : tp
      if (years > 0) annualizedRoi = (Math.pow(1 + roi / 100, 1 / years) - 1) * 100
    }
    return { netProfit, roi, annualizedRoi }
  }, [investment, finalValue, timePeriod, timeUnit])

  const inv = parseFloat(investment) || 0
  const fin = parseFloat(finalValue) || 0
  const maxVal = Math.max(inv, fin, 1)

  return (
    <ToolShell name={lt('navTitle')} icon="💹" currentPath="/roi-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💹</div>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>{lt('initInvest')}</label>
                <input type="number" value={investment} onChange={e => setInvestment(e.target.value)} placeholder="10,000" style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }} />
              </div>
              <div>
                <label style={labelStyle}>{lt('finalValue')}</label>
                <input type="number" value={finalValue} onChange={e => setFinalValue(e.target.value)} placeholder="15,000" style={{ ...inputStyle, fontSize: 20, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center', borderRadius: 12 }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{lt('timePeriod')}</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input type="number" value={timePeriod} onChange={e => setTimePeriod(e.target.value)} placeholder="e.g. 3" style={{ ...inputStyle, width: 140, textAlign: 'center', fontFamily: fm, fontWeight: 600 }} />
                <div style={{ display: 'flex', gap: 0, borderRadius: 8, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                  <button onClick={() => setTimeUnit('years')} style={{ fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 14px', cursor: 'pointer', border: 'none', background: timeUnit === 'years' ? accent : '#F5F3EE', color: timeUnit === 'years' ? '#fff' : '#6B6560', transition: 'all .15s' }}>{lt('years')}</button>
                  <button onClick={() => setTimeUnit('months')} style={{ fontFamily: fb, fontSize: 13, fontWeight: 600, padding: '8px 14px', cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB', background: timeUnit === 'months' ? accent : '#F5F3EE', color: timeUnit === 'months' ? '#fff' : '#6B6560', transition: 'all .15s' }}>{lt('months')}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: result.annualizedRoi !== null ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)', gap: 12 }}>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('roi')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: result.roi >= 0 ? accent : '#DC2626' }}>{result.roi >= 0 ? '+' : ''}{fmt(result.roi, locale)}%</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('totalReturn')}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                <div style={labelStyle}>{lt('netProfit')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: result.netProfit >= 0 ? '#16A34A' : '#DC2626' }}>{result.netProfit >= 0 ? '+' : ''}${fmt(result.netProfit, locale)}</div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('finalMinusInit')}</div>
              </div>
              {result.annualizedRoi !== null && (
                <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center' }}>
                  <div style={labelStyle}>{lt('annualROI')}</div>
                  <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>{result.annualizedRoi >= 0 ? '+' : ''}{fmt(result.annualizedRoi, locale)}%</div>
                  <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('perYear')}</div>
                </div>
              )}
            </div>
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 24, marginTop: 16 }}>
              <div style={{ ...labelStyle, marginBottom: 14 }}>{lt('investVsReturn')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#6B6560' }}>{lt('initialInvestment')}</span>
                    <span style={{ fontSize: 12, fontFamily: fm, fontWeight: 600, color: '#6B6560' }}>${fmt(inv, locale)}</span>
                  </div>
                  <div style={{ height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 8, background: accent + '40', width: `${Math.max((inv / maxVal) * 100, 2)}%`, transition: 'width .3s' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#6B6560' }}>{lt('finalValue')}</span>
                    <span style={{ fontSize: 12, fontFamily: fm, fontWeight: 600, color: fin >= inv ? '#16A34A' : '#DC2626' }}>${fmt(fin, locale)}</span>
                  </div>
                  <div style={{ height: 28, borderRadius: 8, background: '#F5F3EE', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 8, background: fin >= inv ? '#16A34A' : '#DC2626', width: `${Math.max((fin / maxVal) * 100, 2)}%`, transition: 'width .3s' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free ROI Calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Measure the profitability of any investment. Enter your initial amount and final value to see total ROI and net profit. Add a time period to calculate annualized returns for fair comparison across different durations.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Planning for retirement? Try the <a href="/retirement-calculator" style={{ color: accent, textDecoration: 'underline' }}>retirement calculator</a>. Want compound growth? Use the <a href="/compound-interest-calculator" style={{ color: accent, textDecoration: 'underline' }}>compound interest calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
