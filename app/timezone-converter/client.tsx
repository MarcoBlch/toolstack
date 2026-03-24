'use client'
import { useState, useEffect, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const ZONES = [
  { id: 'America/New_York', label: 'New York (EST/EDT)', short: 'EST' },
  { id: 'America/Chicago', label: 'Chicago (CST/CDT)', short: 'CST' },
  { id: 'America/Denver', label: 'Denver (MST/MDT)', short: 'MST' },
  { id: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)', short: 'PST' },
  { id: 'America/Toronto', label: 'Toronto (EST/EDT)', short: 'EST' },
  { id: 'America/Sao_Paulo', label: 'São Paulo (BRT)', short: 'BRT' },
  { id: 'Europe/London', label: 'London (GMT/BST)', short: 'GMT' },
  { id: 'Europe/Paris', label: 'Paris (CET/CEST)', short: 'CET' },
  { id: 'Europe/Berlin', label: 'Berlin (CET/CEST)', short: 'CET' },
  { id: 'Europe/Madrid', label: 'Madrid (CET/CEST)', short: 'CET' },
  { id: 'Europe/Rome', label: 'Rome (CET/CEST)', short: 'CET' },
  { id: 'Europe/Moscow', label: 'Moscow (MSK)', short: 'MSK' },
  { id: 'Europe/Istanbul', label: 'Istanbul (TRT)', short: 'TRT' },
  { id: 'Asia/Dubai', label: 'Dubai (GST)', short: 'GST' },
  { id: 'Asia/Kolkata', label: 'India (IST)', short: 'IST' },
  { id: 'Asia/Bangkok', label: 'Bangkok (ICT)', short: 'ICT' },
  { id: 'Asia/Singapore', label: 'Singapore (SGT)', short: 'SGT' },
  { id: 'Asia/Shanghai', label: 'Shanghai (CST)', short: 'CST' },
  { id: 'Asia/Tokyo', label: 'Tokyo (JST)', short: 'JST' },
  { id: 'Asia/Seoul', label: 'Seoul (KST)', short: 'KST' },
  { id: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)', short: 'AEST' },
  { id: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)', short: 'NZST' },
  { id: 'Pacific/Honolulu', label: 'Honolulu (HST)', short: 'HST' },
  { id: 'UTC', label: 'UTC', short: 'UTC' },
]

function formatTime(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tz }).format(date)
}

function formatDate(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: tz }).format(date)
}

function getOffset(tz: string): string {
  const now = new Date()
  const str = new Intl.DateTimeFormat('en', { timeZone: tz, timeZoneName: 'shortOffset' }).format(now)
  const match = str.match(/GMT([+-]\d+(?::\d+)?)?/)
  return match ? (match[1] || '+0') : ''
}

export default function TimezoneClient() {
  const [fromZone, setFromZone] = useState('Europe/Paris')
  const [toZone, setToZone] = useState('America/New_York')
  const [inputTime, setInputTime] = useState('')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(i)
  }, [])

  const converted = useMemo(() => {
    if (!inputTime) return null
    const [h, m] = inputTime.split(':').map(Number)
    const today = new Date()
    const fromStr = today.toLocaleDateString('en-CA', { timeZone: fromZone }) + 'T' + inputTime + ':00'
    const fromParts = new Intl.DateTimeFormat('en-US', { timeZone: fromZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(today)
    const y = fromParts.find(p => p.type === 'year')!.value
    const mo = fromParts.find(p => p.type === 'month')!.value
    const d = fromParts.find(p => p.type === 'day')!.value
    const fakeDate = new Date(`${y}-${mo}-${d}T${inputTime}:00`)
    const fromOffset = fakeDate.getTime() - new Date(fakeDate.toLocaleString('en-US', { timeZone: fromZone })).getTime()
    const utc = fakeDate.getTime() + fromOffset
    const toDate = new Date(utc - (fakeDate.getTime() - new Date(fakeDate.toLocaleString('en-US', { timeZone: toZone })).getTime()))
    return formatTime(toDate, toZone).slice(0, 5)
  }, [inputTime, fromZone, toZone])

  const swap = () => { setFromZone(toZone); setToZone(fromZone) }

  const selectStyle = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 10,
    padding: '12px 14px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
    background: '#F5F3EE', outline: 'none', cursor: 'pointer',
    appearance: 'none' as const,
  }

  return (
    <ToolShell name="Timezone Converter" icon="🕐" currentPath="/timezone-converter">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: '#0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>T</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>TimeBridge</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Timezone <span style={{ color: '#0EA5E9' }}>converter</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>See the time anywhere, instantly.</p>
        </section>

        {/* Live clocks */}
        <section style={{ maxWidth: 500, margin: '0 auto', padding: '0 28px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[{ zone: fromZone, label: 'From' }, { zone: toZone, label: 'To' }].map(({ zone, label }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '18px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: fm, fontSize: 32, fontWeight: 700, color: '#1C1B18', letterSpacing: '-1px' }}>
                {formatTime(now, zone)}
              </div>
              <div style={{ fontSize: 12, color: '#6B6560', marginTop: 4 }}>
                {formatDate(now, zone)}
              </div>
              <div style={{ fontSize: 11, fontFamily: fm, color: '#0EA5E9', marginTop: 4 }}>
                UTC{getOffset(zone)}
              </div>
            </div>
          ))}
        </section>

        {/* Converter */}
        <section style={{ maxWidth: 500, margin: '0 auto', padding: '0 28px 32px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 24 }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>From timezone</label>
              <select value={fromZone} onChange={e => setFromZone(e.target.value)} style={selectStyle}>
                {ZONES.map(z => <option key={z.id} value={z.id}>{z.label}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>Time to convert</label>
              <input type="time" value={inputTime} onChange={e => setInputTime(e.target.value)}
                style={{ ...selectStyle, fontFamily: fm, fontSize: 22, fontWeight: 700, textAlign: 'center', padding: '14px' }} />
            </div>

            <div style={{ textAlign: 'center', margin: '12px 0' }}>
              <button onClick={swap} style={{
                width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #E8E4DB',
                background: '#fff', cursor: 'pointer', fontSize: 16, color: '#6B6560',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>⇅</button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>To timezone</label>
              <select value={toZone} onChange={e => setToZone(e.target.value)} style={selectStyle}>
                {ZONES.map(z => <option key={z.id} value={z.id}>{z.label}</option>)}
              </select>
            </div>

            {converted && (
              <div style={{
                background: '#0EA5E908', border: '1.5px solid #0EA5E920', borderRadius: 14,
                padding: '20px', textAlign: 'center', marginTop: 8,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Converted time</div>
                <div style={{ fontFamily: fm, fontSize: 36, fontWeight: 700, color: '#0EA5E9' }}>{converted}</div>
                <div style={{ fontSize: 13, color: '#6B6560', marginTop: 4 }}>
                  {ZONES.find(z => z.id === toZone)?.label}
                </div>
              </div>
            )}
          </div>
        </section>

        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free timezone converter</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            TimeBridge converts time between 24 major timezones worldwide. Live clock display, instant conversion, meeting time planner. Supports EST, GMT, CET, IST, JST, AEST, and more. All calculations happen locally using your browser's Intl API.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
