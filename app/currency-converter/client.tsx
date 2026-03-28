'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#059669'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
}

const RATES: Record<string, number> = {
  EUR: 1, USD: 1.08, GBP: 0.86, JPY: 163, CHF: 0.97, CAD: 1.47,
  AUD: 1.65, CNY: 7.80, INR: 90.5, BRL: 5.45, MXN: 18.5,
  KRW: 1430, SEK: 11.2, NOK: 11.5, DKK: 7.46, PLN: 4.32,
  CZK: 25.2, HUF: 395, RON: 4.97, TRY: 35.0, ZAR: 19.8,
  AED: 3.97, SGD: 1.45, HKD: 8.45, NZD: 1.78, THB: 37.5,
  MAD: 10.8, TND: 3.35, XOF: 655.96, XAF: 655.96, RUB: 97.0,
}

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  // Title / subtitle
  titleA: { en: 'Currency', fr: 'Convertisseur', es: 'Conversor', pt: 'Conversor', de: 'Währungs' },
  titleB: { en: 'converter', fr: 'de devises', es: 'de divisas', pt: 'de moedas', de: 'rechner' },
  navTitle: { en: 'Currency Converter', fr: 'Convertisseur de devises', es: 'Conversor de divisas', pt: 'Conversor de moedas', de: 'Währungsrechner' },
  subtitle: {
    en: 'Convert between 30+ world currencies instantly.',
    fr: 'Convertissez instantanément entre plus de 30 devises mondiales.',
    es: 'Convierte entre más de 30 divisas mundiales al instante.',
    pt: 'Converta instantaneamente entre mais de 30 moedas mundiais.',
    de: 'Rechnen Sie sofort zwischen über 30 Weltwährungen um.',
  },

  // Swap button
  swapTitle: { en: 'Swap currencies', fr: 'Inverser les devises', es: 'Intercambiar divisas', pt: 'Trocar moedas', de: 'Währungen tauschen' },

  // Rate labels
  rateLabel: { en: 'Rate', fr: 'Taux', es: 'Tasa', pt: 'Taxa', de: 'Kurs' },
  inverseRate: { en: 'Inverse Rate', fr: 'Taux inversé', es: 'Tasa inversa', pt: 'Taxa inversa', de: 'Umgekehrter Kurs' },

  // Disclaimer
  disclaimer: {
    en: 'Exchange rates are approximate. Last updated: March 2026. For real-time rates, check your bank.',
    fr: 'Les taux de change sont approximatifs. Dernière mise à jour : mars 2026. Pour les taux en temps réel, consultez votre banque.',
    es: 'Los tipos de cambio son aproximados. Última actualización: marzo 2026. Para tipos en tiempo real, consulte su banco.',
    pt: 'As taxas de câmbio são aproximadas. Última atualização: março de 2026. Para taxas em tempo real, consulte seu banco.',
    de: 'Wechselkurse sind Näherungswerte. Letzte Aktualisierung: März 2026. Für Echtzeitkurse wenden Sie sich an Ihre Bank.',
  },

  // Currency names
  EUR: { en: 'Euro', fr: 'Euro', es: 'Euro', pt: 'Euro', de: 'Euro' },
  USD: { en: 'US Dollar', fr: 'Dollar américain', es: 'Dólar estadounidense', pt: 'Dólar americano', de: 'US-Dollar' },
  GBP: { en: 'British Pound', fr: 'Livre sterling', es: 'Libra esterlina', pt: 'Libra esterlina', de: 'Britisches Pfund' },
  JPY: { en: 'Japanese Yen', fr: 'Yen japonais', es: 'Yen japonés', pt: 'Iene japonês', de: 'Japanischer Yen' },
  CHF: { en: 'Swiss Franc', fr: 'Franc suisse', es: 'Franco suizo', pt: 'Franco suíço', de: 'Schweizer Franken' },
  CAD: { en: 'Canadian Dollar', fr: 'Dollar canadien', es: 'Dólar canadiense', pt: 'Dólar canadense', de: 'Kanadischer Dollar' },
  AUD: { en: 'Australian Dollar', fr: 'Dollar australien', es: 'Dólar australiano', pt: 'Dólar australiano', de: 'Australischer Dollar' },
  CNY: { en: 'Chinese Yuan', fr: 'Yuan chinois', es: 'Yuan chino', pt: 'Yuan chinês', de: 'Chinesischer Yuan' },
  INR: { en: 'Indian Rupee', fr: 'Roupie indienne', es: 'Rupia india', pt: 'Rupia indiana', de: 'Indische Rupie' },
  BRL: { en: 'Brazilian Real', fr: 'Réal brésilien', es: 'Real brasileño', pt: 'Real brasileiro', de: 'Brasilianischer Real' },
  MXN: { en: 'Mexican Peso', fr: 'Peso mexicain', es: 'Peso mexicano', pt: 'Peso mexicano', de: 'Mexikanischer Peso' },
  KRW: { en: 'South Korean Won', fr: 'Won sud-coréen', es: 'Won surcoreano', pt: 'Won sul-coreano', de: 'Südkoreanischer Won' },
  SEK: { en: 'Swedish Krona', fr: 'Couronne suédoise', es: 'Corona sueca', pt: 'Coroa sueca', de: 'Schwedische Krone' },
  NOK: { en: 'Norwegian Krone', fr: 'Couronne norvégienne', es: 'Corona noruega', pt: 'Coroa norueguesa', de: 'Norwegische Krone' },
  DKK: { en: 'Danish Krone', fr: 'Couronne danoise', es: 'Corona danesa', pt: 'Coroa dinamarquesa', de: 'Dänische Krone' },
  PLN: { en: 'Polish Zloty', fr: 'Zloty polonais', es: 'Zloty polaco', pt: 'Zloty polonês', de: 'Polnischer Zloty' },
  CZK: { en: 'Czech Koruna', fr: 'Couronne tchèque', es: 'Corona checa', pt: 'Coroa tcheca', de: 'Tschechische Krone' },
  HUF: { en: 'Hungarian Forint', fr: 'Forint hongrois', es: 'Florín húngaro', pt: 'Florim húngaro', de: 'Ungarischer Forint' },
  RON: { en: 'Romanian Leu', fr: 'Leu roumain', es: 'Leu rumano', pt: 'Leu romeno', de: 'Rumänischer Leu' },
  TRY: { en: 'Turkish Lira', fr: 'Livre turque', es: 'Lira turca', pt: 'Lira turca', de: 'Türkische Lira' },
  ZAR: { en: 'South African Rand', fr: 'Rand sud-africain', es: 'Rand sudafricano', pt: 'Rand sul-africano', de: 'Südafrikanischer Rand' },
  AED: { en: 'UAE Dirham', fr: 'Dirham des EAU', es: 'Dírham de los EAU', pt: 'Dirham dos EAU', de: 'VAE-Dirham' },
  SGD: { en: 'Singapore Dollar', fr: 'Dollar de Singapour', es: 'Dólar de Singapur', pt: 'Dólar de Singapura', de: 'Singapur-Dollar' },
  HKD: { en: 'Hong Kong Dollar', fr: 'Dollar de Hong Kong', es: 'Dólar de Hong Kong', pt: 'Dólar de Hong Kong', de: 'Hongkong-Dollar' },
  NZD: { en: 'New Zealand Dollar', fr: 'Dollar néo-zélandais', es: 'Dólar neozelandés', pt: 'Dólar neozelandês', de: 'Neuseeland-Dollar' },
  THB: { en: 'Thai Baht', fr: 'Baht thaïlandais', es: 'Baht tailandés', pt: 'Baht tailandês', de: 'Thailändischer Baht' },
  MAD: { en: 'Moroccan Dirham', fr: 'Dirham marocain', es: 'Dírham marroquí', pt: 'Dirham marroquino', de: 'Marokkanischer Dirham' },
  TND: { en: 'Tunisian Dinar', fr: 'Dinar tunisien', es: 'Dinar tunecino', pt: 'Dinar tunisiano', de: 'Tunesischer Dinar' },
  XOF: { en: 'West African CFA', fr: 'Franc CFA ouest-africain', es: 'Franco CFA de África Occidental', pt: 'Franco CFA da África Ocidental', de: 'Westafrikanischer CFA-Franc' },
  XAF: { en: 'Central African CFA', fr: 'Franc CFA d\'Afrique centrale', es: 'Franco CFA de África Central', pt: 'Franco CFA da África Central', de: 'Zentralafrikanischer CFA-Franc' },
  RUB: { en: 'Russian Ruble', fr: 'Rouble russe', es: 'Rublo ruso', pt: 'Rublo russo', de: 'Russischer Rubel' },

  // SEO
  seoH2: {
    en: 'Free currency converter',
    fr: 'Convertisseur de devises gratuit',
    es: 'Conversor de divisas gratuito',
    pt: 'Conversor de moedas gratuito',
    de: 'Kostenloser Währungsrechner',
  },
  seoP1: {
    en: 'Our currency converter lets you quickly convert between more than 30 world currencies including EUR, USD, GBP, JPY, CHF, CAD, AUD, and many others. Enter an amount, select the source and target currencies, and see the converted value along with both the direct and inverse exchange rates. The swap button makes it easy to reverse the conversion direction with a single click.',
    fr: 'Notre convertisseur de devises vous permet de convertir rapidement entre plus de 30 monnaies mondiales, dont l\'EUR, l\'USD, la GBP, le JPY, le CHF, le CAD, l\'AUD et bien d\'autres. Saisissez un montant, sélectionnez les devises source et cible, puis consultez la valeur convertie ainsi que les taux de change direct et inversé. Le bouton d\'inversion permet de changer le sens de la conversion en un seul clic.',
    es: 'Nuestro conversor de divisas le permite convertir rápidamente entre más de 30 monedas mundiales, incluidas EUR, USD, GBP, JPY, CHF, CAD, AUD y muchas otras. Introduzca un importe, seleccione las divisas de origen y destino, y vea el valor convertido junto con los tipos de cambio directo e inverso. El botón de intercambio facilita invertir la dirección de la conversión con un solo clic.',
    pt: 'Nosso conversor de moedas permite converter rapidamente entre mais de 30 moedas mundiais, incluindo EUR, USD, GBP, JPY, CHF, CAD, AUD e muitas outras. Insira um valor, selecione as moedas de origem e destino, e veja o valor convertido junto com as taxas de câmbio direta e inversa. O botão de troca facilita a inversão da direção da conversão com um único clique.',
    de: 'Unser Währungsrechner ermöglicht die schnelle Umrechnung zwischen über 30 Weltwährungen, darunter EUR, USD, GBP, JPY, CHF, CAD, AUD und viele weitere. Geben Sie einen Betrag ein, wählen Sie Ausgangs- und Zielwährung und sehen Sie den umgerechneten Wert sowie den direkten und inversen Wechselkurs. Die Tausch-Schaltfläche ermöglicht es, die Umrechnungsrichtung mit einem einzigen Klick umzukehren.',
  },
  seoH3a: {
    en: 'Supported currencies and exchange rates',
    fr: 'Devises prises en charge et taux de change',
    es: 'Divisas admitidas y tipos de cambio',
    pt: 'Moedas suportadas e taxas de câmbio',
    de: 'Unterstützte Währungen und Wechselkurse',
  },
  seoP2: {
    en: 'The converter covers major currencies from every continent, from the US Dollar and Euro to the South African Rand, Thai Baht, and West African CFA Franc. Exchange rates are approximate and updated periodically. For large transactions or time-sensitive conversions, always confirm the live rate with your bank or financial institution before proceeding.',
    fr: 'Le convertisseur couvre les principales devises de chaque continent, du dollar américain et de l\'euro au rand sud-africain, au baht thaïlandais et au franc CFA ouest-africain. Les taux de change sont approximatifs et mis à jour périodiquement. Pour les transactions importantes ou les conversions urgentes, confirmez toujours le taux en vigueur auprès de votre banque ou établissement financier.',
    es: 'El conversor cubre las principales divisas de todos los continentes, desde el dólar estadounidense y el euro hasta el rand sudafricano, el baht tailandés y el franco CFA de África Occidental. Los tipos de cambio son aproximados y se actualizan periódicamente. Para transacciones importantes o conversiones urgentes, confirme siempre el tipo vigente con su banco o entidad financiera.',
    pt: 'O conversor abrange as principais moedas de todos os continentes, do dólar americano e euro ao rand sul-africano, baht tailandês e franco CFA da África Ocidental. As taxas de câmbio são aproximadas e atualizadas periodicamente. Para transações de grande valor ou conversões urgentes, confirme sempre a taxa vigente com seu banco ou instituição financeira.',
    de: 'Der Rechner deckt die wichtigsten Währungen aller Kontinente ab — vom US-Dollar und Euro bis zum Südafrikanischen Rand, Thailändischen Baht und Westafrikanischen CFA-Franc. Die Wechselkurse sind Näherungswerte und werden regelmäßig aktualisiert. Bei größeren Transaktionen oder zeitkritischen Umrechnungen sollten Sie den aktuellen Kurs immer bei Ihrer Bank oder Ihrem Finanzinstitut bestätigen.',
  },
  seoH3b: {
    en: 'When to use a currency converter',
    fr: 'Quand utiliser un convertisseur de devises',
    es: 'Cuándo usar un conversor de divisas',
    pt: 'Quando usar um conversor de moedas',
    de: 'Wann einen Währungsrechner verwenden',
  },
  seoP3: {
    en: 'Whether you are planning travel, shopping from an international website, sending money abroad, or comparing prices across markets, a quick currency conversion saves time and prevents costly mistakes. This tool runs entirely in your browser with no signup required, making it ideal for fast estimates whenever you need them.',
    fr: 'Que vous planifiiez un voyage, fassiez des achats sur un site international, envoyiez de l\'argent à l\'étranger ou compariez des prix sur différents marchés, une conversion rapide de devises vous fait gagner du temps et évite les erreurs coûteuses. Cet outil fonctionne entièrement dans votre navigateur sans inscription, idéal pour des estimations rapides à tout moment.',
    es: 'Ya sea que esté planificando un viaje, comprando en un sitio web internacional, enviando dinero al extranjero o comparando precios en distintos mercados, una conversión rápida de divisas ahorra tiempo y evita errores costosos. Esta herramienta funciona íntegramente en su navegador sin necesidad de registro, ideal para estimaciones rápidas en cualquier momento.',
    pt: 'Seja para planejar uma viagem, comprar em um site internacional, enviar dinheiro para o exterior ou comparar preços em diferentes mercados, uma conversão rápida de moedas economiza tempo e evita erros custosos. Esta ferramenta funciona inteiramente no seu navegador sem necessidade de cadastro, ideal para estimativas rápidas a qualquer momento.',
    de: 'Ob Sie eine Reise planen, auf einer internationalen Website einkaufen, Geld ins Ausland senden oder Preise auf verschiedenen Märkten vergleichen — eine schnelle Währungsumrechnung spart Zeit und verhindert kostspielige Fehler. Dieses Tool läuft vollständig in Ihrem Browser ohne Anmeldung und ist ideal für schnelle Schätzungen, wann immer Sie sie benötigen.',
  },
  seoCross: {
    en: 'Dealing with international invoices? Our <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">VAT calculator</a> handles sales tax across countries. For general number crunching, the <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">percentage calculator</a> is always useful.',
    fr: 'Vous gérez des factures internationales ? Notre <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de TVA</a> gère les taxes de vente dans différents pays. Pour les calculs courants, le <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de pourcentage</a> est toujours utile.',
    es: '¿Trabaja con facturas internacionales? Nuestra <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de IVA</a> gestiona impuestos de venta en distintos países. Para cálculos generales, la <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de porcentajes</a> siempre resulta útil.',
    pt: 'Lida com faturas internacionais? Nossa <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de IVA</a> gerencia impostos sobre vendas em diferentes países. Para cálculos gerais, a <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de porcentagem</a> é sempre útil.',
    de: 'Arbeiten Sie mit internationalen Rechnungen? Unser <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">Mehrwertsteuerrechner</a> berechnet Umsatzsteuer länderübergreifend. Für allgemeine Berechnungen ist der <a href="/percentage-calculator" style="color:#FF6B35;text-decoration:underline">Prozentrechner</a> immer nützlich.',
  },
}

const currencies = Object.keys(RATES)

export default function CurrencyClient({
  defaultAmount,
  defaultFrom,
  defaultTo,
  locale = 'en' as Locale,
}: {
  defaultAmount?: number
  defaultFrom?: string
  defaultTo?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const fmtResult = (n: number): string => {
    if (Math.abs(n) >= 1) {
      return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 4, maximumFractionDigits: 6 })
  }

  const fmtRate = (n: number): string => {
    if (n >= 100) return n.toFixed(2)
    if (n >= 1) return n.toFixed(4)
    return n.toFixed(6)
  }

  const [amount, setAmount] = useState(defaultAmount ?? 100)
  const [from, setFrom] = useState(defaultFrom ?? 'EUR')
  const [to, setTo] = useState(defaultTo ?? 'USD')

  const results = useMemo(() => {
    if (!RATES[from] || !RATES[to] || amount <= 0) return null

    const converted = amount / RATES[from] * RATES[to]
    const rate = RATES[to] / RATES[from]
    const inverseRate = RATES[from] / RATES[to]

    return { converted, rate, inverseRate }
  }, [amount, from, to])

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <ToolShell name={lt('navTitle')} icon="💱" currentPath="/currency-converter" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>💱</div>
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
            {/* Amount */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{t('amount', locale)}</label>
              <input
                type="number" value={amount} min={0} step={0.01}
                onChange={e => setAmount(Number(e.target.value))}
                style={{ ...inputStyle, fontSize: 22, fontFamily: fm, fontWeight: 700, padding: '14px 16px' }}
              />
            </div>

            {/* From / Swap / To */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'end' }}>
              <div>
                <label style={labelStyle}>{t('from', locale)}</label>
                <select value={from} onChange={e => setFrom(e.target.value)} style={selectStyle}>
                  {currencies.map(c => (
                    <option key={c} value={c}>{c} — {lt(c)}</option>
                  ))}
                </select>
              </div>

              {/* Swap button */}
              <button
                onClick={handleSwap}
                style={{
                  width: 42, height: 42, borderRadius: 12, border: `1.5px solid ${accent}30`,
                  background: accent + '0A', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 18,
                  color: accent, fontWeight: 700, transition: 'all .2s',
                  marginBottom: 1,
                }}
                title={lt('swapTitle')}
              >
                ⇄
              </button>

              <div>
                <label style={labelStyle}>{t('to', locale)}</label>
                <select value={to} onChange={e => setTo(e.target.value)} style={selectStyle}>
                  {currencies.map(c => (
                    <option key={c} value={c}>{c} — {lt(c)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {results && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            {/* Converted amount */}
            <div style={{
              background: accent + '0A', border: `1.5px solid ${accent}25`,
              borderRadius: 16, padding: 28, textAlign: 'center', marginBottom: 16,
            }}>
              <div style={{ fontSize: 13, color: '#6B6560', marginBottom: 8 }}>
                {fmtResult(amount)} {from} =
              </div>
              <div style={{ fontSize: 42, fontFamily: fm, fontWeight: 700, color: accent, lineHeight: 1.1 }}>
                {fmtResult(results.converted)}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: accent, marginTop: 4 }}>
                {to}
              </div>
            </div>

            {/* Rates */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('rateLabel')}</div>
                <div style={{ fontSize: 16, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  1 {from} = {fmtRate(results.rate)} {to}
                </div>
              </div>
              <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('inverseRate')}</div>
                <div style={{ fontSize: 16, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                  1 {to} = {fmtRate(results.inverseRate)} {from}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '12px 16px', borderRadius: 10,
              background: '#FEF3C7', border: '1px solid #FDE68A', fontSize: 12, color: '#92400E', lineHeight: 1.6,
            }}>
              {lt('disclaimer')}
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP1')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP2')}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
            {lt('seoP3')}
          </p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }} dangerouslySetInnerHTML={{ __html: lt('seoCross') }} />
        </section>
      </div>
    </ToolShell>
  )
}
