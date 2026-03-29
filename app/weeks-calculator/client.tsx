'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#0891B2'

const LABELS: Record<string, Record<Locale, string>> = {
  title:       { en: 'Weeks Calculator', fr: 'Calculateur de Semaines', es: 'Calculadora de Semanas', pt: 'Calculadora de Semanas', de: 'Wochen Rechner' },
  subtitle:    { en: 'Calculate weeks between two dates, or find a date X weeks from now.', fr: 'Calculez les semaines entre deux dates ou trouvez une date X semaines dans le futur.', es: 'Calcula semanas entre dos fechas o encuentra una fecha X semanas en el futuro.', pt: 'Calcule semanas entre duas datas ou encontre uma data X semanas no futuro.', de: 'Wochen zwischen zwei Daten berechnen oder ein Datum X Wochen in der Zukunft finden.' },
  modeBetween: { en: 'Weeks between dates', fr: 'Semaines entre dates', es: 'Semanas entre fechas', pt: 'Semanas entre datas', de: 'Wochen zwischen Daten' },
  modeAdd:     { en: 'Add weeks to a date', fr: 'Ajouter des semaines', es: 'Sumar semanas a una fecha', pt: 'Somar semanas a uma data', de: 'Wochen zu Datum addieren' },
  startDate:   { en: 'Start Date', fr: 'Date de début', es: 'Fecha de inicio', pt: 'Data de início', de: 'Startdatum' },
  endDate:     { en: 'End Date', fr: 'Date de fin', es: 'Fecha de fin', pt: 'Data de fim', de: 'Enddatum' },
  numWeeks:    { en: 'Number of weeks', fr: 'Nombre de semaines', es: 'Número de semanas', pt: 'Número de semanas', de: 'Anzahl Wochen' },
  totalWeeks:  { en: 'Total weeks', fr: 'Total semaines', es: 'Total semanas', pt: 'Total semanas', de: 'Wochen gesamt' },
  remaining:   { en: 'Remaining days', fr: 'Jours restants', es: 'Días restantes', pt: 'Dias restantes', de: 'Verbleibende Tage' },
  totalDays:   { en: 'Total days', fr: 'Total jours', es: 'Total días', pt: 'Total dias', de: 'Tage gesamt' },
  resultDate:  { en: 'Result Date', fr: 'Date résultat', es: 'Fecha resultado', pt: 'Data resultado', de: 'Ergebnisdatum' },
  enterDates:  { en: 'Enter dates above to calculate', fr: 'Entrez les dates ci-dessus pour calculer', es: 'Ingresa las fechas arriba para calcular', pt: 'Insira as datas acima para calcular', de: 'Geben Sie die Daten oben ein' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

interface Props { defaultMode?: string; defaultStart?: string; defaultWeeks?: number; locale?: Locale }

export default function WeeksClient({ defaultMode = 'between', defaultStart = '', defaultWeeks = 4, locale = 'en' }: Props) {
  const [mode, setMode] = useState<'between' | 'add'>(defaultMode === 'add' ? 'add' : 'between')
  const [startDate, setStartDate] = useState(defaultStart || today())
  const [endDate, setEndDate] = useState(today())
  const [weeks, setWeeks] = useState(defaultWeeks)

  const betweenResult = useMemo(() => {
    if (mode !== 'between' || !startDate || !endDate) return null
    const s = new Date(startDate + 'T00:00:00')
    const e = new Date(endDate + 'T00:00:00')
    if (isNaN(s.getTime()) || isNaN(e.getTime()) || e < s) return null
    const totalDays = Math.round((e.getTime() - s.getTime()) / 86400000)
    return { totalWeeks: Math.floor(totalDays / 7), remainDays: totalDays % 7, totalDays }
  }, [mode, startDate, endDate])

  const addResult = useMemo(() => {
    if (mode !== 'add' || !startDate) return null
    const s = new Date(startDate + 'T00:00:00')
    if (isNaN(s.getTime())) return null
    const result = new Date(s.getTime() + weeks * 7 * 86400000)
    return result.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }, [mode, startDate, weeks])

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
    <ToolShell name={L('title', locale)} icon="🗓️" currentPath="/weeks-calculator" locale={locale}>
      <div style={{ maxWidth: 560, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 24, fontSize: 15 }}>{L('subtitle', locale)}</p>

        {/* Mode tabs */}
        <div style={{ display: 'flex', background: '#F5F3EE', borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 }}>
          {tabBtn('between', L('modeBetween', locale))}
          {tabBtn('add', L('modeAdd', locale))}
        </div>

        {mode === 'between' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>{L('startDate', locale)}</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{L('endDate', locale)}</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={inputStyle} />
            </div>
          </div>
        )}

        {mode === 'add' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={labelStyle}>{L('startDate', locale)}</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>{L('numWeeks', locale)}</label>
              <input type="number" min={1} max={520} value={weeks} onChange={e => setWeeks(Number(e.target.value))} style={inputStyle} />
            </div>
          </div>
        )}

        {mode === 'between' && (betweenResult ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              [L('totalWeeks', locale), betweenResult.totalWeeks],
              [L('remaining', locale), betweenResult.remainDays],
              [L('totalDays', locale), betweenResult.totalDays],
            ].map(([label, val]) => (
              <div key={String(label)} style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: accent, fontFamily: fm }}>{String(val)}</div>
                <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px' }}>{String(label)}</div>
              </div>
            ))}
          </div>
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
