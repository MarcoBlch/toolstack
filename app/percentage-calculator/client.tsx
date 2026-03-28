'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#D97706'

const labelStyle: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
  letterSpacing: '.8px', display: 'block', marginBottom: 4,
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8,
  padding: '10px 12px', fontSize: 14, fontFamily: fb, color: '#1C1B18',
  background: '#F5F3EE', outline: 'none',
}

type Mode = 'whatIs' | 'whatPercent' | 'change'

const presets = [5, 10, 15, 20, 25, 33, 50, 75]

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  // Title / subtitle
  titleA: { en: 'Percentage', fr: 'Calculateur', es: 'Calculadora', pt: 'Calculadora', de: 'Prozent' },
  titleB: { en: 'calculator', fr: 'de pourcentage', es: 'de porcentajes', pt: 'de porcentagem', de: 'rechner' },
  navTitle: { en: 'Percentage Calculator', fr: 'Calculateur de pourcentage', es: 'Calculadora de porcentajes', pt: 'Calculadora de porcentagem', de: 'Prozentrechner' },
  subtitle: {
    en: 'Calculate percentages instantly with three different modes.',
    fr: 'Calculez des pourcentages instantanément avec trois modes différents.',
    es: 'Calcule porcentajes al instante con tres modos diferentes.',
    pt: 'Calcule porcentagens instantaneamente com três modos diferentes.',
    de: 'Berechnen Sie Prozentsätze sofort mit drei verschiedenen Modi.',
  },

  // Mode tab labels
  modeWhatIs: { en: 'What is X% of Y?', fr: 'Combien font X% de Y ?', es: '¿Cuánto es X% de Y?', pt: 'Quanto é X% de Y?', de: 'Was ist X% von Y?' },
  modeWhatPercent: { en: 'X is what % of Y?', fr: 'X est quel % de Y ?', es: '¿X es qué % de Y?', pt: 'X é qual % de Y?', de: 'X ist welcher % von Y?' },
  modeChange: { en: '% change from X to Y', fr: '% de variation de X à Y', es: '% de cambio de X a Y', pt: '% de variação de X para Y', de: '% Änderung von X nach Y' },

  // Input labels
  percentageX: { en: 'Percentage (X)', fr: 'Pourcentage (X)', es: 'Porcentaje (X)', pt: 'Porcentagem (X)', de: 'Prozentsatz (X)' },
  valueX: { en: 'Value (X)', fr: 'Valeur (X)', es: 'Valor (X)', pt: 'Valor (X)', de: 'Wert (X)' },
  oldValueX: { en: 'Old Value (X)', fr: 'Ancienne valeur (X)', es: 'Valor antiguo (X)', pt: 'Valor antigo (X)', de: 'Alter Wert (X)' },
  numberY: { en: 'Number (Y)', fr: 'Nombre (Y)', es: 'Número (Y)', pt: 'Número (Y)', de: 'Zahl (Y)' },
  totalY: { en: 'Total (Y)', fr: 'Total (Y)', es: 'Total (Y)', pt: 'Total (Y)', de: 'Gesamt (Y)' },
  newValueY: { en: 'New Value (Y)', fr: 'Nouvelle valeur (Y)', es: 'Valor nuevo (Y)', pt: 'Valor novo (Y)', de: 'Neuer Wert (Y)' },

  // Quick presets
  quickPresets: { en: 'Quick Presets', fr: 'Préréglages rapides', es: 'Preajustes rápidos', pt: 'Predefinições rápidas', de: 'Schnellauswahl' },

  // Result labels (with placeholders)
  resultWhatIs: { en: '{x}% of {y} is', fr: '{x}% de {y} font', es: '{x}% de {y} es', pt: '{x}% de {y} é', de: '{x}% von {y} ist' },
  resultWhatPercent: { en: '{x} is this % of {y}', fr: '{x} est ce % de {y}', es: '{x} es este % de {y}', pt: '{x} é esta % de {y}', de: '{x} ist dieser % von {y}' },
  resultChange: { en: 'Change from {x} to {y}', fr: 'Variation de {x} à {y}', es: 'Cambio de {x} a {y}', pt: 'Variação de {x} para {y}', de: 'Änderung von {x} nach {y}' },

  // SEO
  seoH2: {
    en: 'Free percentage calculator',
    fr: 'Calculateur de pourcentage gratuit',
    es: 'Calculadora de porcentajes gratuita',
    pt: 'Calculadora de porcentagem gratuita',
    de: 'Kostenloser Prozentrechner',
  },
  seoP1: {
    en: 'This percentage calculator handles the three most common percentage questions in one tool. Use the first mode to find what a specific percentage of any number is, the second mode to determine what proportion one number is of another, and the third mode to calculate the percentage change between two values. Quick preset buttons let you tap common percentages without typing.',
    fr: 'Ce calculateur de pourcentage répond aux trois questions les plus courantes sur les pourcentages en un seul outil. Utilisez le premier mode pour trouver combien représente un pourcentage donné d\'un nombre, le deuxième mode pour déterminer quelle proportion un nombre représente d\'un autre, et le troisième mode pour calculer la variation en pourcentage entre deux valeurs. Les boutons de préréglage rapides vous permettent de sélectionner les pourcentages courants sans saisie.',
    es: 'Esta calculadora de porcentajes resuelve las tres preguntas más comunes sobre porcentajes en una sola herramienta. Use el primer modo para averiguar cuánto representa un porcentaje de cualquier número, el segundo modo para determinar qué proporción es un número de otro, y el tercer modo para calcular el cambio porcentual entre dos valores. Los botones de preajustes rápidos le permiten seleccionar porcentajes comunes sin escribir.',
    pt: 'Esta calculadora de porcentagem resolve as três perguntas mais comuns sobre porcentagens em uma única ferramenta. Use o primeiro modo para descobrir quanto representa uma porcentagem de qualquer número, o segundo modo para determinar qual proporção um número é de outro, e o terceiro modo para calcular a variação percentual entre dois valores. Os botões de predefinições rápidas permitem selecionar porcentagens comuns sem digitar.',
    de: 'Dieser Prozentrechner beantwortet die drei häufigsten Prozentfragen in einem einzigen Tool. Verwenden Sie den ersten Modus, um einen bestimmten Prozentsatz einer Zahl zu berechnen, den zweiten Modus, um zu bestimmen, welchen Anteil eine Zahl von einer anderen darstellt, und den dritten Modus, um die prozentuale Veränderung zwischen zwei Werten zu berechnen. Die Schnellauswahl-Schaltflächen ermöglichen die Auswahl gängiger Prozentsätze ohne Eingabe.',
  },
  seoH3a: {
    en: 'Everyday percentage math',
    fr: 'Calculs de pourcentage au quotidien',
    es: 'Matemáticas de porcentajes en el día a día',
    pt: 'Matemática de porcentagem no dia a dia',
    de: 'Prozentrechnung im Alltag',
  },
  seoP2: {
    en: 'Percentages come up constantly in daily life: calculating discounts while shopping, figuring out how much to tip, understanding interest rates on loans, or tracking the growth of your savings. Rather than pulling out a formula each time, this calculator gives you instant answers. Just pick your mode, enter two numbers, and the result appears immediately.',
    fr: 'Les pourcentages reviennent constamment dans la vie quotidienne : calculer des réductions lors d\'achats, déterminer le montant d\'un pourboire, comprendre les taux d\'intérêt d\'un prêt ou suivre la croissance de votre épargne. Plutôt que de chercher une formule à chaque fois, ce calculateur vous donne des réponses instantanées. Choisissez votre mode, entrez deux nombres, et le résultat s\'affiche immédiatement.',
    es: 'Los porcentajes aparecen constantemente en la vida diaria: calcular descuentos al comprar, determinar cuánto dejar de propina, entender tasas de interés de préstamos o seguir el crecimiento de sus ahorros. En lugar de buscar una fórmula cada vez, esta calculadora le da respuestas instantáneas. Solo elija su modo, introduzca dos números, y el resultado aparece de inmediato.',
    pt: 'Porcentagens aparecem constantemente no dia a dia: calcular descontos nas compras, descobrir quanto deixar de gorjeta, entender taxas de juros de empréstimos ou acompanhar o crescimento das suas economias. Em vez de recorrer a uma fórmula toda vez, esta calculadora fornece respostas instantâneas. Basta escolher o modo, inserir dois números, e o resultado aparece imediatamente.',
    de: 'Prozentrechnung begegnet uns ständig im Alltag: Rabatte beim Einkaufen berechnen, Trinkgeld bestimmen, Zinssätze bei Krediten verstehen oder das Wachstum Ihrer Ersparnisse verfolgen. Statt jedes Mal eine Formel hervorzuholen, liefert Ihnen dieser Rechner sofortige Antworten. Wählen Sie Ihren Modus, geben Sie zwei Zahlen ein, und das Ergebnis erscheint sofort.',
  },
  seoH3b: {
    en: 'Percentage change vs. percentage difference',
    fr: 'Variation en pourcentage vs. différence en pourcentage',
    es: 'Cambio porcentual vs. diferencia porcentual',
    pt: 'Variação percentual vs. diferença percentual',
    de: 'Prozentuale Veränderung vs. prozentuale Differenz',
  },
  seoP3: {
    en: 'Percentage change measures how much a value has increased or decreased relative to its original amount. A positive result means growth, while a negative result indicates a decline. This is especially useful for tracking price changes, investment returns, or comparing performance metrics over different time periods in a clear and standardized way.',
    fr: 'La variation en pourcentage mesure de combien une valeur a augmenté ou diminué par rapport à son montant initial. Un résultat positif signifie une croissance, tandis qu\'un résultat négatif indique une baisse. Ceci est particulièrement utile pour suivre les variations de prix, les rendements d\'investissement ou comparer des indicateurs de performance sur différentes périodes de manière claire et standardisée.',
    es: 'El cambio porcentual mide cuánto ha aumentado o disminuido un valor respecto a su cantidad original. Un resultado positivo significa crecimiento, mientras que uno negativo indica una disminución. Es especialmente útil para seguir cambios de precios, rendimientos de inversiones o comparar métricas de rendimiento en diferentes períodos de manera clara y estandarizada.',
    pt: 'A variação percentual mede quanto um valor aumentou ou diminuiu em relação ao seu valor original. Um resultado positivo significa crescimento, enquanto um resultado negativo indica declínio. Isso é especialmente útil para acompanhar mudanças de preços, retornos de investimentos ou comparar métricas de desempenho em diferentes períodos de forma clara e padronizada.',
    de: 'Die prozentuale Veränderung misst, um wie viel ein Wert im Vergleich zu seinem ursprünglichen Betrag gestiegen oder gesunken ist. Ein positives Ergebnis bedeutet Wachstum, ein negatives zeigt einen Rückgang an. Dies ist besonders nützlich, um Preisänderungen, Anlagerenditen oder Leistungskennzahlen über verschiedene Zeiträume hinweg klar und standardisiert zu vergleichen.',
  },
  seoCross: {
    en: 'Need to apply percentages to real financial scenarios? Try the <a href="/mortgage-calculator" style="color:#FF6B35;text-decoration:underline">mortgage calculator</a> for home loan math, the <a href="/tip-calculator" style="color:#FF6B35;text-decoration:underline">tip calculator</a> for restaurant bills, or the <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">VAT calculator</a> for sales tax.',
    fr: 'Besoin d\'appliquer des pourcentages à des scénarios financiers réels ? Essayez le <a href="/mortgage-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de prêt immobilier</a> pour les crédits, le <a href="/tip-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de pourboire</a> pour les additions au restaurant, ou le <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">calculateur de TVA</a> pour les taxes de vente.',
    es: '¿Necesita aplicar porcentajes a escenarios financieros reales? Pruebe la <a href="/mortgage-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de hipotecas</a> para préstamos inmobiliarios, la <a href="/tip-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de propinas</a> para cuentas de restaurante, o la <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de IVA</a> para impuestos sobre ventas.',
    pt: 'Precisa aplicar porcentagens a cenários financeiros reais? Experimente a <a href="/mortgage-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de hipoteca</a> para financiamento imobiliário, a <a href="/tip-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de gorjeta</a> para contas de restaurante, ou a <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">calculadora de IVA</a> para impostos sobre vendas.',
    de: 'Müssen Sie Prozentsätze auf reale Finanzszenarien anwenden? Probieren Sie den <a href="/mortgage-calculator" style="color:#FF6B35;text-decoration:underline">Hypothekenrechner</a> für Immobilienkredite, den <a href="/tip-calculator" style="color:#FF6B35;text-decoration:underline">Trinkgeldrechner</a> für Restaurantrechnungen oder den <a href="/vat-calculator" style="color:#FF6B35;text-decoration:underline">Mehrwertsteuerrechner</a> für die Umsatzsteuer.',
  },
}

export default function PercentageClient({
  defaultMode,
  defaultX,
  defaultY,
  locale = 'en' as Locale,
}: {
  defaultMode?: string
  defaultX?: number
  defaultY?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const modes: { key: Mode; label: string }[] = [
    { key: 'whatIs', label: lt('modeWhatIs') },
    { key: 'whatPercent', label: lt('modeWhatPercent') },
    { key: 'change', label: lt('modeChange') },
  ]

  const [mode, setMode] = useState<Mode>((defaultMode as Mode) ?? 'whatIs')
  const [x, setX] = useState(defaultX ?? 10)
  const [y, setY] = useState(defaultY ?? 200)

  const result = useMemo(() => {
    if (mode === 'whatIs') {
      return (x / 100) * y
    }
    if (mode === 'whatPercent') {
      if (y === 0) return 0
      return (x / y) * 100
    }
    // change
    if (x === 0) return 0
    return ((y - x) / Math.abs(x)) * 100
  }, [mode, x, y])

  const resultLabel = useMemo(() => {
    if (mode === 'whatIs') return lt('resultWhatIs').replace('{x}', String(x)).replace('{y}', String(y))
    if (mode === 'whatPercent') return lt('resultWhatPercent').replace('{x}', String(x)).replace('{y}', String(y))
    return lt('resultChange').replace('{x}', String(x)).replace('{y}', String(y))
  }, [mode, x, y, locale])

  const formatResult = (val: number) => {
    const s = val % 1 === 0 ? val.toString() : val.toFixed(4).replace(/0+$/, '').replace(/\.$/, '')
    if (mode === 'change') {
      return (val >= 0 ? '+' : '') + s + '%'
    }
    if (mode === 'whatPercent') {
      return s + '%'
    }
    return s
  }

  const xLabel = mode === 'whatIs' ? lt('percentageX') : mode === 'whatPercent' ? lt('valueX') : lt('oldValueX')
  const yLabel = mode === 'whatIs' ? lt('numberY') : mode === 'whatPercent' ? lt('totalY') : lt('newValueY')

  return (
    <ToolShell name={lt('navTitle')} icon="%" currentPath="/percentage-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>%</div>
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
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  flex: 1,
                  minWidth: 140,
                  padding: '10px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: fb,
                  border: mode === m.key ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                  borderRadius: 10,
                  background: mode === m.key ? accent + '0F' : '#fff',
                  color: mode === m.key ? accent : '#6B6560',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{xLabel}</label>
                <input
                  type="number"
                  value={x}
                  onChange={e => setX(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{yLabel}</label>
                <input
                  type="number"
                  value={y}
                  onChange={e => setY(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Quick presets - only for whatIs mode */}
            {mode === 'whatIs' && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>{lt('quickPresets')}</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {presets.map(p => (
                    <button
                      key={p}
                      onClick={() => setX(p)}
                      style={{
                        padding: '6px 14px',
                        fontSize: 13,
                        fontWeight: 600,
                        fontFamily: fb,
                        border: x === p ? `2px solid ${accent}` : '1.5px solid #E8E4DB',
                        borderRadius: 8,
                        background: x === p ? accent + '12' : '#F5F3EE',
                        color: x === p ? accent : '#6B6560',
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Result */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{
            background: accent + '0A',
            border: `1.5px solid ${accent}25`,
            borderRadius: 18,
            padding: 32,
            textAlign: 'center',
          }}>
            <div style={labelStyle}>{resultLabel}</div>
            <div style={{
              fontSize: 48,
              fontFamily: fm,
              fontWeight: 700,
              color: accent,
              marginTop: 8,
            }}>
              {formatResult(result)}
            </div>
          </div>
        </section>

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
