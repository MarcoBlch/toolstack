'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#D97706'

const LABELS: Record<string, Record<Locale, string>> = {
  title:        { en: 'Days Until Calculator', fr: 'Calculateur Combien de Jours', es: 'Calculadora Cuántos Días Faltan', pt: 'Calculadora Quantos Dias Faltam', de: 'Wie-Viele-Tage-Bis Rechner' },
  subtitle:     { en: 'How many days until Christmas, New Year, or any custom date?', fr: 'Combien de jours jusqu\'à Noël, Nouvel An ou toute date personnalisée ?', es: '¿Cuántos días faltan para Navidad, Año Nuevo o cualquier fecha?', pt: 'Quantos dias faltam para o Natal, Ano Novo ou qualquer data?', de: 'Wie viele Tage bis Weihnachten, Neujahr oder einem beliebigen Datum?' },
  selectEvent:  { en: 'Select event or enter custom date', fr: 'Sélectionnez un événement ou entrez une date', es: 'Seleccione un evento o ingrese una fecha', pt: 'Selecione um evento ou insira uma data', de: 'Ereignis auswählen oder Datum eingeben' },
  customDate:   { en: 'Custom Date', fr: 'Date personnalisée', es: 'Fecha personalizada', pt: 'Data personalizada', de: 'Benutzerdefiniertes Datum' },
  days:         { en: 'Days', fr: 'Jours', es: 'Días', pt: 'Dias', de: 'Tage' },
  weeksAndDays: { en: 'Weeks & Days', fr: 'Semaines & Jours', es: 'Semanas y Días', pt: 'Semanas e Dias', de: 'Wochen & Tage' },
  bizDays:      { en: 'Business Days', fr: 'Jours ouvrés', es: 'Días laborales', pt: 'Dias úteis', de: 'Arbeitstage' },
  hours:        { en: 'Hours', fr: 'Heures', es: 'Horas', pt: 'Horas', de: 'Stunden' },
  yearProgress: { en: 'Year elapsed', fr: 'Année écoulée', es: 'Año transcurrido', pt: 'Ano decorrido', de: 'Jahr verstrichen' },
  weeks:        { en: 'weeks', fr: 'semaines', es: 'semanas', pt: 'semanas', de: 'Wochen' },
  passed:       { en: 'This date has already passed', fr: 'Cette date est déjà passée', es: 'Esta fecha ya pasó', pt: 'Esta data já passou', de: 'Dieses Datum ist bereits vergangen' },
  until:        { en: 'until', fr: 'avant', es: 'para', pt: 'para', de: 'bis' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

function today() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function nextOccurrence(month: number, day: number): Date {
  const t = today()
  const thisYear = new Date(t.getFullYear(), month - 1, day)
  return thisYear > t ? thisYear : new Date(t.getFullYear() + 1, month - 1, day)
}

function getEaster(year: number): Date {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(year, month - 1, day)
}

function nextEaster(): Date {
  const t = today()
  const thisYear = getEaster(t.getFullYear())
  return thisYear > t ? thisYear : getEaster(t.getFullYear() + 1)
}

function getBlackFriday(year: number): Date {
  // 4th Thursday of November + 1
  const d = new Date(year, 10, 1)
  const firstThursday = (4 - d.getDay() + 7) % 7
  return new Date(year, 10, firstThursday + 22)
}

function nextBlackFriday(): Date {
  const t = today()
  const thisYear = getBlackFriday(t.getFullYear())
  return thisYear > t ? thisYear : getBlackFriday(t.getFullYear() + 1)
}

const EVENTS = [
  { key: 'christmas',    label: 'Christmas 🎄',       getDate: () => nextOccurrence(12, 25) },
  { key: 'new-year',     label: 'New Year 🎆',         getDate: () => nextOccurrence(1, 1) },
  { key: 'halloween',    label: 'Halloween 🎃',        getDate: () => nextOccurrence(10, 31) },
  { key: 'valentines',   label: "Valentine's Day 💝",  getDate: () => nextOccurrence(2, 14) },
  { key: 'easter',       label: 'Easter 🐣',           getDate: () => nextEaster() },
  { key: 'black-friday', label: 'Black Friday 🛍️',    getDate: () => nextBlackFriday() },
  { key: 'summer',       label: 'Summer Solstice ☀️', getDate: () => nextOccurrence(6, 21) },
  { key: 'custom',       label: 'Custom Date 📅',      getDate: () => null },
]

interface Props { defaultEvent?: string; locale?: Locale }

export default function DaysUntilClient({ defaultEvent = 'christmas', locale = 'en' }: Props) {
  const [selected, setSelected] = useState(defaultEvent || 'christmas')
  const [customDate, setCustomDate] = useState('')

  const targetDate = useMemo(() => {
    if (selected === 'custom') {
      if (!customDate) return null
      return new Date(customDate + 'T00:00:00')
    }
    const ev = EVENTS.find(e => e.key === selected)
    return ev?.getDate() ?? null
  }, [selected, customDate])

  const result = useMemo(() => {
    if (!targetDate) return null
    const t = today()
    const diffMs = targetDate.getTime() - t.getTime()
    if (diffMs < 0) return { passed: true }
    const totalDays = Math.round(diffMs / 86400000)
    const weeks = Math.floor(totalDays / 7)
    const remDays = totalDays % 7

    let bizDays = 0
    const cur = new Date(t)
    while (cur < targetDate) {
      if (cur.getDay() !== 0 && cur.getDay() !== 6) bizDays++
      cur.setDate(cur.getDate() + 1)
    }

    const start = new Date(t.getFullYear(), 0, 1)
    const yearProgress = Math.round(((t.getTime() - start.getTime()) / (365.25 * 86400000)) * 100)

    return { passed: false, totalDays, weeks, remDays, bizDays, totalHours: totalDays * 24, yearProgress }
  }, [targetDate])

  const statBox = (label: string, value: string | number) => (
    <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: accent, fontFamily: fm }}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
      <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px' }}>{label}</div>
    </div>
  )

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
    padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
    background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <ToolShell name={L('title', locale)} icon="📆" currentPath="/days-until" locale={locale}>
      <div style={{ maxWidth: 640, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 24, fontSize: 15 }}>{L('subtitle', locale)}</p>

        {/* Event buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {EVENTS.map(ev => (
            <button key={ev.key} onClick={() => setSelected(ev.key)}
              style={{ padding: '8px 16px', borderRadius: 20, border: `1.5px solid ${selected === ev.key ? accent : '#E8E4DB'}`, background: selected === ev.key ? accent : '#fff', color: selected === ev.key ? '#fff' : '#4B4843', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: fb }}>
              {ev.label}
            </button>
          ))}
        </div>

        {selected === 'custom' && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 4 }}>{L('customDate', locale)}</label>
            <input type="date" value={customDate} onChange={e => setCustomDate(e.target.value)} style={inputStyle} />
          </div>
        )}

        {result?.passed && (
          <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 10, padding: '12px 16px', textAlign: 'center', color: '#DC2626', fontSize: 14, fontWeight: 600 }}>
            {L('passed', locale)}
          </div>
        )}

        {result && !result.passed && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {statBox(L('days', locale), result.totalDays)}
            {statBox(L('weeksAndDays', locale), `${result.weeks} ${L('weeks', locale)} + ${result.remDays}d`)}
            {statBox(L('bizDays', locale), result.bizDays)}
            {statBox(L('hours', locale), result.totalHours)}
            <div style={{ gridColumn: 'span 2', background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.6px' }}>{L('yearProgress', locale)}</span>
                <span style={{ fontWeight: 700, color: accent }}>{result.yearProgress}%</span>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 8, height: 10, overflow: 'hidden' }}>
                <div style={{ background: accent, height: '100%', width: `${result.yearProgress}%`, borderRadius: 8, transition: 'width .5s' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  )
}
