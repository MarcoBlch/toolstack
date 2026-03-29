'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#7C3AED'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}
const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none', boxSizing: 'border-box',
}

const LABELS: Record<string, Record<Locale, string>> = {
  title:        { en: 'Age Calculator', fr: 'Calculateur d\'Âge', es: 'Calculadora de Edad', pt: 'Calculadora de Idade', de: 'Alter Berechnen' },
  subtitle:     { en: 'Calculate your exact age, zodiac sign, and days until your next birthday.', fr: 'Calculez votre âge exact, votre signe astrologique et les jours jusqu\'à votre prochain anniversaire.', es: 'Calcula tu edad exacta, signo zodiacal y días hasta tu próximo cumpleaños.', pt: 'Calcule sua idade exata, signo zodiacal e dias até seu próximo aniversário.', de: 'Berechnen Sie Ihr genaues Alter, Ihr Sternzeichen und die Tage bis zu Ihrem nächsten Geburtstag.' },
  dob:          { en: 'Date of Birth', fr: 'Date de naissance', es: 'Fecha de nacimiento', pt: 'Data de nascimento', de: 'Geburtsdatum' },
  ageOn:        { en: 'Age on date', fr: 'Âge à la date', es: 'Edad en la fecha', pt: 'Idade na data', de: 'Alter am Datum' },
  calculate:    { en: 'Calculate', fr: 'Calculer', es: 'Calcular', pt: 'Calcular', de: 'Berechnen' },
  years:        { en: 'Years', fr: 'Années', es: 'Años', pt: 'Anos', de: 'Jahre' },
  months:       { en: 'Months', fr: 'Mois', es: 'Meses', pt: 'Meses', de: 'Monate' },
  days:         { en: 'Days', fr: 'Jours', es: 'Días', pt: 'Dias', de: 'Tage' },
  totalMonths:  { en: 'Total months', fr: 'Total mois', es: 'Total meses', pt: 'Total meses', de: 'Monate gesamt' },
  totalWeeks:   { en: 'Total weeks', fr: 'Total semaines', es: 'Total semanas', pt: 'Total semanas', de: 'Wochen gesamt' },
  totalDays:    { en: 'Total days', fr: 'Total jours', es: 'Total días', pt: 'Total dias', de: 'Tage gesamt' },
  totalHours:   { en: 'Total hours', fr: 'Total heures', es: 'Total horas', pt: 'Total horas', de: 'Stunden gesamt' },
  nextBirthday: { en: 'Next Birthday', fr: 'Prochain anniversaire', es: 'Próximo cumpleaños', pt: 'Próximo aniversário', de: 'Nächster Geburtstag' },
  daysUntil:    { en: 'days away', fr: 'jours restants', es: 'días restantes', pt: 'dias restantes', de: 'Tage noch' },
  bornOn:       { en: 'Born on a', fr: 'Né(e) un', es: 'Naciste en', pt: 'Nasceu numa', de: 'Geboren an einem' },
  zodiac:       { en: 'Western Zodiac', fr: 'Zodiaque occidental', es: 'Zodíaco occidental', pt: 'Zodíaco ocidental', de: 'Westliches Tierkreiszeichen' },
  chinese:      { en: 'Chinese Zodiac', fr: 'Zodiaque chinois', es: 'Zodíaco chino', pt: 'Zodíaco chinês', de: 'Chinesisches Tierkreiszeichen' },
  leapYears:    { en: 'Leap years lived', fr: 'Années bissextiles vécues', es: 'Años bisiestos vividos', pt: 'Anos bissextos vividos', de: 'Erlebte Schaltjahre' },
  enterDob:     { en: 'Enter your date of birth above to see your age', fr: 'Entrez votre date de naissance ci-dessus pour voir votre âge', es: 'Ingresa tu fecha de nacimiento arriba para ver tu edad', pt: 'Insira sua data de nascimento acima para ver sua idade', de: 'Geben Sie Ihr Geburtsdatum oben ein, um Ihr Alter zu sehen' },
}
const L = (key: string, locale: Locale) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

const ZODIAC = [
  { sign: 'Capricorn ♑', m: 1, d: 1, em: 1, ed: 19 },
  { sign: 'Aquarius ♒', m: 1, d: 20, em: 2, ed: 18 },
  { sign: 'Pisces ♓', m: 2, d: 19, em: 3, ed: 20 },
  { sign: 'Aries ♈', m: 3, d: 21, em: 4, ed: 19 },
  { sign: 'Taurus ♉', m: 4, d: 20, em: 5, ed: 20 },
  { sign: 'Gemini ♊', m: 5, d: 21, em: 6, ed: 20 },
  { sign: 'Cancer ♋', m: 6, d: 21, em: 7, ed: 22 },
  { sign: 'Leo ♌', m: 7, d: 23, em: 8, ed: 22 },
  { sign: 'Virgo ♍', m: 8, d: 23, em: 9, ed: 22 },
  { sign: 'Libra ♎', m: 9, d: 23, em: 10, ed: 22 },
  { sign: 'Scorpio ♏', m: 10, d: 23, em: 11, ed: 21 },
  { sign: 'Sagittarius ♐', m: 11, d: 22, em: 12, ed: 21 },
  { sign: 'Capricorn ♑', m: 12, d: 22, em: 12, ed: 31 },
]
const CHINESE = ['Rat 🐀','Ox 🐂','Tiger 🐅','Rabbit 🐇','Dragon 🐉','Snake 🐍','Horse 🐎','Goat 🐐','Monkey 🐒','Rooster 🐓','Dog 🐕','Pig 🐖']
const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const DAYS_FR = ['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi']
const DAYS_ES = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
const DAYS_PT = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado']
const DAYS_DE = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']

function getWeekday(date: Date, locale: Locale): string {
  const i = date.getDay()
  if (locale === 'fr') return DAYS_FR[i]
  if (locale === 'es') return DAYS_ES[i]
  if (locale === 'pt') return DAYS_PT[i]
  if (locale === 'de') return DAYS_DE[i]
  return DAYS_EN[i]
}

function getZodiac(month: number, day: number): string {
  for (const z of ZODIAC) {
    if ((month === z.m && day >= z.d) || (month === z.em && day <= z.ed)) return z.sign
  }
  return ''
}

function isLeap(y: number) { return (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) }

function calcAge(birthStr: string, targetStr: string) {
  const b = new Date(birthStr + 'T00:00:00')
  const t = new Date(targetStr + 'T00:00:00')
  if (isNaN(b.getTime()) || isNaN(t.getTime()) || t < b) return null

  let years = t.getFullYear() - b.getFullYear()
  let months = t.getMonth() - b.getMonth()
  let days = t.getDate() - b.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(t.getFullYear(), t.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) { years--; months += 12 }

  const totalDays = Math.floor((t.getTime() - b.getTime()) / 86400000)
  const totalWeeks = Math.floor(totalDays / 7)
  const totalMonths = years * 12 + months
  const totalHours = totalDays * 24

  // Next birthday
  let nextBD = new Date(t.getFullYear(), b.getMonth(), b.getDate())
  if (nextBD <= t) nextBD = new Date(t.getFullYear() + 1, b.getMonth(), b.getDate())
  const daysUntilBD = Math.ceil((nextBD.getTime() - t.getTime()) / 86400000)

  // Leap years lived
  let leaps = 0
  for (let y = b.getFullYear(); y <= t.getFullYear(); y++) { if (isLeap(y)) leaps++ }

  return {
    years, months, days,
    totalDays, totalWeeks, totalMonths, totalHours,
    nextBD, daysUntilBD,
    weekday: b.getDay(),
    zodiac: getZodiac(b.getMonth() + 1, b.getDate()),
    chinese: CHINESE[((b.getFullYear() - 1900) % 12 + 12) % 12],
    leaps,
  }
}

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

interface Props { defaultBirthDate?: string; locale?: Locale }

export default function AgeClient({ defaultBirthDate = '', locale = 'en' }: Props) {
  const [birthDate, setBirthDate] = useState(defaultBirthDate)
  const [targetDate, setTargetDate] = useState(today)

  const result = useMemo(() => {
    if (!birthDate || !targetDate) return null
    return calcAge(birthDate, targetDate)
  }, [birthDate, targetDate])

  const statBox = (label: string, value: string | number) => (
    <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: accent, fontFamily: fm }}>{value.toLocaleString()}</div>
      <div style={{ fontSize: 12, color: '#9A958A', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.6px' }}>{label}</div>
    </div>
  )

  return (
    <ToolShell name={L('title', locale)} icon="🎂" currentPath="/age-calculator" locale={locale}>
      <div style={{ maxWidth: 680, margin: '0 auto', fontFamily: fb }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1C1B18', marginBottom: 6 }}>{L('title', locale)}</h1>
        <p style={{ color: '#6B6860', marginBottom: 28, fontSize: 15 }}>{L('subtitle', locale)}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={labelStyle}>{L('dob', locale)}</label>
            <input type="date" value={birthDate} max={today()} onChange={e => setBirthDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{L('ageOn', locale)}</label>
            <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} style={inputStyle} />
          </div>
        </div>

        {!result && (
          <div style={{ background: '#F5F3EE', borderRadius: 12, padding: '32px', textAlign: 'center', color: '#9A958A', fontSize: 15 }}>
            {L('enterDob', locale)}
          </div>
        )}

        {result && (
          <>
            {/* Main age */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              {statBox(L('years', locale), result.years)}
              {statBox(L('months', locale), result.months)}
              {statBox(L('days', locale), result.days)}
            </div>

            {/* Totals */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 16 }}>
              {statBox(L('totalMonths', locale), result.totalMonths.toLocaleString())}
              {statBox(L('totalWeeks', locale), result.totalWeeks.toLocaleString())}
              {statBox(L('totalDays', locale), result.totalDays.toLocaleString())}
              {statBox(L('totalHours', locale), result.totalHours.toLocaleString())}
            </div>

            {/* Info cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{L('nextBirthday', locale)}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1C1B18' }}>
                  {result.nextBD.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div style={{ color: accent, fontWeight: 600, marginTop: 4, fontSize: 14 }}>{result.daysUntilBD} {L('daysUntil', locale)}</div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{L('bornOn', locale)}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#1C1B18' }}>{getWeekday(new Date(birthDate + 'T00:00:00'), locale)}</div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{L('zodiac', locale)}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#1C1B18' }}>{result.zodiac}</div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{L('chinese', locale)}</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#1C1B18' }}>{result.chinese}</div>
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 12, padding: '16px 20px', gridColumn: 'span 2' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 8 }}>{L('leapYears', locale)}</div>
                <div style={{ fontWeight: 700, fontSize: 24, color: accent, fontFamily: fm }}>{result.leaps}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </ToolShell>
  )
}
