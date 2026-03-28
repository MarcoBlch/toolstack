'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"

const accent = '#2563EB'

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

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  navTitle: { en: 'Investment Calculator', fr: 'Calculateur d\'investissement', es: 'Calculadora de inversiones', pt: 'Calculadora de investimento', de: 'Investitionsrechner' },
  titleA: { en: 'Investment', fr: 'Calculateur d\'', es: 'Calculadora de', pt: 'Calculadora de', de: 'Investitions' },
  titleB: { en: 'calculator', fr: 'investissement', es: 'inversiones', pt: 'investimento', de: 'rechner' },
  subtitle: {
    en: 'See how your money grows with compound interest over time.',
    fr: 'Découvrez comment votre argent croît avec les intérêts composés au fil du temps.',
    es: 'Vea cómo su dinero crece con el interés compuesto a lo largo del tiempo.',
    pt: 'Veja como seu dinheiro cresce com juros compostos ao longo do tempo.',
    de: 'Sehen Sie, wie Ihr Geld mit Zinseszins im Laufe der Zeit wächst.',
  },

  initialInvestment: { en: 'Initial Investment', fr: 'Investissement initial', es: 'Inversión inicial', pt: 'Investimento inicial', de: 'Anfangsinvestition' },
  monthlyContribution: { en: 'Monthly Contribution', fr: 'Contribution mensuelle', es: 'Contribución mensual', pt: 'Contribuição mensal', de: 'Monatlicher Beitrag' },
  annualReturnRate: { en: 'Annual Return Rate (%)', fr: 'Taux de rendement annuel (%)', es: 'Tasa de retorno anual (%)', pt: 'Taxa de retorno anual (%)', de: 'Jährliche Rendite (%)' },
  compoundFrequency: { en: 'Compound Frequency', fr: 'Fréquence de capitalisation', es: 'Frecuencia de capitalización', pt: 'Frequência de capitalização', de: 'Zinseszinsfrequenz' },
  freqMonthly: { en: 'Monthly', fr: 'Mensuelle', es: 'Mensual', pt: 'Mensal', de: 'Monatlich' },
  freqQuarterly: { en: 'Quarterly', fr: 'Trimestrielle', es: 'Trimestral', pt: 'Trimestral', de: 'Vierteljährlich' },
  freqAnnually: { en: 'Annually', fr: 'Annuelle', es: 'Anual', pt: 'Anual', de: 'Jährlich' },
  timePeriod: { en: 'Time Period', fr: 'Période', es: 'Período', pt: 'Período', de: 'Zeitraum' },
  yr: { en: 'yr', fr: 'an', es: 'año', pt: 'ano', de: 'J.' },
  yrs: { en: 'yrs', fr: 'ans', es: 'años', pt: 'anos', de: 'J.' },

  finalBalance: { en: 'Final Balance', fr: 'Solde final', es: 'Saldo final', pt: 'Saldo final', de: 'Endguthaben' },
  totalContributions: { en: 'Total Contributions', fr: 'Total des contributions', es: 'Total de contribuciones', pt: 'Total de contribuições', de: 'Gesamtbeiträge' },
  totalInterestEarned: { en: 'Total Interest Earned', fr: 'Intérêts totaux gagnés', es: 'Interés total ganado', pt: 'Juros totais ganhos', de: 'Gesamtzinsen verdient' },
  interestPctBalance: { en: 'Interest as % of Final Balance', fr: 'Intérêts en % du solde final', es: 'Interés como % del saldo final', pt: 'Juros como % do saldo final', de: 'Zinsen als % des Endguthabens' },

  yearByYearGrowth: { en: 'Year-by-Year Growth', fr: 'Croissance année par année', es: 'Crecimiento año por año', pt: 'Crescimento ano a ano', de: 'Jährliches Wachstum' },
  contribVsInterest: { en: 'Contributions vs interest earned over time', fr: 'Contributions vs intérêts gagnés au fil du temps', es: 'Contribuciones vs intereses ganados a lo largo del tiempo', pt: 'Contribuições vs juros ganhos ao longo do tempo', de: 'Beiträge vs verdiente Zinsen im Laufe der Zeit' },
  contributions: { en: 'Contributions', fr: 'Contributions', es: 'Contribuciones', pt: 'Contribuições', de: 'Beiträge' },
  interestLabel: { en: 'Interest', fr: 'Intérêts', es: 'Intereses', pt: 'Juros', de: 'Zinsen' },

  // SEO
  seoH2: {
    en: 'Free compound interest and investment calculator',
    fr: 'Calculateur d\'intérêts composés et d\'investissement gratuit',
    es: 'Calculadora gratuita de interés compuesto e inversiones',
    pt: 'Calculadora gratuita de juros compostos e investimento',
    de: 'Kostenloser Zinseszins- und Investitionsrechner',
  },
  seoP1: {
    en: 'This investment calculator shows how your money grows through the power of compound interest. Enter your initial investment, monthly contribution, expected annual return, and time horizon to see your projected final balance. The year-by-year growth chart visually separates your contributions from investment gains, making it easy to see how compounding accelerates your wealth over time.',
    fr: 'Ce calculateur d\'investissement montre comment votre argent croît grâce à la puissance des intérêts composés. Entrez votre investissement initial, votre contribution mensuelle, le rendement annuel attendu et votre horizon temporel pour voir votre solde final projeté. Le graphique de croissance année par année sépare visuellement vos contributions des gains d\'investissement, permettant de voir facilement comment la capitalisation accélère votre patrimoine au fil du temps.',
    es: 'Esta calculadora de inversiones muestra cómo su dinero crece a través del poder del interés compuesto. Ingrese su inversión inicial, contribución mensual, rendimiento anual esperado y horizonte temporal para ver su saldo final proyectado. El gráfico de crecimiento año por año separa visualmente sus contribuciones de las ganancias de inversión, facilitando ver cómo la capitalización acelera su riqueza con el tiempo.',
    pt: 'Esta calculadora de investimento mostra como seu dinheiro cresce através do poder dos juros compostos. Insira seu investimento inicial, contribuição mensal, retorno anual esperado e horizonte temporal para ver seu saldo final projetado. O gráfico de crescimento ano a ano separa visualmente suas contribuições dos ganhos de investimento, facilitando ver como a capitalização acelera seu patrimônio ao longo do tempo.',
    de: 'Dieser Investitionsrechner zeigt, wie Ihr Geld durch die Kraft des Zinseszinses wächst. Geben Sie Ihre Anfangsinvestition, monatlichen Beitrag, erwartete jährliche Rendite und Zeithorizont ein, um Ihr projiziertes Endguthaben zu sehen. Das jährliche Wachstumsdiagramm trennt visuell Ihre Beiträge von Investitionsgewinnen und macht es leicht zu sehen, wie der Zinseszins Ihr Vermögen im Laufe der Zeit beschleunigt.',
  },
  seoH3a: {
    en: 'Why compounding frequency matters',
    fr: 'Pourquoi la fréquence de capitalisation compte',
    es: 'Por qué importa la frecuencia de capitalización',
    pt: 'Por que a frequência de capitalização importa',
    de: 'Warum die Zinseszinsfrequenz wichtig ist',
  },
  seoP2: {
    en: 'Choose between monthly, quarterly, or annual compounding to match your actual investment product. Monthly compounding produces slightly higher returns because interest starts earning its own interest sooner. Over a 20-year period, this difference can add up to a meaningful amount, especially with larger portfolios or higher return rates.',
    fr: 'Choisissez entre une capitalisation mensuelle, trimestrielle ou annuelle pour correspondre à votre produit d\'investissement réel. La capitalisation mensuelle produit des rendements légèrement supérieurs car les intérêts commencent à générer leurs propres intérêts plus tôt. Sur une période de 20 ans, cette différence peut s\'accumuler pour atteindre un montant significatif, surtout avec des portefeuilles plus importants ou des taux de rendement plus élevés.',
    es: 'Elija entre capitalización mensual, trimestral o anual para coincidir con su producto de inversión real. La capitalización mensual produce rendimientos ligeramente superiores porque los intereses comienzan a generar sus propios intereses antes. En un período de 20 años, esta diferencia puede acumularse en una cantidad significativa, especialmente con carteras más grandes o tasas de rendimiento más altas.',
    pt: 'Escolha entre capitalização mensal, trimestral ou anual para corresponder ao seu produto de investimento real. A capitalização mensal produz retornos ligeiramente superiores porque os juros começam a gerar seus próprios juros mais cedo. Em um período de 20 anos, essa diferença pode se acumular em um valor significativo, especialmente com carteiras maiores ou taxas de retorno mais altas.',
    de: 'Wählen Sie zwischen monatlicher, vierteljährlicher oder jährlicher Verzinsung, um Ihr tatsächliches Anlageprodukt abzubilden. Monatliche Verzinsung erzeugt etwas höhere Renditen, da Zinsen früher beginnen, eigene Zinsen zu verdienen. Über einen Zeitraum von 20 Jahren kann sich dieser Unterschied zu einem bedeutenden Betrag summieren, insbesondere bei größeren Portfolios oder höheren Renditen.',
  },
  seoH3b: {
    en: 'Building a long-term investment strategy',
    fr: 'Construire une stratégie d\'investissement à long terme',
    es: 'Construir una estrategia de inversión a largo plazo',
    pt: 'Construindo uma estratégia de investimento de longo prazo',
    de: 'Eine langfristige Anlagestrategie aufbauen',
  },
  seoP3: {
    en: 'The most powerful variable in this calculator is time. Even modest monthly contributions grow substantially over decades thanks to compounding. Try extending the time slider to see how an extra five or ten years dramatically increases your final balance. Starting early, even with smaller amounts, often beats starting late with larger contributions.',
    fr: 'La variable la plus puissante de ce calculateur est le temps. Même des contributions mensuelles modestes croissent considérablement sur des décennies grâce à la capitalisation. Essayez d\'étendre le curseur temporel pour voir comment cinq ou dix années supplémentaires augmentent considérablement votre solde final. Commencer tôt, même avec de plus petits montants, bat souvent le fait de commencer tard avec des contributions plus importantes.',
    es: 'La variable más poderosa de esta calculadora es el tiempo. Incluso contribuciones mensuales modestas crecen sustancialmente a lo largo de décadas gracias a la capitalización. Intente extender el control deslizante de tiempo para ver cómo cinco o diez años adicionales aumentan dramáticamente su saldo final. Empezar temprano, incluso con cantidades menores, a menudo supera empezar tarde con contribuciones mayores.',
    pt: 'A variável mais poderosa nesta calculadora é o tempo. Mesmo contribuições mensais modestas crescem substancialmente ao longo de décadas graças à capitalização. Tente estender o controle deslizante de tempo para ver como cinco ou dez anos extras aumentam dramaticamente seu saldo final. Começar cedo, mesmo com valores menores, frequentemente supera começar tarde com contribuições maiores.',
    de: 'Die mächtigste Variable in diesem Rechner ist die Zeit. Selbst bescheidene monatliche Beiträge wachsen dank Zinseszins über Jahrzehnte erheblich. Versuchen Sie, den Zeitregler zu verlängern, um zu sehen, wie fünf oder zehn zusätzliche Jahre Ihr Endguthaben dramatisch erhöhen. Früh anfangen, selbst mit kleineren Beträgen, schlägt oft spätes Anfangen mit größeren Beiträgen.',
  },
  seoP4: {
    en: 'Planning specifically for retirement? Our <a>retirement calculator</a> factors in inflation and the 4% withdrawal rule. To understand how your current income fits into your savings plan, try the <a2>salary calculator</a2>.',
    fr: 'Vous planifiez spécifiquement pour la retraite ? Notre <a>calculateur de retraite</a> tient compte de l\'inflation et de la règle de retrait de 4 %. Pour comprendre comment votre revenu actuel s\'intègre dans votre plan d\'épargne, essayez le <a2>calculateur de salaire</a2>.',
    es: '¿Planifica específicamente para la jubilación? Nuestra <a>calculadora de jubilación</a> tiene en cuenta la inflación y la regla del 4% de retiro. Para entender cómo encaja su ingreso actual en su plan de ahorro, pruebe la <a2>calculadora de salario</a2>.',
    pt: 'Planejando especificamente para a aposentadoria? Nossa <a>calculadora de aposentadoria</a> considera a inflação e a regra de retirada de 4%. Para entender como sua renda atual se encaixa no seu plano de poupança, experimente a <a2>calculadora de salário</a2>.',
    de: 'Planen Sie speziell für den Ruhestand? Unser <a>Rentenrechner</a> berücksichtigt Inflation und die 4%-Entnahmeregel. Um zu verstehen, wie Ihr aktuelles Einkommen in Ihren Sparplan passt, probieren Sie den <a2>Gehaltsrechner</a2>.',
  },
}

export default function InvestmentClient({
  defaultInitial,
  defaultMonthly,
  defaultRate,
  defaultYears,
  locale = 'en' as Locale,
}: {
  defaultInitial?: number
  defaultMonthly?: number
  defaultRate?: number
  defaultYears?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [initial, setInitial] = useState(defaultInitial ?? 10000)
  const [monthly, setMonthly] = useState(defaultMonthly ?? 500)
  const [rate, setRate] = useState(defaultRate ?? 7)
  const [years, setYears] = useState(defaultYears ?? 20)
  const [compFreq, setCompFreq] = useState<'monthly' | 'quarterly' | 'annually'>('monthly')

  const freqMap = { monthly: 12, quarterly: 4, annually: 1 }

  const fmt = (n: number): string => {
    return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const results = useMemo(() => {
    const n = freqMap[compFreq]
    const r = rate / 100
    const t = years

    const schedule: { year: number; contributions: number; interest: number; balance: number }[] = []

    let balance = initial
    let totalContributions = initial

    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        if (y > 1 || m > 0) {
          balance += monthly
          totalContributions += monthly
        }
        if (compFreq === 'monthly') {
          balance *= (1 + r / 12)
        } else if (compFreq === 'quarterly' && (m + 1) % 3 === 0) {
          balance *= (1 + r / 4)
        } else if (compFreq === 'annually' && m === 11) {
          balance *= (1 + r)
        }
      }

      schedule.push({
        year: y,
        contributions: totalContributions,
        interest: balance - totalContributions,
        balance,
      })
    }

    const finalBalance = balance
    const totalInterest = finalBalance - totalContributions
    const interestPct = finalBalance > 0 ? (totalInterest / finalBalance) * 100 : 0

    return { finalBalance, totalContributions, totalInterest, interestPct, schedule }
  }, [initial, monthly, rate, years, compFreq])

  const maxBalance = useMemo(() => {
    return Math.max(...results.schedule.map(s => s.balance), 1)
  }, [results.schedule])

  return (
    <ToolShell name={lt('navTitle')} icon="📈" currentPath="/investment-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>📈</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleA')}<span style={{ color: accent }}>{lt('titleB')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{lt('initialInvestment')}</label>
                <input
                  type="number" value={initial} min={0}
                  onChange={e => setInitial(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('monthlyContribution')}</label>
                <input
                  type="number" value={monthly} min={0}
                  onChange={e => setMonthly(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('annualReturnRate')}</label>
                <input
                  type="number" value={rate} min={0} step={0.1}
                  onChange={e => setRate(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('compoundFrequency')}</label>
                <select value={compFreq} onChange={e => setCompFreq(e.target.value as 'monthly' | 'quarterly' | 'annually')} style={selectStyle}>
                  <option value="monthly">{lt('freqMonthly')}</option>
                  <option value="quarterly">{lt('freqQuarterly')}</option>
                  <option value="annually">{lt('freqAnnually')}</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label style={labelStyle}>{lt('timePeriod')}: {years} {years === 1 ? lt('yr') : lt('yrs')}</label>
              <input
                type="range" min={1} max={40} value={years}
                onChange={e => setYears(Number(e.target.value))}
                style={{ width: '100%', accentColor: accent }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9A958A' }}>
                <span>1 {lt('yr')}</span><span>10</span><span>20</span><span>30</span><span>40 {lt('yrs')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              background: accent + '0A', border: `1.5px solid ${accent}25`, borderRadius: 16, padding: 22, textAlign: 'center',
              gridColumn: '1 / -1',
            }}>
              <div style={labelStyle}>{lt('finalBalance')}</div>
              <div style={{ fontSize: 36, fontFamily: fm, fontWeight: 700, color: accent }}>
                {fmt(results.finalBalance)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('totalContributions')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {fmt(results.totalContributions)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('totalInterestEarned')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {fmt(results.totalInterest)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center', gridColumn: '1 / -1' }}>
              <div style={labelStyle}>{lt('interestPctBalance')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {results.interestPct.toFixed(1)}%
              </div>
              <div style={{ marginTop: 8, height: 8, borderRadius: 4, background: '#E8E4DB', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(results.interestPct, 100)}%`, background: accent, borderRadius: 4, transition: 'width .3s' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Growth Chart */}
        {results.schedule.length > 0 && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lt('yearByYearGrowth')}</h2>
              <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>{lt('contribVsInterest')}</p>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 16, fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: accent }} />
                  <span style={{ color: '#6B6560' }}>{lt('contributions')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: accent + '40' }} />
                  <span style={{ color: '#6B6560' }}>{lt('interestLabel')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {results.schedule.map(s => {
                  const contribPct = (s.contributions / maxBalance) * 100
                  const interestPct = (s.interest / maxBalance) * 100
                  return (
                    <div key={s.year} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, fontSize: 11, fontFamily: fm, color: '#9A958A', textAlign: 'right', flexShrink: 0 }}>
                        Y{s.year}
                      </div>
                      <div style={{ flex: 1, display: 'flex', height: 18, borderRadius: 4, overflow: 'hidden', background: '#F5F3EE' }}>
                        <div style={{ width: `${contribPct}%`, background: accent, transition: 'width .3s', minWidth: s.contributions > 0 ? 1 : 0 }} />
                        <div style={{ width: `${interestPct}%`, background: accent + '40', transition: 'width .3s', minWidth: s.interest > 0 ? 1 : 0 }} />
                      </div>
                      <div style={{ width: 90, fontSize: 10, fontFamily: fm, color: '#9A958A', textAlign: 'right', flexShrink: 0 }}>
                        {fmt(s.balance)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* SEO */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP1')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP2')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP3')}</p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            {lt('seoP4').split(/<a>|<\/a>|<a2>|<\/a2>/).map((part, i) => {
              if (i === 1) return <a key={i} href="/retirement-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              if (i === 3) return <a key={i} href="/salary-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              return <span key={i}>{part}</span>
            })}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
