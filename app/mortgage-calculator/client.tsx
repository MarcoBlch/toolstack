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

const LABELS: Record<string, Record<Locale, string>> = {
  // Title
  titleMortgage: {
    en: 'Mortgage', fr: 'Calculateur', es: 'Calculadora', pt: 'Calculadora', de: 'Hypotheken',
  },
  titleCalculator: {
    en: 'calculator', fr: 'hypothécaire', es: 'hipotecaria', pt: 'hipotecária', de: 'rechner',
  },
  navTitle: {
    en: 'Mortgage Calculator', fr: 'Calculateur hypothécaire', es: 'Calculadora hipotecaria', pt: 'Calculadora hipotecária', de: 'Hypothekenrechner',
  },
  subtitle: {
    en: 'Calculate your monthly payment, total interest, and amortization.',
    fr: 'Calculez votre mensualité, le total des intérêts et l\'amortissement.',
    es: 'Calcula tu pago mensual, los intereses totales y la amortización.',
    pt: 'Calcule sua parcela mensal, juros totais e amortização.',
    de: 'Berechnen Sie Ihre monatliche Rate, Gesamtzinsen und Tilgungsplan.',
  },
  // Input labels
  loanAmount: {
    en: 'Loan Amount', fr: 'Montant du prêt', es: 'Monto del préstamo', pt: 'Valor do empréstimo', de: 'Darlehensbetrag',
  },
  downPayment: {
    en: 'Down Payment', fr: 'Apport personnel', es: 'Pago inicial', pt: 'Entrada', de: 'Anzahlung',
  },
  interestRate: {
    en: 'Interest Rate (%)', fr: 'Taux d\'intérêt (%)', es: 'Tasa de interés (%)', pt: 'Taxa de juros (%)', de: 'Zinssatz (%)',
  },
  loanTerm: {
    en: 'Loan Term (Years)', fr: 'Durée du prêt (ans)', es: 'Plazo del préstamo (años)', pt: 'Prazo do empréstimo (anos)', de: 'Laufzeit (Jahre)',
  },
  yearsSuffix: {
    en: 'years', fr: 'ans', es: 'años', pt: 'anos', de: 'Jahre',
  },
  // Result labels
  monthlyPayment: {
    en: 'Monthly Payment', fr: 'Mensualité', es: 'Pago mensual', pt: 'Parcela mensal', de: 'Monatliche Rate',
  },
  totalInterest: {
    en: 'Total Interest', fr: 'Intérêts totaux', es: 'Intereses totales', pt: 'Juros totais', de: 'Gesamtzinsen',
  },
  totalAmountPaid: {
    en: 'Total Amount Paid', fr: 'Montant total remboursé', es: 'Monto total pagado', pt: 'Valor total pago', de: 'Gesamtbetrag gezahlt',
  },
  ltvRatio: {
    en: 'Loan-to-Value Ratio', fr: 'Ratio prêt/valeur', es: 'Relación préstamo/valor', pt: 'Relação empréstimo/valor', de: 'Beleihungsauslauf',
  },
  // Chart
  amortizationBreakdown: {
    en: 'Amortization Breakdown', fr: 'Tableau d\'amortissement', es: 'Desglose de amortización', pt: 'Detalhamento da amortização', de: 'Tilgungsübersicht',
  },
  principalVsInterest: {
    en: 'Principal vs interest per year', fr: 'Capital vs intérêts par an', es: 'Capital vs intereses por año', pt: 'Capital vs juros por ano', de: 'Tilgung vs Zinsen pro Jahr',
  },
  principal: {
    en: 'Principal', fr: 'Capital', es: 'Capital', pt: 'Capital', de: 'Tilgung',
  },
  interest: {
    en: 'Interest', fr: 'Intérêts', es: 'Intereses', pt: 'Juros', de: 'Zinsen',
  },
  yearAbbr: {
    en: 'Y', fr: 'A', es: 'A', pt: 'A', de: 'J',
  },
  // SEO
  seoH2: {
    en: 'Free mortgage calculator',
    fr: 'Calculateur hypothécaire gratuit',
    es: 'Calculadora hipotecaria gratuita',
    pt: 'Calculadora hipotecária gratuita',
    de: 'Kostenloser Hypothekenrechner',
  },
  seoP1: {
    en: 'Our mortgage calculator helps you understand the true cost of buying a home before you sign anything. Enter your property price, down payment, interest rate, and loan term to instantly see your monthly payment, total interest paid over the life of the loan, and the full amount you will repay. The loan-to-value ratio gives you a quick sense of your equity position from day one.',
    fr: 'Notre calculateur hypothécaire vous aide à comprendre le coût réel de l\'achat d\'un bien immobilier avant de signer quoi que ce soit. Entrez le prix du bien, votre apport personnel, le taux d\'intérêt et la durée du prêt pour voir instantanément votre mensualité, le total des intérêts payés sur la durée du prêt et le montant total que vous rembourserez. Le ratio prêt/valeur vous donne un aperçu rapide de votre position en fonds propres dès le premier jour.',
    es: 'Nuestra calculadora hipotecaria te ayuda a comprender el costo real de comprar una vivienda antes de firmar nada. Introduce el precio de la propiedad, el pago inicial, la tasa de interés y el plazo del préstamo para ver al instante tu pago mensual, los intereses totales pagados durante la vida del préstamo y el monto total que reembolsarás. La relación préstamo/valor te da una idea rápida de tu posición patrimonial desde el primer día.',
    pt: 'Nossa calculadora hipotecária ajuda você a entender o custo real da compra de um imóvel antes de assinar qualquer coisa. Insira o preço do imóvel, a entrada, a taxa de juros e o prazo do empréstimo para ver instantaneamente sua parcela mensal, o total de juros pagos ao longo da vida do empréstimo e o valor total que você pagará. A relação empréstimo/valor oferece uma visão rápida da sua posição patrimonial desde o primeiro dia.',
    de: 'Unser Hypothekenrechner hilft Ihnen, die tatsächlichen Kosten eines Immobilienkaufs zu verstehen, bevor Sie etwas unterschreiben. Geben Sie den Immobilienpreis, die Anzahlung, den Zinssatz und die Laufzeit ein, um sofort Ihre monatliche Rate, die Gesamtzinsen über die Laufzeit des Darlehens und den Gesamtbetrag zu sehen, den Sie zurückzahlen werden. Der Beleihungsauslauf gibt Ihnen vom ersten Tag an einen schnellen Überblick über Ihre Eigenkapitalposition.',
  },
  seoH3a: {
    en: 'Amortization schedule explained',
    fr: 'Explication du tableau d\'amortissement',
    es: 'Explicación del plan de amortización',
    pt: 'Explicação do cronograma de amortização',
    de: 'Tilgungsplan erklärt',
  },
  seoP2: {
    en: 'The year-by-year amortization chart shows exactly how each payment splits between principal and interest. In early years most of your payment covers interest, but over time a larger share goes toward reducing the balance. Understanding this shift helps you evaluate whether extra payments or refinancing could save you money over the long run.',
    fr: 'Le tableau d\'amortissement année par année montre exactement comment chaque paiement se répartit entre capital et intérêts. Les premières années, la majeure partie de votre paiement couvre les intérêts, mais avec le temps, une part croissante sert à réduire le solde. Comprendre cette évolution vous aide à évaluer si des paiements supplémentaires ou un refinancement pourraient vous faire économiser sur le long terme.',
    es: 'El gráfico de amortización año por año muestra exactamente cómo se divide cada pago entre capital e intereses. En los primeros años, la mayor parte del pago cubre intereses, pero con el tiempo una proporción mayor se destina a reducir el saldo. Entender este cambio te ayuda a evaluar si pagos adicionales o una refinanciación podrían ahorrarte dinero a largo plazo.',
    pt: 'O gráfico de amortização ano a ano mostra exatamente como cada pagamento se divide entre capital e juros. Nos primeiros anos, a maior parte do pagamento cobre juros, mas com o tempo uma parcela maior é destinada à redução do saldo. Compreender essa mudança ajuda a avaliar se pagamentos extras ou refinanciamento podem economizar dinheiro a longo prazo.',
    de: 'Die jährliche Tilgungsübersicht zeigt genau, wie sich jede Zahlung zwischen Tilgung und Zinsen aufteilt. In den ersten Jahren deckt der größte Teil Ihrer Zahlung die Zinsen ab, aber im Laufe der Zeit fließt ein größerer Anteil in die Reduzierung des Restbetrags. Das Verständnis dieser Verschiebung hilft Ihnen zu bewerten, ob Sondertilgungen oder eine Umschuldung Ihnen langfristig Geld sparen könnten.',
  },
  seoH3b: {
    en: 'Comparing rates and loan terms',
    fr: 'Comparer les taux et les durées de prêt',
    es: 'Comparar tasas y plazos de préstamo',
    pt: 'Comparando taxas e prazos de empréstimo',
    de: 'Zinssätze und Laufzeiten vergleichen',
  },
  seoP3: {
    en: 'Even a small difference in interest rate can add up to thousands over a 25-year mortgage. Try adjusting the rate and term to see how a shorter loan period increases monthly payments but dramatically cuts total interest. This side-by-side comparison is one of the best ways to decide between a 15-year and 30-year mortgage offer.',
    fr: 'Même une petite différence de taux d\'intérêt peut représenter des milliers d\'euros sur un prêt de 25 ans. Essayez d\'ajuster le taux et la durée pour voir comment une période de prêt plus courte augmente les mensualités mais réduit considérablement les intérêts totaux. Cette comparaison côte à côte est l\'un des meilleurs moyens de choisir entre un prêt de 15 ans et un prêt de 30 ans.',
    es: 'Incluso una pequeña diferencia en la tasa de interés puede sumar miles a lo largo de una hipoteca a 25 años. Prueba ajustar la tasa y el plazo para ver cómo un período más corto aumenta los pagos mensuales pero reduce drásticamente los intereses totales. Esta comparación lado a lado es una de las mejores formas de decidir entre una hipoteca a 15 años y una a 30 años.',
    pt: 'Mesmo uma pequena diferença na taxa de juros pode representar milhares ao longo de uma hipoteca de 25 anos. Experimente ajustar a taxa e o prazo para ver como um período mais curto aumenta as parcelas mensais, mas reduz drasticamente os juros totais. Essa comparação lado a lado é uma das melhores formas de decidir entre um financiamento de 15 anos e um de 30 anos.',
    de: 'Selbst ein kleiner Unterschied beim Zinssatz kann sich über eine 25-jährige Hypothek auf Tausende summieren. Passen Sie Zinssatz und Laufzeit an, um zu sehen, wie eine kürzere Kreditlaufzeit die monatlichen Raten erhöht, aber die Gesamtzinsen drastisch senkt. Dieser Seite-an-Seite-Vergleich ist eine der besten Methoden, um zwischen einem 15-jährigen und einem 30-jährigen Hypothekenangebot zu entscheiden.',
  },
  seoCrossPromo: {
    en: 'Need to calculate a different type of loan? Try our',
    fr: 'Besoin de calculer un autre type de prêt ? Essayez notre',
    es: '¿Necesitas calcular otro tipo de préstamo? Prueba nuestra',
    pt: 'Precisa calcular outro tipo de empréstimo? Experimente nossa',
    de: 'Müssen Sie eine andere Art von Darlehen berechnen? Probieren Sie unseren',
  },
  loanCalcLink: {
    en: 'loan calculator', fr: 'calculateur de prêt', es: 'calculadora de préstamos', pt: 'calculadora de empréstimos', de: 'Kreditrechner',
  },
  crossPromoMid: {
    en: 'for personal or auto loans. If you want to see how your savings could grow instead, use the',
    fr: 'pour les prêts personnels ou auto. Si vous souhaitez plutôt voir comment votre épargne pourrait croître, utilisez le',
    es: 'para préstamos personales o de auto. Si quieres ver cómo podrían crecer tus ahorros, usa la',
    pt: 'para empréstimos pessoais ou de veículo. Se você quer ver como suas economias podem crescer, use a',
    de: 'für Privat- oder Autokredite. Wenn Sie stattdessen sehen möchten, wie Ihre Ersparnisse wachsen könnten, nutzen Sie den',
  },
  investCalcLink: {
    en: 'investment calculator', fr: 'calculateur d\'investissement', es: 'calculadora de inversiones', pt: 'calculadora de investimentos', de: 'Investitionsrechner',
  },
  crossPromoEnd: {
    en: '. For quick math on rate differences, the',
    fr: '. Pour des calculs rapides sur les différences de taux, le',
    es: '. Para cálculos rápidos sobre diferencias de tasas, la',
    pt: '. Para cálculos rápidos sobre diferenças de taxas, a',
    de: '. Für schnelle Berechnungen zu Zinsunterschieden kann der',
  },
  percentCalcLink: {
    en: 'percentage calculator', fr: 'calculateur de pourcentage', es: 'calculadora de porcentajes', pt: 'calculadora de porcentagem', de: 'Prozentrechner',
  },
  crossPromoFinal: {
    en: 'can help.', fr: 'peut vous aider.', es: 'puede ayudarte.', pt: 'pode ajudar.', de: 'helfen.',
  },
}

export default function MortgageClient({
  defaultAmount,
  defaultRate,
  defaultYears,
  defaultDown,
  locale = 'en' as Locale,
}: {
  defaultAmount?: number
  defaultRate?: number
  defaultYears?: number
  defaultDown?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  function fmt(n: number): string {
    return n.toLocaleString(LOCALE_CODES[locale], { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const [amount, setAmount] = useState(defaultAmount ?? 250000)
  const [rate, setRate] = useState(defaultRate ?? 3.5)
  const [years, setYears] = useState(defaultYears ?? 25)
  const [down, setDown] = useState(defaultDown ?? 50000)

  const results = useMemo(() => {
    const principal = Math.max(amount - down, 0)
    const monthlyRate = rate / 12 / 100
    const totalMonths = years * 12

    if (principal <= 0) return { monthly: 0, totalInterest: 0, totalPaid: 0, ltv: 0, schedule: [] }

    let monthly: number
    if (monthlyRate === 0) {
      monthly = principal / totalMonths
    } else {
      monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    }

    const totalPaid = monthly * totalMonths
    const totalInterest = totalPaid - principal
    const ltv = amount > 0 ? ((principal / amount) * 100) : 0

    // Yearly amortization schedule
    const schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = []
    let balance = principal
    for (let y = 1; y <= years; y++) {
      let yearPrincipal = 0
      let yearInterest = 0
      for (let m = 0; m < 12; m++) {
        if (balance <= 0) break
        const intPayment = balance * monthlyRate
        const princPayment = Math.min(monthly - intPayment, balance)
        yearInterest += intPayment
        yearPrincipal += princPayment
        balance -= princPayment
      }
      schedule.push({ year: y, principalPaid: yearPrincipal, interestPaid: yearInterest, balance: Math.max(balance, 0) })
    }

    return { monthly, totalInterest, totalPaid, ltv, schedule }
  }, [amount, rate, years, down])

  const maxYearPayment = useMemo(() => {
    return Math.max(...results.schedule.map(s => s.principalPaid + s.interestPaid), 1)
  }, [results.schedule])

  return (
    <ToolShell name={lt('navTitle')} icon="🏠" currentPath="/mortgage-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 800 }}>🏠</div>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Header */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '32px 28px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {lt('titleMortgage')} <span style={{ color: accent }}>{lt('titleCalculator')}</span>
          </h1>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 24 }}>{lt('subtitle')}</p>
        </section>

        {/* Inputs */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>{lt('loanAmount')}</label>
                <input
                  type="number" value={amount} min={0}
                  onChange={e => setAmount(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('downPayment')}</label>
                <input
                  type="number" value={down} min={0}
                  onChange={e => setDown(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('interestRate')}</label>
                <input
                  type="number" value={rate} min={0} step={0.1}
                  onChange={e => setRate(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('loanTerm')}</label>
                <select value={years} onChange={e => setYears(Number(e.target.value))} style={selectStyle}>
                  {[10, 15, 20, 25, 30].map(y => (
                    <option key={y} value={y}>{y} {lt('yearsSuffix')}</option>
                  ))}
                </select>
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
              <div style={labelStyle}>{lt('monthlyPayment')}</div>
              <div style={{ fontSize: 36, fontFamily: fm, fontWeight: 700, color: accent }}>
                {fmt(results.monthly)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('totalInterest')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {fmt(results.totalInterest)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center' }}>
              <div style={labelStyle}>{lt('totalAmountPaid')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {fmt(results.totalPaid)}
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #E8E4DB', borderRadius: 14, padding: 20, textAlign: 'center', gridColumn: '1 / -1' }}>
              <div style={labelStyle}>{lt('ltvRatio')}</div>
              <div style={{ fontSize: 22, fontFamily: fm, fontWeight: 700, color: '#1C1B18' }}>
                {results.ltv.toFixed(1)}%
              </div>
              <div style={{ marginTop: 8, height: 8, borderRadius: 4, background: '#E8E4DB', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(results.ltv, 100)}%`, background: accent, borderRadius: 4, transition: 'width .3s' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Amortization Chart */}
        {results.schedule.length > 0 && (
          <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>
            <div style={{ background: '#fff', borderRadius: 18, border: '1.5px solid #E8E4DB', padding: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{lt('amortizationBreakdown')}</h2>
              <p style={{ fontSize: 12, color: '#9A958A', marginBottom: 20 }}>{lt('principalVsInterest')}</p>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 20, marginBottom: 16, fontSize: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: accent }} />
                  <span style={{ color: '#6B6560' }}>{lt('principal')}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: accent + '40' }} />
                  <span style={{ color: '#6B6560' }}>{lt('interest')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {results.schedule.map(s => {
                  const total = s.principalPaid + s.interestPaid
                  const principalPct = (s.principalPaid / maxYearPayment) * 100
                  const interestPct = (s.interestPaid / maxYearPayment) * 100
                  return (
                    <div key={s.year} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 32, fontSize: 11, fontFamily: fm, color: '#9A958A', textAlign: 'right', flexShrink: 0 }}>
                        {lt('yearAbbr')}{s.year}
                      </div>
                      <div style={{ flex: 1, display: 'flex', height: 18, borderRadius: 4, overflow: 'hidden', background: '#F5F3EE' }}>
                        <div style={{ width: `${principalPct}%`, background: accent, transition: 'width .3s', minWidth: total > 0 ? 1 : 0 }} />
                        <div style={{ width: `${interestPct}%`, background: accent + '40', transition: 'width .3s', minWidth: total > 0 ? 1 : 0 }} />
                      </div>
                      <div style={{ width: 80, fontSize: 10, fontFamily: fm, color: '#9A958A', textAlign: 'right', flexShrink: 0 }}>
                        {fmt(total)}
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
          <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.8, marginTop: 14 }}>
            {lt('seoCrossPromo')} <a href="/loan-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('loanCalcLink')}</a> {lt('crossPromoMid')} <a href="/investment-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('investCalcLink')}</a>{lt('crossPromoEnd')} <a href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{lt('percentCalcLink')}</a> {lt('crossPromoFinal')}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
