'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#0891B2'

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
  navTitle:       { en: 'Hourly Rate Calculator',        fr: 'Calculateur de taux horaire',       es: 'Calculadora de tarifa por hora',     pt: 'Calculadora de taxa horária',        de: 'Stundensatz-Rechner' },
  titleA:         { en: 'Hourly Rate',                   fr: 'Taux horaire',                       es: 'Tarifa por hora',                    pt: 'Taxa horária',                       de: 'Stundensatz-' },
  titleB:         { en: 'Calculator',                    fr: 'idéal',                              es: 'ideal',                              pt: 'ideal',                              de: 'Rechner' },
  subtitle:       { en: 'Calculate the perfect freelance rate to hit your income goals.', fr: 'Calculez le taux horaire parfait pour atteindre vos objectifs de revenus.', es: 'Calcule la tarifa freelance perfecta para alcanzar sus objetivos de ingresos.', pt: 'Calcule a taxa freelance perfeita para atingir suas metas de renda.', de: 'Den perfekten Freelance-Stundensatz für Ihre Einkommensziele berechnen.' },
  desiredIncome:  { en: 'Desired Annual Income ($)',     fr: 'Revenu annuel souhaité ($)',          es: 'Ingreso anual deseado ($)',           pt: 'Renda anual desejada ($)',            de: 'Gewünschtes Jahreseinkommen ($)' },
  hoursPerWeek:   { en: 'Work Hours per Week',           fr: 'Heures de travail par semaine',      es: 'Horas de trabajo por semana',        pt: 'Horas de trabalho por semana',       de: 'Arbeitsstunden pro Woche' },
  vacationWeeks:  { en: 'Vacation Weeks per Year',       fr: 'Semaines de vacances par an',        es: 'Semanas de vacaciones por año',      pt: 'Semanas de férias por ano',          de: 'Urlaubswochen pro Jahr' },
  billablePct:    { en: 'Billable Percentage (%)',        fr: 'Pourcentage facturable (%)',          es: 'Porcentaje facturable (%)',           pt: 'Percentual faturável (%)',            de: 'Abrechenbarer Anteil (%)' },
  monthlyExpenses:{ en: 'Monthly Expenses ($)',           fr: 'Dépenses mensuelles ($)',             es: 'Gastos mensuales ($)',                pt: 'Despesas mensais ($)',                de: 'Monatliche Ausgaben ($)' },
  taxRate:        { en: 'Tax Rate (%)',                   fr: 'Taux d\'imposition (%)',              es: 'Tasa de impuesto (%)',                pt: 'Taxa de imposto (%)',                 de: 'Steuersatz (%)' },
  yourHourlyRate: { en: 'Your Hourly Rate',               fr: 'Votre taux horaire',                  es: 'Su tarifa por hora',                 pt: 'Sua taxa horária',                   de: 'Ihr Stundensatz' },
  dailyRate:      { en: 'Daily Rate (8h)',                fr: 'Taux journalier (8h)',                es: 'Tarifa diaria (8h)',                  pt: 'Taxa diária (8h)',                    de: 'Tagessatz (8h)' },
  monthlyRate:    { en: 'Monthly Rate',                  fr: 'Taux mensuel',                        es: 'Tarifa mensual',                     pt: 'Taxa mensal',                        de: 'Monatssatz' },
  grossRevenue:   { en: 'Gross Revenue',                 fr: 'Chiffre d\'affaires brut',            es: 'Ingresos brutos',                    pt: 'Receita bruta',                      de: 'Bruttoeinnahmen' },
  workingWeeks:   { en: 'Working Weeks',                 fr: 'Semaines travaillées',                es: 'Semanas laborales',                  pt: 'Semanas trabalhadas',                de: 'Arbeitswochen' },
  totalWorkHours: { en: 'Total Work Hours',              fr: 'Heures totales',                      es: 'Horas totales',                      pt: 'Horas totais',                       de: 'Gesamtarbeitsstunden' },
  billableHours:  { en: 'Billable Hours',                fr: 'Heures facturables',                  es: 'Horas facturables',                  pt: 'Horas faturáveis',                   de: 'Abrechnungsstunden' },
  revBreakdown:   { en: 'Revenue Breakdown',             fr: 'Répartition des revenus',             es: 'Desglose de ingresos',               pt: 'Decomposição da receita',            de: 'Einnahmenaufschlüsselung' },
  takeHome:       { en: 'Take-Home Income',              fr: 'Revenu net',                          es: 'Ingreso neto',                       pt: 'Renda líquida',                      de: 'Nettoeinkommen' },
  annualExpenses: { en: 'Annual Expenses',               fr: 'Dépenses annuelles',                  es: 'Gastos anuales',                     pt: 'Despesas anuais',                    de: 'Jahresausgaben' },
  taxes:          { en: 'Taxes',                         fr: 'Impôts',                              es: 'Impuestos',                          pt: 'Impostos',                           de: 'Steuern' },
  formula:        { en: 'Formula',                       fr: 'Formule',                             es: 'Fórmula',                            pt: 'Fórmula',                            de: 'Formel' },
}

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Client({
  defaultIncome,
  defaultHours,
  defaultVacation,
  locale = 'en' as Locale,
}: {
  defaultIncome?: number
  defaultHours?: number
  defaultVacation?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [income, setIncome] = useState(defaultIncome ?? 60000)
  const [hoursPerWeek, setHoursPerWeek] = useState(defaultHours ?? 40)
  const [vacationWeeks, setVacationWeeks] = useState(defaultVacation ?? 4)
  const [billablePct, setBillablePct] = useState(75)
  const [monthlyExpenses, setMonthlyExpenses] = useState(500)
  const [taxRate, setTaxRate] = useState(25)

  const results = useMemo(() => {
    const workingWeeks = 52 - vacationWeeks
    const totalWorkHours = workingWeeks * hoursPerWeek
    const billableHours = totalWorkHours * (billablePct / 100)
    const annualExpenses = monthlyExpenses * 12
    const requiredGrossRevenue = (income + annualExpenses) / (1 - taxRate / 100)
    const hourlyRate = billableHours > 0 ? requiredGrossRevenue / billableHours : 0
    const dailyRate = hourlyRate * 8
    const monthlyRate = dailyRate * 22
    const taxAmount = requiredGrossRevenue * (taxRate / 100)

    return {
      workingWeeks,
      totalWorkHours,
      billableHours,
      requiredGrossRevenue,
      hourlyRate,
      dailyRate,
      monthlyRate,
      annualExpenses,
      taxAmount,
    }
  }, [income, hoursPerWeek, vacationWeeks, billablePct, monthlyExpenses, taxRate])

  return (
    <ToolShell name={lt('navTitle')} icon="⏰" currentPath="/hourly-rate-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⏰</div>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{lt('desiredIncome')}</label>
                <input
                  type="number"
                  value={income}
                  min={0}
                  step={1000}
                  onChange={e => setIncome(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{lt('hoursPerWeek')}</label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  min={1}
                  max={80}
                  onChange={e => setHoursPerWeek(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{lt('vacationWeeks')}</label>
                <input
                  type="number"
                  value={vacationWeeks}
                  min={0}
                  max={51}
                  onChange={e => setVacationWeeks(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{lt('billablePct')}</label>
                <input
                  type="number"
                  value={billablePct}
                  min={1}
                  max={100}
                  onChange={e => setBillablePct(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{lt('monthlyExpenses')}</label>
                <input
                  type="number"
                  value={monthlyExpenses}
                  min={0}
                  step={100}
                  onChange={e => setMonthlyExpenses(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>{lt('taxRate')}</label>
                <input
                  type="number"
                  value={taxRate}
                  min={0}
                  max={60}
                  onChange={e => setTaxRate(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{
              background: accent + '0A',
              border: `1.5px solid ${accent}25`,
              borderRadius: 16,
              padding: 22,
              textAlign: 'center',
              gridColumn: '1 / -1',
            }}>
              <div style={labelStyle}>{lt('yourHourlyRate')}</div>
              <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>
                ${fmt(results.hourlyRate, locale)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('dailyRate')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                ${fmt(results.dailyRate, locale)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('monthlyRate')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                ${fmt(results.monthlyRate, locale)}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('grossRevenue')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>
                ${fmt(results.requiredGrossRevenue, locale)}
              </div>
            </div>
          </div>
        </section>

        {/* Hours breakdown */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('workingWeeks')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {results.workingWeeks}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('totalWorkHours')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {results.totalWorkHours.toLocaleString(LOCALE_CODES[locale])}
              </div>
            </div>

            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('billableHours')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>
                {results.billableHours.toLocaleString(LOCALE_CODES[locale])}
              </div>
            </div>
          </div>
        </section>

        {/* Visual breakdown card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lt('revBreakdown')}</h2>
            <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>
              ${fmt(results.requiredGrossRevenue, locale)}
            </p>

            {/* Stacked bar */}
            {(() => {
              const total = results.requiredGrossRevenue || 1
              const incomePct = (income / total) * 100
              const expensesPct = (results.annualExpenses / total) * 100
              const taxPct = (results.taxAmount / total) * 100
              return (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32 }}>
                    <div style={{ width: `${incomePct}%`, background: accent, transition: 'width .3s' }} />
                    <div style={{ width: `${expensesPct}%`, background: '#F59E0B', transition: 'width .3s' }} />
                    <div style={{ width: `${taxPct}%`, background: '#EF4444', transition: 'width .3s' }} />
                  </div>
                </div>
              )
            })()}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: accent, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: '#9A958A', fontWeight: 600 }}>{lt('takeHome')}</div>
                  <div style={{ fontSize: 15, fontFamily: fm, fontWeight: 700 }}>${fmt(income, locale)}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: '#F59E0B', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: '#9A958A', fontWeight: 600 }}>{lt('annualExpenses')}</div>
                  <div style={{ fontSize: 15, fontFamily: fm, fontWeight: 700 }}>${fmt(results.annualExpenses, locale)}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: '#EF4444', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 11, color: '#9A958A', fontWeight: 600 }}>{lt('taxes')}</div>
                  <div style={{ fontSize: 15, fontFamily: fm, fontWeight: 700 }}>${fmt(results.taxAmount, locale)}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5F3EE', borderRadius: 10, fontSize: 13, color: '#6B6560' }}>
              <strong>{lt('formula')}:</strong> ($<span style={{ fontFamily: fm }}>{fmt(income, locale)}</span> + $<span style={{ fontFamily: fm }}>{fmt(results.annualExpenses, locale)}</span>) / (1 - <span style={{ fontFamily: fm }}>{taxRate}%</span>) = $<span style={{ fontFamily: fm }}>{fmt(results.requiredGrossRevenue, locale)}</span> / <span style={{ fontFamily: fm }}>{results.billableHours.toLocaleString(LOCALE_CODES[locale])}</span> h = <strong style={{ color: accent }}>${fmt(results.hourlyRate, locale)}/h</strong>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free freelancer hourly rate calculator</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Setting the right freelance hourly rate is one of the most important decisions you will make as a self-employed professional. Charge too little and you will struggle to cover your expenses and taxes. Charge too much and you may lose clients. This calculator takes the guesswork out of pricing by working backward from your desired take-home income. Enter what you want to earn, your expected expenses, your tax rate, and how many hours you can realistically bill, and the tool instantly computes the minimum hourly rate you need to charge.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Need to create professional invoices? Try our <a href="/invoice-generator" style={{ color: accent, textDecoration: 'underline' }}>invoice generator</a>. Want to understand your salary breakdown? Use the <a href="/salary-calculator" style={{ color: accent, textDecoration: 'underline' }}>salary calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
