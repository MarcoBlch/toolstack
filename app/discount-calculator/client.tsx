'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#EF4444'

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
  navTitle:     { en: 'Discount Calculator',     fr: 'Calculatrice de remise',       es: 'Calculadora de descuento',    pt: 'Calculadora de desconto',       de: 'Rabattrechner' },
  titleA:       { en: 'Discount',                fr: 'Calculatrice de',              es: 'Calculadora de',              pt: 'Calculadora de',                de: 'Rabatt' },
  titleB:       { en: 'Calculator',              fr: 'remise',                       es: 'descuento',                   pt: 'desconto',                      de: 'Rechner' },
  subtitle:     { en: 'Calculate discounts, find original prices, and stack sale savings.', fr: 'Calculez les remises, trouvez les prix d\'origine et cumulez les économies.', es: 'Calcula descuentos, encuentra precios originales y acumula ahorros.', pt: 'Calcule descontos, encontre preços originais e acumule economias.', de: 'Rabatte berechnen, Originalpreise finden und Ersparnisse stapeln.' },
  modeCalc:     { en: 'Calculate Discount',      fr: 'Calculer la remise',           es: 'Calcular descuento',          pt: 'Calcular desconto',             de: 'Rabatt berechnen' },
  modeFindOrig: { en: 'Find Original Price',     fr: 'Trouver le prix d\'origine',   es: 'Encontrar precio original',   pt: 'Encontrar preço original',      de: 'Originalpreis finden' },
  modeFindPct:  { en: 'Find Discount %',         fr: 'Trouver le % de remise',       es: 'Encontrar % de descuento',    pt: 'Encontrar % de desconto',       de: 'Rabatt % finden' },
  origPrice:    { en: 'Original Price ($)',       fr: 'Prix d\'origine ($)',          es: 'Precio original ($)',         pt: 'Preço original ($)',             de: 'Originalpreis ($)' },
  finalPrice:   { en: 'Final Price ($)',          fr: 'Prix final ($)',               es: 'Precio final ($)',            pt: 'Preço final ($)',                de: 'Endpreis ($)' },
  discountPct:  { en: 'Discount (%)',             fr: 'Remise (%)',                   es: 'Descuento (%)',               pt: 'Desconto (%)',                   de: 'Rabatt (%)' },
  quickDisc:    { en: 'Quick Discount',           fr: 'Remise rapide',                es: 'Descuento rápido',            pt: 'Desconto rápido',                de: 'Schnellrabatt' },
  original:     { en: 'Original',                 fr: 'Original',                     es: 'Original',                   pt: 'Original',                       de: 'Original' },
  finalPriceL:  { en: 'Final Price',              fr: 'Prix final',                   es: 'Precio final',               pt: 'Preço final',                    de: 'Endpreis' },
  youSave:      { en: 'You Save',                 fr: 'Vous économisez',              es: 'Ahorras',                    pt: 'Você economiza',                 de: 'Sie sparen' },
  discount:     { en: 'Discount',                 fr: 'Remise',                       es: 'Descuento',                  pt: 'Desconto',                       de: 'Rabatt' },
  stackTitle:   { en: 'Stack Discounts',          fr: 'Cumul de remises',             es: 'Combinar descuentos',        pt: 'Combinar descontos',             de: 'Rabatte stapeln' },
  stackDesc:    { en: 'See the real total discount when two sales are stacked', fr: 'Voyez la remise totale réelle quand deux soldes se cumulent', es: 'Vea el descuento total real al combinar dos ofertas', pt: 'Veja o desconto total real ao combinar duas promoções', de: 'Sehen Sie den echten Gesamtrabatt bei gestapelten Aktionen' },
  firstDisc:    { en: 'First Discount (%)',       fr: 'Première remise (%)',          es: 'Primer descuento (%)',        pt: 'Primeiro desconto (%)',          de: 'Erster Rabatt (%)' },
  secondDisc:   { en: 'Second Discount (%)',      fr: 'Deuxième remise (%)',          es: 'Segundo descuento (%)',       pt: 'Segundo desconto (%)',           de: 'Zweiter Rabatt (%)' },
  realTotal:    { en: 'Real Total Discount',      fr: 'Remise totale réelle',         es: 'Descuento total real',       pt: 'Desconto total real',            de: 'Echter Gesamtrabatt' },
  howItWorks:   { en: 'How it works:',            fr: 'Comment ça marche :',          es: 'Cómo funciona:',             pt: 'Como funciona:',                 de: 'So funktioniert es:' },
}

type Mode = 'calculate' | 'findOriginal' | 'findPercent'
const quickDiscounts = [10, 15, 20, 25, 30, 40, 50, 70]

function fmt(n: number, locale: Locale): string {
  return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function Client({
  defaultMode,
  defaultOriginal,
  defaultDiscount,
  defaultFinal,
  locale = 'en' as Locale,
}: {
  defaultMode?: string
  defaultOriginal?: number
  defaultDiscount?: number
  defaultFinal?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const modes = [
    { key: 'calculate' as Mode, label: lt('modeCalc') },
    { key: 'findOriginal' as Mode, label: lt('modeFindOrig') },
    { key: 'findPercent' as Mode, label: lt('modeFindPct') },
  ]

  const [mode, setMode] = useState<Mode>((defaultMode as Mode) ?? 'calculate')
  const [originalPrice, setOriginalPrice] = useState(defaultOriginal ?? 100)
  const [discountPct, setDiscountPct] = useState(defaultDiscount ?? 20)
  const [finalPrice, setFinalPrice] = useState(defaultFinal ?? 80)
  const [firstDiscount, setFirstDiscount] = useState(20)
  const [secondDiscount, setSecondDiscount] = useState(10)

  const results = useMemo(() => {
    if (mode === 'calculate') {
      const saved = originalPrice * (discountPct / 100)
      const final_ = originalPrice - saved
      return { originalPrice, finalPrice: final_, saved, discountPct }
    }
    if (mode === 'findOriginal') {
      const original = discountPct < 100 ? finalPrice / (1 - discountPct / 100) : 0
      const saved = original - finalPrice
      return { originalPrice: original, finalPrice, saved, discountPct }
    }
    const pct = originalPrice > 0 ? ((originalPrice - finalPrice) / originalPrice) * 100 : 0
    const saved = originalPrice - finalPrice
    return { originalPrice, finalPrice, saved, discountPct: pct }
  }, [mode, originalPrice, discountPct, finalPrice])

  const stackResult = useMemo(() => {
    const afterFirst = 1 - firstDiscount / 100
    const afterSecond = afterFirst * (1 - secondDiscount / 100)
    const totalDiscount = (1 - afterSecond) * 100
    return { totalDiscount, multiplier: afterSecond }
  }, [firstDiscount, secondDiscount])

  return (
    <ToolShell name={lt('navTitle')} icon="🏷️" currentPath="/discount-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🏷️</div>
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

        {/* Mode tabs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 16px' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {modes.map(m => (
              <button key={m.key} onClick={() => setMode(m.key)} style={{
                padding: '8px 18px', fontSize: 13, fontWeight: 600, fontFamily: fb,
                border: mode === m.key ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                borderRadius: 10, background: mode === m.key ? accent + '12' : '#fff',
                color: mode === m.key ? accent : '#6B6560', cursor: 'pointer', transition: 'all .15s',
              }}>{m.label}</button>
            ))}
          </div>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {mode === 'calculate' && (
                <>
                  <div><label style={labelStyle}>{lt('origPrice')}</label><input type="number" value={originalPrice} min={0} step={1} onChange={e => setOriginalPrice(Number(e.target.value))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>{lt('discountPct')}</label><input type="number" value={discountPct} min={0} max={100} onChange={e => setDiscountPct(Number(e.target.value))} style={inputStyle} /></div>
                </>
              )}
              {mode === 'findOriginal' && (
                <>
                  <div><label style={labelStyle}>{lt('finalPrice')}</label><input type="number" value={finalPrice} min={0} step={1} onChange={e => setFinalPrice(Number(e.target.value))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>{lt('discountPct')}</label><input type="number" value={discountPct} min={0} max={99.99} step={1} onChange={e => setDiscountPct(Number(e.target.value))} style={inputStyle} /></div>
                </>
              )}
              {mode === 'findPercent' && (
                <>
                  <div><label style={labelStyle}>{lt('origPrice')}</label><input type="number" value={originalPrice} min={0} step={1} onChange={e => setOriginalPrice(Number(e.target.value))} style={inputStyle} /></div>
                  <div><label style={labelStyle}>{lt('finalPrice')}</label><input type="number" value={finalPrice} min={0} step={1} onChange={e => setFinalPrice(Number(e.target.value))} style={inputStyle} /></div>
                </>
              )}
            </div>
            {(mode === 'calculate' || mode === 'findOriginal') && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>{lt('quickDisc')}</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {quickDiscounts.map(d => (
                    <button key={d} onClick={() => setDiscountPct(d)} style={{
                      padding: '6px 14px', fontSize: 13, fontWeight: 600, fontFamily: fb,
                      border: discountPct === d ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                      borderRadius: 8, background: discountPct === d ? accent + '12' : '#F5F3EE',
                      color: discountPct === d ? accent : '#6B6560', cursor: 'pointer', transition: 'all .15s',
                    }}>{d}%</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: accent + '0A', border: `1.5px solid ${accent}25`, borderRadius: 16, padding: 28, textAlign: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={labelStyle}>{lt('original')}</div>
                <div style={{ fontSize: 28, fontFamily: fm, fontWeight: 700, color: '#9A958A', textDecoration: 'line-through', textDecorationColor: accent }}>${fmt(results.originalPrice, locale)}</div>
              </div>
              <div style={{ fontSize: 28, color: accent, fontWeight: 300 }}>→</div>
              <div>
                <div style={labelStyle}>{lt('finalPriceL')}</div>
                <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent }}>${fmt(results.finalPrice, locale)}</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('youSave')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#10B981' }}>${fmt(results.saved, locale)}</div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('discount')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: accent }}>{results.discountPct.toFixed(1)}%</div>
            </div>
          </div>
        </section>

        {/* Stack Discounts */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lt('stackTitle')}</h2>
            <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>{lt('stackDesc')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'end', marginBottom: 20 }}>
              <div><label style={labelStyle}>{lt('firstDisc')}</label><input type="number" value={firstDiscount} min={0} max={100} onChange={e => setFirstDiscount(Number(e.target.value))} style={inputStyle} /></div>
              <div style={{ fontSize: 18, color: '#9A958A', fontWeight: 600, paddingBottom: 10 }}>+</div>
              <div><label style={labelStyle}>{lt('secondDisc')}</label><input type="number" value={secondDiscount} min={0} max={100} onChange={e => setSecondDiscount(Number(e.target.value))} style={inputStyle} /></div>
            </div>
            <div style={{ background: accent + '08', border: `1.5px solid ${accent}20`, borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('realTotal')}</div>
              <div style={{ fontSize: 36, fontFamily: fm, fontWeight: 700, color: accent }}>{stackResult.totalDiscount.toFixed(1)}%</div>
              <p style={{ fontSize: 12, color: '#6B6560', marginTop: 8 }}>
                {secondDiscount}% + {firstDiscount}% = {stackResult.totalDiscount.toFixed(1)}% (≠ {firstDiscount + secondDiscount}%)
              </p>
            </div>
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#F5F3EE', borderRadius: 10, fontSize: 13, color: '#6B6560' }}>
              <strong>{lt('howItWorks')}</strong>{' '}
              {(100 - firstDiscount)}% × {(100 - secondDiscount)}% = <strong style={{ color: accent }}>{(stackResult.multiplier * 100).toFixed(1)}%</strong> → {lt('realTotal').toLowerCase()}: <strong style={{ color: accent }}>{stackResult.totalDiscount.toFixed(1)}%</strong>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>Free discount calculator for every sale</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Whether you are shopping on Black Friday, browsing an end-of-season clearance, or comparing deals at different stores, this discount calculator shows you exactly what you will pay and how much you save. Choose from three modes depending on what you already know. Quick-select pills for common discount amounts let you compare savings in a single click.
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>Stack discounts the smart way</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            Many retailers offer stacked discounts: an extra 20 percent off already reduced items. A common mistake is to add the two percentages together. When you take 20 percent off and then another 10 percent off, the true total discount is 28 percent, not 30 percent.
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            Need to work with percentages more generally? Try our <a href="/percentage-calculator" style={{ color: accent, textDecoration: 'underline' }}>percentage calculator</a>. Running a business? Use the <a href="/profit-margin-calculator" style={{ color: accent, textDecoration: 'underline' }}>profit margin calculator</a>.
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
