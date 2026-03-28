'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const accent = '#4338CA'

const labelStyle = {
  fontSize: 11, fontWeight: 600 as const, color: '#9A958A',
  textTransform: 'uppercase' as const, letterSpacing: '.8px',
  display: 'block' as const, marginBottom: 4,
}
const inputStyle = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

type VATPreset = { label: string; rate: number; country: string }

const PRESETS: VATPreset[] = [
  { label: 'France 20%', rate: 20, country: '🇫🇷' },
  { label: 'France 10%', rate: 10, country: '🇫🇷' },
  { label: 'France 5.5%', rate: 5.5, country: '🇫🇷' },
  { label: 'France 2.1%', rate: 2.1, country: '🇫🇷' },
  { label: 'UK 20%', rate: 20, country: '🇬🇧' },
  { label: 'Germany 19%', rate: 19, country: '🇩🇪' },
  { label: 'Spain 21%', rate: 21, country: '🇪🇸' },
  { label: 'Italy 22%', rate: 22, country: '🇮🇹' },
]

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  navTitle: { en: 'VAT Calculator', fr: 'Calculateur de TVA', es: 'Calculadora de IVA', pt: 'Calculadora de IVA', de: 'MwSt-Rechner' },
  titleA: { en: 'VAT / Sales', fr: 'Calculateur de', es: 'Calculadora de', pt: 'Calculadora de', de: 'MwSt /' },
  titleB: { en: 'Tax', fr: 'TVA', es: 'IVA', pt: 'IVA', de: 'Steuer' },
  titleSuffix: { en: 'Calculator', fr: '', es: '', pt: '', de: 'Rechner' },
  subtitle: {
    en: 'Add or remove VAT from any price. Instant results.',
    fr: 'Ajoutez ou retirez la TVA de n\'importe quel prix. Résultats instantanés.',
    es: 'Agregue o retire el IVA de cualquier precio. Resultados instantáneos.',
    pt: 'Adicione ou remova o IVA de qualquer preço. Resultados instantâneos.',
    de: 'MwSt hinzufügen oder entfernen. Sofortige Ergebnisse.',
  },

  mode: { en: 'Mode', fr: 'Mode', es: 'Modo', pt: 'Modo', de: 'Modus' },
  addVat: { en: '+ Add VAT', fr: '+ Ajouter TVA', es: '+ Agregar IVA', pt: '+ Adicionar IVA', de: '+ MwSt hinzufügen' },
  removeVat: { en: '− Remove VAT', fr: '− Retirer TVA', es: '− Quitar IVA', pt: '− Remover IVA', de: '− MwSt entfernen' },
  netPriceLabel: { en: 'Net price (excl. VAT)', fr: 'Prix HT (hors TVA)', es: 'Precio neto (sin IVA)', pt: 'Preço líquido (sem IVA)', de: 'Nettopreis (ohne MwSt)' },
  grossPriceLabel: { en: 'Gross price (incl. VAT)', fr: 'Prix TTC (TVA incluse)', es: 'Precio bruto (con IVA)', pt: 'Preço bruto (com IVA)', de: 'Bruttopreis (inkl. MwSt)' },
  enterAmount: { en: 'Enter amount', fr: 'Saisir le montant', es: 'Ingrese el monto', pt: 'Insira o valor', de: 'Betrag eingeben' },
  vatRate: { en: 'VAT Rate', fr: 'Taux de TVA', es: 'Tasa de IVA', pt: 'Taxa de IVA', de: 'MwSt-Satz' },
  custom: { en: 'Custom', fr: 'Personnalisé', es: 'Personalizado', pt: 'Personalizado', de: 'Benutzerdefiniert' },

  netPriceHT: { en: 'Net price (HT)', fr: 'Prix HT', es: 'Precio neto', pt: 'Preço líquido', de: 'Nettopreis' },
  exclTax: { en: 'excl. tax', fr: 'hors taxe', es: 'sin impuesto', pt: 'sem imposto', de: 'ohne Steuer' },
  vatAmount: { en: 'VAT amount', fr: 'Montant TVA', es: 'Monto IVA', pt: 'Valor IVA', de: 'MwSt-Betrag' },
  tax: { en: 'tax', fr: 'taxe', es: 'impuesto', pt: 'imposto', de: 'Steuer' },
  grossPriceTTC: { en: 'Gross price (TTC)', fr: 'Prix TTC', es: 'Precio bruto', pt: 'Preço bruto', de: 'Bruttopreis' },
  inclTax: { en: 'incl. tax', fr: 'TTC', es: 'con impuesto', pt: 'com imposto', de: 'inkl. Steuer' },
  net: { en: 'Net', fr: 'HT', es: 'Neto', pt: 'Líquido', de: 'Netto' },
  gross: { en: 'Gross', fr: 'TTC', es: 'Bruto', pt: 'Bruto', de: 'Brutto' },

  // SEO
  seoH2: {
    en: 'Free VAT calculator',
    fr: 'Calculateur de TVA gratuit',
    es: 'Calculadora de IVA gratuita',
    pt: 'Calculadora de IVA gratuita',
    de: 'Kostenloser MwSt-Rechner',
  },
  seoP1: {
    en: 'This VAT calculator lets you add or remove value-added tax from any price in seconds. Switch between the two modes depending on whether you are starting with a net price or a gross price that already includes tax. The tool shows the net amount, VAT amount, and gross total side by side, along with a clear visual formula so you can verify the math at a glance.',
    fr: 'Ce calculateur de TVA vous permet d\'ajouter ou de retirer la taxe sur la valeur ajoutée de n\'importe quel prix en quelques secondes. Basculez entre les deux modes selon que vous partez d\'un prix HT ou d\'un prix TTC incluant déjà la taxe. L\'outil affiche le montant HT, le montant de la TVA et le total TTC côte à côte, ainsi qu\'une formule visuelle claire pour vérifier le calcul en un coup d\'œil.',
    es: 'Esta calculadora de IVA le permite agregar o quitar el impuesto al valor agregado de cualquier precio en segundos. Cambie entre los dos modos dependiendo de si parte de un precio neto o un precio bruto que ya incluye impuestos. La herramienta muestra el monto neto, el monto del IVA y el total bruto uno al lado del otro, junto con una fórmula visual clara para que pueda verificar el cálculo de un vistazo.',
    pt: 'Esta calculadora de IVA permite adicionar ou remover o imposto sobre valor agregado de qualquer preço em segundos. Alterne entre os dois modos dependendo se você está começando com um preço líquido ou um preço bruto que já inclui imposto. A ferramenta mostra o valor líquido, o valor do IVA e o total bruto lado a lado, junto com uma fórmula visual clara para que você possa verificar o cálculo rapidamente.',
    de: 'Dieser MwSt-Rechner ermöglicht es Ihnen, die Mehrwertsteuer in Sekundenschnelle zu einem beliebigen Preis hinzuzufügen oder zu entfernen. Wechseln Sie zwischen den beiden Modi, je nachdem, ob Sie mit einem Nettopreis oder einem Bruttopreis beginnen, der bereits Steuer enthält. Das Tool zeigt den Nettobetrag, den MwSt-Betrag und den Bruttobetrag nebeneinander an, zusammen mit einer klaren visuellen Formel, damit Sie die Berechnung auf einen Blick überprüfen können.',
  },
  seoH3a: {
    en: 'Country-specific VAT rates',
    fr: 'Taux de TVA par pays',
    es: 'Tasas de IVA por país',
    pt: 'Taxas de IVA por país',
    de: 'Länderspezifische MwSt-Sätze',
  },
  seoP2: {
    en: 'Pre-set buttons cover the most common VAT rates across Europe, including all four French rates, the UK standard rate, Germany at 19 percent, Spain at 21 percent, and Italy at 22 percent. If your country or rate is not listed, simply type a custom percentage. This flexibility makes the tool useful for freelancers, small businesses, and anyone who handles invoices regularly.',
    fr: 'Les boutons préréglés couvrent les taux de TVA les plus courants en Europe, y compris les quatre taux français, le taux standard du Royaume-Uni, l\'Allemagne à 19 pour cent, l\'Espagne à 21 pour cent et l\'Italie à 22 pour cent. Si votre pays ou votre taux n\'est pas répertorié, saisissez simplement un pourcentage personnalisé. Cette flexibilité rend l\'outil utile pour les freelances, les petites entreprises et toute personne qui gère des factures régulièrement.',
    es: 'Los botones preestablecidos cubren las tasas de IVA más comunes en Europa, incluyendo las cuatro tasas francesas, la tasa estándar del Reino Unido, Alemania al 19 por ciento, España al 21 por ciento e Italia al 22 por ciento. Si su país o tasa no aparece en la lista, simplemente escriba un porcentaje personalizado. Esta flexibilidad hace que la herramienta sea útil para autónomos, pequeñas empresas y cualquier persona que maneje facturas regularmente.',
    pt: 'Os botões predefinidos cobrem as taxas de IVA mais comuns na Europa, incluindo as quatro taxas francesas, a taxa padrão do Reino Unido, Alemanha a 19 por cento, Espanha a 21 por cento e Itália a 22 por cento. Se seu país ou taxa não estiver listado, basta digitar uma porcentagem personalizada. Essa flexibilidade torna a ferramenta útil para freelancers, pequenas empresas e qualquer pessoa que lida com faturas regularmente.',
    de: 'Voreingestellte Schaltflächen decken die gängigsten MwSt-Sätze in Europa ab, einschließlich aller vier französischen Sätze, des britischen Standardsatzes, Deutschlands mit 19 Prozent, Spaniens mit 21 Prozent und Italiens mit 22 Prozent. Wenn Ihr Land oder Satz nicht aufgeführt ist, geben Sie einfach einen benutzerdefinierten Prozentsatz ein. Diese Flexibilität macht das Tool nützlich für Freiberufler, kleine Unternehmen und alle, die regelmäßig Rechnungen bearbeiten.',
  },
  seoH3b: {
    en: 'Understanding VAT and sales tax',
    fr: 'Comprendre la TVA et la taxe de vente',
    es: 'Entendiendo el IVA y el impuesto sobre las ventas',
    pt: 'Entendendo o IVA e o imposto sobre vendas',
    de: 'MwSt und Umsatzsteuer verstehen',
  },
  seoP3: {
    en: 'VAT, known as TVA in France, Mehrwertsteuer in Germany, and IVA in Spain and Italy, is a consumption tax applied at each stage of production. For consumers, it appears as a percentage added to the final price. Knowing how to separate net and gross amounts is important for expense tracking, tax filing, and ensuring your invoices are correctly formatted.',
    fr: 'La TVA, connue sous le nom de Mehrwertsteuer en Allemagne et d\'IVA en Espagne et en Italie, est un impôt à la consommation appliqué à chaque étape de la production. Pour les consommateurs, elle apparaît comme un pourcentage ajouté au prix final. Savoir séparer les montants HT et TTC est important pour le suivi des dépenses, les déclarations fiscales et la mise en forme correcte de vos factures.',
    es: 'El IVA, conocido como TVA en Francia, Mehrwertsteuer en Alemania e IVA en España e Italia, es un impuesto al consumo aplicado en cada etapa de la producción. Para los consumidores, aparece como un porcentaje añadido al precio final. Saber cómo separar los montos netos y brutos es importante para el seguimiento de gastos, la declaración de impuestos y asegurar que sus facturas estén correctamente formateadas.',
    pt: 'O IVA, conhecido como TVA na França, Mehrwertsteuer na Alemanha e IVA na Espanha e Itália, é um imposto sobre o consumo aplicado em cada etapa da produção. Para os consumidores, aparece como uma porcentagem adicionada ao preço final. Saber como separar valores líquidos e brutos é importante para o acompanhamento de despesas, declaração de impostos e garantir que suas faturas estejam formatadas corretamente.',
    de: 'Die MwSt, in Frankreich als TVA und in Spanien und Italien als IVA bekannt, ist eine Verbrauchssteuer, die auf jeder Produktionsstufe erhoben wird. Für Verbraucher erscheint sie als Prozentsatz, der zum Endpreis addiert wird. Zu wissen, wie man Netto- und Bruttobeträge trennt, ist wichtig für die Ausgabenverfolgung, Steuererklärungen und die korrekte Formatierung Ihrer Rechnungen.',
  },
  seoP4: {
    en: 'Need to convert gross salary to net pay? Try the <a>salary calculator</a>. Working with international prices? The <a2>currency converter</a2> handles 30+ currencies.',
    fr: 'Besoin de convertir un salaire brut en salaire net ? Essayez le <a>calculateur de salaire</a>. Vous travaillez avec des prix internationaux ? Le <a2>convertisseur de devises</a2> gère plus de 30 devises.',
    es: '¿Necesita convertir el salario bruto en neto? Pruebe la <a>calculadora de salario</a>. ¿Trabaja con precios internacionales? El <a2>convertidor de divisas</a2> maneja más de 30 monedas.',
    pt: 'Precisa converter salário bruto em líquido? Experimente a <a>calculadora de salário</a>. Trabalhando com preços internacionais? O <a2>conversor de moedas</a2> lida com mais de 30 moedas.',
    de: 'Müssen Sie das Bruttogehalt in Nettogehalt umrechnen? Probieren Sie den <a>Gehaltsrechner</a>. Arbeiten Sie mit internationalen Preisen? Der <a2>Währungsrechner</a2> unterstützt über 30 Währungen.',
  },
}

export default function VATClient({
  defaultPrice,
  defaultRate,
  defaultMode,
  locale = 'en' as Locale,
}: {
  defaultPrice?: number
  defaultRate?: number
  defaultMode?: string
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [mode, setMode] = useState<'add' | 'remove'>(defaultMode === 'remove' ? 'remove' : 'add')
  const [price, setPrice] = useState(defaultPrice?.toString() || '100')
  const [rate, setRate] = useState(defaultRate?.toString() || '20')
  const [customRate, setCustomRate] = useState(false)

  const fmt = (n: number): string => {
    return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const result = useMemo(() => {
    const p = parseFloat(price)
    const r = parseFloat(rate)
    if (isNaN(p) || isNaN(r) || p < 0 || r < 0) return null
    const vatMultiplier = r / 100

    if (mode === 'add') {
      const netPrice = p
      const vatAmount = netPrice * vatMultiplier
      const grossPrice = netPrice + vatAmount
      return { netPrice, vatAmount, grossPrice }
    } else {
      const grossPrice = p
      const netPrice = grossPrice / (1 + vatMultiplier)
      const vatAmount = grossPrice - netPrice
      return { netPrice, vatAmount, grossPrice }
    }
  }, [price, rate, mode])

  const selectPreset = (preset: VATPreset) => {
    setRate(preset.rate.toString())
    setCustomRate(false)
  }

  const enableCustom = () => {
    setCustomRate(true)
  }

  return (
    <ToolShell name={lt('navTitle')} icon="🧾" currentPath="/vat-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🧾</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleA')} <span style={{ color: accent }}>{lt('titleB')}</span>{lt('titleSuffix') ? ` ${lt('titleSuffix')}` : ''}
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Calculator card */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            {/* Mode tabs */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{lt('mode')}</label>
              <div style={{ display: 'flex', gap: 0, borderRadius: 10, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                <button onClick={() => setMode('add')} style={{
                  flex: 1, fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px 16px',
                  cursor: 'pointer', border: 'none',
                  background: mode === 'add' ? accent : '#F5F3EE',
                  color: mode === 'add' ? '#fff' : '#6B6560',
                  transition: 'all .15s',
                }}>{lt('addVat')}</button>
                <button onClick={() => setMode('remove')} style={{
                  flex: 1, fontFamily: fb, fontSize: 14, fontWeight: 700, padding: '12px 16px',
                  cursor: 'pointer', border: 'none', borderLeft: '1.5px solid #E8E4DB',
                  background: mode === 'remove' ? accent : '#F5F3EE',
                  color: mode === 'remove' ? '#fff' : '#6B6560',
                  transition: 'all .15s',
                }}>{lt('removeVat')}</button>
              </div>
            </div>

            {/* Price input */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{mode === 'add' ? lt('netPriceLabel') : lt('grossPriceLabel')}</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder={lt('enterAmount')}
                style={{ ...inputStyle, fontSize: 22, fontFamily: fm, fontWeight: 700, padding: '14px 16px', textAlign: 'center' as const, borderRadius: 12 }}
              />
            </div>

            {/* VAT rate presets */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>{lt('vatRate')}</label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                {PRESETS.map((p, i) => {
                  const isActive = !customRate && rate === p.rate.toString()
                  return (
                    <button key={i} onClick={() => selectPreset(p)} style={{
                      fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 12px',
                      borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                      border: isActive ? `1.5px solid ${accent}` : '1.5px solid #E8E4DB',
                      background: isActive ? accent + '10' : '#fff',
                      color: isActive ? accent : '#6B6560',
                      transition: 'all .15s',
                    }}>
                      <span style={{ fontSize: 12 }}>{p.country}</span> {p.label}
                    </button>
                  )
                })}
                <button onClick={enableCustom} style={{
                  fontFamily: fb, fontSize: 12, fontWeight: 600, padding: '7px 12px',
                  borderRadius: 8, cursor: 'pointer',
                  border: customRate ? `1.5px solid ${accent}` : '1.5px dashed #E8E4DB',
                  background: customRate ? accent + '10' : '#fff',
                  color: customRate ? accent : '#9A958A',
                  transition: 'all .15s',
                }}>
                  {lt('custom')}
                </button>
              </div>

              {/* Custom rate or show current */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="number"
                  value={rate}
                  onChange={e => { setRate(e.target.value); setCustomRate(true) }}
                  onFocus={() => setCustomRate(true)}
                  placeholder="e.g. 20"
                  style={{ ...inputStyle, width: 120, textAlign: 'center' as const, fontFamily: fm, fontWeight: 600 }}
                />
                <span style={{ fontSize: 16, fontWeight: 700, color: '#9A958A' }}>%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {result && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {/* Net price */}
              <div style={{
                background: mode === 'add' ? '#F5F3EE' : '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('netPriceHT')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: mode === 'remove' ? accent : '#1C1B18' }}>
                  {fmt(result.netPrice)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('exclTax')}</div>
              </div>

              {/* VAT amount */}
              <div style={{
                background: '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('vatAmount')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>
                  {fmt(result.vatAmount)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{rate}% {lt('tax')}</div>
              </div>

              {/* Gross price */}
              <div style={{
                background: mode === 'remove' ? '#F5F3EE' : '#fff',
                borderRadius: 14, border: '1.5px solid #E8E4DB', padding: '22px 16px', textAlign: 'center',
              }}>
                <div style={labelStyle}>{lt('grossPriceTTC')}</div>
                <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: mode === 'add' ? accent : '#1C1B18' }}>
                  {fmt(result.grossPrice)}
                </div>
                <div style={{ fontSize: 11, color: '#9A958A', marginTop: 2 }}>{lt('inclTax')}</div>
              </div>
            </div>

            {/* Visual formula */}
            <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #E8E4DB', padding: 20, marginTop: 16, textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: accent + '10', border: `1px solid ${accent}30` }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>{lt('net')}</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: accent }}>{fmt(result.netPrice)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>+</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#FEF3C7', border: '1px solid #F5E6B8' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>VAT ({rate}%)</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#D97706' }}>{fmt(result.vatAmount)}</div>
                </div>
                <span style={{ fontSize: 20, color: '#9A958A', fontWeight: 700 }}>=</span>
                <div style={{ padding: '8px 16px', borderRadius: 8, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: 10, color: '#9A958A', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '.5px' }}>{lt('gross')}</div>
                  <div style={{ fontSize: 18, fontFamily: fm, fontWeight: 700, color: '#16A34A' }}>{fmt(result.grossPrice)}</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEO text */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP1')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP2')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP3')}</p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            {lt('seoP4').split(/<a>|<\/a>|<a2>|<\/a2>/).map((part, i) => {
              if (i === 1) return <a key={i} href="/salary-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              if (i === 3) return <a key={i} href="/currency-converter" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              return <span key={i}>{part}</span>
            })}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
