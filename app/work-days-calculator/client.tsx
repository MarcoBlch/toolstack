'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#EA580C'

const LABELS: Record<string, Record<Locale, string>> = {
  title:       { en: 'Work Days Calculator', fr: 'Calculateur Jours Ouvrés', es: 'Calculadora Días Laborales', pt: 'Calculadora Dias Úteis', de: 'Arbeitstage Rechner' },
  subtitle:    { en: 'Calculate business days between dates or add work days to a date. Excludes weekends and public holidays.', fr: 'Calculez les jours ouvrés entre deux dates ou ajoutez des jours ouvrés. Exclut les weekends et jours fériés.', es: 'Calcula días laborales entre fechas o suma días hábiles a una fecha. Excluye fines de semana y festivos.', pt: 'Calcule dias úteis entre datas ou adicione dias úteis a uma data. Exclui fins de semana e feriados.', de: 'Arbeitstage zwischen Daten berechnen oder Arbeitstage zu einem Datum addieren. Wochenenden und Feiertage ausschließen.' },
  modeBetween: { en: 'Between dates', fr: 'Entre deux dates', es: 'Entre fechas', pt: 'Entre datas', de: 'Zwischen Daten' },
  modeAdd:     { en: 'Add work days', fr: 'Ajouter jours ouvrés', es: 'Sumar días hábiles', pt: 'Somar dias úteis', de: 'Arbeitstage addieren' },
  startDate:   { en: 'Start Date', fr: 'Date de début', es: 'Fecha de inicio', pt: 'Data de início', de: 'Startdatum' },
  endDate:     { en: 'End Date', fr: 'Date de fin', es: 'Fecha de fin', pt: 'Data de fim', de: 'Enddatum' },
  numDays:     { en: 'Work days to add', fr: 'Jours ouvrés à ajouter', es: 'Días hábiles a agregar', pt: 'Dias úteis a adicionar', de: 'Arbeitstage hinzufügen' },
  country:     { en: 'Country holidays', fr: 'Jours fériés du pays', es: 'Festivos del país', pt: 'Feriados do país', de: 'Feiertage des Landes' },
  noHolidays:  { en: 'No holidays', fr: 'Sans jours fériés', es: 'Sin festivos', pt: 'Sem feriados', de: 'Ohne Feiertage' },
  workDays:    { en: 'Work Days', fr: 'Jours ouvrés', es: 'Días laborales', pt: 'Dias úteis', de: 'Arbeitstage' },
  calDays:     { en: 'Calendar Days', fr: 'Jours calendaires', es: 'Días calendario', pt: 'Dias corridos', de: 'Kalendertage' },
  weekends:    { en: 'Weekend Days', fr: 'Jours de weekend', es: 'Días de fin de semana', pt: 'Dias de fim de semana', de: 'Wochenendtage' },
  holidays:    { en: 'Holidays Excluded', fr: 'Jours fériés exclus', es: 'Festivos excluidos', pt: 'Feriados excluídos', de: 'Ausgeschl. Feiertage' },
  resultDate:  { en: 'Result Date', fr: 'Date résultat', es: 'Fecha resultado', pt: 'Data resultado', de: 'Ergebnisdatum' },
  note:        { en: '2026–2027 public holidays', fr: 'Jours fériés 2026–2027', es: 'Festivos públicos 2026–2027', pt: 'Feriados públicos 2026–2027', de: 'Gesetzliche Feiertage 2026–2027' },
  enterDates:  { en: 'Enter dates above to calculate', fr: 'Entrez les dates ci-dessus', es: 'Ingresa las fechas arriba', pt: 'Insira as datas acima', de: 'Geben Sie Daten oben ein' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

const HOLIDAY_DATA: Record<string, Set<string>> = {
  NONE: new Set(),
  US: new Set(['2026-01-01','2026-01-19','2026-02-16','2026-05-25','2026-07-04','2026-09-07','2026-11-11','2026-11-26','2026-12-25',
               '2027-01-01','2027-01-18','2027-02-15','2027-05-31','2027-07-05','2027-09-06','2027-11-11','2027-11-25','2027-12-24']),
  FR: new Set(['2026-01-01','2026-04-06','2026-05-01','2026-05-08','2026-05-14','2026-05-25','2026-07-14','2026-08-15','2026-11-01','2026-11-11','2026-12-25',
               '2027-01-01','2027-03-29','2027-04-05','2027-05-01','2027-05-08','2027-05-13','2027-05-24','2027-07-14','2027-08-15','2027-11-01','2027-11-11','2027-12-25']),
  DE: new Set(['2026-01-01','2026-04-03','2026-04-06','2026-05-01','2026-05-14','2026-05-25','2026-10-03','2026-12-25','2026-12-26',
               '2027-01-01','2027-03-26','2027-03-29','2027-05-01','2027-05-06','2027-05-17','2027-10-03','2027-12-25','2027-12-26']),
  UK: new Set(['2026-01-01','2026-04-03','2026-04-06','2026-05-04','2026-05-25','2026-08-31','2026-12-25','2026-12-28',
               '2027-01-01','2027-03-26','2027-03-29','2027-05-03','2027-05-31','2027-08-30','2027-12-27','2027-12-28']),
}

function isoDate(d: Date) { return d.toISOString().slice(0, 10) }

function countWorkDays(start: Date, end: Date, holidays: Set<string>): { work: number; weekends: number; hols: number; cal: number } {
  let work = 0, weekends = 0, hols = 0
  const cur = new Date(start)
  const cal = Math.round((end.getTime() - start.getTime()) / 86400000)
  while (cur < end) {
    const day = cur.getDay()
    const iso = isoDate(cur)
    if (day === 0 || day === 6) weekends++
    else if (holidays.has(iso)) hols++
    else work++
    cur.setDate(cur.getDate() + 1)
  }
  return { work, weekends, hols, cal }
}

function addWorkDays(start: Date, n: number, holidays: Set<string>): Date {
  const cur = new Date(start)
  let added = 0
  while (added < n) {
    cur.setDate(cur.getDate() + 1)
    const day = cur.getDay()
    if (day !== 0 && day !== 6 && !holidays.has(isoDate(cur))) added++
  }
  return cur
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

interface Props { defaultStart?: string; defaultEnd?: string; defaultCountry?: string; locale?: Locale }

export default function WorkDaysClient({ defaultStart = '', defaultEnd = '', defaultCountry = 'NONE', locale = 'en' }: Props) {
  const [mode, setMode] = useState<'between' | 'add'>('between')
  const [startDate, setStartDate] = useState(defaultStart || today())
  const [endDate, setEndDate] = useState(defaultEnd || today())
  const [numDays, setNumDays] = useState(10)
  const [country, setCountry] = useState(defaultCountry || 'NONE')

  const holidays = HOLIDAY_DATA[country] || HOLIDAY_DATA.NONE

  const betweenResult = useMemo(() => {
    if (mode !== 'between' || !startDate || !endDate) return null
    const s = new Date(startDate + 'T00:00:00')
    const e = new Date(endDate + 'T00:00:00')
    if (isNaN(s.getTime()) || isNaN(e.getTime()) || e <= s) return null
    return countWorkDays(s, e, holidays)
  }, [mode, startDate, endDate, holidays])

  const addResult = useMemo(() => {
    if (mode !== 'add' || !startDate) return null
    const s = new Date(startDate + 'T00:00:00')
    if (isNaN(s.getTime())) return null
    const result = addWorkDays(s, numDays, holidays)
    return result.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }, [mode, startDate, numDays, holidays])

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
    padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
    background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
    letterSpacing: '.8px', display: 'block', marginBottom: 4,
  }
  const tabBtn = (m: 'between' | 'add', label: string) => (
    <button onClick={() => setMode(m)}
      style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, fontFamily: fb, background: mode === m ? accent : 'transparent', color: mode === m ? '#fff' : '#6B6860', transition: 'all .15s' }}>
      {label}
    </button>
  )

  return (
    <ToolShell name={L('title', locale)} icon="💼" currentPath="/work-days-calculator" locale={locale}>
      <div style={{ maxWidth: 580, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 24, fontSize: 15 }}>{L('subtitle', locale)}</p>

        <div style={{ display: 'flex', background: '#F5F3EE', borderRadius: 10, padding: 4, marginBottom: 20, gap: 4 }}>
          {tabBtn('between', L('modeBetween', locale))}
          {tabBtn('add', L('modeAdd', locale))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: mode === 'between' ? '1fr 1fr 1fr' : '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div>
            <label style={labelStyle}>{L('startDate', locale)}</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
          </div>
          {mode === 'between' ? (
            <div>
              <label style={labelStyle}>{L('endDate', locale)}</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
            </div>
          ) : (
            <div>
              <label style={labelStyle}>{L('numDays', locale)}</label>
              <input type="number" min={1} max={1000} value={numDays} onChange={e => setNumDays(Number(e.target.value))} style={inputStyle} />
            </div>
          )}
          <div>
            <label style={labelStyle}>{L('country', locale)}</label>
            <select value={country} onChange={e => setCountry(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as const }}>
              <option value="NONE">{L('noHolidays', locale)}</option>
              <option value="US">🇺🇸 United States</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="FR">🇫🇷 France</option>
              <option value="DE">🇩🇪 Germany</option>
            </select>
          </div>
        </div>

        {mode === 'between' && (betweenResult ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 12 }}>
              {[
                [L('workDays', locale), betweenResult.work, accent],
                [L('calDays', locale), betweenResult.cal, '#6B6860'],
                [L('weekends', locale), betweenResult.weekends, '#9A958A'],
                [L('holidays', locale), betweenResult.hols, '#9A958A'],
              ].map(([label, val, color]) => (
                <div key={String(label)} style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: String(color), fontFamily: fm }}>{String(val)}</div>
                  <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px' }}>{String(label)}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#9A958A', textAlign: 'center' }}>* {L('note', locale)}</p>
          </>
        ) : (
          <div style={{ background: '#F5F3EE', borderRadius: 12, padding: '24px', textAlign: 'center', color: '#9A958A', fontSize: 15 }}>{L('enterDates', locale)}</div>
        ))}

        {mode === 'add' && (addResult ? (
          <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{L('resultDate', locale)}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: accent }}>{addResult}</div>
          </div>
        ) : (
          <div style={{ background: '#F5F3EE', borderRadius: 12, padding: '24px', textAlign: 'center', color: '#9A958A', fontSize: 15 }}>{L('enterDates', locale)}</div>
        ))}
      </div>
    </ToolShell>
  )
}
