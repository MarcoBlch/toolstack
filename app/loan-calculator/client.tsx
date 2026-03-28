'use client'
import { useState, useMemo } from 'react'
import ToolShell from '@/components/ToolShell'
import { t, LOCALE_CODES, type Locale } from '@/lib/i18n'

const fb = "'Outfit', -apple-system, sans-serif"
const fm = "'JetBrains Mono', monospace"
const ACCENT = '#DC2626'

type AmortRow = {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

/* ------------------------------------------------------------------ */
/*  LABELS — tool-specific translations (common keys use t())         */
/* ------------------------------------------------------------------ */
const LABELS: Record<string, Record<Locale, string>> = {
  navTitle: { en: 'Loan Calculator', fr: 'Calculateur de prêt', es: 'Calculadora de préstamo', pt: 'Calculadora de empréstimo', de: 'Kreditrechner' },
  loanDetails: { en: 'Loan Details', fr: 'Détails du prêt', es: 'Detalles del préstamo', pt: 'Detalhes do empréstimo', de: 'Kreditdetails' },
  loanAmount: { en: 'Loan Amount ($)', fr: 'Montant du prêt ($)', es: 'Monto del préstamo ($)', pt: 'Valor do empréstimo ($)', de: 'Kreditbetrag ($)' },
  interestRate: { en: 'Interest Rate (%)', fr: 'Taux d\'intérêt (%)', es: 'Tasa de interés (%)', pt: 'Taxa de juros (%)', de: 'Zinssatz (%)' },
  loanTerm: { en: 'Loan Term', fr: 'Durée du prêt', es: 'Plazo del préstamo', pt: 'Prazo do empréstimo', de: 'Kreditlaufzeit' },
  yrs: { en: 'Yrs', fr: 'Ans', es: 'Años', pt: 'Anos', de: 'J.' },
  mo: { en: 'Mo', fr: 'Mois', es: 'Mes', pt: 'Meses', de: 'Mo.' },
  startDate: { en: 'Start Date', fr: 'Date de début', es: 'Fecha de inicio', pt: 'Data de início', de: 'Startdatum' },

  results: { en: 'Results', fr: 'Résultats', es: 'Resultados', pt: 'Resultados', de: 'Ergebnisse' },
  monthlyPayment: { en: 'Monthly Payment', fr: 'Mensualité', es: 'Pago mensual', pt: 'Parcela mensal', de: 'Monatliche Rate' },
  totalInterest: { en: 'Total Interest', fr: 'Intérêts totaux', es: 'Interés total', pt: 'Juros totais', de: 'Gesamtzinsen' },
  totalAmountPaid: { en: 'Total Amount Paid', fr: 'Montant total payé', es: 'Monto total pagado', pt: 'Valor total pago', de: 'Gesamtbetrag gezahlt' },
  payoffDate: { en: 'Payoff Date', fr: 'Date de remboursement', es: 'Fecha de liquidación', pt: 'Data de quitação', de: 'Tilgungsdatum' },
  principalVsInterest: { en: 'Principal vs Interest', fr: 'Capital vs Intérêts', es: 'Capital vs Interés', pt: 'Capital vs Juros', de: 'Tilgung vs Zinsen' },
  principal: { en: 'Principal', fr: 'Capital', es: 'Capital', pt: 'Capital', de: 'Tilgung' },
  interest: { en: 'Interest', fr: 'Intérêts', es: 'Interés', pt: 'Juros', de: 'Zinsen' },

  amortizationSchedule: { en: 'Amortization Schedule', fr: 'Tableau d\'amortissement', es: 'Tabla de amortización', pt: 'Tabela de amortização', de: 'Tilgungsplan' },
  month: { en: 'Month', fr: 'Mois', es: 'Mes', pt: 'Mês', de: 'Monat' },
  payment: { en: 'Payment', fr: 'Paiement', es: 'Pago', pt: 'Pagamento', de: 'Zahlung' },
  balance: { en: 'Balance', fr: 'Solde', es: 'Saldo', pt: 'Saldo', de: 'Restschuld' },
  showAllMonths: { en: 'Show all {n} months', fr: 'Afficher les {n} mois', es: 'Mostrar los {n} meses', pt: 'Mostrar todos os {n} meses', de: 'Alle {n} Monate anzeigen' },
  showFirst12: { en: 'Show first 12 months', fr: 'Afficher les 12 premiers mois', es: 'Mostrar los primeros 12 meses', pt: 'Mostrar os primeiros 12 meses', de: 'Erste 12 Monate anzeigen' },

  // SEO
  seoH2: {
    en: 'Free loan calculator',
    fr: 'Calculateur de prêt gratuit',
    es: 'Calculadora de préstamo gratuita',
    pt: 'Calculadora de empréstimo gratuita',
    de: 'Kostenloser Kreditrechner',
  },
  seoP1: {
    en: 'This loan calculator works for any type of borrowing, whether it is a personal loan, car loan, student loan, or business line of credit. Enter your loan amount, annual interest rate, and repayment term to see your fixed monthly payment, total interest cost, and exact payoff date. Toggle between years and months to match any loan offer you are comparing.',
    fr: 'Ce calculateur de prêt fonctionne pour tout type d\'emprunt, qu\'il s\'agisse d\'un prêt personnel, automobile, étudiant ou d\'une ligne de crédit professionnelle. Entrez le montant du prêt, le taux d\'intérêt annuel et la durée de remboursement pour voir votre mensualité fixe, le coût total des intérêts et la date exacte de remboursement. Basculez entre années et mois pour correspondre à toute offre de prêt que vous comparez.',
    es: 'Esta calculadora de préstamo funciona para cualquier tipo de endeudamiento, ya sea un préstamo personal, de auto, estudiantil o una línea de crédito empresarial. Ingrese el monto del préstamo, la tasa de interés anual y el plazo de pago para ver su pago mensual fijo, el costo total de intereses y la fecha exacta de liquidación. Alterne entre años y meses para coincidir con cualquier oferta de préstamo que esté comparando.',
    pt: 'Esta calculadora de empréstimo funciona para qualquer tipo de financiamento, seja um empréstimo pessoal, de carro, estudantil ou uma linha de crédito empresarial. Insira o valor do empréstimo, a taxa de juros anual e o prazo de pagamento para ver sua parcela mensal fixa, o custo total de juros e a data exata de quitação. Alterne entre anos e meses para corresponder a qualquer oferta de empréstimo que esteja comparando.',
    de: 'Dieser Kreditrechner funktioniert für jede Art von Darlehen, ob Privatkredit, Autokredit, Studienkredit oder Geschäftskredit. Geben Sie den Kreditbetrag, den jährlichen Zinssatz und die Laufzeit ein, um Ihre feste monatliche Rate, die gesamten Zinskosten und das genaue Tilgungsdatum zu sehen. Wechseln Sie zwischen Jahren und Monaten, um jedes Kreditangebot zu vergleichen.',
  },
  seoH3a: {
    en: 'Understanding your amortization schedule',
    fr: 'Comprendre votre tableau d\'amortissement',
    es: 'Entendiendo su tabla de amortización',
    pt: 'Entendendo sua tabela de amortização',
    de: 'Ihren Tilgungsplan verstehen',
  },
  seoP2: {
    en: 'The full amortization table breaks down every single payment into its principal and interest portions. Early in the loan, interest dominates each payment, but the balance shifts over time. Reviewing this schedule helps you decide if making extra payments toward principal could shorten your loan and reduce total interest significantly.',
    fr: 'Le tableau d\'amortissement complet décompose chaque paiement en parts de capital et d\'intérêts. Au début du prêt, les intérêts dominent chaque paiement, mais l\'équilibre change au fil du temps. Examiner ce tableau vous aide à décider si des paiements supplémentaires sur le capital pourraient raccourcir votre prêt et réduire considérablement les intérêts totaux.',
    es: 'La tabla de amortización completa desglosa cada pago en sus porciones de capital e interés. Al inicio del préstamo, el interés domina cada pago, pero el balance cambia con el tiempo. Revisar esta tabla le ayuda a decidir si realizar pagos adicionales al capital podría acortar su préstamo y reducir significativamente el interés total.',
    pt: 'A tabela de amortização completa detalha cada pagamento em suas parcelas de capital e juros. No início do empréstimo, os juros dominam cada pagamento, mas o equilíbrio muda com o tempo. Revisar esta tabela ajuda a decidir se pagamentos extras no capital podem encurtar seu empréstimo e reduzir significativamente os juros totais.',
    de: 'Der vollständige Tilgungsplan schlüsselt jede einzelne Zahlung in Tilgungs- und Zinsanteile auf. Zu Beginn des Kredits dominieren die Zinsen jede Zahlung, aber das Verhältnis verschiebt sich im Laufe der Zeit. Die Überprüfung dieses Plans hilft Ihnen zu entscheiden, ob Sondertilgungen Ihren Kredit verkürzen und die Gesamtzinsen erheblich reduzieren könnten.',
  },
  seoH3b: {
    en: 'How interest rates affect your total cost',
    fr: 'Comment les taux d\'intérêt affectent votre coût total',
    es: 'Cómo las tasas de interés afectan su costo total',
    pt: 'Como as taxas de juros afetam seu custo total',
    de: 'Wie Zinssätze Ihre Gesamtkosten beeinflussen',
  },
  seoP3: {
    en: 'A lower interest rate does not just reduce your monthly payment; it also lowers the total amount you repay over the life of the loan. Try changing the rate by even half a percentage point to see the impact. Setting a custom start date lets you plan around your actual disbursement timeline and see your real payoff month.',
    fr: 'Un taux d\'intérêt plus bas ne réduit pas seulement votre mensualité ; il diminue aussi le montant total que vous remboursez sur la durée du prêt. Essayez de modifier le taux ne serait-ce que d\'un demi-point de pourcentage pour voir l\'impact. Définir une date de début personnalisée vous permet de planifier autour de votre calendrier de versement réel et de voir votre véritable mois de remboursement.',
    es: 'Una tasa de interés más baja no solo reduce su pago mensual; también disminuye el monto total que paga durante la vida del préstamo. Intente cambiar la tasa incluso medio punto porcentual para ver el impacto. Establecer una fecha de inicio personalizada le permite planificar alrededor de su cronograma de desembolso real y ver su mes de liquidación real.',
    pt: 'Uma taxa de juros mais baixa não apenas reduz sua parcela mensal; ela também diminui o valor total que você paga durante a vida do empréstimo. Tente alterar a taxa em apenas meio ponto percentual para ver o impacto. Definir uma data de início personalizada permite planejar de acordo com seu cronograma real de desembolso e ver seu mês real de quitação.',
    de: 'Ein niedrigerer Zinssatz reduziert nicht nur Ihre monatliche Rate; er senkt auch den Gesamtbetrag, den Sie über die Laufzeit des Kredits zurückzahlen. Versuchen Sie, den Zinssatz auch nur um einen halben Prozentpunkt zu ändern, um die Auswirkungen zu sehen. Das Festlegen eines benutzerdefinierten Startdatums ermöglicht es Ihnen, um Ihren tatsächlichen Auszahlungszeitplan zu planen und Ihren realen Tilgungsmonat zu sehen.',
  },
  seoP4: {
    en: 'Looking specifically at home financing? Our <a>mortgage calculator</a> includes down payment and loan-to-value features. For quick rate comparisons, the <a2>percentage calculator</a2> is a handy companion tool.',
    fr: 'Vous cherchez spécifiquement un financement immobilier ? Notre <a>calculateur hypothécaire</a> inclut des fonctions d\'apport et de ratio prêt-valeur. Pour des comparaisons de taux rapides, le <a2>calculateur de pourcentage</a2> est un outil complémentaire pratique.',
    es: '¿Busca específicamente financiamiento de vivienda? Nuestra <a>calculadora de hipoteca</a> incluye funciones de enganche y relación préstamo-valor. Para comparaciones rápidas de tasas, la <a2>calculadora de porcentajes</a2> es una herramienta complementaria práctica.',
    pt: 'Procurando especificamente financiamento imobiliário? Nossa <a>calculadora de hipoteca</a> inclui recursos de entrada e relação empréstimo-valor. Para comparações rápidas de taxas, a <a2>calculadora de porcentagem</a2> é uma ferramenta complementar prática.',
    de: 'Suchen Sie speziell nach Immobilienfinanzierung? Unser <a>Hypothekenrechner</a> enthält Anzahlungs- und Beleihungswert-Funktionen. Für schnelle Zinsvergleiche ist der <a2>Prozentrechner</a2> ein praktisches Begleittool.',
  },
}

export default function LoanClient({
  defaultAmount,
  defaultRate,
  defaultMonths,
  locale = 'en' as Locale,
}: {
  defaultAmount?: number
  defaultRate?: number
  defaultMonths?: number
  locale?: Locale
} = {}) {
  const lt = (key: string) => LABELS[key]?.[locale] ?? LABELS[key]?.en ?? key

  const [amount, setAmount] = useState(defaultAmount ?? 15000)
  const [rate, setRate] = useState(defaultRate ?? 5.5)
  const [termValue, setTermValue] = useState(defaultMonths ? defaultMonths : 5)
  const [termUnit, setTermUnit] = useState<'years' | 'months'>(defaultMonths ? 'months' : 'years')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [showAll, setShowAll] = useState(false)

  const months = termUnit === 'years' ? termValue * 12 : termValue

  const calc = useMemo(() => {
    if (amount <= 0 || rate < 0 || months <= 0) {
      return { monthly: 0, totalInterest: 0, totalPaid: 0, payoffDate: '', schedule: [] as AmortRow[] }
    }

    const r = rate / 100 / 12
    let monthly: number

    if (r === 0) {
      monthly = amount / months
    } else {
      monthly = amount * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
    }

    const schedule: AmortRow[] = []
    let balance = amount

    for (let i = 1; i <= months; i++) {
      const interestPart = balance * r
      const principalPart = monthly - interestPart
      balance = Math.max(0, balance - principalPart)

      schedule.push({
        month: i,
        payment: monthly,
        principal: principalPart,
        interest: interestPart,
        balance,
      })
    }

    const totalPaid = monthly * months
    const totalInterest = totalPaid - amount

    const start = new Date(startDate)
    start.setMonth(start.getMonth() + months)
    const payoffDate = start.toLocaleDateString(LOCALE_CODES[locale], { year: 'numeric', month: 'long', day: 'numeric' })

    return { monthly, totalInterest, totalPaid, payoffDate, schedule }
  }, [amount, rate, months, startDate, locale])

  const fmt = (n: number) => {
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

  const visibleSchedule = showAll ? calc.schedule : calc.schedule.slice(0, 12)
  const headers = [lt('month'), lt('payment'), lt('principal'), lt('interest'), lt('balance')]

  return (
    <ToolShell name={lt('navTitle')} icon="🏦" currentPath="/loan-calculator" locale={locale}>
      <div style={{ background: '#FAFAF8', minHeight: '100vh', color: '#1C1B18', fontFamily: fb }}>
        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 28px', maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🏦</span>
            <span style={{ fontSize: 17, fontWeight: 700 }}>{lt('navTitle')}</span>
          </div>
          <a href="/" style={{ fontSize: 12, color: '#9A958A', textDecoration: 'none' }}>{t('backAllTools', locale)}</a>
        </nav>

        {/* Main content */}
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px 40px' }}>

          {/* Input card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>{lt('loanDetails')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>{lt('loanAmount')}</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  style={inputStyle}
                  min={0}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('interestRate')}</label>
                <input
                  type="number"
                  value={rate}
                  onChange={e => setRate(Number(e.target.value))}
                  style={inputStyle}
                  step={0.1}
                  min={0}
                />
              </div>
              <div>
                <label style={labelStyle}>{lt('loanTerm')}</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    type="number"
                    value={termValue}
                    onChange={e => setTermValue(Number(e.target.value))}
                    style={{ ...inputStyle, flex: 1 }}
                    min={1}
                  />
                  <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1.5px solid #E8E4DB' }}>
                    <button
                      onClick={() => { if (termUnit === 'months') { setTermUnit('years'); setTermValue(Math.max(1, Math.round(termValue / 12))) } }}
                      style={{
                        padding: '8px 12px', fontSize: 12, fontWeight: 600, fontFamily: fb, cursor: 'pointer',
                        border: 'none', background: termUnit === 'years' ? ACCENT : '#F5F3EE',
                        color: termUnit === 'years' ? '#fff' : '#9A958A',
                      }}
                    >
                      {lt('yrs')}
                    </button>
                    <button
                      onClick={() => { if (termUnit === 'years') { setTermUnit('months'); setTermValue(termValue * 12) } }}
                      style={{
                        padding: '8px 12px', fontSize: 12, fontWeight: 600, fontFamily: fb, cursor: 'pointer',
                        border: 'none', background: termUnit === 'months' ? ACCENT : '#F5F3EE',
                        color: termUnit === 'months' ? '#fff' : '#9A958A',
                      }}
                    >
                      {lt('mo')}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label style={labelStyle}>{lt('startDate')}</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Results card */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>{lt('results')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#FEF2F2', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('monthlyPayment')}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: ACCENT, fontFamily: fm }}>
                  {fmt(calc.monthly)}
                </div>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('totalInterest')}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: fm, color: '#1C1B18' }}>
                  {fmt(calc.totalInterest)}
                </div>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('totalAmountPaid')}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: fm, color: '#1C1B18' }}>
                  {fmt(calc.totalPaid)}
                </div>
              </div>
              <div style={{ background: '#F5F3EE', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={labelStyle}>{lt('payoffDate')}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1B18' }}>
                  {calc.payoffDate}
                </div>
              </div>
            </div>

            {/* Principal vs Interest bar chart */}
            <div style={{ marginBottom: 8 }}>
              <div style={labelStyle}>{lt('principalVsInterest')}</div>
              <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', height: 32 }}>
                <div style={{
                  width: `${calc.totalPaid > 0 ? (amount / calc.totalPaid) * 100 : 50}%`,
                  background: ACCENT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: fm,
                  minWidth: 40,
                }}>
                  {fmt(amount)}
                </div>
                <div style={{
                  flex: 1,
                  background: '#FECACA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: ACCENT, fontSize: 11, fontWeight: 700, fontFamily: fm,
                  minWidth: 40,
                }}>
                  {fmt(calc.totalInterest)}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span style={{ fontSize: 10, color: '#9A958A' }}>{lt('principal')}</span>
                <span style={{ fontSize: 10, color: '#9A958A' }}>{lt('interest')}</span>
              </div>
            </div>
          </div>

          {/* Amortization schedule */}
          <div style={{ background: '#fff', borderRadius: 16, border: '1.5px solid #E8E4DB', padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>{lt('amortizationSchedule')}</div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid #E8E4DB' }}>
                    {headers.map((h, i) => (
                      <th key={h} style={{
                        ...labelStyle, padding: '8px 10px', textAlign: i === 0 ? 'left' : 'right',
                        fontFamily: fb,
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleSchedule.map((row, idx) => (
                    <tr key={row.month} style={{
                      borderBottom: idx < visibleSchedule.length - 1 ? '1px solid #F0EDE6' : 'none',
                    }}>
                      <td style={{ padding: '9px 10px', fontWeight: 600, fontFamily: fm, fontSize: 12 }}>
                        {row.month}
                      </td>
                      <td style={{ padding: '9px 10px', textAlign: 'right', fontFamily: fm, fontSize: 12 }}>
                        {fmt(row.payment)}
                      </td>
                      <td style={{ padding: '9px 10px', textAlign: 'right', fontFamily: fm, fontSize: 12, color: ACCENT }}>
                        {fmt(row.principal)}
                      </td>
                      <td style={{ padding: '9px 10px', textAlign: 'right', fontFamily: fm, fontSize: 12, color: '#9A958A' }}>
                        {fmt(row.interest)}
                      </td>
                      <td style={{ padding: '9px 10px', textAlign: 'right', fontFamily: fm, fontSize: 12, fontWeight: 600 }}>
                        {fmt(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {calc.schedule.length > 12 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                style={{
                  display: 'block', width: '100%', marginTop: 12, padding: '10px', fontSize: 13,
                  fontWeight: 600, fontFamily: fb, color: ACCENT, background: '#FEF2F2',
                  border: '1.5px solid #FECACA', borderRadius: 10, cursor: 'pointer',
                }}
              >
                {lt('showAllMonths').replace('{n}', String(calc.schedule.length))}
              </button>
            )}
            {showAll && calc.schedule.length > 12 && (
              <button
                onClick={() => setShowAll(false)}
                style={{
                  display: 'block', width: '100%', marginTop: 12, padding: '10px', fontSize: 13,
                  fontWeight: 600, fontFamily: fb, color: '#9A958A', background: '#F5F3EE',
                  border: '1.5px solid #E8E4DB', borderRadius: 10, cursor: 'pointer',
                }}
              >
                {lt('showFirst12')}
              </button>
            )}
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
              if (i === 1) return <a key={i} href="/mortgage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              if (i === 3) return <a key={i} href="/percentage-calculator" style={{ color: '#FF6B35', textDecoration: 'underline' }}>{part}</a>
              return <span key={i}>{part}</span>
            })}
          </p>
        </section>
      </div>
    </ToolShell>
  )
}
