'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const ACCENT = '#7C3AED'

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  navTitle: { en: 'Retirement Calculator', fr: 'Calculateur de retraite', es: 'Calculadora de jubilación', pt: 'Calculadora de aposentadoria', de: 'Rentenrechner' },
  yourDetails: { en: 'Your Details', fr: 'Vos informations', es: 'Sus datos', pt: 'Seus dados', de: 'Ihre Angaben' },
  currentAge: { en: 'Current Age', fr: 'Âge actuel', es: 'Edad actual', pt: 'Idade atual', de: 'Aktuelles Alter' },
  retirementAge: { en: 'Retirement Age', fr: 'Âge de retraite', es: 'Edad de jubilación', pt: 'Idade de aposentadoria', de: 'Rentenalter' },
  currentSavings: { en: 'Current Savings ($)', fr: 'Épargne actuelle ($)', es: 'Ahorros actuales ($)', pt: 'Poupança atual ($)', de: 'Aktuelle Ersparnisse ($)' },
  monthlyContribution: { en: 'Monthly Contribution ($)', fr: 'Contribution mensuelle ($)', es: 'Contribución mensual ($)', pt: 'Contribuição mensal ($)', de: 'Monatlicher Beitrag ($)' },
  expectedReturn: { en: 'Expected Annual Return (%)', fr: 'Rendement annuel attendu (%)', es: 'Retorno anual esperado (%)', pt: 'Retorno anual esperado (%)', de: 'Erwartete jährliche Rendite (%)' },
  expectedInflation: { en: 'Expected Inflation (%)', fr: 'Inflation attendue (%)', es: 'Inflación esperada (%)', pt: 'Inflação esperada (%)', de: 'Erwartete Inflation (%)' },
  desiredIncome: { en: 'Desired Monthly Income in Retirement ($)', fr: 'Revenu mensuel souhaité à la retraite ($)', es: 'Ingreso mensual deseado en jubilación ($)', pt: 'Renda mensal desejada na aposentadoria ($)', de: 'Gewünschtes monatliches Einkommen im Ruhestand ($)' },

  results: { en: 'Results', fr: 'Résultats', es: 'Resultados', pt: 'Resultados', de: 'Ergebnisse' },
  totalSavingsAtRetirement: { en: 'Total Savings at Retirement', fr: 'Épargne totale à la retraite', es: 'Ahorros totales al jubilarse', pt: 'Poupança total na aposentadoria', de: 'Gesamtersparnisse bei Renteneintritt' },
  monthlyIncome4Pct: { en: 'Monthly Income (4% Rule)', fr: 'Revenu mensuel (règle des 4 %)', es: 'Ingreso mensual (regla del 4%)', pt: 'Renda mensal (regra dos 4%)', de: 'Monatliches Einkommen (4%-Regel)' },
  monthlyShortfall: { en: 'Monthly Shortfall', fr: 'Déficit mensuel', es: 'Déficit mensual', pt: 'Déficit mensal', de: 'Monatliches Defizit' },
  monthlySurplus: { en: 'Monthly Surplus', fr: 'Excédent mensuel', es: 'Excedente mensual', pt: 'Excedente mensal', de: 'Monatlicher Überschuss' },
  yearsMoneyLasts: { en: 'Years Money Will Last', fr: 'Années de durée du capital', es: 'Años que durará el dinero', pt: 'Anos que o dinheiro durará', de: 'Jahre, die das Geld reicht' },
  forever: { en: '(forever)', fr: '(indéfiniment)', es: '(para siempre)', pt: '(para sempre)', de: '(unbegrenzt)' },
  yrsLabel: { en: 'yrs', fr: 'ans', es: 'años', pt: 'anos', de: 'J.' },

  savingsGapAlert: { en: 'Savings Gap Alert', fr: 'Alerte de déficit d\'épargne', es: 'Alerta de brecha de ahorro', pt: 'Alerta de déficit de poupança', de: 'Sparlücken-Warnung' },
  gapMessage: {
    en: 'You need to save {additional} more per month (total {total}/month) to reach your desired retirement income of {desired}/month.',
    fr: 'Vous devez épargner {additional} de plus par mois (total {total}/mois) pour atteindre votre revenu de retraite souhaité de {desired}/mois.',
    es: 'Necesita ahorrar {additional} más al mes (total {total}/mes) para alcanzar su ingreso de jubilación deseado de {desired}/mes.',
    pt: 'Você precisa poupar {additional} a mais por mês (total {total}/mês) para atingir sua renda de aposentadoria desejada de {desired}/mês.',
    de: 'Sie müssen {additional} mehr pro Monat sparen (insgesamt {total}/Monat), um Ihr gewünschtes Ruhestandseinkommen von {desired}/Monat zu erreichen.',
  },
  onTrack: { en: 'On Track!', fr: 'En bonne voie !', es: '¡En camino!', pt: 'No caminho certo!', de: 'Auf Kurs!' },
  onTrackMessage: {
    en: 'At your current savings rate, you will exceed your desired monthly retirement income of {desired} by {surplus}/month.',
    fr: 'À votre taux d\'épargne actuel, vous dépasserez votre revenu mensuel de retraite souhaité de {desired} de {surplus}/mois.',
    es: 'A su tasa de ahorro actual, superará su ingreso mensual de jubilación deseado de {desired} en {surplus}/mes.',
    pt: 'Na sua taxa de poupança atual, você excederá sua renda mensal de aposentadoria desejada de {desired} em {surplus}/mês.',
    de: 'Bei Ihrer aktuellen Sparrate werden Sie Ihr gewünschtes monatliches Ruhestandseinkommen von {desired} um {surplus}/Monat übertreffen.',
  },

  savingsGrowth: { en: 'Savings Growth Over Time', fr: 'Croissance de l\'épargne au fil du temps', es: 'Crecimiento del ahorro a lo largo del tiempo', pt: 'Crescimento da poupança ao longo do tempo', de: 'Entwicklung der Ersparnisse über die Zeit' },
  ageLabel: { en: 'Age', fr: 'Âge', es: 'Edad', pt: 'Idade', de: 'Alter' },

  summary: { en: 'Summary', fr: 'Résumé', es: 'Resumen', pt: 'Resumo', de: 'Zusammenfassung' },
  yearsUntilRetirement: { en: 'Years until retirement:', fr: 'Années jusqu\'à la retraite :', es: 'Años hasta la jubilación:', pt: 'Anos até a aposentadoria:', de: 'Jahre bis zum Ruhestand:' },
  totalMonthsContributing: { en: 'Total months contributing:', fr: 'Mois de contribution au total :', es: 'Total de meses contribuyendo:', pt: 'Total de meses contribuindo:', de: 'Gesamtmonate mit Beiträgen:' },
  totalContributions: { en: 'Total contributions:', fr: 'Total des contributions :', es: 'Total de contribuciones:', pt: 'Total de contribuições:', de: 'Gesamtbeiträge:' },
  investmentGrowth: { en: 'Investment growth:', fr: 'Croissance de l\'investissement :', es: 'Crecimiento de la inversión:', pt: 'Crescimento do investimento:', de: 'Investitionswachstum:' },
  realReturnRate: { en: 'Real return rate (after inflation):', fr: 'Taux de rendement réel (après inflation) :', es: 'Tasa de retorno real (después de inflación):', pt: 'Taxa de retorno real (após inflação):', de: 'Reale Rendite (nach Inflation):' },

  // SEO
  seoH2: {
    en: 'Free retirement calculator',
    fr: 'Calculateur de retraite gratuit',
    es: 'Calculadora de jubilación gratuita',
    pt: 'Calculadora de aposentadoria gratuita',
    de: 'Kostenloser Rentenrechner',
  },
  seoP1: {
    en: 'Our retirement calculator projects how much you will have saved by the time you stop working. Enter your current age, target retirement age, existing savings, monthly contribution, expected investment return, and inflation rate. The tool uses the 4% withdrawal rule to estimate a sustainable monthly income from your portfolio, and it clearly flags whether you are on track or falling short of your goal.',
    fr: 'Notre calculateur de retraite projette combien vous aurez épargné au moment où vous cesserez de travailler. Entrez votre âge actuel, l\'âge de retraite cible, vos économies existantes, votre contribution mensuelle, le rendement d\'investissement attendu et le taux d\'inflation. L\'outil utilise la règle de retrait de 4 % pour estimer un revenu mensuel durable de votre portefeuille, et il indique clairement si vous êtes en bonne voie ou en retard sur votre objectif.',
    es: 'Nuestra calculadora de jubilación proyecta cuánto habrá ahorrado para cuando deje de trabajar. Ingrese su edad actual, edad objetivo de jubilación, ahorros existentes, contribución mensual, retorno de inversión esperado y tasa de inflación. La herramienta utiliza la regla de retiro del 4% para estimar un ingreso mensual sostenible de su cartera, e indica claramente si está en camino o por debajo de su meta.',
    pt: 'Nossa calculadora de aposentadoria projeta quanto você terá poupado quando parar de trabalhar. Insira sua idade atual, idade alvo de aposentadoria, poupança existente, contribuição mensal, retorno de investimento esperado e taxa de inflação. A ferramenta usa a regra de retirada de 4% para estimar uma renda mensal sustentável do seu portfólio, e indica claramente se você está no caminho certo ou aquém da sua meta.',
    de: 'Unser Rentenrechner projiziert, wie viel Sie gespart haben werden, wenn Sie aufhören zu arbeiten. Geben Sie Ihr aktuelles Alter, Ziel-Rentenalter, vorhandene Ersparnisse, monatlichen Beitrag, erwartete Investitionsrendite und Inflationsrate ein. Das Tool verwendet die 4%-Entnahmeregel, um ein nachhaltiges monatliches Einkommen aus Ihrem Portfolio zu schätzen, und zeigt klar an, ob Sie auf Kurs sind oder Ihr Ziel verfehlen.',
  },
  seoH3a: {
    en: 'The 4% rule and savings gap analysis',
    fr: 'La règle des 4 % et l\'analyse du déficit d\'épargne',
    es: 'La regla del 4% y el análisis de brecha de ahorro',
    pt: 'A regra dos 4% e a análise de déficit de poupança',
    de: 'Die 4%-Regel und Sparlückenanalyse',
  },
  seoP2: {
    en: 'The 4% rule is a widely used guideline suggesting you can withdraw four percent of your portfolio each year without running out of money over a typical 30-year retirement. If your projected income falls below your desired amount, the calculator tells you exactly how much more you need to save each month to close the gap. This makes it simple to adjust your plan.',
    fr: 'La règle des 4 % est un principe directeur largement utilisé suggérant que vous pouvez retirer quatre pour cent de votre portefeuille chaque année sans épuiser votre capital sur une retraite typique de 30 ans. Si votre revenu projeté est inférieur au montant souhaité, le calculateur vous indique exactement combien vous devez épargner en plus chaque mois pour combler le déficit. Cela permet d\'ajuster facilement votre plan.',
    es: 'La regla del 4% es una guía ampliamente utilizada que sugiere que puede retirar cuatro por ciento de su cartera cada año sin quedarse sin dinero durante una jubilación típica de 30 años. Si su ingreso proyectado cae por debajo del monto deseado, la calculadora le indica exactamente cuánto más necesita ahorrar cada mes para cerrar la brecha. Esto facilita ajustar su plan.',
    pt: 'A regra dos 4% é uma diretriz amplamente utilizada que sugere que você pode retirar quatro por cento do seu portfólio a cada ano sem ficar sem dinheiro durante uma aposentadoria típica de 30 anos. Se sua renda projetada ficar abaixo do valor desejado, a calculadora informa exatamente quanto mais você precisa poupar a cada mês para fechar o déficit. Isso torna simples ajustar seu plano.',
    de: 'Die 4%-Regel ist eine weit verbreitete Richtlinie, die besagt, dass Sie jedes Jahr vier Prozent Ihres Portfolios entnehmen können, ohne dass Ihnen über einen typischen 30-jährigen Ruhestand das Geld ausgeht. Wenn Ihr projiziertes Einkommen unter Ihren gewünschten Betrag fällt, sagt Ihnen der Rechner genau, wie viel mehr Sie jeden Monat sparen müssen, um die Lücke zu schließen. Das macht es einfach, Ihren Plan anzupassen.',
  },
  seoH3b: {
    en: 'Inflation-adjusted projections',
    fr: 'Projections ajustées à l\'inflation',
    es: 'Proyecciones ajustadas por inflación',
    pt: 'Projeções ajustadas pela inflação',
    de: 'Inflationsbereinigte Prognosen',
  },
  seoP3: {
    en: 'All numbers are adjusted for inflation so you see results in today\'s purchasing power rather than inflated future dollars. The growth chart displays your savings trajectory at five-year intervals, giving you a visual sense of how compound growth accelerates over time. This helps you appreciate the real value of starting early and contributing consistently.',
    fr: 'Tous les chiffres sont ajustés à l\'inflation afin que vous voyiez les résultats en pouvoir d\'achat actuel plutôt qu\'en dollars futurs gonflés. Le graphique de croissance affiche la trajectoire de votre épargne par intervalles de cinq ans, vous donnant un aperçu visuel de la façon dont la croissance composée s\'accélère au fil du temps. Cela vous aide à apprécier la vraie valeur de commencer tôt et de contribuer régulièrement.',
    es: 'Todos los números están ajustados por inflación para que vea los resultados en poder adquisitivo actual en lugar de dólares futuros inflados. El gráfico de crecimiento muestra la trayectoria de sus ahorros en intervalos de cinco años, dándole una idea visual de cómo el crecimiento compuesto se acelera con el tiempo. Esto le ayuda a apreciar el valor real de empezar temprano y contribuir constantemente.',
    pt: 'Todos os números são ajustados pela inflação para que você veja os resultados no poder de compra atual em vez de dólares futuros inflacionados. O gráfico de crescimento exibe a trajetória da sua poupança em intervalos de cinco anos, dando-lhe uma noção visual de como o crescimento composto acelera ao longo do tempo. Isso ajuda a valorizar o benefício real de começar cedo e contribuir consistentemente.',
    de: 'Alle Zahlen sind inflationsbereinigt, sodass Sie Ergebnisse in heutiger Kaufkraft sehen statt in aufgeblähten zukünftigen Dollar. Das Wachstumsdiagramm zeigt Ihre Sparentwicklung in Fünfjahresintervallen und gibt Ihnen einen visuellen Eindruck davon, wie sich das Zinseszinswachstum im Laufe der Zeit beschleunigt. Dies hilft Ihnen, den wahren Wert des frühen Starts und konsequenten Sparens zu erkennen.',
  },
  seoP4: {
    en: 'Want to explore compound growth in more detail? Our <a>investment calculator</a> lets you adjust compounding frequency. To see how your current income translates to take-home pay, try the <a2>salary calculator</a2>.',
    fr: 'Vous voulez explorer la croissance composée plus en détail ? Notre <a>calculateur d\'investissement</a> vous permet d\'ajuster la fréquence de capitalisation. Pour voir comment votre revenu actuel se traduit en salaire net, essayez le <a2>calculateur de salaire</a2>.',
    es: '¿Quiere explorar el crecimiento compuesto con más detalle? Nuestra <a>calculadora de inversiones</a> le permite ajustar la frecuencia de capitalización. Para ver cómo su ingreso actual se traduce en salario neto, pruebe la <a2>calculadora de salario</a2>.',
    pt: 'Quer explorar o crescimento composto em mais detalhes? Nossa <a>calculadora de investimento</a> permite ajustar a frequência de capitalização. Para ver como sua renda atual se traduz em salário líquido, experimente a <a2>calculadora de salário</a2>.',
    de: 'Möchten Sie das Zinseszinswachstum genauer erkunden? Unser <a>Investitionsrechner</a> ermöglicht die Anpassung der Verzinsungsfrequenz. Um zu sehen, wie Ihr aktuelles Einkommen sich in Nettogehalt übersetzt, probieren Sie den <a2>Gehaltsrechner</a2>.',
  },
}

export default function RetirementClient({
  defaultAge,
  defaultRetAge,
  defaultSavings,
  defaultContribution,
  locale = 'en' as Locale,
}: {
  defaultAge?: number
  defaultRetAge?: number
  defaultSavings?: number
  defaultContribution?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [currentAge, setCurrentAge] = useState(defaultAge ?? 30)
  const [retirementAge, setRetirementAge] = useState(defaultRetAge ?? 65)
  const [currentSavings, setCurrentSavings] = useState(defaultSavings ?? 20000)
  const [monthlyContribution, setMonthlyContribution] = useState(defaultContribution ?? 500)
  const [annualReturn, setAnnualReturn] = useState(7)
  const [inflation, setInflation] = useState(2)
  const [desiredIncome, setDesiredIncome] = useState(3000)

  const calc = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge)
    const realReturn = (1 + annualReturn / 100) / (1 + inflation / 100) - 1
    const monthlyReal = realReturn / 12

    let totalSavings: number
    if (monthlyReal === 0) {
      totalSavings = currentSavings + monthlyContribution * yearsToRetirement * 12
    } else {
      const fvSavings = currentSavings * Math.pow(1 + monthlyReal, yearsToRetirement * 12)
      const fvContrib = monthlyContribution * ((Math.pow(1 + monthlyReal, yearsToRetirement * 12) - 1) / monthlyReal)
      totalSavings = fvSavings + fvContrib
    }

    const monthlyIncome = (totalSavings * 0.04) / 12
    const gap = monthlyIncome - desiredIncome
    const hasGap = gap < 0

    let yearsLast: number
    const monthlyWithdrawal = desiredIncome
    if (monthlyWithdrawal <= 0) {
      yearsLast = 999
    } else if (monthlyReal <= 0) {
      yearsLast = totalSavings / (monthlyWithdrawal * 12)
    } else {
      const ratio = (totalSavings * monthlyReal) / monthlyWithdrawal
      if (ratio >= 1) {
        yearsLast = 999
      } else {
        const nMonths = -Math.log(1 - ratio) / Math.log(1 + monthlyReal)
        yearsLast = nMonths / 12
      }
    }

    let additionalNeeded = 0
    if (hasGap) {
      const targetSavings = (desiredIncome * 12) / 0.04
      const shortfall = targetSavings - totalSavings
      if (shortfall > 0 && yearsToRetirement > 0) {
        if (monthlyReal === 0) {
          additionalNeeded = shortfall / (yearsToRetirement * 12)
        } else {
          additionalNeeded = shortfall * monthlyReal / (Math.pow(1 + monthlyReal, yearsToRetirement * 12) - 1)
        }
      }
    }

    const snapshots: { age: number; savings: number }[] = []
    let runBalance = currentSavings
    for (let y = 0; y <= yearsToRetirement; y++) {
      if (y % 5 === 0 || y === yearsToRetirement) {
        snapshots.push({ age: currentAge + y, savings: runBalance })
      }
      for (let m = 0; m < 12; m++) {
        runBalance = runBalance * (1 + monthlyReal) + monthlyContribution
      }
    }
    if (snapshots.length > 0 && snapshots[snapshots.length - 1].age !== retirementAge) {
      snapshots.push({ age: retirementAge, savings: runBalance })
    }

    return {
      totalSavings,
      monthlyIncome,
      gap,
      hasGap,
      yearsLast,
      additionalNeeded,
      snapshots,
      yearsToRetirement,
    }
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflation, desiredIncome])

  const fmtMoney = (n: number) => {
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M'
    return '$' + n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const fmtMoneyExact = (n: number) => {
    return '$' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const inputStyle = {
    width: '100%', border: '1.5px solid #E8E4DB', borderRadius: 8, padding: '10px 12px',
    fontSize: 14, fontFamily: fb, color: '#1C1B18', background: '#F5F3EE', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, color: '#9A958A', textTransform: 'uppercase',
    letterSpacing: '.8px', display: 'block', marginBottom: 4,
  }

  const maxSavings = calc.snapshots.length > 0
    ? Math.max(...calc.snapshots.map(s => s.savings))
    : 1

  return (
    <ToolShell name={lt('navTitle')} icon="🏖️" currentPath="/retirement-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🏖️</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Main content */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>

          {/* Input card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>{lt('yourDetails')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>{lt('currentAge')}</label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={e => setCurrentAge(Number(e.target.value))}
                  style={inputStyle}
                  min={18}
                  max={80}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('retirementAge')}</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={e => setRetirementAge(Number(e.target.value))}
                  style={inputStyle}
                  min={currentAge + 1}
                  max={100}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('currentSavings')}</label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={e => setCurrentSavings(Number(e.target.value))}
                  style={inputStyle}
                  min={0}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('monthlyContribution')}</label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={e => setMonthlyContribution(Number(e.target.value))}
                  style={inputStyle}
                  min={0}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('expectedReturn')}</label>
                <input
                  type="number"
                  value={annualReturn}
                  onChange={e => setAnnualReturn(Number(e.target.value))}
                  style={inputStyle}
                  step={0.5}
                  min={0}
                  max={30}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('expectedInflation')}</label>
                <input
                  type="number"
                  value={inflation}
                  onChange={e => setInflation(Number(e.target.value))}
                  style={inputStyle}
                  step={0.5}
                  min={0}
                  max={20}
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>{lt('desiredIncome')}</label>
                <input
                  type="number"
                  value={desiredIncome}
                  onChange={e => setDesiredIncome(Number(e.target.value))}
                  style={inputStyle}
                  min={0}
                />
              </div>
            </div>
          </div>

          {/* Results card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>{lt('results')}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#F5F3FF', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('totalSavingsAtRetirement')}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: ACCENT, fontFamily: fm }}>
                  {fmtMoney(calc.totalSavings)}
                </div>
              </div>
              <div style={{ background: '#F5F3FF', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('monthlyIncome4Pct')}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: ACCENT, fontFamily: fm }}>
                  {fmtMoneyExact(calc.monthlyIncome)}
                </div>
              </div>
              <div style={{
                background: calc.hasGap ? '#FEF2F2' : '#F0FDF4', borderRadius: 12, padding: 16, textAlign: 'center',
              }}>
                <div style={labelStyle}>
                  {calc.hasGap ? lt('monthlyShortfall') : lt('monthlySurplus')}
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 700, fontFamily: fm,
                  color: calc.hasGap ? '#DC2626' : '#16A34A',
                }}>
                  {calc.hasGap ? '-' : '+'}{fmtMoneyExact(Math.abs(calc.gap))}
                </div>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('yearsMoneyLasts')}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: fm, color: '#1C1B18' }}>
                  {calc.yearsLast >= 999 ? `\u221E ${lt('forever')}` : calc.yearsLast.toFixed(1) + ` ${lt('yrsLabel')}`}
                </div>
              </div>
            </div>

            {/* Advice */}
            {calc.hasGap && (
              <div style={{
                background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: 12, padding: 16,
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#C2410C', marginBottom: 4 }}>
                  {lt('savingsGapAlert')}
                </div>
                <div style={{ fontSize: 13, color: '#9A3412', lineHeight: 1.6 }}>
                  {lt('gapMessage')
                    .replace('{additional}', fmtMoneyExact(calc.additionalNeeded))
                    .replace('{total}', fmtMoneyExact(monthlyContribution + calc.additionalNeeded))
                    .replace('{desired}', fmtMoneyExact(desiredIncome))}
                </div>
              </div>
            )}

            {!calc.hasGap && (
              <div style={{
                background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 12, padding: 16,
                marginBottom: 20,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#16A34A', marginBottom: 4 }}>
                  {lt('onTrack')}
                </div>
                <div style={{ fontSize: 13, color: '#15803D', lineHeight: 1.6 }}>
                  {lt('onTrackMessage')
                    .replace('{desired}', fmtMoneyExact(desiredIncome))
                    .replace('{surplus}', fmtMoneyExact(calc.gap))}
                </div>
              </div>
            )}

            {/* Growth chart */}
            <div>
              <div style={{ ...labelStyle, marginBottom: 12 }}>{lt('savingsGrowth')}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 180, paddingBottom: 24, position: 'relative' }}>
                {calc.snapshots.map((snap, idx) => {
                  const pct = maxSavings > 0 ? (snap.savings / maxSavings) * 100 : 0
                  return (
                    <div key={idx} style={{
                      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                      position: 'relative', height: '100%', justifyContent: 'flex-end',
                    }}>
                      <div style={{
                        fontSize: 9, fontWeight: 700, fontFamily: fm, color: ACCENT,
                        marginBottom: 4, whiteSpace: 'nowrap',
                      }}>
                        {fmtMoney(snap.savings)}
                      </div>
                      <div style={{
                        width: '100%', maxWidth: 48,
                        height: `${Math.max(pct, 2)}%`,
                        background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}88)`,
                        borderRadius: '6px 6px 0 0',
                        transition: 'height .3s ease',
                      }} />
                      <div style={{
                        fontSize: 10, fontWeight: 600, color: '#9A958A', marginTop: 4,
                        position: 'absolute', bottom: 0,
                      }}>
                        {snap.age}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ textAlign: 'center', fontSize: 10, color: '#9A958A', marginTop: 4 }}>
                {lt('ageLabel')}
              </div>
            </div>
          </div>

          {/* Summary card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>{lt('summary')}</div>
            <div style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <span>{lt('yearsUntilRetirement')}</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right' }}>{calc.yearsToRetirement}</span>
                <span>{lt('totalMonthsContributing')}</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right' }}>{calc.yearsToRetirement * 12}</span>
                <span>{lt('totalContributions')}</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right' }}>{fmtMoney(monthlyContribution * calc.yearsToRetirement * 12)}</span>
                <span>{lt('investmentGrowth')}</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right', color: '#16A34A' }}>
                  {fmtMoney(calc.totalSavings - currentSavings - monthlyContribution * calc.yearsToRetirement * 12)}
                </span>
                <span>{lt('realReturnRate')}</span>
                <span style={{ fontWeight: 700, fontFamily: fm, textAlign: 'right' }}>
                  {(((1 + annualReturn / 100) / (1 + inflation / 100) - 1) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section style={{ maxWidth: 540, margin: '0 auto', padding: '32px 28px', borderTop: '1px solid #E8E4DB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{lt('seoH2')}</h2>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP1')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3a')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP2')}</p>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 6 }}>{lt('seoH3b')}</h3>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8 }}>{lt('seoP3')}</p>
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            {lt('seoP4').split(/<a>|<\/a>|<a2>|<\/a2>/).map((part, i) => {
              if (i === 1) return <a key={i} href="/investment-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              if (i === 3) return <a key={i} href="/salary-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              return <span key={i}>{part}</span>
            })}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
