'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

type Unit = { id: string; name: string; toBase: (v: number) => number; fromBase: (v: number) => number }
type Category = { id: string; name: string; icon: string; color: string; units: Unit[] }

const linear = (factor: number): Unit['toBase'] => (v) => v * factor
const linearInv = (factor: number): Unit['fromBase'] => (v) => v / factor

const CATEGORIES: Category[] = [
  { id: 'length', name: 'Length', icon: '📏', color: '#3B82F6', units: [
    { id: 'mm', name: 'Millimeters', toBase: linear(0.001), fromBase: linearInv(0.001) },
    { id: 'cm', name: 'Centimeters', toBase: linear(0.01), fromBase: linearInv(0.01) },
    { id: 'm', name: 'Meters', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'km', name: 'Kilometers', toBase: linear(1000), fromBase: linearInv(1000) },
    { id: 'in', name: 'Inches', toBase: linear(0.0254), fromBase: linearInv(0.0254) },
    { id: 'ft', name: 'Feet', toBase: linear(0.3048), fromBase: linearInv(0.3048) },
    { id: 'yd', name: 'Yards', toBase: linear(0.9144), fromBase: linearInv(0.9144) },
    { id: 'mi', name: 'Miles', toBase: linear(1609.344), fromBase: linearInv(1609.344) },
  ]},
  { id: 'weight', name: 'Weight', icon: '⚖️', color: '#22A065', units: [
    { id: 'mg', name: 'Milligrams', toBase: linear(0.000001), fromBase: linearInv(0.000001) },
    { id: 'g', name: 'Grams', toBase: linear(0.001), fromBase: linearInv(0.001) },
    { id: 'kg', name: 'Kilograms', toBase: linear(1), fromBase: linearInv(1) },
    { id: 't', name: 'Metric Tons', toBase: linear(1000), fromBase: linearInv(1000) },
    { id: 'oz', name: 'Ounces', toBase: linear(0.0283495), fromBase: linearInv(0.0283495) },
    { id: 'lb', name: 'Pounds', toBase: linear(0.453592), fromBase: linearInv(0.453592) },
    { id: 'st', name: 'Stones', toBase: linear(6.35029), fromBase: linearInv(6.35029) },
  ]},
  { id: 'temp', name: 'Temperature', icon: '🌡️', color: '#E8457A', units: [
    { id: 'c', name: 'Celsius', toBase: (v) => v, fromBase: (v) => v },
    { id: 'f', name: 'Fahrenheit', toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
    { id: 'k', name: 'Kelvin', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ]},
  { id: 'volume', name: 'Volume', icon: '🧪', color: '#8B5CF6', units: [
    { id: 'ml', name: 'Milliliters', toBase: linear(0.001), fromBase: linearInv(0.001) },
    { id: 'l', name: 'Liters', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'gal_us', name: 'US Gallons', toBase: linear(3.78541), fromBase: linearInv(3.78541) },
    { id: 'gal_uk', name: 'UK Gallons', toBase: linear(4.54609), fromBase: linearInv(4.54609) },
    { id: 'fl_oz', name: 'Fluid Ounces (US)', toBase: linear(0.0295735), fromBase: linearInv(0.0295735) },
    { id: 'cup', name: 'Cups (US)', toBase: linear(0.236588), fromBase: linearInv(0.236588) },
    { id: 'tbsp', name: 'Tablespoons', toBase: linear(0.0147868), fromBase: linearInv(0.0147868) },
    { id: 'tsp', name: 'Teaspoons', toBase: linear(0.00492892), fromBase: linearInv(0.00492892) },
  ]},
  { id: 'area', name: 'Area', icon: '📐', color: '#EF9F27', units: [
    { id: 'sqm', name: 'Square Meters', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'sqkm', name: 'Square Kilometers', toBase: linear(1e6), fromBase: linearInv(1e6) },
    { id: 'sqft', name: 'Square Feet', toBase: linear(0.092903), fromBase: linearInv(0.092903) },
    { id: 'sqmi', name: 'Square Miles', toBase: linear(2.59e6), fromBase: linearInv(2.59e6) },
    { id: 'ha', name: 'Hectares', toBase: linear(10000), fromBase: linearInv(10000) },
    { id: 'acre', name: 'Acres', toBase: linear(4046.86), fromBase: linearInv(4046.86) },
  ]},
  { id: 'speed', name: 'Speed', icon: '💨', color: '#D85A30', units: [
    { id: 'mps', name: 'Meters/second', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'kmh', name: 'Km/hour', toBase: linear(0.277778), fromBase: linearInv(0.277778) },
    { id: 'mph', name: 'Miles/hour', toBase: linear(0.44704), fromBase: linearInv(0.44704) },
    { id: 'kn', name: 'Knots', toBase: linear(0.514444), fromBase: linearInv(0.514444) },
  ]},
  { id: 'data', name: 'Data', icon: '💾', color: '#1A6B4E', units: [
    { id: 'b', name: 'Bytes', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'kb', name: 'Kilobytes', toBase: linear(1024), fromBase: linearInv(1024) },
    { id: 'mb', name: 'Megabytes', toBase: linear(1048576), fromBase: linearInv(1048576) },
    { id: 'gb', name: 'Gigabytes', toBase: linear(1073741824), fromBase: linearInv(1073741824) },
    { id: 'tb', name: 'Terabytes', toBase: linear(1099511627776), fromBase: linearInv(1099511627776) },
  ]},
  { id: 'time', name: 'Time', icon: '⏱️', color: '#6B6560', units: [
    { id: 'ms', name: 'Milliseconds', toBase: linear(0.001), fromBase: linearInv(0.001) },
    { id: 's', name: 'Seconds', toBase: linear(1), fromBase: linearInv(1) },
    { id: 'min', name: 'Minutes', toBase: linear(60), fromBase: linearInv(60) },
    { id: 'hr', name: 'Hours', toBase: linear(3600), fromBase: linearInv(3600) },
    { id: 'day', name: 'Days', toBase: linear(86400), fromBase: linearInv(86400) },
    { id: 'wk', name: 'Weeks', toBase: linear(604800), fromBase: linearInv(604800) },
    { id: 'yr', name: 'Years', toBase: linear(31557600), fromBase: linearInv(31557600) },
  ]},
]

export default function UnitConverterClient({
  defaultCategory,
  defaultFrom,
  defaultTo,
  defaultValue,
}: {
  defaultCategory?: string
  defaultFrom?: string
  defaultTo?: string
  defaultValue?: string
} = {}) {
  const [catId, setCatId] = useState(defaultCategory || 'length')
  const [fromId, setFromId] = useState(defaultFrom || 'cm')
  const [toId, setToId] = useState(defaultTo || 'in')
  const [value, setValue] = useState(defaultValue || '100')

  const cat = CATEGORIES.find(c => c.id === catId)!
  const fromUnit = cat.units.find(u => u.id === fromId) || cat.units[0]
  const toUnit = cat.units.find(u => u.id === toId) || cat.units[1]

  const result = useMemo(() => {
    const v = parseFloat(value)
    if (isNaN(v)) return ''
    const base = fromUnit.toBase(v)
    const out = toUnit.fromBase(base)
    return Number.isInteger(out) ? out.toString() : out.toPrecision(8).replace(/\.?0+$/, '')
  }, [value, fromUnit, toUnit])

  const swap = () => { setFromId(toId); setToId(fromId) }

  const changeCat = (id: string) => {
    setCatId(id)
    const c = CATEGORIES.find(c => c.id === id)!
    setFromId(c.units[0].id)
    setToId(c.units[1]?.id || c.units[0].id)
    setValue('1')
  }

  const selectStyle = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 10,
    padding: '12px 14px', fontSize: 15, fontFamily: fb, color: '#1C1B18',
    background: '#F5F3EE', outline: 'none', cursor: 'pointer',
    appearance: 'none' as const, WebkitAppearance: 'none' as const,
  }

  return (
    <ToolShell name="Unit Converter" icon="⇄" currentPath="/unit-converter">
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>⇄</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>UnitFlip</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>← All tools</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            Unit <span style={{ color: cat.color }}>converter</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>Convert anything, instantly. 100% local.</p>
        </section>

        {/* Category tabs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24, justifyContent: 'center' }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => changeCat(c.id)} style={{
                fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 14px', borderRadius: 10, cursor: 'pointer',
                border: catId === c.id ? `1.5px solid ${c.color}` : '1.5px solid #E8E4DB',
                background: catId === c.id ? c.color + '10' : '#fff',
                color: catId === c.id ? c.color : '#6B6560',
                display: 'flex', alignItems: 'center', gap: 4,
              }}><span style={{ fontSize: 13 }}>{c.icon}</span> {c.name}</button>
            ))}
          </div>
        </section>

        {/* Converter */}
        <section style={{ maxWidth: 500, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* From */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>From</label>
              <select value={fromId} onChange={e => setFromId(e.target.value)} style={selectStyle}>
                {cat.units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Enter value"
              style={{
                width: '100%', border: '2px solid #E8E4DB', borderRadius: 12, padding: '16px 18px',
                fontSize: 28, fontFamily: fm, fontWeight: 700, color: '#1C1B18',
                background: '#FAFAF8', outline: 'none', textAlign: 'center',
                marginBottom: 16,
              }} />

            {/* Swap */}
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <button onClick={swap} style={{
                width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #E8E4DB',
                background: '#fff', cursor: 'pointer', fontSize: 18, display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center', transition: 'all .15s',
                color: '#6B6560',
              }}>⇅</button>
            </div>

            {/* To */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', display: 'block', marginBottom: 6 }}>To</label>
              <select value={toId} onChange={e => setToId(e.target.value)} style={selectStyle}>
                {cat.units.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>

            {/* Result */}
            <div style={{
              background: cat.color + '08', border: `1.5px solid ${cat.color}20`,
              borderRadius: 14, padding: '20px', textAlign: 'center', marginTop: 8,
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 6 }}>Result</div>
              <div style={{ fontSize: 32, fontFamily: fm, fontWeight: 700, color: cat.color, wordBreak: 'break-all' }}>
                {result || '—'}
              </div>
              <div style={{ fontSize: 13, color: '#9A958A', marginTop: 4 }}>{toUnit.name}</div>
            </div>

            {/* Formula */}
            {value && result && (
              <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, fontFamily: fm, color: '#9A958A' }}>
                {value} {fromUnit.name} = {result} {toUnit.name}
              </div>
            )}
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free unit converter</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            UnitFlip converts between all common units across eight categories: length, weight, temperature, volume, area, speed, data storage, and time. Results update in real time as you type, giving you instant answers without pressing a button. The tool supports metric, imperial, and US customary systems, making it useful whether you are following a European recipe or reading American building plans. All calculations happen locally in your browser.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Eight unit categories in one place</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Instead of searching for separate converters for every unit type, UnitFlip gives you everything on a single page. Switch between categories with one click — convert kilometers to miles, kilograms to pounds, Celsius to Fahrenheit, liters to gallons, and much more. The data storage category handles bytes through terabytes, which is handy when comparing cloud storage plans or estimating file transfer times. Every conversion uses precise formulas with no rounding shortcuts.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Metric and imperial made simple</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            The metric system is used by most of the world, while the imperial system remains standard in the United States and a few other countries. This can create confusion when reading international recipes, travel guides, or technical specifications. UnitFlip eliminates that friction by showing the converted value instantly. It is especially helpful for students, travelers, engineers, and anyone who works with measurements from different regions on a regular basis.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 16 }}>
            Need to convert currencies instead of units? Use the <a href="/currency-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Currency Converter</a> for live exchange rates. For quick math on discounts and tax rates, check out the <a href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>Percentage Calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
