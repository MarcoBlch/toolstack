'use client'
import { useState, useEffect } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#4338CA'

const LABELS: Record<string, Record<Locale, string>> = {
  title:      { en: 'Unix Timestamp Converter', fr: 'Convertisseur Timestamp Unix', es: 'Convertidor de Timestamp Unix', pt: 'Conversor de Timestamp Unix', de: 'Unix Timestamp Rechner' },
  subtitle:   { en: 'Convert Unix epoch to human date, date to timestamp, or view the live current timestamp.', fr: 'Convertissez l\'epoch Unix en date, une date en timestamp, ou affichez le timestamp actuel.', es: 'Convierte epoch Unix a fecha, fecha a timestamp, o ve el timestamp actual en vivo.', pt: 'Converta epoch Unix em data, data em timestamp, ou veja o timestamp atual ao vivo.', de: 'Unix-Epoch in Datum, Datum in Timestamp umwandeln oder den aktuellen Timestamp live anzeigen.' },
  modeLive:   { en: 'Live', fr: 'En direct', es: 'En vivo', pt: 'Ao vivo', de: 'Live' },
  modeToDate: { en: 'Timestamp → Date', fr: 'Timestamp → Date', es: 'Timestamp → Fecha', pt: 'Timestamp → Data', de: 'Timestamp → Datum' },
  modeToTs:   { en: 'Date → Timestamp', fr: 'Date → Timestamp', es: 'Fecha → Timestamp', pt: 'Data → Timestamp', de: 'Datum → Timestamp' },
  currentTs:  { en: 'Current Unix Timestamp', fr: 'Timestamp Unix actuel', es: 'Timestamp Unix actual', pt: 'Timestamp Unix atual', de: 'Aktueller Unix Timestamp' },
  seconds:    { en: 'Seconds', fr: 'Secondes', es: 'Segundos', pt: 'Segundos', de: 'Sekunden' },
  milliseconds:{ en: 'Milliseconds', fr: 'Millisecondes', es: 'Milisegundos', pt: 'Milissegundos', de: 'Millisekunden' },
  enterTs:    { en: 'Enter timestamp', fr: 'Entrez le timestamp', es: 'Ingrese el timestamp', pt: 'Insira o timestamp', de: 'Timestamp eingeben' },
  utc:        { en: 'UTC', fr: 'UTC', es: 'UTC', pt: 'UTC', de: 'UTC' },
  local:      { en: 'Local Time', fr: 'Heure locale', es: 'Hora local', pt: 'Hora local', de: 'Ortszeit' },
  iso:        { en: 'ISO 8601', fr: 'ISO 8601', es: 'ISO 8601', pt: 'ISO 8601', de: 'ISO 8601' },
  relative:   { en: 'Relative', fr: 'Relatif', es: 'Relativo', pt: 'Relativo', de: 'Relativ' },
  date:       { en: 'Date', fr: 'Date', es: 'Fecha', pt: 'Data', de: 'Datum' },
  time:       { en: 'Time', fr: 'Heure', es: 'Hora', pt: 'Hora', de: 'Uhrzeit' },
  timestamp:  { en: 'Timestamp (seconds)', fr: 'Timestamp (secondes)', es: 'Timestamp (segundos)', pt: 'Timestamp (segundos)', de: 'Timestamp (Sekunden)' },
  tsMs:       { en: 'Timestamp (ms)', fr: 'Timestamp (ms)', es: 'Timestamp (ms)', pt: 'Timestamp (ms)', de: 'Timestamp (ms)' },
  copy:       { en: 'Copy', fr: 'Copier', es: 'Copiar', pt: 'Copiar', de: 'Kopieren' },
  copied:     { en: 'Copied!', fr: 'Copié !', es: '¡Copiado!', pt: 'Copiado!', de: 'Kopiert!' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

function relative(ms: number): string {
  const diff = Date.now() - ms
  const abs = Math.abs(diff)
  const future = diff < 0
  const pfx = future ? 'in ' : ''
  const sfx = future ? '' : ' ago'
  if (abs < 60000) return 'just now'
  if (abs < 3600000) return `${pfx}${Math.floor(abs / 60000)} min${sfx}`
  if (abs < 86400000) return `${pfx}${Math.floor(abs / 3600000)} hr${sfx}`
  if (abs < 2592000000) return `${pfx}${Math.floor(abs / 86400000)} day${sfx}`
  if (abs < 31536000000) return `${pfx}${Math.floor(abs / 2592000000)} mo${sfx}`
  return `${pfx}${Math.floor(abs / 31536000000)} yr${sfx}`
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}
function nowTime() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

interface Props { defaultTimestamp?: string; locale?: Locale }

export default function UnixTimestampClient({ defaultTimestamp = '', locale = 'en' }: Props) {
  const [mode, setMode] = useState<'live' | 'toDate' | 'toTs'>('live')
  const [now, setNow] = useState<Date | null>(null)
  const [inputTs, setInputTs] = useState(defaultTimestamp || '')
  const [inputDate, setInputDate] = useState(today())
  const [inputTime, setInputTime] = useState(nowTime())
  const [copied, setCopied] = useState('')

  useEffect(() => {
    setNow(new Date())
    const i = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(i)
  }, [])

  const toDateResult = (() => {
    if (!inputTs) return null
    const raw = inputTs.trim()
    if (!raw || isNaN(Number(raw))) return null
    const ms = raw.length > 10 ? parseInt(raw) : parseInt(raw) * 1000
    const d = new Date(ms)
    if (isNaN(d.getTime())) return null
    return { d, ms }
  })()

  const toTsResult = (() => {
    if (!inputDate) return null
    const d = new Date(`${inputDate}T${inputTime}:00`)
    if (isNaN(d.getTime())) return null
    return { seconds: Math.floor(d.getTime() / 1000), ms: d.getTime() }
  })()

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(key)
    setTimeout(() => setCopied(''), 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
    padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
    background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
    letterSpacing: '.8px', display: 'block', marginBottom: 4,
  }
  const tabBtn = (m: 'live' | 'toDate' | 'toTs', label: string) => (
    <button onClick={() => setMode(m)}
      style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, fontFamily: fb, background: mode === m ? accent : 'transparent', color: mode === m ? '#fff' : '#6B6860', transition: 'all .15s', whiteSpace: 'nowrap' }}>
      {label}
    </button>
  )
  const rowItem = (label: string, value: string, copyKey: string) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F0EDE6' }}>
      <span style={{ fontSize: 12, color: '#9A958A', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px', minWidth: 80 }}>{label}</span>
      <span style={{ fontFamily: fm, fontSize: 14, color: '#1C1B18', flex: 1, textAlign: 'right', marginRight: 8, wordBreak: 'break-all' }}>{value}</span>
      <button onClick={() => copy(value, copyKey)} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #E8E4DB', background: copied === copyKey ? accent : '#F5F3EE', color: copied === copyKey ? '#fff' : '#6B6860', fontSize: 11, cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>
        {copied === copyKey ? L('copied', locale) : L('copy', locale)}
      </button>
    </div>
  )

  return (
    <ToolShell name={L('title', locale)} icon="🔢" currentPath="/unix-timestamp" locale={locale}>
      <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 24, fontSize: 15 }}>{L('subtitle', locale)}</p>

        <div style={{ display: 'flex', background: '#F5F3EE', borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 }}>
          {tabBtn('live', L('modeLive', locale))}
          {tabBtn('toDate', L('modeToDate', locale))}
          {tabBtn('toTs', L('modeToTs', locale))}
        </div>

        {mode === 'live' && (
          <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16, padding: '28px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 12 }}>{L('currentTs', locale)}</div>
            <div style={{ fontSize: 48, fontWeight: 800, color: accent, fontFamily: fm, marginBottom: 4 }}>
              {now ? Math.floor(now.getTime() / 1000) : '---'}
            </div>
            <div style={{ fontSize: 18, color: '#6B6860', fontFamily: fm, marginBottom: 16 }}>
              {now ? now.getTime() : '---'} <span style={{ fontSize: 12, color: '#9A958A' }}>ms</span>
            </div>
            {now && (
              <>
                {rowItem(L('utc', locale), now.toUTCString(), 'utc')}
                {rowItem(L('local', locale), now.toString(), 'local')}
                {rowItem(L('iso', locale), now.toISOString(), 'iso')}
              </>
            )}
          </div>
        )}

        {mode === 'toDate' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{L('enterTs', locale)}</label>
              <input type="number" value={inputTs} onChange={e => setInputTs(e.target.value)} placeholder="1700000000" style={inputStyle} />
            </div>
            {toDateResult ? (
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16, padding: '20px' }}>
                {rowItem(L('utc', locale), toDateResult.d.toUTCString(), 'utc2')}
                {rowItem(L('local', locale), toDateResult.d.toString(), 'local2')}
                {rowItem(L('iso', locale), toDateResult.d.toISOString(), 'iso2')}
                {rowItem(L('relative', locale), relative(toDateResult.ms), 'rel2')}
              </div>
            ) : (
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: '24px', textAlign: 'center', color: '#9A958A', fontSize: 15 }}>
                {L('enterTs', locale)}
              </div>
            )}
          </>
        )}

        {mode === 'toTs' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div>
                <label style={labelStyle}>{L('date', locale)}</label>
                <input type="date" value={inputDate} onChange={e => setInputDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{L('time', locale)}</label>
                <input type="time" value={inputTime} onChange={e => setInputTime(e.target.value)} style={inputStyle} />
              </div>
            </div>
            {toTsResult ? (
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 16, padding: '20px' }}>
                {rowItem(L('timestamp', locale), String(toTsResult.seconds), 'ts1')}
                {rowItem(L('tsMs', locale), String(toTsResult.ms), 'ts2')}
              </div>
            ) : (
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: '24px', textAlign: 'center', color: '#9A958A', fontSize: 15 }}>
                {L('enterDates', locale)}
              </div>
            )}
          </>
        )}
      </div>
    </ToolShell>
  )
}
