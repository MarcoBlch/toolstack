'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#2563EB'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}
const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: "'Outfit', -apple-system, sans-serif", color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

const LABELS: Record<string, Record<Locale, string>> = {
  title:        { en: 'Date Difference Calculator', fr: 'Calculateur Différence de Dates', es: 'Calculadora Diferencia de Fechas', pt: 'Calculadora Diferença de Datas', de: 'Datum-Differenz-Rechner' },
  subtitle:     { en: 'Calculate the exact time between two dates in years, months, days, hours, and business days.', fr: 'Calculez le temps exact entre deux dates en années, mois, jours, heures et jours ouvrés.', es: 'Calcula el tiempo exacto entre dos fechas en años, meses, días, horas y días laborales.', pt: 'Calcule o tempo exato entre duas datas em anos, meses, dias, horas e dias úteis.', de: 'Berechnen Sie die genaue Zeit zwischen zwei Daten in Jahren, Monaten, Tagen, Stunden und Arbeitstagen.' },
  startDate:    { en: 'Start Date', fr: 'Date de début', es: 'Fecha de inicio', pt: 'Data de início', de: 'Startdatum' },
  endDate:      { en: 'End Date', fr: 'Date de fin', es: 'Fecha de fin', pt: 'Data de fim', de: 'Enddatum' },
  includeEnd:   { en: 'Include end date', fr: 'Inclure la date de fin', es: 'Incluir fecha final', pt: 'Incluir data final', de: 'Enddatum einschließen' },
  years:        { en: 'Years', fr: 'Années', es: 'Años', pt: 'Anos', de: 'Jahre' },
  months:       { en: 'Months', fr: 'Mois', es: 'Meses', pt: 'Meses', de: 'Monate' },
  days:         { en: 'Days', fr: 'Jours', es: 'Días', pt: 'Dias', de: 'Tage' },
  totalMonths:  { en: 'Total months', fr: 'Total mois', es: 'Total meses', pt: 'Total meses', de: 'Monate gesamt' },
  totalWeeks:   { en: 'Total weeks', fr: 'Total semaines', es: 'Total semanas', pt: 'Total semanas', de: 'Wochen gesamt' },
  totalDays:    { en: 'Total days', fr: 'Total jours', es: 'Total días', pt: 'Total dias', de: 'Tage gesamt' },
  totalHours:   { en: 'Total hours', fr: 'Total heures', es: 'Total horas', pt: 'Total horas', de: 'Stunden gesamt' },
  totalMins:    { en: 'Total minutes', fr: 'Total minutes', es: 'Total minutos', pt: 'Total minutos', de: 'Minuten gesamt' },
  bizDays:      { en: 'Business days', fr: 'Jours ouvrés', es: 'Días laborales', pt: 'Dias úteis', de: 'Arbeitstage' },
  enterDates:   { en: 'Enter start and end dates above', fr: 'Entrez les dates de début et de fin ci-dessus', es: 'Ingresa las fechas de inicio y fin arriba', pt: 'Insira as datas de início e fim acima', de: 'Geben Sie Start- und Enddatum oben ein' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

function calcDiff(startStr: string, endStr: string, includeEnd: boolean) {
  const s = new Date(startStr + 'T00:00:00')
  const e = new Date(endStr + 'T00:00:00')
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return null

  const end = includeEnd ? new Date(e.getTime() + 86400000) : e
  if (end < s) return null

  const totalDays = Math.floor((end.getTime() - s.getTime()) / 86400000)

  // y/m/d breakdown by walking months
  let years = 0, months = 0, days = 0
  const tmp = new Date(s)
  years = end.getFullYear() - tmp.getFullYear()
  months = end.getMonth() - tmp.getMonth()
  days = end.getDate() - tmp.getDate()
  if (days < 0) {
    months--
    const prev = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prev.getDate()
  }
  if (months < 0) { years--; months += 12 }

  // Business days
  let bizDays = 0
  const cur = new Date(s)
  while (cur < end) {
    const day = cur.getDay()
    if (day !== 0 && day !== 6) bizDays++
    cur.setDate(cur.getDate() + 1)
  }

  return {
    years, months, days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalMonths: years * 12 + months,
    totalHours: totalDays * 24,
    totalMins: totalDays * 24 * 60,
    bizDays,
  }
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

interface Props { defaultStart?: string; defaultEnd?: string; locale?: Locale }

export default function DateDifferenceClient({ defaultStart = '', defaultEnd = '', locale = 'en' }: Props) {
  const [startDate, setStartDate] = useState(defaultStart || today())
  const [endDate, setEndDate] = useState(defaultEnd || today())
  const [includeEnd, setIncludeEnd] = useState(false)

  const result = useMemo(() => calcDiff(startDate, endDate, includeEnd), [startDate, endDate, includeEnd])

  const statBox = (label: string, value: string | number) => (
    <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 30, fontWeight: 800, color: accent, fontFamily: fm }}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px' }}>{label}</div>
    </div>
  )

  return (
    <ToolShell name={L('title', locale)} icon="📅" currentPath="/date-difference" locale={locale}>
      <div style={{ maxWidth: 680, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 28, fontSize: 15 }}>{L('subtitle', locale)}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>{L('startDate', locale)}</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{L('endDate', locale)}</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, cursor: 'pointer', userSelect: 'none' }}>
          <input type="checkbox" checked={includeEnd} onChange={e => setIncludeEnd(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: accent }} />
          <span style={{ fontSize: 14, color: '#4B4843' }}>{L('includeEnd', locale)}</span>
        </label>

        {!result ? (
          <div style={{ background: '#F5F3EE', borderRadius: 12, padding: '32px', textAlign: 'center', color: '#9A958A', fontSize: 15 }}>
            {L('enterDates', locale)}
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
              {statBox(L('years', locale), result.years)}
              {statBox(L('months', locale), result.months)}
              {statBox(L('days', locale), result.days)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {statBox(L('totalMonths', locale), result.totalMonths)}
              {statBox(L('totalWeeks', locale), result.totalWeeks)}
              {statBox(L('totalDays', locale), result.totalDays)}
              {statBox(L('totalHours', locale), result.totalHours)}
              {statBox(L('totalMins', locale), result.totalMins.toLocaleString())}
              {statBox(L('bizDays', locale), result.bizDays)}
            </div>
          </>
        )}
      </div>
    </ToolShell>
  )
}
